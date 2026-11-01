import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const origin = 'https://www.olmondconsulting.com';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, 12);
const routes = new Set(urls.map(url => new URL(url).pathname));
for (const url of urls) {
  const route = new URL(url).pathname;
  const file = route === '/' ? 'dist/index.html' : ['/diagnostico', '/academy', '/propuesta-de-workshop'].includes(route) ? `dist${route}/index.html` : `dist${route}`;
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<title>/g) || []).length, 1, file);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, file);
  assert(html.includes(`href="${url}"`), `canonical: ${file}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `h1: ${file}`);
  assert(!/noindex/i.test(html), file);
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"\s]*"/g)) {
    const path = m[1];
    if (routes.has(path) || path === '/academy' || path.startsWith('/propuesta-')) continue;
    await access(`dist${path}`);
  }
}
const home = await readFile('dist/index.html', 'utf8');
assert(home.includes('Latinoamérica hispanohablante'));
assert(home.includes('/guias/como-empezar-con-ia.html'));
const diagnostic = await readFile('dist/diagnostico/index.html', 'utf8');
assert(diagnostic.includes("Ver mi diagnóstico") && diagnostic.includes("<select") && diagnostic.includes("<input"), "Existing diagnosis controls must be in HTML source");
const shell = await readFile('dist/spa.html', 'utf8');
assert(!shell.includes('rel="canonical"'), 'SPA shell must not inherit home metadata');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
assert(!config.rewrites.some(rule => rule.source.includes('(.*)')), 'No catch-all 200 fallback');
assert((await readFile('dist/robots.txt', 'utf8')).includes(`${origin}/sitemap.xml`));
console.log('GEO PASS: 12 URLs, source metadata, H1, JSON-LD, internal links, diagnosis form and routing.');
