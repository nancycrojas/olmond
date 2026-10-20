import { DIAGNOSTICO_URL, FORM_FIELDS, N8N_WEBHOOK_URL } from "./constants.js";

export function getDiagnosisErrors(values) {
  const errors = {};
  for (const field of FORM_FIELDS) {
    const value = values[field.label] ?? "";
    if (typeof value !== "string") {
      errors[field.label] = "Revisá esta respuesta.";
    } else if (field.required && !value.trim()) {
      errors[field.label] = "Completá esta respuesta.";
    } else if (value && field.options && !field.options.includes(value)) {
      errors[field.label] = "Elegí una opción válida.";
    } else if (value.length > (field.type === "email" ? 254 : 500)) {
      errors[field.label] = `Usá hasta ${field.type === "email" ? 254 : 500} caracteres.`;
    } else if (Array.from(value).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) {
      errors[field.label] = "Revisá los caracteres de esta respuesta.";
    } else if (field.type === "email" && (
      !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(value.trim()) ||
      value.trim().startsWith(".") || value.includes("..") || value.includes(".@")
    )) {
      errors[field.label] = "Ingresá un correo válido.";
    }
  }
  return errors;
}

export function createDiagnosisSubmission(values, {
  submissionId = crypto.randomUUID(),
  marketingConsent = false,
} = {}) {
  if (Object.keys(getDiagnosisErrors(values)).length > 0) {
    throw new TypeError("Revisá las respuestas del diagnóstico.");
  }
  if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(submissionId)) {
    throw new TypeError("Identificador de envío inválido.");
  }
  if (typeof marketingConsent !== "boolean") {
    throw new TypeError("Consentimiento inválido.");
  }
  const answers = Object.fromEntries(
    FORM_FIELDS.filter((field) => values[field.label] !== undefined).map(
      (field) => [field.label, values[field.label]],
    ),
  );
  return {
    ...answers,
    submission_id: submissionId,
    source: DIAGNOSTICO_URL,
    consentimiento_marketing: marketingConsent,
  };
}

export async function submitDiagnosis(submission, {
  fetchImpl = fetch,
  timeoutMs = 30000,
} = {}) {
  const pending = { status: "pending", submissionId: submission.submission_id };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
      signal: controller.signal,
    });
    if (!response.ok) return pending;
    const receipt = await response.json();
    if (
      receipt?.ok !== true ||
      receipt.crm_saved !== true ||
      receipt.email_status !== "sent" ||
      receipt.submission_id !== submission.submission_id ||
      typeof receipt.crm_row_id !== "string" || !receipt.crm_row_id.trim() ||
      typeof receipt.email_message_id !== "string" || !receipt.email_message_id.trim()
    ) return pending;
    return { status: "success", submissionId: submission.submission_id };
  } catch {
    return pending;
  } finally {
    clearTimeout(timeout);
  }
}
