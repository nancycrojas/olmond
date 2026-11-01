import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
await writeFile('dist/spa.html', template);
for (const [route, headFile] of [['/', 'head.html'], ['/diagnostico', 'diagnostico-head.html'], ['/academy', 'academy-head.html'], ['/propuesta-de-workshop', 'workshop-head.html']]) {
  const head = await readFile(`scripts/geo-source/${headFile}`, 'utf8');
  const body = await render(route);
  const html = template.replace(/<title>[\s\S]*?<\/title>/, head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const target = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  if (route !== '/') await mkdir(`dist${route}`,  { recursive: true });
  await writeFile(target, html);
}
// Keep the same route on client-side navigation: full documents carry route-specific metadata.
console.log('GEO: portada, diagnóstico, Academy y workshop prerenderizados; shell independiente para las demás rutas SPA.');
