import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const sourcePath = process.env.DIAGNOSTICO_SOURCE_EXPORT;
assert.ok(sourcePath, 'Falta DIAGNOSTICO_SOURCE_EXPORT con el export WF-A a comprobar');
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const moduleUrl = new URL('./patch-workflow.mjs', import.meta.url);
const formFields = source.nodes.find((node) => node.name === 'Formulario Diagnostico IA').parameters.formFields.values;
const scoredLabels = formFields.slice(6, 13).map((field) => field.fieldLabel);
const submissionId = 'a661f7a2-86b6-4bf4-9f82-538e88e506ff';
const sourceUrl = 'https://www.olmondconsulting.com/diagnostico';
const names = {
  score: 'Calcular Puntaje y Nivel',
  mapper: 'Mapear Payload Web',
  crm: 'Guardar Lead en CRM',
  gmail: 'Enviar Resultado al Lead',
  receipt: 'Preparar Confirmación Diagnóstico',
  respond: 'Confirmar Diagnóstico Guardado y Enviado',
  webhook: 'Webhook Diagnostico Web',
  form: 'Formulario Diagnostico IA',
};

async function patched(options = {}, workflow = source) {
  assert.equal(existsSync(moduleUrl), true, 'Falta implementar el patcher offline');
  const { patchWorkflow } = await import(moduleUrl.href);
  return patchWorkflow(workflow, options);
}

function validAnswers() {
  return Object.fromEntries(formFields.map((field) => [
    field.fieldLabel,
    field.fieldType === 'dropdown'
      ? field.fieldOptions.values[0].option
      : field.fieldType === 'email'
        ? 'consultante@example.invalid'
        : field.fieldLabel === 'Nombre y apellido' ? 'Persona de Prueba' : 'Empresa de Prueba',
  ]));
}

function payload(overrides = {}) {
  return {
    ...validAnswers(),
    submission_id: submissionId,
    source: sourceUrl,
    consentimiento_marketing: false,
    ...overrides,
  };
}

function runNode(workflow, name, input, outputs = {}, executionId = '101') {
  const node = workflow.nodes.find((candidate) => candidate.name === name);
  assert.ok(node, `Falta el nodo ${name}`);
  assert.equal(node.type, 'n8n-nodes-base.code');
  const runner = vm.runInNewContext(`(function () { ${node.parameters.jsCode}\n})`, {
    $input: { item: { json: structuredClone(input) } },
    $execution: { id: executionId },
    $: (nodeName) => {
      if (!Object.hasOwn(outputs, nodeName)) throw new Error('NODO_NO_EJECUTADO');
      return { item: { json: structuredClone(outputs[nodeName]) } };
    },
  }, { timeout: 1000 });
  return JSON.parse(JSON.stringify(runner()));
}

function runScore(workflow, input) {
  const mapped = runNode(workflow, names.mapper, { body: input });
  return runNode(workflow, names.score, mapped.json).json;
}

function receiptInputs(scored) {
  return {
    [names.score]: scored,
    [names.crm]: { id: 91, email: scored.email, notas: scored.notas },
  };
}

function nextNodes(workflow, name) {
  return (workflow.connections[name]?.main ?? []).flat().map((edge) => edge.node);
}

test('guarda todas las respuestas exactas, origen, referencia y consentimiento explícito', async () => {
  const workflow = await patched();
  const input = payload({ 'Nombre y apellido': '  Persona de Prueba  ' });
  const scored = runScore(workflow, input);
  const notes = JSON.parse(scored.notas);
  assert.equal(notes.schema_version, 'olmond-diagnostico-crm-v1');
  assert.equal(notes.submission_id, submissionId);
  assert.equal(notes.source, sourceUrl);
  assert.equal(notes.consentimiento_marketing, false);
  const expected = Object.fromEntries(formFields.map((field) => [field.fieldLabel, input[field.fieldLabel]]));
  assert.deepEqual(notes.respuestas, expected);
  assert.equal(scored.nombre, 'Persona de Prueba');
  assert.equal(workflow.nodes.find((node) => node.name === names.crm).parameters.columns.value.notas, '={{ $json.notas }}');
});

test('consentimiento ausente queda falso y true requiere un booleano real', async () => {
  const workflow = await patched();
  const input = payload();
  delete input.consentimiento_marketing;
  assert.equal(JSON.parse(runScore(workflow, input).notas).consentimiento_marketing, false);
  assert.equal(JSON.parse(runScore(workflow, payload({ consentimiento_marketing: true })).notas).consentimiento_marketing, true);
  for (const invalid of ['true', 'false', 1, null, {}]) {
    assert.throws(() => runScore(workflow, payload({ consentimiento_marketing: invalid })), /CONSENTIMIENTO_INVALIDO/);
  }
});

test('el estado no habilita nurturing salvo que haya opt-in explícito', async () => {
  const workflow = await patched();
  assert.equal(runScore(workflow, payload()).estado, 'sin_consentimiento');
  assert.equal(runScore(workflow, payload({ consentimiento_marketing: true })).estado, 'nuevo');
  const native = runNode(workflow, names.score, { ...validAnswers(), submittedAt: '2026-10-20T00:00:00Z', formMode: 'production' }).json;
  assert.equal(native.estado, 'sin_consentimiento');
  assert.equal(JSON.parse(native.notas).source, 'n8n:diagnostico-ia');
});

test('escapa nombre HTML y conserva el texto original solo en datos del CRM', async () => {
  const workflow = await patched();
  const rawName = '<img/src=x/onerror=alert(1)> Persona';
  const scored = runScore(workflow, payload({ 'Nombre y apellido': rawName }));
  assert.equal(scored.email_html.includes('<img'), false);
  assert.ok(scored.email_html.includes('&lt;img/src=x/onerror=alert(1)&gt;'));
  assert.equal(JSON.parse(scored.notas).respuestas['Nombre y apellido'], rawName);
});

test('rechaza emails inválidos y caracteres de cabecera sin invocar CRM ni Gmail', async () => {
  const workflow = await patched();
  for (const invalidEmail of ['sin-arroba', 'uno@example.invalid\r\nBcc: otro@example.invalid', 'a@', '', 'Name <one@example.invalid>']) {
    assert.throws(() => runScore(workflow, payload({ 'Tu correo (acá llega tu resultado)': invalidEmail })), /EMAIL_INVALIDO|CAMPO_REQUERIDO|CARACTERES_INVALIDOS/);
  }
});

test('rechaza opciones inventadas, campos requeridos ausentes y valores no string', async () => {
  const workflow = await patched();
  for (const field of formFields.filter((candidate) => candidate.requiredField)) {
    const input = payload();
    delete input[field.fieldLabel];
    assert.throws(() => runScore(workflow, input), /CAMPO_REQUERIDO/);
  }
  for (const field of formFields.filter((candidate) => candidate.fieldType === 'dropdown')) {
    assert.throws(() => runScore(workflow, payload({ [field.fieldLabel]: 'OPCION_INVENTADA' })), /OPCION_INVALIDA/);
  }
  assert.throws(() => runScore(workflow, payload({ 'Nombre y apellido': { nested: 'invalid' } })), /TIPO_INVALIDO/);
});

test('rechaza cuerpos inválidos, campos ajenos, origen o referencia adulterados y tamaño excesivo', async () => {
  const workflow = await patched();
  for (const invalidBody of [null, [], 'texto', 12]) {
    assert.throws(() => runNode(workflow, names.mapper, { body: invalidBody }), /PAYLOAD_INVALIDO/);
  }
  assert.throws(() => runScore(workflow, payload({ authorization: 'dummy' })), /CAMPO_DESCONOCIDO/);
  assert.throws(() => runScore(workflow, payload({ source: 'https://invalid.example/otro' })), /ORIGEN_INVALIDO/);
  assert.throws(() => runScore(workflow, payload({ submission_id: '<script>' })), /SUBMISSION_ID_INVALIDO/);
  assert.throws(() => runScore(workflow, payload({ 'Nombre de tu empresa': 'x'.repeat(17000) })), /PAYLOAD_DEMASIADO_GRANDE|CAMPO_DEMASIADO_LARGO/);
});

test('preserva los límites de nivel y puntajes del nodo original', async () => {
  const workflow = await patched();
  for (const total of [0, 7, 8, 14, 15, 21]) {
    let remaining = total;
    const input = payload();
    for (const label of scoredLabels) {
      const field = formFields.find((candidate) => candidate.fieldLabel === label);
      const answerIndex = Math.min(remaining, 3);
      input[label] = field.fieldOptions.values[answerIndex].option;
      remaining -= answerIndex;
    }
    const original = runNode(source, names.score, input).json;
    const result = runScore(workflow, input);
    assert.equal(result.puntaje, original.puntaje);
    assert.equal(result.nivel, original.nivel);
    assert.equal(result.nivel_nombre, original.nivel_nombre);
    assert.equal(result.email_subject, original.email_subject);
  }
});

test('preserva la calificación comercial original en todas las combinaciones de rol, tamaño y facturación', async () => {
  const workflow = await patched();
  const [roleField, sizeField, revenueField] = [formFields[3], formFields[4], formFields[13]];
  for (const role of roleField.fieldOptions.values) {
    for (const size of sizeField.fieldOptions.values) {
      for (const revenue of [...revenueField.fieldOptions.values.map((option) => option.option), '']) {
        const input = payload({ [roleField.fieldLabel]: role.option, [sizeField.fieldLabel]: size.option, [revenueField.fieldLabel]: revenue });
        assert.equal(runScore(workflow, input).score_lead, runNode(source, names.score, input).json.score_lead);
      }
    }
  }
});

test('los envíos heredados conservan referencia de ejecución y no conceden marketing', async () => {
  const workflow = await patched();
  const result = runScore(workflow, validAnswers());
  const notes = JSON.parse(result.notas);
  assert.equal(result.submission_id, 'diagnostico-n8n-101');
  assert.equal(notes.consentimiento_marketing, false);
  assert.equal(notes.source, sourceUrl);
});

test('solo confirma luego de CRM y Gmail y devuelve recibos reales sin afirmar entrega', async () => {
  const workflow = await patched();
  const scored = runScore(workflow, payload());
  const result = runNode(workflow, names.receipt, { id: '19ab83f1', threadId: '19ab83f1' }, receiptInputs(scored)).json;
  assert.deepEqual(result, { ok: true, crm_saved: true, email_status: 'sent', submission_id: submissionId, crm_row_id: '91', email_message_id: '19ab83f1' });
  assert.equal(JSON.stringify(result).includes('delivered'), false);
  assert.equal(nextNodes(workflow, names.crm)[0], names.gmail);
  assert.deepEqual(nextNodes(workflow, names.gmail), [names.receipt]);
  assert.deepEqual(nextNodes(workflow, names.receipt), [names.respond]);
  assert.deepEqual(nextNodes(workflow, names.respond), ['Es Lead Calificado A']);
  assert.equal(workflow.nodes.find((node) => node.name === names.webhook).parameters.responseMode, 'responseNode');
  const respond = workflow.nodes.find((node) => node.name === names.respond);
  assert.equal(respond.parameters.respondWith, 'json');
  assert.equal(respond.parameters.responseBody, '={{ $json }}');
});

test('no confirma si falta el recibo CRM/Gmail o no corresponde la referencia guardada', async () => {
  const workflow = await patched();
  const scored = runScore(workflow, payload());
  for (const missingGmail of [{}, { id: '' }, { id: null }, { id: 'fake\nreceipt' }, { error: 'failure' }]) {
    assert.throws(() => runNode(workflow, names.receipt, missingGmail, receiptInputs(scored)), /GMAIL_RECEIPT_MISSING/);
  }
  for (const invalidId of [undefined, 0, -1, '', 'unknown']) {
    const outputs = receiptInputs(scored);
    outputs[names.crm].id = invalidId;
    assert.throws(() => runNode(workflow, names.receipt, { id: '19ab83f1' }, outputs), /CRM_RECEIPT_MISSING/);
  }
  const mismatched = receiptInputs(scored);
  mismatched[names.crm].notas = JSON.stringify({ submission_id: 'otra-referencia' });
  assert.throws(() => runNode(workflow, names.receipt, { id: '19ab83f1' }, mismatched), /CRM_RECEIPT_MISMATCH/);
  assert.throws(() => runNode(workflow, names.receipt, { id: '19ab83f1' }, {}), /NODO_NO_EJECUTADO/);
});

test('el borrador no comparte endpoints ni activa disparadores y mantiene las referencias OAuth', async () => {
  const workflow = await patched();
  assert.equal(workflow.active, false);
  assert.ok(workflow.name.startsWith('OLMOND - '));
  assert.equal(workflow.nodes.find((node) => node.name === names.webhook).parameters.path, 'diagnostico-ia-web-crm-draft');
  assert.equal(workflow.nodes.find((node) => node.name === names.form).disabled, true);
  for (const node of source.nodes.filter((candidate) => candidate.credentials)) {
    assert.equal(JSON.stringify(workflow.nodes.find((candidate) => candidate.name === node.name).credentials), JSON.stringify(node.credentials));
  }
  assert.equal(workflow.settings.timezone, 'America/Argentina/Buenos_Aires');
  assert.equal(workflow.nodes.find((node) => node.name === names.gmail).retryOnFail, false);
  assert.equal(workflow.nodes.find((node) => node.name === 'Alerta Lead Caliente a Pato').onError, 'continueRegularOutput');
});

test('el candidato de producción mantiene endpoint original pero permanece inactivo', async () => {
  const workflow = await patched({ mode: 'production-candidate' });
  assert.equal(workflow.active, false);
  assert.equal(workflow.nodes.find((node) => node.name === names.webhook).parameters.path, 'diagnostico-ia-web');
});

test('elimina datos fijados, estados, historia, metadatos y acceso compartido sin mutar fuente', async () => {
  const input = structuredClone(source);
  input.pinData = { cualquierNodo: [{ json: { data: 'PIN_TEST_ONLY' } }] };
  input.staticData = { state: 'STATIC_TEST_ONLY' };
  input.meta = { data: 'META_TEST_ONLY' };
  input.history = [{ data: 'HISTORY_TEST_ONLY' }];
  input.shared = [{ data: 'SHARED_TEST_ONLY' }];
  const before = JSON.stringify(input);
  const workflow = await patched({}, input);
  for (const forbidden of ['pinData', 'staticData', 'meta', 'history', 'shared', 'id', 'versionId', 'activeVersionId']) {
    assert.equal(Object.hasOwn(workflow, forbidden), false);
  }
  assert.equal(JSON.stringify(input) === before, true);
  assert.equal(/PIN_TEST_ONLY|STATIC_TEST_ONLY|META_TEST_ONLY|HISTORY_TEST_ONLY|SHARED_TEST_ONLY/.test(JSON.stringify(workflow)), false);
});

test('rechaza cambios no revisados de nodos, tabla, scoring y secretos embebidos', async () => {
  const alteredTable = structuredClone(source);
  alteredTable.nodes.find((node) => node.name === names.crm).parameters.dataTableId.value = 'otra-tabla';
  await assert.rejects(() => patched({}, alteredTable), /CRM_TABLE_MISMATCH/);
  const missingNode = structuredClone(source);
  missingNode.nodes = missingNode.nodes.filter((node) => node.name !== names.gmail);
  await assert.rejects(() => patched({}, missingNode), /WORKFLOW_NODES_MISMATCH/);
  const changedScoring = structuredClone(source);
  changedScoring.nodes.find((node) => node.name === names.score).parameters.jsCode = 'return { json: {} };';
  await assert.rejects(() => patched({}, changedScoring), /SCORE_(?:ANCHOR|CODE)_MISMATCH/);
  const secretInput = structuredClone(source);
  secretInput.nodes.find((node) => node.name === names.webhook).parameters.apiKey = 'DUMMY_SECRET_TEST_ONLY';
  await assert.rejects(() => patched({}, secretInput), /EMBEDDED_SECRET_REJECTED/);
});

test('bloquea cambios de código anclado, opciones de formulario, mapeos CRM y conexiones', async () => {
  const changedCode = structuredClone(source);
  changedCode.nodes.find((node) => node.name === names.score).parameters.jsCode += '\nthrow new Error("CODIGO_AGREGADO");';
  await assert.rejects(() => patched({}, changedCode), /SCORE_CODE_MISMATCH/);
  const changedOptions = structuredClone(source);
  changedOptions.nodes.find((node) => node.name === names.form).parameters.formFields.values[3].fieldOptions.values[0].option = 'ROL_AGREGADO';
  await assert.rejects(() => patched({}, changedOptions), /FORM_SCHEMA_MISMATCH/);
  const changedMapping = structuredClone(source);
  changedMapping.nodes.find((node) => node.name === names.crm).parameters.columns.value.email = 'direccion-fija@example.invalid';
  await assert.rejects(() => patched({}, changedMapping), /CRM_MAPPING_MISMATCH/);
  const changedEdges = structuredClone(source);
  changedEdges.connections[names.score].main[0].push({ node: names.gmail, type: 'main', index: 0 });
  await assert.rejects(() => patched({}, changedEdges), /WORKFLOW_CONNECTIONS_MISMATCH/);
});

test('no confunde obtener un mensaje existente con enviar el resultado', async () => {
  for (const operation of ['get', 'reply', 'createDraft']) {
    const altered = structuredClone(source);
    altered.nodes.find((node) => node.name === names.gmail).parameters.operation = operation;
    await assert.rejects(() => patched({}, altered), /GMAIL_OPERATION_MISMATCH/);
  }
  const alteredResource = structuredClone(source);
  alteredResource.nodes.find((node) => node.name === names.gmail).parameters.resource = 'thread';
  await assert.rejects(() => patched({}, alteredResource), /GMAIL_OPERATION_MISMATCH/);
});

test('rechaza saltos de validación, inserción o envío por nodos críticos deshabilitados y banderas de ejecución', async () => {
  for (const criticalName of [names.mapper, names.score, names.crm, names.gmail, names.webhook]) {
    for (const flag of ['disabled', 'executeOnce', 'continueOnFail']) {
      const altered = structuredClone(source);
      altered.nodes.find((node) => node.name === criticalName)[flag] = true;
      await assert.rejects(() => patched({}, altered), /CRITICAL_NODE_CONFIG_MISMATCH/);
    }
  }
});

test('fija Gmail HTML OAuth2 y CRM row/insert, y rechaza configuración divergente', async () => {
  const workflow = await patched();
  const sender = workflow.nodes.find((node) => node.name === names.gmail);
  assert.equal(sender.parameters.authentication, 'oAuth2');
  assert.equal(sender.parameters.emailType, 'html');
  const crm = workflow.nodes.find((node) => node.name === names.crm);
  assert.equal(crm.parameters.resource, 'row');
  assert.equal(crm.parameters.operation, 'insert');
  for (const [key, value] of [['emailType', 'text'], ['authentication', 'serviceAccount']]) {
    const altered = structuredClone(source);
    altered.nodes.find((node) => node.name === names.gmail).parameters[key] = value;
    await assert.rejects(() => patched({}, altered), /GMAIL_(?:OPERATION|AUTH)_MISMATCH/);
  }
  for (const credentialKey of ['id', 'name']) {
    const altered = structuredClone(source);
    altered.nodes.find((node) => node.name === names.gmail).credentials.gmailOAuth2[credentialKey] = '';
    await assert.rejects(() => patched({}, altered), /CREDENTIAL_REFERENCE_INVALID/);
  }
  const alteredCrm = structuredClone(source);
  alteredCrm.nodes.find((node) => node.name === names.crm).parameters.resource = 'table';
  await assert.rejects(() => patched({}, alteredCrm), /CRM_MAPPING_MISMATCH/);
});
