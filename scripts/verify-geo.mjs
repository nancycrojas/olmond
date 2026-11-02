import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resourcePages } from '../src/data/resourcePages.js';

const origin = 'https://www.olmondconsulting.com';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, 12);
const routes = new Set(urls.map(url => new URL(url).pathname));
const titles = new Set();
const descriptions = new Set();
const documents = new Map();
for (const url of urls) {
  const route = new URL(url).pathname;
  const file = route === '/' ? 'dist/index.html' : ['/diagnostico', '/academy', '/propuesta-de-workshop'].includes(route) ? `dist${route}/index.html` : `dist${route}`;
  const html = await readFile(file, 'utf8');
  documents.set(route, html);
  assert.equal((html.match(/<title>/g) || []).length, 1, file);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, file);
  assert(html.includes(`href="${url}"`), `canonical: ${file}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `h1: ${file}`);
  assert(!/noindex/i.test(html), file);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title?.trim() && !titles.has(title), `unique nonempty title: ${file}`);
  titles.add(title);
  assert(!/Argentina|Latinoamérica|LATAM/i.test(title), `No geographic targeting in titles: ${file}`);
  for (const [, heading] of html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)) {
    assert(!/Argentina|Latinoamérica|LATAM/i.test(heading), `No geographic targeting in headings: ${file}`);
  }
  const metadata = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)];
  assert.equal(metadata.length, 1, `one description: ${file}`);
  assert(metadata[0][1].trim() && !descriptions.has(metadata[0][1]), `unique description: ${file}`);
  descriptions.add(metadata[0][1]);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert(schemas.length > 0, `JSON-LD required: ${file}`);
  for (const m of schemas) {
    const schema = JSON.parse(m[1]);
    assert.equal(schema['@context'], 'https://schema.org');
    for (const entity of schema['@graph'] || [schema]) {
      assert(entity['@type'], `schema type: ${file}`);
      if (entity['@type'] === 'Person') {
        assert(entity.sameAs?.includes('https://www.linkedin.com/in/patricio-rouan/'), `verified profile: ${file}`);
      }
      if (entity['@type'] === 'Article') {
        assert(/T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(entity.dateModified), `article timestamp with timezone: ${file}`);
        assert(entity.description && entity.publisher, `article context: ${file}`);
      }
    }
  }
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"\s]*"/g)) {
    const path = m[1];
    if (routes.has(path) || path === '/academy' || path.startsWith('/propuesta-')) continue;
    await access(`dist${path}`);
  }
}
for (const [route, html] of documents) {
  for (const [, href] of html.matchAll(/href="([^"]*)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const target = new URL(href, origin + route);
    if (!target.hash || !documents.has(target.pathname)) continue;
    const id = decodeURIComponent(target.hash.slice(1));
    assert(documents.get(target.pathname).includes(`id="${id}"`), `anchor ${href} from ${route}`);
  }
}
const home = await readFile('dist/index.html', 'utf8');
const footerOf = html => html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '')
  .replace(/ class="[^"]*"/g, '');
for (const page of resourcePages) {
  const html = documents.get(page.path);
  assert.equal(footerOf(html), footerOf(home), `Shared home footer: ${page.path}`);
  assert(!/<video\b/.test(html), `No home video on resource: ${page.path}`);
  assert(!/href="(?:https:\/\/www\.olmondconsulting\.com)?\/diagnostico/.test(html), `No diagnostic CTA: ${page.path}`);
  assert(!/href="\/equipo\/patricio-rouan\.html"/.test(html), `No founder link: ${page.path}`);
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  assert(header?.includes(`href="${page.back}"`) && !/<nav\b/.test(header), `Back navigation: ${page.path}`);
  const visible = html.replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]*>/g, '');
  if (page.kind !== 'profile') assert(!/Buenos Aires|Argentina|Latinoamérica|diagnóstico gratuito|Otros recursos/.test(visible), `Resource copy: ${page.path}`);
}
assert(!/href="\/equipo\/patricio-rouan\.html"/.test(home), 'Removed founder link on home');
assert(!home.includes('hispanohablante'));
assert(!home.includes('Olmond Academy'));
assert(home.includes('/guias/como-empezar-con-ia.html'));
assert(home.includes('/guias/cuanto-cuesta-implementar-ia.html'));
assert(home.includes('/guias/automatizar-tareas-repetitivas.html'));
assert(home.includes('/servicios/consultoria-ia-pymes.html'));
assert(!home.includes('recursos-olmond'), 'Home must not render the removed resource section');
const diagnostic = await readFile('dist/diagnostico/index.html', 'utf8');
assert(diagnostic.includes("Ver mi diagnóstico") && diagnostic.includes("<select") && diagnostic.includes("<input"), "Existing diagnosis controls must be in HTML source");
assert(diagnostic.includes('Seleccione una opción') && diagnostic.includes('su pyme'), 'Formal diagnosis copy');
const academy = documents.get('/academy');
const academyText = academy.replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]*>/g, '');
assert(!/OFERTA TERMINA|Solo quedan|20%|50%|96% OFF/.test(academyText), 'No unsupported productivity claims or rolling deadlines');
assert(academy.includes('32,8% OFF') && academy.includes('390'), 'Academy price and discount consistency');
const person = documents.get('/equipo/patricio-rouan.html');
assert(person.includes('BreadcrumbList') && person.includes('Perfil profesional de Patricio Rouan'), 'Profile sources and breadcrumbs');
const shell = await readFile('dist/spa.html', 'utf8');
assert(!shell.includes('rel="canonical"'), 'SPA shell must not inherit home metadata');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
assert(!config.rewrites.some(rule => rule.source.includes('(.*)')), 'No catch-all 200 fallback');
assert.equal(config.trailingSlash, false);
for (const alias of ['/consultoria', '/desarrollos', '/workshops', '/automatizacion-n8n', '/patricio-rouan']) {
  const redirect = config.redirects.find(rule => rule.source === alias);
  assert(redirect?.permanent && routes.has(redirect.destination), `canonical alias ${alias}`);
}
assert((await readFile('dist/robots.txt', 'utf8')).includes(`${origin}/sitemap.xml`));
const llms = await readFile('dist/llms.txt', 'utf8');
for (const url of urls) assert(llms.includes(url), `llms index: ${url}`);
console.log('GEO PASS: 12 URLs, unique metadata, H1, JSON-LD identity, links and anchors, diagnosis copy, Academy claims, aliases and routing.');
