import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const validationSource = await readFile(new URL('./code/validate-diagnosis.js.txt', import.meta.url), 'utf8');
const receiptSource = await readFile(new URL('./code/prepare-receipt.js.txt', import.meta.url), 'utf8');
const expectedScoreHash = '5d25284dc43527a710e90119b9024e6ea3ce8b3070d53b5f8e4222eb6a8a23fd';
const expectedSchemaHash = '778f31d6f303a315a1e764da9dd1aabcbcd1d7b3f06385057cd488bbed2effdc';
const expectedCrmColumns = ['fecha', 'nombre', 'email', 'empresa', 'rol', 'tamano', 'rubro', 'facturacion', 'puntaje', 'nivel', 'nivel_nombre', 'score_lead', 'freno', 'estado', 'call_agendada', 'ultimo_email', 'notas'];
const criticalNodeNames = ['Webhook Diagnostico Web', 'Mapear Payload Web', 'Calcular Puntaje y Nivel', 'Guardar Lead en CRM', 'Enviar Resultado al Lead'];
const nodeTypes = {
  'Formulario Diagnostico IA': 'n8n-nodes-base.formTrigger',
  'Calcular Puntaje y Nivel': 'n8n-nodes-base.code',
  'Guardar Lead en CRM': 'n8n-nodes-base.dataTable',
  'Enviar Resultado al Lead': 'n8n-nodes-base.gmail',
  'Es Lead Calificado A': 'n8n-nodes-base.if',
  'Alerta Lead Caliente a Pato': 'n8n-nodes-base.gmail',
  'Webhook Diagnostico Web': 'n8n-nodes-base.webhook',
  'Mapear Payload Web': 'n8n-nodes-base.code',
};
const expectedEdges = {
  'Formulario Diagnostico IA': ['Calcular Puntaje y Nivel'],
  'Calcular Puntaje y Nivel': ['Guardar Lead en CRM'],
  'Guardar Lead en CRM': ['Enviar Resultado al Lead'],
  'Enviar Resultado al Lead': ['Es Lead Calificado A'],
  'Es Lead Calificado A': ['Alerta Lead Caliente a Pato'],
  'Alerta Lead Caliente a Pato': [],
  'Webhook Diagnostico Web': ['Mapear Payload Web'],
  'Mapear Payload Web': ['Calcular Puntaje y Nivel'],
};
const expectedLabels = [
  'Nombre y apellido',
  'Tu correo (acá llega tu resultado)',
  'Nombre de tu empresa',
  '1. ¿Cuál es tu rol en la empresa?',
  '2. ¿Cuántas personas trabajan en tu empresa?',
  '3. ¿En qué rubro opera tu empresa?',
  '4. ¿Cuántas horas semanales dedica tu equipo a tareas repetitivas?',
  '5. ¿Cómo gestionan hoy la atención al cliente?',
  '6. ¿Cómo generan los reportes del negocio?',
  '7. ¿Usan herramientas de IA en el día a día?',
  '8. ¿Los datos del negocio están ordenados y accesibles?',
  '9. ¿Qué tan documentados están los procesos principales de la empresa?',
  '10. ¿Hay un responsable de mejorar procesos con tecnología?',
  '11. ¿Facturación mensual aproximada? (opcional: solo la uso para calibrar las recomendaciones, no se comparte)',
  '12. ¿Cuál es tu principal freno para avanzar con IA?',
];
const nodeKeys = [
  'id', 'name', 'type', 'typeVersion', 'position', 'parameters', 'credentials',
  'disabled', 'onError', 'retryOnFail', 'maxTries', 'waitBetweenTries', 'alwaysOutputData',
  'executeOnce', 'webhookId',
];

function stop(message) {
  throw new Error(message);
}

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

function replaceExactlyOnce(text, anchor, replacement) {
  if (typeof text !== 'string' || text.split(anchor).length !== 2) stop('SCORE_ANCHOR_MISMATCH');
  return text.replace(anchor, replacement);
}

function rejectEmbeddedSecrets(value) {
  if (Array.isArray(value)) {
    value.forEach(rejectEmbeddedSecrets);
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      if (/^(authorization|api[_-]?key|client[_-]?secret|access[_-]?token|refresh[_-]?token|password|secret|token)$/i.test(key)) {
        stop('EMBEDDED_SECRET_REJECTED');
      }
      rejectEmbeddedSecrets(nested);
    }
    return;
  }
  if (typeof value === 'string' && (/Bearer\s+[A-Za-z0-9_.-]{12,}/i.test(value) || /\bsk-[A-Za-z0-9_-]{20,}/.test(value))) {
    stop('EMBEDDED_SECRET_REJECTED');
  }
}

function cleanNode(node) {
  const cleaned = Object.fromEntries(nodeKeys.filter((key) => Object.hasOwn(node, key)).map((key) => [key, structuredClone(node[key])]));
  for (const credential of Object.values(cleaned.credentials ?? {})) {
    if (!credential || typeof credential !== 'object' || Array.isArray(credential)
      || Object.keys(credential).some((key) => !['id', 'name'].includes(key))
      || typeof credential.id !== 'string' || !credential.id.trim()
      || typeof credential.name !== 'string' || !credential.name.trim()) {
      stop('CREDENTIAL_REFERENCE_INVALID');
    }
  }
  rejectEmbeddedSecrets(cleaned);
  return cleaned;
}

function guardConnections(connections) {
  if (!connections || typeof connections !== 'object' || Array.isArray(connections)
    || Object.keys(connections).some((name) => !Object.hasOwn(expectedEdges, name))) stop('WORKFLOW_CONNECTIONS_MISMATCH');
  for (const [name, expected] of Object.entries(expectedEdges)) {
    const output = connections[name];
    if (output && Object.keys(output).some((key) => key !== 'main')) stop('WORKFLOW_CONNECTIONS_MISMATCH');
    const branches = output?.main ?? [];
    const actual = branches.flat().map((edge) => {
      if (edge.type !== 'main' || edge.index !== 0) stop('WORKFLOW_CONNECTIONS_MISMATCH');
      return edge.node;
    });
    if (JSON.stringify(actual) !== JSON.stringify(expected)
      || branches.slice(1).some((branch) => branch.length)) stop('WORKFLOW_CONNECTIONS_MISMATCH');
  }
}

function schemaFromForm(formNode) {
  const fields = formNode.parameters.formFields?.values;
  if (!Array.isArray(fields) || JSON.stringify(fields.map((field) => field.fieldLabel)) !== JSON.stringify(expectedLabels)) {
    stop('FORM_SCHEMA_MISMATCH');
  }
  return fields.map((field, index) => {
    const required = ![2, 13].includes(index);
    if (Boolean(field.requiredField) !== required) stop('FORM_SCHEMA_MISMATCH');
    const isDropdown = index >= 3;
    const options = isDropdown ? field.fieldOptions?.values?.map((option) => option.option) : undefined;
    if ((isDropdown && (field.fieldType !== 'dropdown' || !Array.isArray(options) || options.length < 4
      || options.some((option) => typeof option !== 'string' || !option.trim()) || new Set(options).size !== options.length))
      || (index === 1 && field.fieldType !== 'email')) stop('FORM_SCHEMA_MISMATCH');
    return { label: field.fieldLabel, required, type: index === 1 ? 'email' : isDropdown ? 'dropdown' : 'text', maxLength: index === 1 ? 254 : 500, ...(options ? { options } : {}) };
  });
}

function connect(target) {
  return { main: [[{ node: target, type: 'main', index: 0 }]] };
}

export function patchWorkflow(input, { mode = 'draft', expectedTableId = '12GkifY2Mv1U4O0E' } = {}) {
  if (!['draft', 'production-candidate'].includes(mode)) stop('PATCH_MODE_INVALID');
  if (!input || !Array.isArray(input.nodes) || input.nodes.length !== Object.keys(nodeTypes).length
    || new Set(input.nodes.map((node) => node.name)).size !== input.nodes.length
    || input.nodes.some((node) => nodeTypes[node.name] !== node.type)) stop('WORKFLOW_NODES_MISMATCH');
  for (const node of input.nodes.filter((candidate) => criticalNodeNames.includes(candidate.name))) {
    if (node.disabled === true || node.executeOnce === true || node.continueOnFail === true
      || (node.onError !== undefined && node.onError !== 'stopWorkflow')) stop('CRITICAL_NODE_CONFIG_MISMATCH');
  }
  guardConnections(input.connections);
  const nodes = input.nodes.map(cleanNode);
  const named = Object.fromEntries(nodes.map((node) => [node.name, node]));
  const form = named['Formulario Diagnostico IA'];
  const webhook = named['Webhook Diagnostico Web'];
  const mapper = named['Mapear Payload Web'];
  const score = named['Calcular Puntaje y Nivel'];
  const crm = named['Guardar Lead en CRM'];
  const gmail = named['Enviar Resultado al Lead'];
  const alert = named['Alerta Lead Caliente a Pato'];
  const actualTableId = typeof crm.parameters.dataTableId === 'string' ? crm.parameters.dataTableId : crm.parameters.dataTableId?.value;
  if (actualTableId !== expectedTableId) stop('CRM_TABLE_MISMATCH');
  if (crm.parameters.columns?.value?.notas !== '={{ $json.notas }}'
    || crm.parameters.columns.mappingMode !== 'defineBelow'
    || Object.keys(crm.parameters.columns.value).length !== expectedCrmColumns.length
    || expectedCrmColumns.some((column) => crm.parameters.columns.value[column] !== `={{ $json.${column} }}`)
    || (crm.parameters.resource !== undefined && crm.parameters.resource !== 'row')
    || (crm.parameters.operation !== undefined && crm.parameters.operation !== 'insert')) stop('CRM_MAPPING_MISMATCH');
  crm.parameters.resource = 'row';
  crm.parameters.operation = 'insert';
  if (webhook.parameters.path !== 'diagnostico-ia-web' || webhook.parameters.httpMethod !== 'POST') stop('WEBHOOK_CONTRACT_MISMATCH');
  if (score.parameters.mode !== 'runOnceForEachItem' || mapper.parameters.mode !== 'runOnceForEachItem') stop('CODE_MODE_MISMATCH');
  if (!gmail.credentials?.gmailOAuth2 || !alert.credentials?.gmailOAuth2) stop('GMAIL_OAUTH_REFERENCE_REQUIRED');
  for (const sender of [gmail, alert]) {
    if ((sender.parameters.resource !== undefined && sender.parameters.resource !== 'message')
      || (sender.parameters.operation !== undefined && sender.parameters.operation !== 'send')
      || (sender.parameters.emailType !== undefined && sender.parameters.emailType !== 'html')) stop('GMAIL_OPERATION_MISMATCH');
    if (sender.parameters.authentication !== undefined && sender.parameters.authentication !== 'oAuth2') stop('GMAIL_AUTH_MISMATCH');
    sender.parameters.resource = 'message';
    sender.parameters.operation = 'send';
    sender.parameters.emailType = 'html';
    sender.parameters.authentication = 'oAuth2';
  }
  const schema = schemaFromForm(form);
  if (sha256(JSON.stringify(schema)) !== expectedSchemaHash) stop('FORM_SCHEMA_MISMATCH');
  let scoringCode = score.parameters.jsCode;
  if (typeof scoringCode !== 'string' || sha256(scoringCode) !== expectedScoreHash) stop('SCORE_CODE_MISMATCH');
  scoringCode = replaceExactlyOnce(scoringCode, 'const j = $input.item.json;', 'const j = validatedDiagnosticAnswers;');
  scoringCode = replaceExactlyOnce(scoringCode, "const primerNombre = partes[0] ? partes[0] : 'Hola';", "const primerNombre = diagnosticEscapeHtml(partes[0] ? partes[0] : 'Hola');");
  scoringCode = replaceExactlyOnce(scoringCode, "notas: ''", 'notas: diagnosticNotes');
  scoringCode = replaceExactlyOnce(scoringCode, "estado: 'nuevo'", "estado: diagnosticMarketingConsent ? 'nuevo' : 'sin_consentimiento'");
  scoringCode = replaceExactlyOnce(scoringCode, 'return { json: { fecha:', 'return { json: { submission_id: diagnosticSubmissionId, source: diagnosticSource, consentimiento_marketing: diagnosticMarketingConsent, nombre_html: diagnosticEscapeHtml(nombre), empresa_html: diagnosticEscapeHtml(v(\'empresa\')), fecha:');
  score.parameters.jsCode = `const diagnosticFields = ${JSON.stringify(schema)};\n${validationSource}\n${scoringCode}`;
  mapper.parameters.jsCode = [
    'const diagnosticBody = $input.item.json.body;',
    "if (!diagnosticBody || typeof diagnosticBody !== 'object' || Array.isArray(diagnosticBody)) throw new Error('PAYLOAD_INVALIDO');",
    "if (Object.hasOwn(diagnosticBody, '__diagnostico_web')) throw new Error('CAMPO_DESCONOCIDO');",
    'return { json: { ...diagnosticBody, __diagnostico_web: true } };',
  ].join('\n');
  for (const node of [score, mapper, crm, gmail]) {
    node.disabled = false;
    node.executeOnce = false;
    node.onError = 'stopWorkflow';
    node.retryOnFail = false;
    node.alwaysOutputData = false;
  }
  gmail.parameters.sendTo = "={{ $('Calcular Puntaje y Nivel').item.json.email }}";
  gmail.parameters.subject = "={{ $('Calcular Puntaje y Nivel').item.json.email_subject }}";
  gmail.parameters.message = "={{ $('Calcular Puntaje y Nivel').item.json.email_html }}";
  alert.onError = 'continueRegularOutput';
  alert.retryOnFail = false;
  if (typeof alert.parameters.message === 'string') {
    alert.parameters.message = alert.parameters.message
      .replaceAll('.json.nombre }}', '.json.nombre_html }}')
      .replaceAll('.json.empresa }}', '.json.empresa_html }}');
  }
  webhook.parameters.responseMode = 'responseNode';
  webhook.disabled = false;
  webhook.executeOnce = false;
  delete webhook.parameters.options?.responseData;
  delete webhook.parameters.responseData;
  delete webhook.parameters.responseCode;
  if (mode === 'draft') {
    webhook.parameters.path = 'diagnostico-ia-web-crm-draft';
    webhook.webhookId = randomUUID();
    form.disabled = true;
    form.webhookId = randomUUID();
    form.parameters.options = { ...form.parameters.options, path: 'diagnostico-ia-crm-draft' };
  }
  const receiptName = 'Preparar Confirmación Diagnóstico';
  const respondName = 'Confirmar Diagnóstico Guardado y Enviado';
  nodes.push({ id: randomUUID(), name: receiptName, type: 'n8n-nodes-base.code', typeVersion: 2, position: [1360, 272], parameters: { mode: 'runOnceForEachItem', jsCode: receiptSource }, onError: 'stopWorkflow' });
  nodes.push({ id: randomUUID(), name: respondName, type: 'n8n-nodes-base.respondToWebhook', typeVersion: 1.4, position: [1570, 272], parameters: { respondWith: 'json', responseBody: '={{ $json }}', options: { responseCode: 200 } } });
  const connections = structuredClone(input.connections);
  connections['Enviar Resultado al Lead'] = connect(receiptName);
  connections[receiptName] = connect(respondName);
  connections[respondName] = connect('Es Lead Calificado A');
  const candidate = {
    name: mode === 'draft' ? 'OLMOND - Diagnóstico IA y CRM - Borrador' : 'OLMOND - Diagnóstico IA y CRM',
    active: false,
    nodes,
    connections,
    settings: { executionOrder: 'v1', ...structuredClone(input.settings ?? {}), timezone: 'America/Argentina/Buenos_Aires' },
  };
  rejectEmbeddedSecrets(candidate);
  return candidate;
}

async function main() {
  const argumentsList = process.argv.slice(2);
  const [inputPath, outputPath, mode = 'draft'] = argumentsList;
  if (!inputPath || !outputPath || argumentsList.length > 3) stop('Uso: node patch-workflow.mjs EXPORT_ACTUAL.json CANDIDATO_NUEVO.json [draft|production-candidate]');
  const workflow = JSON.parse(await readFile(inputPath, 'utf8'));
  const candidate = patchWorkflow(workflow, { mode });
  await writeFile(outputPath, `${JSON.stringify(candidate, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
  process.stdout.write(`${JSON.stringify({ written: true, active: false, mode, nodes: candidate.nodes.length })}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
