"""Offline regression tests. These do NOT assert production access or ranking."""
import contextlib
import importlib.util
import io
import sys
import tempfile
import json
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('geo_audit', ROOT / 'scripts/audit-geo-http.py')
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)
URL = 'https://www.olmondconsulting.com/servicios/consultoria-ia-pymes.html'
TEXT = ' '.join(['Proceso medible para empresas con criterios de alcance y seguimiento.'] * 15)


def html(text=TEXT, schema=None, meta=''):
    if schema is None:
        schema = {'@context': 'https://schema.org', '@type': 'WebPage', 'url': URL}
    return (f'<html><head><title>Consultoría IA</title><meta name="description" content="Descripción">'
            f'<link rel="canonical" href="{URL}">{meta}'
            f'<script type="application/ld+json">{json.dumps(schema)}</script></head>'
            f'<body><main><h1>Consultoría IA</h1><p>{text}</p></main></body></html>')


def inspect(body, expected=None):
    row = {'url': URL, 'status': 200, 'headers': {'content-type': 'text/html'}, 'final_url': URL}
    with patch.object(audit, 'fetch', return_value=(row, body)):
        return audit.inspect_page((URL, 'OAI-SearchBot', expected))


class HttpAuditorTests(unittest.TestCase):
    def test_complete_document_passes(self):
        self.assertTrue(inspect(html())['pass'])

    def test_metadata_only_shell_fails(self):
        self.assertFalse(inspect(html(''))['pass'], 'Empty content must not pass on metadata alone')

    def test_script_text_is_not_body_content(self):
        self.assertFalse(inspect(html('<script>' + TEXT + '</script>'))['pass'])

    def test_style_text_is_not_body_content(self):
        self.assertFalse(inspect(html('<style>' + TEXT + '</style>'))['pass'])

    def test_empty_json_object_fails(self):
        self.assertFalse(inspect(html(schema={}))['pass'])

    def test_empty_json_graph_fails(self):
        self.assertFalse(inspect(html(schema={'@context': 'https://schema.org', '@graph': []}))['pass'])

    def test_valid_top_level_jsonld_array_passes(self):
        self.assertTrue(inspect(html(schema=[{'@context': 'https://schema.org', '@type': 'WebPage'}]))['pass'])

    def test_removed_body_section_fails_build_comparison(self):
        expected = audit.Document()
        expected.feed(html(TEXT + ' Entregable editorial exclusivo que debe conservarse.'))
        self.assertFalse(inspect(html(), expected)['pass'], 'Must compare visible body, not only head')

    def test_matching_build_passes(self):
        expected = audit.Document()
        expected.feed(html())
        self.assertTrue(inspect(html(), expected)['pass'])

    def test_noindex_fails(self):
        self.assertFalse(inspect(html(meta='<meta name="robots" content="noindex">'))['pass'])

    def test_invalid_jsonld_fails(self):
        self.assertFalse(inspect(html().replace('"@context"', 'BROKEN'))['pass'])

    def test_report_contains_content_evidence(self):
        row = inspect(html())
        self.assertGreater(row.get('body_word_count', 0), 80)
        self.assertEqual(len(row.get('body_sha256', '')), 64)


class RoutingTests(unittest.TestCase):
    def setUp(self):
        self.config = json.loads((ROOT / 'vercel.json').read_text())
        self.redirects = {r['source']: r for r in self.config['redirects']}

    def test_start_guide_alias_from_original_audit(self):
        r = self.redirects.get('/guias/por-donde-empezar-ia-pyme', {})
        self.assertEqual(r.get('destination'), '/guias/como-empezar-con-ia.html')
        self.assertTrue(r.get('permanent'))

    def test_cost_guide_alias_from_original_audit(self):
        r = self.redirects.get('/guias/cuanto-cuesta-implementar-ia-pyme', {})
        self.assertEqual(r.get('destination'), '/guias/cuanto-cuesta-implementar-ia.html')
        self.assertTrue(r.get('permanent'))

    def test_aliases_do_not_loop(self):
        for source, rule in self.redirects.items():
            self.assertNotIn(rule['destination'], self.redirects, source)
            self.assertTrue((ROOT / 'public' / rule['destination'].lstrip('/')).is_file(), source)

    def test_existing_app_routes_preserved(self):
        expected = {'/diagnostico', '/academy', '/revision-contenido', '/propuesta-distribuidora-lagostena',
                    '/propuesta-maprin', '/propuesta-colegio-de-abogados-san-martin', '/propuesta-de-workshop'}
        self.assertEqual({r['source'] for r in self.config['rewrites']}, expected)
        self.assertFalse(self.config['trailingSlash'])


class IncompleteAuditTests(unittest.TestCase):
    def run_incomplete(self, sitemap_row, sitemap_body):
        robots = ({'status': 200, 'headers': {'content-type': 'text/plain'}}, 'User-agent: *\nAllow: /')
        with tempfile.TemporaryDirectory() as temp:
            destination = Path(temp) / 'nested' / 'audit.json'
            with patch.object(sys, 'argv', ['audit', '--output', str(destination)]), \
                 patch.object(audit, 'fetch', side_effect=[(sitemap_row, sitemap_body), robots]), \
                 contextlib.redirect_stdout(io.StringIO()):
                code = audit.main()
            self.assertEqual(code, 2)
            self.assertTrue(destination.is_file())
            report = json.loads(destination.read_text())
            self.assertIsNone(report['pass'])
            self.assertEqual(report['assessment'], 'NOT_COMPLETED')
            self.assertEqual(report['pages'], [])
            self.assertTrue(report['errors'])
            return report

    def test_network_failure_is_not_a_blocked_site_verdict(self):
        r = self.run_incomplete({'error': 'DNS lookup failed'}, '')
        self.assertEqual(r['sitemap']['error'], 'DNS lookup failed')

    def test_html_instead_of_sitemap_is_reported(self):
        self.run_incomplete({'status': 200, 'headers': {'content-type': 'text/html'}}, '<html></html>')

    def test_duplicate_sitemap_urls_are_rejected(self):
        xml = f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{URL}</loc></url><url><loc>{URL}</loc></url></urlset>'
        self.run_incomplete({'status': 200, 'headers': {'content-type': 'application/xml'}}, xml)

    def test_empty_sitemap_is_reported(self):
        self.run_incomplete({'status': 200, 'headers': {'content-type': 'application/xml'}}, '<urlset/>')


if __name__ == '__main__':
    unittest.main()
