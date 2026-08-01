import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import process from "node:process";

const workflowPath = process.argv[2];
if (!workflowPath) throw new Error("Falta la ruta del workflow de ingreso.");
const workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));
const nodeBy = (fragment) => {
  const node = workflow.nodes.find((candidate) => candidate.name.includes(fragment));
  if (!node) throw new Error(`No se encontró ${fragment}`);
  return node;
};

for (const node of workflow.nodes.filter((candidate) => candidate.type === "n8n-nodes-base.code")) {
  assert.doesNotThrow(() => new Function("$input", "$", "$json", node.parameters.jsCode), `Código inválido: ${node.name}`);
}
assert.equal(nodeBy("POST control editorial").parameters.path, "olmond-social-control-v1");
assert.equal(nodeBy("Buscar autorización activa").parameters.dataTableId.value, "BcACCpr24jrjxcOA");
assert.equal(nodeBy("Registrar sin duplicar").parameters.dataTableId.value, "BcACCpr24jrjxcOA");
assert.equal(workflow.meta.storesRawAccessToken, false);
assert.equal(workflow.meta.urgentDispatch, "event-driven");
assert.equal(workflow.meta.urgentPollingExecutionsPerDay, 0);
assert.equal(workflow.meta.maxTopicsPerEnvelope, 3);
assert.equal(nodeBy("Enviar urgencias al orquestador shadow").parameters.mode, "once");
assert.equal(nodeBy("Enviar urgencias al orquestador shadow").parameters.options.waitForSubWorkflow, false);
assert.equal(nodeBy("Enviar urgencias al orquestador shadow").parameters.workflowId.value, workflow.meta.orchestratorWorkflowId);

const normalize = nodeBy("Validar sobre y firma");
assert.equal(normalize.parameters.jsCode.includes("token_hash:sha256(token)"), true);
assert.equal(normalize.parameters.jsCode.includes("token,"), false);
assert.equal(normalize.parameters.jsCode.includes("request_integrity"), true);

const envelope = {
  mode: "manual",
  request_version: 1,
  client_request_nonce: "56d133fd-36d5-4e20-a96d-98f49765b514",
  topics: [{
    requested_topic: "Una noticia importante explicada con claridad",
    editorial_instructions: "Usar fuentes primarias.",
    slot_key: "s1",
    scheduled_at: "2026-08-01T21:30:00.000Z",
    source_urls: ["https://example.com/source"],
    priority: 80,
  }],
};
const body = {
  token: "abcdefghijklmnopqrstuvwxyz_1234567890-ABCDE",
  ...envelope,
  request_sha256: crypto.createHash("sha256").update(JSON.stringify(envelope)).digest("hex"),
};
const normalized = new Function("$input", normalize.parameters.jsCode)({ first: () => ({ json: { body } }) })[0].json;
assert.equal(normalized.request_error, "");
assert.equal(normalized.token, undefined);
assert.equal(normalized.token_hash, crypto.createHash("sha256").update(body.token).digest("hex"));

const expand = nodeBy("Expandir temas inmutables").parameters.jsCode;
assert.equal(expand.includes("status:'REQUESTED'"), true);
assert.equal(expand.includes("idempotencyKey"), true);
assert.equal(expand.includes("requested_by:'patricio'"), true);

console.log("Ingreso shadow validado: autorización con hash, integridad, 1–3 temas e idempotencia.");
