import assert from "node:assert/strict";
import fs from "node:fs";

const workflowPath = process.argv[2];
if (!workflowPath) throw new Error("Falta la ruta del workflow editorial shadow.");
const workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));
const nodeBy = (fragment) => {
  const node = workflow.nodes.find((candidate) => candidate.name.includes(fragment));
  if (!node) throw new Error(`No se encontró ${fragment}`);
  return node;
};

for (const node of workflow.nodes.filter((candidate) => candidate.type === "n8n-nodes-base.code")) {
  assert.doesNotThrow(
    () => new Function("$input", "$", "$execution", "$items", "$json", node.parameters.jsCode),
    `Código inválido: ${node.name}`,
  );
}

assert.equal(nodeBy("Generar edici").disabled, true);
assert.equal(nodeBy("Prueba manual").disabled, true);
assert.equal(nodeBy("Solicitud editorial orquestada").type, "n8n-nodes-base.executeWorkflowTrigger");
assert.equal(nodeBy("Alertar bloqueo QA").disabled, undefined);
assert.equal(nodeBy("Mostrar bloqueo en Recibidos").disabled, undefined);

const normalize = nodeBy("Normalizar solicitud editorial");
const executeNormalize = new Function("$input", "$", "$execution", "$items", "$json", normalize.parameters.jsCode);
const normalized = executeNormalize(
  { first: () => ({ json: {
    request_id: "manual-1",
    slot_key: "s2",
    mode: "manual",
    requested_topic: "Cambios recientes en modelos de inteligencia artificial",
    editorial_instructions: "Informar con fuentes primarias y lenguaje accesible.",
    publish_date: "2026-08-01",
    scheduled_at: "2026-08-01T22:30:00.000Z",
    priority: 85,
  } }) },
)[0].json;
assert.equal(normalized.mode, "manual");
assert.equal(normalized.slot_key, "s2");
assert.equal(normalized.priority, 85);
assert.equal(normalized.publish_date, "2026-08-01");

const gate = nodeBy("Gate edici");
const executeGate = new Function("$input", "$", "$execution", "$items", "$json", gate.parameters.jsCode);
const refs = (name) => {
  if (name !== normalize.name) throw new Error(`Referencia inesperada: ${name}`);
  return { first: () => ({ json: normalized }) };
};
const allowed = executeGate({ all: () => [] }, refs);
assert.equal(allowed.length, 1);
const duplicate = executeGate({ all: () => [{ json: {
  content_id: "social_20260801_s2_123",
  publish_date: "2026-08-01",
  status: "PENDING_REVIEW",
} }] }, refs);
assert.equal(duplicate.length, 0);

for (const fragment of ["Gate determinístico", "Gate determinístico 2"]) {
  const code = nodeBy(fragment).parameters.jsCode;
  assert.equal(code.includes("EYEBROW_NOT_ALLOWED"), false);
  assert.equal(code.includes("QUESTION_HEADLINE"), false);
  assert.equal(code.includes("norm(c.instagram)===norm(c.facebook)"), false);
  assert.equal(code.includes("FACEBOOK_MUST_EQUAL_INSTAGRAM"), true);
}

const secondGate = nodeBy("Gate determinístico 2").parameters.jsCode;
assert.equal(secondGate.includes("maximum_recovery_rounds??8"), true);
assert.equal(secondGate.includes(">=4"), false);

const prepare = nodeBy("Preparar revisi").parameters.jsCode;
assert.equal(prepare.includes("+'_'+slotKey+'_'"), true);
assert.equal(prepare.includes("scheduled_at:request.scheduled_at"), true);
assert.equal(prepare.includes("title:String(c.title),media,alts,hero"), true);
assert.equal(prepare.includes("contract:$json.contract,request,evidence_hash"), true);

const contract = nodeBy("Construir contrato").parameters.jsCode;
assert.equal(contract.includes("maximumRecoveryRounds:8"), true);
assert.equal(contract.includes("request_id:request.request_id"), true);
assert.equal(contract.includes("request.requested_topic"), true);

console.log("Motor editorial shadow validado: contratos de entrada, slots, QA y versión coherentes.");
