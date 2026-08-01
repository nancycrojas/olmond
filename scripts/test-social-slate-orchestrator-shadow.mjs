import assert from "node:assert/strict";
import fs from "node:fs";
import process from "node:process";

const workflowPath = process.argv[2];
if (!workflowPath) throw new Error("Falta la ruta del orquestador shadow.");
const workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));
const nodeBy = (fragment) => {
  const node = workflow.nodes.find((candidate) => candidate.name.includes(fragment));
  if (!node) throw new Error(`No se encontró ${fragment}`);
  return node;
};
for (const node of workflow.nodes.filter((candidate) => candidate.type === "n8n-nodes-base.code")) {
  assert.doesNotThrow(() => new Function("$input", "$", "$json", node.parameters.jsCode), `Código inválido: ${node.name}`);
}

assert.equal(nodeBy("Planificar 3 espacios").disabled, true);
assert.equal(nodeBy("Ingreso urgente por evento").type, "n8n-nodes-base.executeWorkflowTrigger");
assert.equal(workflow.nodes.some((node) => node.name.includes("15 min")), false);
assert.equal(nodeBy("Leer solicitudes del día").parameters.dataTableId.value, "BcACCpr24jrjxcOA");
assert.equal(nodeBy("Leer revisiones del día").parameters.dataTableId.value, "TWcPR4pDfc876IaA");
assert.equal(nodeBy("Reclamar solicitud").parameters.dataTableId.value, "BcACCpr24jrjxcOA");
assert.equal(nodeBy("Ejecutar motor editorial shadow").parameters.options.waitForSubWorkflow, true);
assert.equal(workflow.meta.urgentDispatch, "event-driven");
assert.equal(workflow.meta.idleUrgentPollingExecutionsPerDay, 0);
assert.equal(workflow.meta.maxDailyTopics, 3);

const timezone = "America/Argentina/Buenos_Aires";
const localDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const execute = (fragment, requests, reviews = []) => {
  const code = nodeBy(fragment).parameters.jsCode;
  const refs = (name) => {
    if (name !== "Leer revisiones del día") throw new Error(`Referencia inesperada: ${name}`);
    return { all: () => reviews.map((json) => ({ json })) };
  };
  return new Function("$input", "$", "$json", code)({ all: () => requests.map((json) => ({ json })) }, refs);
};

const emptySlate = execute("Construir agenda diaria", []);
assert.equal(emptySlate.length, 3);
assert.deepEqual(emptySlate.map((item) => item.json.slot_key), ["s1", "s2", "s3"]);
assert.equal(emptySlate.every((item) => item.json.mode === "auto"), true);
assert.equal(emptySlate.every((item) => item.json.status === "CLAIMED"), true);

const occupiedSlate = execute("Construir agenda diaria", [], [{
  content_id: `social_${localDate.replaceAll("-", "")}_s1_existing`,
  publish_date: localDate,
  status: "PENDING_REVIEW",
}]);
assert.deepEqual(occupiedSlate.map((item) => item.json.slot_key), ["s2", "s3"]);

const manualSlate = execute("Construir agenda diaria", [{
  kind: "CONTENT_REQUEST",
  request_id: "request-manual-s2",
  idempotency_key: "manual:s2:1",
  request_version: 1,
  mode: "manual",
  slot_key: "s2",
  requested_topic: "Una guía actual sobre modelos de frontera",
  editorial_instructions: "Comparar resultados y costos con fuentes verificadas.",
  source_urls_json: "[]",
  publish_date: localDate,
  scheduled_at: `${localDate}T22:30:00.000Z`,
  priority: 90,
  status: "REQUESTED",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}]);
const manualS2 = manualSlate.find((item) => item.json.slot_key === "s2").json;
assert.equal(manualS2.mode, "manual");
assert.equal(manualS2.request_id, "request-manual-s2");
assert.equal(manualS2.requested_topic, "Una guía actual sobre modelos de frontera");
assert.equal(manualS2.attempt_count, 1);

const urgent = execute("Priorizar solicitudes urgentes", [{
  kind: "CONTENT_REQUEST",
  request_id: "request-urgent-1",
  mode: "urgent",
  requested_topic: "Noticia urgente verificada",
  status: "REQUESTED",
  priority: 100,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}]);
assert.equal(urgent.length, 1);
assert.equal(urgent[0].json.mode, "urgent");
assert.equal(urgent[0].json.status, "CLAIMED");
assert.equal(urgent[0].json.attempt_count, 1);

console.log("Orquestador shadow validado: tablas separadas, tres espacios, urgencias e idempotencia.");
