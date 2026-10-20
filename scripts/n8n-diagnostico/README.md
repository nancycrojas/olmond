# Parche offline del diagnóstico y CRM Olmond

Este módulo transforma un export **actual** de WF-A. No consulta ni modifica n8n, no envía correos y no activa workflows. No incluye exports con datos de clientes ni credenciales. Usa únicamente módulos incluidos en Node.js.

## Entrada y guardas

La entrada debe ser un objeto JSON de workflow obtenido de la instancia actual. Debe conservar los ocho nodos originales, las conexiones revisadas, la tabla `CRM_Leads_Olmond` (`12GkifY2Mv1U4O0E`), sus 17 mapeos y las referencias OAuth2 de Gmail, con nombre e ID no vacíos. El patcher valida huellas SHA256 del código de scoring y del formulario revisados. Rechaza nodos críticos deshabilitados, con `executeOnce`, `continueOnFail` o continuidad ante errores. También rechaza operaciones divergentes: el CRM debe insertar filas y Gmail debe enviar mensajes HTML por OAuth2. Esos parámetros quedan explícitos en el candidato. Los parámetros omitidos solo se admiten cuando equivalen a defaults comprobados en el código oficial de n8n. Si una guarda falla, aborta sin escribir el candidato. No se deben actualizar las huellas sin revisar primero el cambio del export actual.

El código de scoring y el formulario revisados corresponden al export histórico de WF-A de julio de 2026. La suite local comprueba ese contrato; no acredita que la instancia actual mantenga esos nodos o credenciales ni que esté operativa.

No versionar el export de entrada ni ejecuciones, registros del CRM o archivos de autenticación. Las únicas credenciales admitidas en el candidato son referencias existentes por nombre e ID; el patcher rechaza secretos embebidos. Elimina `pinData`, `staticData`, historia, metadatos, permisos compartidos e identificadores de versión del workflow.

## Uso en PowerShell

```powershell
node .\patch-workflow.mjs .\work\WF-A.actual.json .\work\WF-A.draft.json draft
```

El archivo de salida debe ser nuevo: el comando rechaza sobrescrituras. El borrador queda `active: false`, usa `diagnostico-ia-web-crm-draft` y deshabilita el formulario nativo para evitar colisiones con los endpoints originales.

```powershell
node .\patch-workflow.mjs .\work\WF-A.actual.json .\work\WF-A.candidate.json production-candidate
```

El candidato conserva el endpoint original, pero también queda `active: false`. Importar o aplicar un candidato y activarlo es una operación separada. La transformación no cambia las referencias de credenciales ni crea columnas o tablas.

## Contrato de entrada

El POST contiene las 15 etiquetas exactas del formulario, incluidas las preguntas y los campos de contacto. Empresa y facturación son opcionales. Se aceptan además:

- `submission_id`: referencia estable del envío; el sitio utiliza un UUID. Un formulario heredado sin referencia recibe `diagnostico-n8n-<execution.id>`.
- `source`: `https://www.olmondconsulting.com/diagnostico`.
- `consentimiento_marketing`: booleano. Ausente equivale a `false`; un texto como `"true"` se rechaza.

Antes de insertar o enviar, se validan campos requeridos, tipos, longitudes, caracteres de control, email y opciones. Las respuestas exactas, sin normalizar, quedan en `notas` como JSON con versión, referencia, origen, fecha y consentimiento. El score válido conserva su lógica y niveles. El nombre se escapa en el HTML del resultado.

Sin consentimiento, el CRM recibe `estado: "sin_consentimiento"`; solo el opt-in explícito conserva `estado: "nuevo"`. El formulario nativo no contiene opt-in y queda sin consentimiento. **Esto no demuestra que WF-B respete ese estado:** es necesario auditar sus filtros actuales antes de activar cualquier campaña.

## Confirmación

La cadena principal es validación y score → insertar CRM → Gmail → validar recibos → Respond to Webhook. La alerta interna se procesa después de responder y su error no cambia la confirmación principal. No se habilitan reintentos automáticos de Gmail.

La respuesta exitosa contiene:

```json
{
  "ok": true,
  "crm_saved": true,
  "email_status": "sent",
  "submission_id": "referencia-original",
  "crm_row_id": "id-real-de-fila",
  "email_message_id": "id-real-de-gmail"
}
```

El generador de confirmación exige un ID de fila válido, email y referencia coincidentes en las notas guardadas, y un ID de mensaje emitido por Gmail. `sent` significa aceptación por Gmail; no acredita recepción o entrega al destinatario. Si falta un recibo, no devuelve éxito.

`submission_id` permite reconciliar incertidumbres. La tabla actual no impone unicidad sobre esa referencia: este parche **no garantiza idempotencia durable**. Un timeout puede ocurrir después de guardar o enviar; no se debe repetir automáticamente el POST. Los recibos se obtienen de la ejecución y de la respuesta, y este parche no los agrega a las notas después del envío.

## Verificación local

```powershell
$env:DIAGNOSTICO_SOURCE_EXPORT = 'C:\ruta\privada\WF-A.actual.json'
node --test --experimental-test-isolation=none --test-reporter=spec .\patch-workflow.test.mjs
node --check .\patch-workflow.mjs
```

Las pruebas ejecutan los Code nodes transformados en una VM, comparan niveles y las 150 combinaciones de calificación comercial con el código fuente, verifican conservación de respuestas, escape HTML, validación, consentimiento, orden de confirmación y rechazo de recibos faltantes o de contratos modificados. El flag de aislamiento evita el `spawn EPERM` observado en este entorno Windows restringido.

Antes de declarar activo: export actual compatible, importación revisada, ejecución sintética única autorizada, fila real leída por su referencia, ID real de Gmail y verificación del buzón receptor. La auditoría de consentimiento de WF-B continúa pendiente.

## Fuentes oficiales revisadas

- [Respond to Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/): respuesta después de otros nodos y comportamiento ante errores.
- [Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/): modo de respuesta mediante Respond to Webhook.
- [Código oficial de Respond to Webhook](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/RespondToWebhook/RespondToWebhook.node.ts): `responseMode: "responseNode"`, `respondWith: "json"`, `responseBody` y versión 1.4.
- [Data table](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.datatable/): operaciones de filas.
- [Gmail: Message Operations](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/): envío de mensajes mediante credencial configurada.
- [Gmail V2: implementación oficial](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Gmail/v2/GmailV2.node.ts) y [parámetros de mensajes](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Gmail/v2/MessageDescription.ts): defaults OAuth2, recurso mensaje, operación enviar y cuerpo HTML.
- [DataTable: implementación oficial](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/DataTable/DataTable.node.ts) y [operaciones de filas](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/DataTable/actions/row/Row.resource.ts): defaults fila e insertar.
