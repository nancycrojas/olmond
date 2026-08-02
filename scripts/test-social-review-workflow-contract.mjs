import assert from "node:assert/strict";
import fs from "node:fs";

const workflowPath = process.argv[2];
if (!workflowPath) throw new Error("Falta la ruta del workflow corregido.");
const workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));
const nodeBy = (fragment) => {
  const node = workflow.nodes.find((candidate) => candidate.name.includes(fragment));
  if (!node) throw new Error(`No se encontró ${fragment}`);
  return node;
};
const codeNodes = workflow.nodes.filter((node) => node.type === "n8n-nodes-base.code");
for (const node of codeNodes) {
  assert.doesNotThrow(() => new Function("$input", "$", node.parameters.jsCode), `Código inválido: ${node.name}`);
}

function run(fragment, input, references = {}) {
  const node = nodeBy(fragment);
  const execute = new Function("$input", "$", node.parameters.jsCode);
  const getReference = (name) => {
    if (!(name in references)) throw new Error(`Referencia sin mock: ${name}`);
    return { first: () => ({ json: references[name] }) };
  };
  return execute({ first: () => ({ json: input }) }, getReference);
}

const token = "a".repeat(32);
const oldManifest = "a".repeat(64);
const oldInput = "b".repeat(64);
const slides = Array.from({ length: 8 }, (_, index) => ({
  index: index + 1,
  eyebrow: index === 0 ? "BAJO EXAMEN" : "",
  headline: index === 0 ? "La IA cambia el trabajo cotidiano" : `Dato verificado ${index + 1}`,
  body: "Una explicación clara, prudente y útil para personas no técnicas.",
  bullets: [],
  alt_text: `Placa editorial ${index + 1}`,
}));
const longCopy = Array.from({ length: 100 }, (_, index) => `palabra${index}`).join(" ");
const row = {
  review_id: "review-1",
  content_id: "content-1",
  review_token: token,
  review_expires_at: "2099-01-01T00:00:00.000Z",
  revision: 1,
  status: "PENDING_REVIEW",
  approval_status: "PENDING",
  manifest_sha256: oldManifest,
  input_sha256: oldInput,
  title: "Título anterior",
  publish_date: "2099-01-01",
  scheduled_at: "2099-01-01T22:30:00.000Z",
  timezone: "America/Argentina/Buenos_Aires",
  linkedin_copy: longCopy,
  instagram_copy: "Texto anterior para Instagram",
  facebook_copy: "Texto anterior para Facebook",
  x_copy: "Texto anterior para X",
  linkedin_image_url: "https://www.olmondconsulting.com/social/linkedin/editorial-test.png",
  linkedin_image_alt: "Equipo profesional analizando información en una oficina.",
  slides_json: JSON.stringify(slides),
  media_urls_json: JSON.stringify(Array.from({ length: 8 }, (_, index) => `https://www.olmondconsulting.com/api/social/card?p=${index}&v=5`)),
  alt_text_json: JSON.stringify(slides.map((slide) => slide.alt_text)),
  source_urls_json: JSON.stringify(["https://example.com/source"]),
  created_at: "2026-07-31T00:00:00.000Z",
};
const content = {
  title: "La IA está alterando la división cotidiana del trabajo",
  linkedin_copy: longCopy,
  instagram_copy: "Información verificada y explicada con lenguaje accesible.",
  facebook_copy: "Información verificada y explicada con lenguaje accesible.",
  x_copy: "La IA está alterando la división cotidiana del trabajo. Información y fuentes verificadas.",
  linkedin_image_url: row.linkedin_image_url,
  linkedin_image_alt: row.linkedin_image_alt,
  slides,
};

const saveRequest = run("Validar POST", {
  body: { token, action: "save", content, expected_revision: 1, expected_manifest_sha256: oldManifest },
})[0].json;
assert.equal(saveRequest.request_error, "");
const saved = run("Validar y versionar", row, { [nodeBy("Validar POST").name]: saveRequest })[0].json;
assert.equal(saved.success, true);
assert.equal(saved.status, "SAVED");
assert.equal(saved.revision, 2);
assert.equal(saved.title, content.title);
assert.notEqual(saved.manifest_sha256, oldManifest);
assert.equal(saved.response_content.revision, 2);
assert.equal(saved.response_content.manifest_sha256, saved.manifest_sha256);
const savedMedia = JSON.parse(saved.media_urls_json);
assert.equal(savedMedia.length, 8);
for (const url of savedMedia) {
  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get("v"), "5");
  const cardPayload = JSON.parse(Buffer.from(parsed.searchParams.get("p"), "base64url").toString("utf8"));
  assert.equal(cardPayload.layout_version, 5);
}

const staleApprovalRequest = run("Validar POST", {
  body: { token, action: "approve", expected_revision: 1, expected_manifest_sha256: oldManifest },
})[0].json;
const staleApproval = run("Validar y versionar", saved, { [nodeBy("Validar POST").name]: staleApprovalRequest })[0].json;
assert.equal(staleApproval.success, false);
assert.equal(staleApproval.http_status, 409);

const mixedApprovalRequest = run("Validar POST", {
  body: { token, action: "approve", content, expected_revision: 2, expected_manifest_sha256: saved.manifest_sha256 },
})[0].json;
const mixedApproval = run("Validar y versionar", saved, { [nodeBy("Validar POST").name]: mixedApprovalRequest })[0].json;
assert.equal(mixedApproval.success, false);
assert.equal(mixedApproval.http_status, 409);

const approvalRequest = run("Validar POST", {
  body: { token, action: "approve", expected_revision: 2, expected_manifest_sha256: saved.manifest_sha256 },
})[0].json;
const approved = run("Validar y versionar", saved, { [nodeBy("Validar POST").name]: approvalRequest })[0].json;
assert.equal(approved.success, true);
assert.equal(approved.status, "APPROVED");
assert.equal(approved.title, content.title);
assert.equal(approved.manifest_sha256, saved.manifest_sha256);

const metaQueue = run("Preparar cola Meta", {}, {
  [nodeBy("Validar y versionar").name]: approved,
  [nodeBy("Validar POST").name]: approvalRequest,
});
assert.equal(metaQueue.length, 1);
assert.equal(metaQueue[0].json.title, content.title);
assert.equal(metaQueue[0].json.manifest_sha256, approved.manifest_sha256);

const rejectionRequest = run("Validar POST", {
  body: {
    token,
    action: "reject",
    rejection_reason: "El título y el enfoque requieren una nueva edición.",
    expected_revision: 2,
    expected_manifest_sha256: saved.manifest_sha256,
  },
})[0].json;
const rejected = run("Validar y versionar", saved, { [nodeBy("Validar POST").name]: rejectionRequest })[0].json;
assert.equal(rejected.status, "REJECTED");
assert.equal(rejected.approval_status, "HUMAN_REJECTED");
assert.throws(
  () => run("Preparar cola Meta", {}, {
    [nodeBy("Validar y versionar").name]: rejected,
    [nodeBy("Validar POST").name]: rejectionRequest,
  }),
  /APPROVAL_CONTRACT_MISMATCH/,
);

console.log("Contrato editorial validado: 14 comprobaciones críticas superadas.");
