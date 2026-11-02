# Olmond Consulting — revisión punto por punto de SEO y GEO

**Estado: correcciones implementadas y verificadas localmente; publicación bloqueada por acceso.**

Se revisaron el informe pegado de Perplexity, el archivo de Claude y el sitio existente. No se creó otro sitio ni proyecto de Vercel. Base verificada: `nancycrojas/olmond`, rama de producción **master**, commit `40a22aadf927038d41e5a8c5ca2fb1d8c9d7d9e6`. Rama de corrección local: `fix/geo-audit-completion`.

Los cambios funcionales están en `60e16d6` y `333fd50`. El parche entregado incluye también este informe y los archivos de evidencia. **“Corregido localmente” no significa “publicado”.**

## 1. Qué quedó comprobado en producción

Prueba HTTP completada en `2026-11-02T03:03:49Z` (registro técnico UTC):

- **84/84 comprobaciones de páginas correctas**: 12 URLs × 7 identificaciones de rastreador. Se probaron OAI-SearchBot, ChatGPT-User, Googlebot, bingbot, Claude-SearchBot, Claude-User y PerplexityBot.
- En las 12 páginas: HTTP 200, contenido HTML, un título, una meta description, un H1, canonical propio y JSON-LD parseable. No se detectaron noindex, nosnippet ni restricciones equivalentes en las cabeceras y metadatos comprobados.
- **12/12 solicitudes HEAD correctas** con OAI-SearchBot.
- `robots.txt`: HTTP 200, `text/plain`, política `User-agent: * / Allow: /`, sitemap absoluto. Las siete identificaciones están permitidas.
- `sitemap.xml`: HTTP 200, XML y 12 URLs del dominio canónico.
- Una ruta deliberadamente inexistente: **404**.
- Dominio sin www: **308 hacia https://www.olmondconsulting.com/**.
- Logo, CSS y script de las páginas GEO: HTTP 200.
- La variante con barra final de diagnóstico, Academy y workshop aún devuelve 200 separado, con canonical sin barra. La normalización está incluida en el parche.
- `llms.txt`: 404 actual; archivo preparado en el parche.

La matriz verifica respuestas a nombres de agente. No prueba por sí sola el acceso desde las IP reales de todos los proveedores, ni indexación ni aparición en respuestas. La prueba independiente de Google sí confirma el rastreo exitoso de la guía ensayada por su herramienta para smartphones.

## 2. Perplexity: los doce hallazgos, uno por uno

| ID | Resultado de la revisión | Acción y estado |
|---|---|---|
| T-01 | Robots y sitemap existen y responden 200. El fallo de recuperación de Perplexity no demuestra un bloqueo del sitio. | **Resuelto en producción y verificado.** Se conserva la política abierta actual. |
| T-02 | Las 12 páginas entregan contenido sin ejecutar JavaScript. El repositorio ya genera el HTML durante el build. | **Resuelto en producción.** Prerender conservado y verificador reforzado. |
| T-03 | Las páginas de los servicios existen bajo `/servicios/*.html`; los nombres cortos propuestos no eran sus URLs. | **Contenido publicado.** Ocho alias permanentes preparados hacia las URLs canónicas, sin duplicar páginas. Falta publicar los alias. |
| T-04 | Organization, Person, WebSite, logo y areaServed están presentes en la portada. El logo responde 200. | **Base verificada.** Se mantiene Organization; no se inventan una dirección completa ni un establecimiento físico para forzar ProfessionalService. Person.sameAs se completa localmente. |
| T-05 | El perfil ya existe en `/equipo/patricio-rouan.html`. | **Corregido localmente:** LinkedIn en sameAs y enlace visible, referencias de UTN/UCEMA, mainEntity y BreadcrumbList. Alias `/patricio-rouan` preparado. |
| T-06 | El título actual ya no es únicamente “Olmond Consulting”. | **Mejora local:** `Olmond Consulting | Consultoría IA en Argentina y Latinoamérica`. Se conserva el H1 comercial y el diseño de la portada aprobada. |
| T-07 | La página de automatización ya contiene agentes, chatbots, integración con WhatsApp, pruebas y entrega. | **Resuelto en producción.** Contenido de servicio y enlaces conservados; descripción añadida a Service en el parche. |
| T-08 | La página de n8n ya incluye implementación, revisión, capacitación, operación y presupuesto. | **Resuelto en producción.** Alias corto preparado; no se crea una segunda página. |
| T-09 | La página de capacitación y la propuesta de workshop están publicadas y enlazadas. | **Resuelto en producción.** Alias `/workshops` preparado; la propuesta comercial específica conserva su contenido. |
| T-10 | Existen las tres guías, con autoría editorial de Olmond, fecha, método y CTA. | **Publicado.** Corrección local de hora y zona horaria con evidencia de Git; descripción, idioma y publisher de Article completados. No se atribuye una revisión personal de Patricio que no ocurrió. |
| T-11 | Hay una medición real W44 en Supabase, pero es previa al despliegue y solo cubre dos motores y 30 preguntas. | **Diagnóstico y cálculo completados.** Quedan pendientes el arreglo del workflow, su programación, la nueva corrida y Search Console. Panel complementario de 38 consultas preparado, no activado. |
| T-12 | No existe llms.txt en producción. Es un complemento opcional. | **Creado y probado localmente**, con las 12 URLs canónicas y datos reales. Pendiente publicar. |

## 3. Claude: pendientes y comprobaciones adicionales

| Punto | Resultado / corrección |
|---|---|
| Arquitectura de URLs | Se conserva la arquitectura publicada; los ocho alias nuevos cubren los nombres de los informes. No se considera que una página falte solo porque tiene otro slug. |
| Menú de páginas estáticas | Unificado a Servicios, Nosotros y Diagnóstico, con los mismos destinos principales de la home. |
| Logo y anclas del header/footer | Logo a `/`; anclas a `/#que-hacemos`, `/#nosotros` y `/#como-trabajamos`. Se comprobaron los IDs de destino. |
| Tratamiento del diagnóstico | Textos visibles pasados a “usted”. Se añade displayLabel para conservar intactos los nombres que procesa n8n. |
| Contrato del formulario | Comparación determinística contra 40a22aa: las 15 claves, opciones, obligatoriedad y endpoint permanecen iguales. No se envió un formulario real ni un correo de prueba. |
| H1 de la home | Conservado por la instrucción previa de mantener el contenido y diseño aprobados. El voseo no es un fallo técnico SEO; una modificación global del tono sería una decisión editorial distinta. |
| Contadores de Academy | Eliminados dos contadores que se reiniciaban sin fecha real. La franja superior conserva su estilo con una descripción de formación. |
| Promesa 20–50 % | Eliminada del H1, método y FAQ. Se explica cómo medir el resultado de cada tarea, sin garantizar un porcentaje. |
| Descuento 96 % | Error adicional corregido: USD 580 → USD 390 implica USD 190 / USD 580 = 32,7586 %, redondeado a **32,8 %**. Precio conservado. |
| Estadística del diagnóstico | Retirado el “80 % de las pymes” del mensaje de éxito, sin respaldo disponible. El mensaje distingue recepción de respuestas de entrega del correo. |
| Metodología del diagnóstico | Sustituidas afirmaciones de validación y alineación internacional sin referencias por una descripción verificable de lo que evalúa y sus límites. |
| sameAs personal | Añadido a todos los bloques Person de las páginas GEO y de la portada; se usa el perfil profesional comprobado de LinkedIn. No se mezclan los perfiles personales con sameAs de la organización. |
| Entrenamiento y búsqueda | Se mantiene el robots abierto existente. No se introdujo una nueva preferencia de bloqueo. Google-Extended también afecta grounding en Gemini/Vertex, por lo que no debe describirse solo como entrenamiento. |
| HTTP y JSON-LD productivos | Ahora comprobados con solicitudes directas. Ya no dependen exclusivamente de una herramienta que elimina scripts. |
| Dominio sin www | Redirección 308 comprobada. |
| Respuestas antiguas / caché | La ejecución actual encontró contenido en las 84 comprobaciones; no se reprodujo la portada vacía. Esto no identifica retrospectivamente cuál caché causó las observaciones anteriores. |
| Barra final | canonical actual correcto; normalización global a URL sin barra preparada en Vercel. Debe comprobarse después de publicar. |
| Rama de producción | Es master, no main. Se partió del commit publicado 40a22aa. |

## 4. Validación externa de Google

Se ejecutó Rich Results Test sobre la guía publicada:

https://search.google.com/test/rich-results/result?id=bf1vE1CFWPs1tvBek5AFqA

Resultado: **3 elementos válidos**, sin errores críticos: Article, BreadcrumbList y Organization. Google informa rastreo correcto con su herramienta para smartphones. Esto no significa que la URL esté indexada ni que vaya a mostrar resultados enriquecidos.

Advertencias observadas y tratamiento:

- Article: falta image (opcional). Se deja pendiente una imagen editorial apropiada; no se utiliza el logo como sustituto arbitrario de una imagen del artículo.
- Article: dateModified solo tenía fecha, sin hora ni zona. Se corrige localmente con las fechas de los commits reales de edición: guía de inicio `2026-11-01T21:41:39-03:00`; costos `2026-11-01T21:44:19-03:00`; tareas repetitivas `2026-11-01T21:38:28-03:00`. El atributo del elemento time visible coincide.
- Organization: faltan streetAddress y postalCode (opcionales). No se inventan ni se publica una dirección privada para eliminar advertencias. El elemento es válido.

La prueba externa corresponde a la versión publicada; los cambios nuevos deben volver a validarse tras el despliegue. No se extrapola una prueba de una guía a la validación externa de todas las páginas.

## 5. Monitor GEO: cifras verificadas, sin mezclar denominadores

Fuente: consultas de solo lectura a `public.geo_runs` y `public.geo_prompts` de Olmond Control. Lote `2026-W44`, excluyendo lotes de prueba y descartados. Registro de las filas: `2026-11-01T23:15:52.707542Z`. Esta medición ocurrió antes del despliegue 40a22aa.

| Motor | Segmento | Intentos | Válidas | Errores | Menciones | Menciones / válidas |
|---|---|---:|---:|---:|---:|---:|
| ChatGPT, modelo registrado gpt-5.5 | Marca y persona | 15 | 15 | 0 | 14 | 93,33 % |
| ChatGPT, modelo registrado gpt-5.5 | Sin marca | 75 | 34 | 41 | 0 | 0 % |
| Gemini, modelo registrado gemini-3.5-flash | Marca y persona | 15 | 15 | 0 | 13 | 86,67 % |
| Gemini, modelo registrado gemini-3.5-flash | Sin marca | 75 | 75 | 0 | 0 | 0 % |

Los valores de modelo son los guardados por el monitor; no son una auditoría independiente de las API ni equivalen automáticamente a la experiencia de sus aplicaciones de consumo.

- Marca/persona: 27/30 = 90 %.
- Sin marca: 0/109 respuestas válidas; 41 fallos adicionales. ChatGPT no tiene respuestas válidas para 9 de las 25 preguntas sin marca.
- Error guardado en las 41 filas: “The service is receiving too many requests from you”. Compatible con límite de solicitudes. La base no conserva en ese campo el código detallado del proveedor ni Retry-After; no permite descartar cuota u otra causa sin revisar las ejecuciones de n8n.
- Búsquedas registradas: ChatGPT 160, Gemini 250. El monitor sí registra búsqueda web.
- El 27/139 agregado mezcla intenciones y no mide recomendación espontánea.
- No se encontró una medición posterior al despliegue entre los lotes consultados.

**Decisión preparada:** conservar las 30 preguntas históricas y agregar las 38 como panel complementario versionado. No hace falta sacrificar la comparación W44 para ampliar cobertura. `geo-monitor-38-supplement.json` contiene las consultas y reglas de medición; su estado es PREPARADO_NO_ACTIVADO. La base no fue modificada.

**Pendiente de acceso al workflow:** revisar el error original, limitar concurrencia, respetar Retry-After, aplicar reintentos acotados con backoff y registrar intentos/errores. Si el código real fuese insufficient_quota, no insistir con reintentos. Confirmar cron, ejecutar una muestra y luego la corrida completa; no enviar reportes por correo sin la autorización correspondiente.

## 6. Señales externas y medición pendiente

- LinkedIn del fundador y de la empresa fueron consultados. La empresa enlaza al dominio correcto; su descripción aún enfatiza RPA, Data Analytics y chatbots. La actualización de esos perfiles no forma parte de un cambio de código del sitio.
- UTN incluye a Patricio Rouan en el equipo docente del curso de IA aplicada. El campus UCEMA incluye a Patricio Alfredo Rouan en su listado docente; la denominación precisa “tutor de posgrado” proviene del rol confirmado por el usuario, no de una inferencia de ese listado.
- SAIA muestra “Líder de Comunidad”, mientras el sitio y el rol confirmado por Patricio dicen “Asesor Principal”. La discrepancia externa permanece abierta. No se cambió el rol por inferencia ni se envió una solicitud a terceros.
- Se conserva la franja OpenAI Partner Network aprobada. No se añadieron afirmaciones de exclusividad, certificación de empresa ni aval de OpenAI a los servicios.
- Search Console: la documentación actual sí contempla Settings > Search generative AI y una elección de inclusión, exclusión o herencia. El valor de la propiedad de Olmond no pudo inspeccionarse. No se afirma que se habilitó ni que se envió el sitemap.
- No hay una conexión disponible de Search Console, Bing Webmaster ni Google Business Profile en los conectores inspeccionados. El navegador de la cuenta no responde. La elegibilidad, reseñas y configuración del perfil de Google siguen sin verificar.
- PageSpeed API respondió 429. **Core Web Vitals no medidos** en este turno. El build avisa de un bundle principal de aproximadamente 798 kB (255 kB gzip); es un indicador para investigar, no una puntuación CWV.
- Revisión visual de los cambios nuevos en desktop/mobile: pendiente. El navegador disponible puede ver producción, pero no el servidor local; el navegador conectado no se inicializa y no se pudo publicar un preview. No se declara validación visual del parche.

## 7. Pruebas realizadas sobre las correcciones

- Build Vite cliente + SSR + prerender: correcto.
- Verificador GEO: correcto para las 12 URLs; metadatos únicos, H1 único, canonical, JSON-LD, identidad Person, enlaces y fragmentos, texto del diagnóstico, ausencia de contadores/promesas eliminadas, alias y llms.txt.
- ESLint de todos los JSX/JS modificados: 0 errores y 0 advertencias.
- Pruebas existentes de tarjetas sociales: 14/14 correctas.
- Contrato del diagnóstico comparado con 40a22aa: 15 campos sin cambios de claves/valores/opciones/obligatoriedad; endpoint idéntico.
- Sintaxis del auditor HTTP de Python: correcta.
- git diff --check: correcto.
- Hero, Home y OpenAIPartnerNetwork: sin cambios respecto de la base. Tampoco se modificaron precios ni el funcionamiento de los formularios.

El auditor HTTP entregado permite comprobar después del despliegue que los metadatos y JSON-LD publicados coinciden con el build local, además de verificar alias, recursos y redirecciones. El resultado global de la ejecución previa es false porque los alias nuevos, llms.txt y la normalización aún no están publicados; **no contradice las 84/84 páginas correctas**.

## 8. Publicación: bloqueo y continuación exacta

Bloqueos observados:

1. GitHub create_branch: HTTP 403, “Resource not accessible by integration”.
2. git push: no existe una credencial de escritura disponible.
3. Vercel: HTTP 403 para el equipo nancycrojas-projects.
4. Navegador conectado: dos intentos de inicialización terminaron por timeout.

**No se creó una rama remota, PR ni despliegue de estas correcciones.** No se solicitó otro proyecto ni se alteraron permisos.

Continuación con acceso de escritura restablecido:

1. Recuperar la rama local o aplicar el parche a un checkout actualizado de master. Verificar cambios concurrentes; no forzar ni reemplazar la rama de producción.
2. Ejecutar build, test:geo, lint de archivos modificados y las pruebas existentes.
3. Subir fix/geo-audit-completion y abrir PR hacia master del mismo repositorio.
4. Verificar preview desktop y mobile: portada, enlaces, diagnóstico, Academy, una página de servicio y una guía. Comprobar valores y mensajes del formulario sin enviar datos reales.
5. Integrar con el despliegue del proyecto Olmond existente.
6. Ejecutar `python scripts/audit-geo-http.py --compare-build --output docs/geo-http-after.json` y comprobar PASS. Volver a ejecutar Rich Results Test.
7. Verificar Search Console/Bing y el workflow del monitor desde las cuentas correspondientes. Guardar la primera medición posterior con evidencia y errores separados.

## 9. Cobertura de las 38 consultas

Para consultas con destino propio, la URL objetivo está publicada y fue comprobada en HTML. Esto es cobertura técnica/editorial; no demuestra ranking ni menciones. Las tres variantes de marca solo se miden, sin agregarlas a los textos o al schema. El cluster I requiere tanto contenido propio como señales externas; “EXTERNO” en la matriz original no significa que el sitio sea irrelevante para esas consultas.

| # | Consulta | Cluster | Destino canónico | Estado |
|---|---|---|---|---|
| 1 | Olmond | A | `/` | Publicado y HTTP verificado |
| 2 | Olmond Consulting | A | `/` | Publicado y HTTP verificado |
| 3 | Olmond consultora IA | A | `/` | Publicado y HTTP verificado |
| 4 | Olmond Academy | A | `/academy` | Publicado y HTTP verificado |
| 5 | Olmon consulting | A | `/` | Publicado; solo medición de variante |
| 6 | Almond consulting IA | A | `/` | Publicado; solo medición de variante |
| 7 | Olmont consultora | A | `/` | Publicado; solo medición de variante |
| 8 | Patricio Rouan | B | `/equipo/patricio-rouan.html` | Publicado y HTTP verificado |
| 9 | Patricio Rouan IA | B | `/equipo/patricio-rouan.html` | Publicado y HTTP verificado |
| 10 | Patricio Rouan SAIA | B | `/equipo/patricio-rouan.html` | Publicado y HTTP verificado |
| 11 | Patricio Rouan UCEMA | B | `/equipo/patricio-rouan.html` | Publicado y HTTP verificado |
| 12 | Patricio Rouan UTN | B | `/equipo/patricio-rouan.html` | Publicado y HTTP verificado |
| 13 | consultoría IA pymes Argentina | C | `/servicios/consultoria-ia-pymes.html` | Publicado y HTTP verificado |
| 14 | consultora inteligencia artificial Buenos Aires | C | `/servicios/consultoria-ia-pymes.html` | Publicado y HTTP verificado |
| 15 | consultoría en inteligencia artificial para empresas | C | `/servicios/consultoria-ia-pymes.html` | Publicado y HTTP verificado |
| 16 | implementar IA en mi empresa | C | `/servicios/consultoria-ia-pymes.html` | Publicado y HTTP verificado |
| 17 | automatización de procesos con IA | D | `/servicios/automatizacion-ia.html` | Publicado y HTTP verificado |
| 18 | automatización con IA para pymes | D | `/servicios/automatizacion-ia.html` | Publicado y HTTP verificado |
| 19 | desarrollo de agentes IA para empresas | D | `/servicios/automatizacion-ia.html` | Publicado y HTTP verificado |
| 20 | agencia de automatización Argentina | D | `/servicios/automatizacion-ia.html` | Publicado y HTTP verificado |
| 21 | integrar ChatGPT con WhatsApp | D | `/servicios/automatizacion-ia.html` | Publicado y HTTP verificado |
| 22 | chatbot con IA para pymes | D | `/servicios/automatizacion-ia.html` | Publicado y HTTP verificado |
| 23 | consultor n8n Argentina | E | `/servicios/automatizacion-n8n.html` | Publicado y HTTP verificado |
| 24 | experto n8n Buenos Aires | E | `/servicios/automatizacion-n8n.html` | Publicado y HTTP verificado |
| 25 | automatizar con n8n | E | `/servicios/automatizacion-n8n.html` | Publicado y HTTP verificado |
| 26 | capacitación IA para empresas | F | `/servicios/capacitacion-ia-empresas.html` | Publicado y HTTP verificado |
| 27 | workshop IA para equipos | F | `/servicios/capacitacion-ia-empresas.html` | Publicado y HTTP verificado |
| 28 | curso IA in company Buenos Aires | F | `/servicios/capacitacion-ia-empresas.html` | Publicado y HTTP verificado |
| 29 | capacitación ChatGPT empresas | F | `/servicios/capacitacion-ia-empresas.html` | Publicado y HTTP verificado |
| 30 | formación en IA para empleados | F | `/servicios/capacitacion-ia-empresas.html` | Publicado y HTTP verificado |
| 31 | diagnóstico de IA para empresas | G | `/diagnostico` | Publicado y HTTP verificado |
| 32 | cómo usar IA en mi pyme | H | `/guias/como-empezar-con-ia.html` | Publicado y HTTP verificado |
| 33 | por dónde empezar con IA en mi empresa | H | `/guias/como-empezar-con-ia.html` | Publicado y HTTP verificado |
| 34 | cuánto cuesta implementar IA en una pyme | H | `/guias/cuanto-cuesta-implementar-ia.html` | Publicado y HTTP verificado |
| 35 | cómo automatizar tareas repetitivas | H | `/guias/automatizar-tareas-repetitivas.html` | Publicado y HTTP verificado |
| 36 | partner OpenAI Argentina | I | `EXTERNO` | Señales externas pendientes |
| 37 | consultora IA cerca de mí | I | `EXTERNO` | Señales externas pendientes |
| 38 | qué consultora de IA para pymes me recomendás en Argentina | I | `EXTERNO` | Señales externas pendientes |

## 10. Referencias y evidencia

- Guía oficial de Google para IA en búsqueda: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Control Search generative AI: https://support.google.com/webmasters/answer/16908024?hl=en
- Google-Extended: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended
- LinkedIn del fundador: https://www.linkedin.com/in/patricio-rouan/
- LinkedIn de Olmond: https://www.linkedin.com/company/olmond-consulting
- UTN: https://sceu.frba.utn.edu.ar/e-learning/detalle/curso/35141/curso-de-inteligencia-artificial-aplicada?id=185443
- UCEMA: https://campus.ucema.edu.ar/course/index.php?categoryid=49
- SAIA: https://saia.ar/sobre-saia
- Evidencia HTTP completa: `geo-production-audit-before-fixes.json`.
- Insumo complementario del monitor: `geo-monitor-38-supplement.json`.
- Parche de las correcciones: `olmond-geo-audit-completion.patch`.

**Criterio de cierre:** esta revisión técnica no se considera terminada en producción hasta publicar el parche y superar las pruebas posteriores. El posicionamiento y la aparición en IA se evalúan con mediciones posteriores; no se prometen a partir de un build o un sitemap.
