import assert from "node:assert/strict";
import test from "node:test";

import { FORM_FIELDS } from "./constants.js";
import {
  createDiagnosisSubmission,
  getDiagnosisErrors,
  submitDiagnosis,
} from "./diagnosis-submission.js";

const submissionId = "709b402f-b1e3-48b7-a2fd-56cc9ac150ba";

function validAnswers() {
  return Object.fromEntries(
    FORM_FIELDS.filter((field) => field.required).map((field) => [
      field.label,
      field.options?.[0] ??
        (field.type === "email" ? "prueba@example.com" : "Prueba técnica"),
    ]),
  );
}

function payload() {
  return createDiagnosisSubmission(validAnswers(), {
    submissionId,
    marketingConsent: false,
  });
}

function receipt(overrides = {}) {
  return {
    ok: true,
    crm_saved: true,
    email_status: "sent",
    submission_id: submissionId,
    crm_row_id: "123",
    email_message_id: "gmail-receipt-123",
    ...overrides,
  };
}

test("conserva cada respuesta y requiere consentimiento comercial explícito", () => {
  const answers = validAnswers();
  const submission = createDiagnosisSubmission(answers, { submissionId });
  for (const [label, value] of Object.entries(answers)) {
    assert.equal(submission[label], value);
  }
  assert.equal(submission.submission_id, submissionId);
  assert.equal(submission.consentimiento_marketing, false);
  assert.equal(submission.source, "https://www.olmondconsulting.com/diagnostico");
  assert.equal(createDiagnosisSubmission(answers, {
    submissionId,
    marketingConsent: true,
  }).consentimiento_marketing, true);
});

test("rechaza correo inválido y respuestas fuera de las opciones", () => {
  const answers = validAnswers();
  const emailLabel = FORM_FIELDS.find((field) => field.type === "email").label;
  const selectField = FORM_FIELDS.find((field) => field.type === "select");
  answers[emailLabel] = "esto no es un correo";
  answers[selectField.label] = "valor inexistente";
  assert.ok(getDiagnosisErrors(answers)[emailLabel]);
  assert.ok(getDiagnosisErrors(answers)[selectField.label]);
  assert.throws(() => createDiagnosisSubmission(answers, { submissionId }));
});

test("rechaza espacios como respuesta requerida y admite opcionales vacíos", () => {
  const answers = validAnswers();
  assert.deepEqual(getDiagnosisErrors(answers), {});
  answers["Nombre y apellido"] = "   ";
  assert.ok(getDiagnosisErrors(answers)["Nombre y apellido"]);
});

test("rechaza identificadores y consentimiento de tipo incorrecto", () => {
  assert.throws(() => createDiagnosisSubmission(validAnswers(), {
    submissionId: "otro-id",
  }));
  assert.throws(() => createDiagnosisSubmission(validAnswers(), {
    submissionId,
    marketingConsent: "true",
  }));
});

test("coincide con el backend para correos inválidos y caracteres de control", () => {
  const emailLabel = FORM_FIELDS.find((field) => field.type === "email").label;
  for (const email of [".ana@example.com", "ana..perez@example.com", "ana.@example.com", "ana@-example.com", `${"a".repeat(245)}@example.com`]) {
    const answers = { ...validAnswers(), [emailLabel]: email };
    assert.ok(getDiagnosisErrors(answers)[emailLabel], email);
  }
  const answers = { ...validAnswers(), "Nombre y apellido": "Prueba\nTécnica" };
  assert.ok(getDiagnosisErrors(answers)["Nombre y apellido"]);
});

test("solo confirma éxito con recibos de CRM y Gmail del mismo envío", async () => {
  let requests = 0;
  const submission = payload();
  const result = await submitDiagnosis(submission, {
    fetchImpl: async (url, options) => {
      requests += 1;
      assert.match(url, /\/webhook\/diagnostico-ia-web$/);
      assert.equal(options.method, "POST");
      assert.equal(options.headers["Content-Type"], "application/json");
      assert.deepEqual(JSON.parse(options.body), submission);
      assert.ok(options.signal);
      return { ok: true, json: async () => receipt() };
    },
  });
  assert.equal(result.status, "success");
  assert.equal(requests, 1);
});

for (const [name, incompleteReceipt] of [
  ["aceptación antigua", { ok: true }],
  ["CRM sin confirmar", receipt({ crm_saved: false })],
  ["correo pendiente", receipt({ email_status: "queued" })],
  ["otro envío", receipt({ submission_id: "another-submission" })],
  ["sin recibo CRM", receipt({ crm_row_id: "" })],
  ["sin recibo Gmail", receipt({ email_message_id: "" })],
]) {
  test(`no confirma éxito con ${name}`, async () => {
    const result = await submitDiagnosis(payload(), {
      fetchImpl: async () => ({ ok: true, json: async () => incompleteReceipt }),
    });
    assert.equal(result.status, "pending");
    assert.equal(result.submissionId, submissionId);
  });
}

test("no reintenta un error de red que pudo haber procesado el servidor", async () => {
  let requests = 0;
  const result = await submitDiagnosis(payload(), {
    fetchImpl: async () => {
      requests += 1;
      throw new Error("Network error");
    },
  });
  assert.equal(result.status, "pending");
  assert.equal(requests, 1);
});

test("no confirma errores HTTP ni respuestas sin JSON", async () => {
  for (const response of [
    { ok: false, status: 500 },
    { ok: true, json: async () => { throw new SyntaxError("not JSON"); } },
  ]) {
    const result = await submitDiagnosis(payload(), {
      fetchImpl: async () => response,
    });
    assert.equal(result.status, "pending");
  }
});

test("limita la espera y conserva referencia para reconciliar", async () => {
  const result = await submitDiagnosis(payload(), {
    timeoutMs: 10,
    fetchImpl: async (url, { signal }) => new Promise((resolve, reject) => {
      signal.addEventListener("abort", () => reject(new Error("aborted")), {
        once: true,
      });
    }),
  });
  assert.equal(result.status, "pending");
  assert.equal(result.submissionId, submissionId);
});
