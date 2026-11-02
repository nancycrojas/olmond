"""Read-only HTTP evidence for a deployed Olmond build (Python standard library).

Usage: python scripts/audit-geo-http.py --compare-build --output docs/geo-http-verification.json
User-Agent checks do not authenticate real crawler IPs or prove indexation.
"""
import argparse
import concurrent.futures
import datetime
import hashlib
import json
import re
import urllib.error
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titles, self.h1s, self.descriptions, self.canonicals = [], [], [], []
        self.robots, self.schemas, self.links, self.ids = [], [], [], set()
        self.active, self.buffer = None, []
        self.in_body, self.ignored_tags, self.text_parts = False, [], []

    @property
    def body_text(self):
        # Text present in HTML, not a claim about CSS visibility or JS rendering.
        return ' '.join(' '.join(self.text_parts).split())

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'body':
            self.in_body = True
        if self.in_body and tag in ('script', 'style', 'template', 'svg'):
            self.ignored_tags.append(tag)
        if a.get('id'):
            self.ids.add(a['id'])
        if tag in ('title', 'h1') or (tag == 'script' and a.get('type') == 'application/ld+json'):
            self.active, self.buffer = tag, []
        if tag == 'meta' and a.get('name', '').lower() == 'description':
            self.descriptions.append(a.get('content', ''))
        if tag == 'meta' and a.get('name', '').lower() in ('robots', 'googlebot', 'bingbot'):
            self.robots.append(a.get('content', ''))
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonicals.append(a.get('href'))
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])

    def handle_data(self, data):
        if self.in_body and not self.ignored_tags:
            self.text_parts.append(data)
        if self.active:
            self.buffer.append(data)

    def handle_endtag(self, tag):
        if self.ignored_tags and tag == self.ignored_tags[-1]:
            self.ignored_tags.pop()
        if tag == 'body':
            self.in_body = False
        if tag != self.active:
            return
        value = ' '.join(''.join(self.buffer).split())
        {'title': self.titles, 'h1': self.h1s, 'script': self.schemas}[tag].append(value)
        self.active, self.buffer = None, []


class Redirects(urllib.request.HTTPRedirectHandler):
    def __init__(self):
        self.history = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.history.append({'status': code, 'from': req.full_url, 'to': newurl})
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url, agent, method='GET'):
    redirects = Redirects()
    opener = urllib.request.build_opener(redirects)
    request = urllib.request.Request(url, method=method, headers={'User-Agent': agent})
    try:
        response = opener.open(request, timeout=30)
    except urllib.error.HTTPError as error:
        response = error
    except Exception as error:
        return {'url': url, 'user_agent': agent, 'method': method, 'error': str(error)}, ''
    with response:
        raw = response.read()
        data = {
            'url': url, 'user_agent': agent, 'method': method,
            'status': response.status, 'final_url': response.url,
            'redirects': redirects.history, 'bytes': len(raw),
            'sha256': hashlib.sha256(raw).hexdigest(),
            'headers': {key.lower(): value for key, value in response.headers.items()
                        if key.lower() in ('content-type', 'x-robots-tag', 'cache-control', 'etag', 'x-vercel-cache', 'last-modified')},
        }
    return data, raw.decode('utf-8', errors='replace')


def inspect_page(task):
    url, agent, expected = task
    row, body = fetch(url, agent)
    errors = []
    if row.get('status') != 200:
        errors.append('HTTP not 200')
    if 'text/html' not in row.get('headers', {}).get('content-type', ''):
        errors.append('Not HTML')
    doc = Document()
    doc.feed(body)
    for name, values in [('title', doc.titles), ('h1', doc.h1s), ('description', doc.descriptions)]:
        if len(values) != 1 or not values[0].strip():
            errors.append(f'{name}: expected one nonempty value')
    if doc.canonicals != [url]:
        errors.append('Canonical mismatch')
    body_words = len(doc.body_text.split())
    # Site-specific regression guard for Olmond's content pages, not a ranking rule.
    if body_words < 80:
        errors.append('Insufficient body text: expected at least 80 words for an Olmond content page')
    directives = ','.join(doc.robots + [row.get('headers', {}).get('x-robots-tag', '')])
    if re.search(r'\b(noindex|nosnippet|none)\b|max-snippet\s*:\s*0\b', directives, re.I):
        errors.append('Index/snippet restriction')
    schema_types = []
    if not doc.schemas:
        errors.append('Missing JSON-LD')
    for value in doc.schemas:
        try:
            data = json.loads(value)
            roots = data if isinstance(data, list) else [data]
            for root in roots:
                if not isinstance(root, dict):
                    raise ValueError('JSON-LD root must be an object or array of objects')
                nodes = root.get('@graph', [root])
                if not isinstance(nodes, list):
                    raise ValueError('JSON-LD graph must be an array')
                for node in nodes:
                    if not isinstance(node, dict):
                        raise ValueError('JSON-LD node must be an object')
                    kind = node.get('@type', [])
                    kinds = kind if isinstance(kind, list) else [kind]
                    if any(not isinstance(item, str) or not item.strip() for item in kinds):
                        raise ValueError('JSON-LD types must be nonempty strings')
                    schema_types.extend(kinds)
        except (ValueError, TypeError):
            errors.append('Invalid JSON-LD')
    if doc.schemas and not schema_types:
        errors.append('JSON-LD contains no typed entities')
    if expected is not None:
        if doc.body_text != expected.body_text:
            errors.append('Published body text differs from local build')
        for name in ['titles', 'h1s', 'descriptions', 'canonicals']:
            if getattr(doc, name) != getattr(expected, name):
                errors.append(f'Published {name} differs from local build')
        try:
            if [json.loads(s) for s in doc.schemas] != [json.loads(s) for s in expected.schemas]:
                errors.append('Published structured data differs from local build')
        except ValueError:
            errors.append('Cannot compare invalid structured data')
    row.update({'title': doc.titles, 'h1': doc.h1s, 'description': doc.descriptions,
                'canonical': doc.canonicals, 'schema_types': schema_types,
                'body_word_count': body_words,
                'body_sha256': hashlib.sha256(doc.body_text.encode('utf-8')).hexdigest(),
                'errors': errors, 'pass': not errors})
    return row


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--origin', default='https://www.olmondconsulting.com')
    parser.add_argument('--output', default='docs/geo-http-verification.json')
    parser.add_argument('--compare-build', action='store_true', help='Require metadata, body text and JSON-LD to match dist/')
    args = parser.parse_args()
    origin = args.origin.rstrip('/')
    agents = ['OAI-SearchBot', 'ChatGPT-User', 'Googlebot', 'bingbot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot']
    sitemap_row, sitemap = fetch(origin + '/sitemap.xml', agents[0])
    robots_row, robots = fetch(origin + '/robots.txt', agents[0])
    try:
        if sitemap_row.get('status') != 200:
            raise ValueError('Sitemap could not be retrieved with HTTP 200; inspect transport/HTTP evidence')
        if 'xml' not in sitemap_row.get('headers', {}).get('content-type', ''):
            raise ValueError('Sitemap response is not an XML content type')
        urls = [node.text for node in ET.fromstring(sitemap).findall('{*}url/{*}loc')]
        if not urls or any(not isinstance(url, str) or not url.startswith(origin + '/') for url in urls):
            raise ValueError('Sitemap must contain URLs under the requested origin')
        if len(urls) != len(set(urls)):
            raise ValueError('Sitemap contains duplicate URLs')
    except (ValueError, ET.ParseError) as error:
        # Failure to observe a site is not evidence that its crawlers are blocked.
        report = {'checked_at_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  'origin': origin, 'pass': None, 'assessment': 'NOT_COMPLETED',
                  'compare_build': args.compare_build, 'sitemap': sitemap_row,
                  'robots': robots_row, 'pages': [], 'errors': [str(error)],
                  'limits': 'No page audit was completed. Inspect the recorded HTTP/transport error; do not infer crawler blocking or indexation.'}
        output = Path(args.output)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(json.dumps({'pass': None, 'assessment': 'NOT_COMPLETED', 'output': str(output)}, ensure_ascii=False))
        return 2
    robot_parser = urllib.robotparser.RobotFileParser()
    robot_parser.parse(robots.splitlines())
    allowed = {agent: all(robot_parser.can_fetch(agent, url) for url in urls) for agent in agents}
    expected = {}
    if args.compare_build:
        for url in urls:
            route = url.removeprefix(origin)
            file = Path('dist/index.html' if route == '/' else 'dist' + route)
            if file.is_dir():
                file = file / 'index.html'
            doc = Document()
            doc.feed(file.read_text())
            expected[url] = doc
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        pages = list(pool.map(inspect_page, [(url, agent, expected.get(url)) for agent in agents for url in urls]))
    config = json.loads(Path('vercel.json').read_text())
    aliases = []
    for rule in config['redirects']:
        row, _ = fetch(origin + rule['source'], agents[0])
        row['expected_url'] = origin + rule['destination']
        row['pass'] = (row.get('status') == 200 and row.get('final_url') == row['expected_url']
                       and bool(row.get('redirects')) and row['redirects'][0]['status'] in (301, 308))
        aliases.append(row)
    negative, _ = fetch(origin + '/ruta-inexistente-audit-20261101', agents[0])
    apex, _ = fetch('https://olmondconsulting.com/', agents[0])
    slash_checks = []
    for path in ['/diagnostico', '/academy', '/propuesta-de-workshop']:
        row, _ = fetch(origin + path + '/', agents[0])
        row['pass'] = row.get('status') == 200 and row.get('final_url') == origin + path
        slash_checks.append(row)
    resource_checks = []
    for path in ['/llms.txt', '/logo.png', '/geo/olmond.css', '/geo/eventos.js']:
        row, _ = fetch(origin + path, agents[0])
        resource_checks.append(row)
    heads = [fetch(url, agents[0], 'HEAD')[0] for url in urls]
    passed = (all(p['pass'] for p in pages) and all(p['pass'] for p in aliases)
              and all(allowed.values()) and negative.get('status') == 404
              and all(p['pass'] for p in slash_checks)
              and all(p.get('status') == 200 for p in resource_checks + heads)
              and sitemap_row.get('status') == 200 and robots_row.get('status') == 200
              and 'text/plain' in robots_row.get('headers', {}).get('content-type', '')
              and 'xml' in sitemap_row.get('headers', {}).get('content-type', '')
              and apex.get('final_url') == origin + '/' and bool(apex.get('redirects')))
    report = {'checked_at_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(),
              'origin': origin, 'pass': passed, 'compare_build': args.compare_build,
              'sitemap': sitemap_row, 'robots': robots_row,
              'robots_allowed': allowed, 'pages': pages, 'aliases': aliases,
              'missing_route': negative, 'apex': apex, 'trailing_slashes': slash_checks,
              'resources': resource_checks, 'head_requests': heads,
              'limits': 'HTTP checks use declared User-Agent strings, not authenticated bot IPs. No indexation or AI citation claim.'}
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    Path(args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'pass': passed, 'page_checks': len(pages),
                      'page_failures': [p for p in pages if not p['pass']],
                      'aliases_passed': sum(p['pass'] for p in aliases), 'output': args.output}, ensure_ascii=False))
    return 0 if passed else 1


if __name__ == '__main__':
    raise SystemExit(main())
