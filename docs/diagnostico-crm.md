# Diagnóstico web y CRM

Estado al 20/10/2026: corrección preparada para revisión; sin activación en n8n ni despliegue del sitio. CANARY READY: NO.

## Comportamiento

El formulario conserva las etiquetas existentes y agrega una referencia UUID por envío, el origen y consentimiento comercial opcional. El consentimiento empieza desmarcado. La confirmación exige recibos de CRM y Gmail correspondientes al mismo envío. Una aceptación HTTP sin esos recibos queda pendiente y no habilita reenvío automático ni un segundo envío desde esa pantalla.

La referencia pendiente vive en la pantalla actual. Recargar abre un formulario nuevo; la tabla existente no impone unicidad sobre `submission_id`. No se garantiza idempotencia durable. Ante una respuesta incierta, reconciliar la ejecución, la fila y el mensaje antes de repetir.

El parche de n8n conserva todas las respuestas exactas en el campo `notas` del CRM, junto con referencia, origen, fecha y consentimiento. No necesita columnas nuevas. Sin opt-in registra `estado=sin_consentimiento`; con opt-in conserva `estado=nuevo`. Antes de habilitar campañas hay que comprobar que los workflows de seguimiento respeten el consentimiento.

`email_status=sent` acredita aceptación por Gmail; la entrega requiere verificar el buzón receptor. La alerta comercial interna se procesa después de confirmar la operación principal.

## Aplicación

El transformador y sus instrucciones están en `scripts/n8n-diagnostico/README.md`. Requiere un export actual compatible de WF-A. Valida nodos, mapeos, formulario y scoring; si detecta diferencias aborta. No se debe usar el export histórico como reemplazo de producción.

1. Exportar el workflow actual y guardarlo fuera de Git, sin exportar credenciales.
2. Generar e importar un borrador inactivo mediante el transformador; revisar sus credenciales existentes.
3. Probar el borrador con datos sintéticos y una casilla propia. Leer la fila por referencia y verificar el correo recibido.
4. Auditar los filtros de seguimiento y consentimiento antes de habilitar marketing.
5. Aplicar primero la corrección del backend al endpoint productivo, conservando respaldo y posibilidad de volver a la versión anterior. Recién después desplegar el formulario.

No desplegar primero este formulario contra el backend antiguo: su respuesta `{"ok":true}` no cumple el contrato y dejaría los envíos pendientes.

## Verificación

```powershell
corepack yarn test:diagnostico
$env:DIAGNOSTICO_SOURCE_EXPORT = 'C:\ruta\privada\WF-A.actual.json'
corepack yarn test:diagnostico:n8n
node node_modules/eslint/bin/eslint.js src/lib/diagnosis-submission.js src/components/diagnosis/FormularioScorecard.jsx --max-warnings 0
corepack yarn lint
corepack yarn build --outDir ../build-diagnostico
```

La suite n8n requiere el export privado y ejecuta código real de los nodos en una VM; no consulta producción ni envía correos. No versionar exports de entrada, credenciales ni registros de clientes.

## Evidencia de la revisión inicial

La única prueba real realizada el 20/10/2026 a las 06:05 de Buenos Aires devolvió HTTP 200 con `{"ok":true}` y CORS correcto. No confirmó guardado ni correo. Las búsquedas posteriores en las cuentas conectadas no encontraron el mensaje de prueba. No se verificó el CRM porque no había sesión administrativa de n8n ni credencial API disponible; el navegador también quedó sin conexión. Esto no permite declarar el circuito operativo.

El lint general original presenta cuatro directivas `eslint-disable` sin uso en `MethodSection.jsx`, `AiAgents.jsx`, `DataAnalytics.jsx` y `Rpa.jsx`; no forman parte de esta corrección.
