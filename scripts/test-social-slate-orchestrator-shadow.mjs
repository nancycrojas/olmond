import assert from "node:assert/strict";
import fs from "node:fs";

const workflowPath = process.argv[2];
if (!workflowPath) throw new Error("Falta la ruta del orquestador shadow.");
const workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));
const nodeBy = (fragment) => {
  const node = workflow.nodes.find((candidate) => candidate.name.includes(fragment));
  if (!node) throw new Error(`No se encontró ${fragment}`);
  return node;
};
const codeNodes = workflow.nodes.filter((node) => node.type === "n8n-nodes-base.code");
for (const node of codeNodes) {
  assert.doesNotThrow(() => new Function("$input", "$", "$json", node.parameters.jsCode), `Código inválido: ${node.name}`);
}

assert.equal(nodeBy("Planificar 3 espacios").disabled, true);
assert.equal(nodeBy("Revisar solicitudes urgentes").disabled, true);
assert.equal(nodeBy("Ejecutar motor editorial shadow").parameters.workflowId.value, "AAWGjrmZ4SvfkNCO");
assert.equal(nodeBy("Ejecutar motor editorial shadow").parameters.options.waitForSubWorkflow, true);

const timezone = "America/Argentina/Buenos_Aires";
const localDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const execute = (fragment, rows) => {
  const code = nodeBy(fragment).parameters.jsCode;
  return new Function("$input", "$", "$json", code)({ all: () => rows.map((json) => ({ json })) });
};

const emptySlate = execute("Construir agenda diaria", []);
assert.equal(emptySlate.length, 3);
assert.deepEqual(emptySlate.map((item) => item.json.slot_key), ["s1", "s2", "s3"]);
assert.equal(emptySlate.every((item) => item.json.mode === "auto"), true);

const occupiedSlate = execute("Construir agenda diaria", [{
  review_id: "social-existing",
  content_id: `social_${localDate.replaceAll("-", "")}_s1_existing`,
  publish_date: localDate,
  scheduled_at: `${localDate}T21:30:00.000Z`,
  status: "PENDING_REVIEW",
  evidence_json: "{}",
}]);
assert.equal(occupiedSlate.length, 2);
assert.deepEqual(occupiedSlate.map((item) => item.json.slot_key), ["s2", "s3"]);

const manualSlate = execute("Construir agenda diaria", [{
  review_id: "request-manual-s2",
  content_id: "request-manual-s2",
  title: "Una guía actual sobre modelos de frontera",
  publish_date: localDate,
  scheduled_at: `${localDate}T22:30:00.000Z`,
  status: "REQUESTED",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  evidence_json: JSON.stringify({ request: {
    mode: "manual",
    slot_key: "s2",
    requested_topic: "Una guía actual sobre modelos de frontera",
    editorial_instructions: "Comparar resultados y costos con fuentes verificadas.",
    priority: 90,
  } }),
}]);
assert.equal(manualSlate.length, 3);
const manualS2 = manualSlate.find((item) => item.json.slot_key === "s2").json;
assert.equal(manualS2.mode, "manual");
assert.equal(manualS2.request_id, "request-manual-s2");
assert.equal(manualS2.requested_topic, "Una guía actual sobre modelos de frontera");

const urgent = execute("Priorizar solicitudes urgentes", [{
  review_id: "request-urgent-1",
  content_id: "request-urgent-1",
  title: "Noticia urgente verificada",
  publish_date: localDate,
  status: "REQUESTED",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  evidence_json: JSON.stringify({ request: {
    mode: "urgent",
    requested_topic: "Noticia urgente verificada",
    editorial_instructions: "Publicar dentro de las próximas dos horas.",
    priority: 100,
  } }),
}]);
assert.equal(urgent.length, 1);
assert.equal(urgent[0].json.mode, "urgent");
assert.equal(urgent[0].json.priority, 100);
assert.equal(urgent[0].json.request_id, "request-urgent-1");

console.log("Orquestador shadow validado: 3 espacios, solicitudes manuales, urgencias y deduplicación.");
