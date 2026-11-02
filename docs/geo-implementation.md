> Actualización 2026-11-01: consultar `geo-audit-2026-11-01.md` y `geo-verification.json` para el estado vigente. El registro de 11 páginas y los pendientes de Yarn que siguen son históricos; ahora hay 12 páginas y build validado con lockfile. Publicación y revisión visual siguen pendientes.

# GEO Olmond — integración 2026-11-01

Base: `d114b2f8d252c126c5c0f754968e83c1f6d0b6e4`, rama local `feat/geo-latam`.
Fuente: carpeta de Drive Olmond-GEO facilitada por el propietario. El dominio coincide con `DIAGNOSTICO_URL` del código; la asociación del dominio en Vercel no se pudo verificar por falta de acceso al equipo.

## Cambios

- Nueve páginas estáticas completas (seis servicios, dos guías y trayectoria de Patricio), CSS alineado con la paleta oscura del sitio y eventos locales sin envío de datos.
- Robots y sitemap de 11 URLs. Se conserva la extensión `.html`: no se activa `cleanUrls`.
- Portada: H1 e introducción regional, enlaces HTML normales a las páginas y enlace desde la biografía. Roles institucionales personales, sin avales agregados.
- Portada y diagnóstico se prerenderizan con React/Chakra durante `build`. Se conserva el arranque cliente existente con `createRoot`; no se introduce hidratación ni backend nuevo. Los scripts de generación quedan fuera del directorio público.
- Metadatos específicos por ruta en el HTML original y actualización al navegar con React. Las otras rutas reciben un shell independiente sin canonical de portada.
- Rewrites limitados a las rutas SPA existentes; diagnóstico apunta a su documento generado. Sin catch-all que convierta rutas desconocidas en HTTP 200. APIs, formularios y autenticación sin modificaciones.
- No se publican Academy nueva, borradores, medición, promesas de ranking, precios ni credenciales nuevas.

## Verificación realizada

- `npm run build`: PASS, frontend y prerenderizado. Advertencias de tamaño del bundle y de `motion()` obsoleto.
- `npm run test:geo`: PASS, 11 documentos con título/canonical/H1, JSON-LD válido, enlaces locales, controles del diagnóstico y shell separado.
- `npm run test:social-card`: 14/14 PASS.
- ESLint de todos los archivos JSX modificados/nuevos: PASS.
- `npm run lint`: FAIL por cuatro directivas eslint-disable sin uso en archivos no modificados: `academy/MethodSection.jsx`, `pages/AiAgents.jsx`, `pages/DataAnalytics.jsx`, `pages/Rpa.jsx`.
- Servidor estático local: las 11 URLs llegan a 200 (el servidor local redirige /diagnostico a /diagnostico/), robots y sitemap responden con MIME apropiado y una ruta inventada responde 404. Esto no prueba los rewrites ni cabeceras de Vercel.
- Instalación local: npm resolvió versiones más recientes; para la compilación se instaló temporalmente `react-icons@5.2.1`, la versión del yarn.lock original. No se modifican dependencias ni lockfile. La instalación completa con Yarn quedó bloqueada en descarga. Revalidar con `yarn install --frozen-lockfile` en CI.

## Pendientes antes de producción

1. Habilitar escritura de la integración GitHub: crear la rama remota fue rechazado con 403 `Resource not accessible by integration`, aunque la cuenta tiene permisos push. No existe PR remoto.
2. Autorizar el equipo Vercel `nancycrojas-projects`: get_project devuelve 403; el intento de autorización anterior devolvió 404. No se publicó preview ni producción.
3. Ejecutar build con Yarn y revisar preview: 11 URLs, HTTP/MIME, canonical de diagnóstico sin redirección, 404 real, rutas SPA previas, APIs y ausencia de noindex en cabeceras.
4. Prueba visual desktop/móvil y navegación cliente. Playwright no encontró Chromium; la descarga del navegador no se completó. No hay evidencia visual.
5. Probar diagnóstico de punta a punta en entorno controlado. Se verifica su HTML y se conserva la lógica, pero no se envió información real al webhook ni se comprobó entrega de correo.
6. Tras validar y publicar, enviar sitemap en Search Console y Bing Webmaster Tools. No se solicitó indexación ni se midió posicionamiento.

## Aplicación y reversión

Aplicar el parche sobre la base indicada en una rama, instalar con Yarn, ejecutar `yarn build`, `yarn test:geo` y `yarn test:social-card`, y abrir PR. El paquete incluye un parche Git y los archivos modificados con sus rutas originales.

Para revertir una vez integrado: `git revert <commit-de-integracion>` y desplegar de nuevo; alternativamente restaurar el deployment previo desde Vercel. La reversión no requiere cambios de base de datos.

## Actualización Argentina y Latinoamérica

Integrado origin/master c282e7b conservando OpenAIPartnerNetwork. Restaurado el texto original de Quién está detrás y conservado el enlace al perfil. Portada, páginas estáticas y metadatos indican Argentina y Latinoamérica hispanohablante. Organization declara Buenos Aires, AR, sin inventar domicilio; Organization y Service declaran areaServed. Build, verificación GEO de 11 URLs y 14 pruebas social-card aprobadas. Publicación pendiente: GitHub create_branch devuelve 403 Resource not accessible by integration. Esta actualización no completa todavía la auditoría ampliada de 38 consultas ni su medición externa.
