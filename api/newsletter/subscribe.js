const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
// The webhook URL is not a credential. Keep a server-side fallback so a
// missing Vercel environment variable cannot silently disable signups.
const DEFAULT_WEBHOOK_URL =
  "https://olmond.app.n8n.cloud/webhook/olmond-newsletter-subscribe-v1";
const attempts = new Map();

function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

function isValidEmail(value) {
  // Conservative syntax check; suppression and delivery remain in n8n.
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientKey(request) {
  const forwarded = String(request.headers["x-forwarded-for"] ?? "");
  return forwarded.split(",")[0].trim() || String(request.socket?.remoteAddress ?? "unknown");
}

function isRateLimited(key, now = Date.now()) {
  const current = attempts.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    attempts.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function parseRequestBody(value) {
  if (value && typeof value === "object") return value;
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
    return parseRequestBody(value.toString("utf8"));
  }
  if (typeof value !== "string") return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeWebhookUrl() {
  const raw = String(
    globalThis.process?.env?.N8N_NEWSLETTER_WEBHOOK_URL ?? DEFAULT_WEBHOOK_URL,
  ).trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "olmond.app.n8n.cloud" ||
      !url.pathname.startsWith("/webhook/")
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Olmond-Newsletter-Version", "2026-07-22-parser-v2");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ success: false, message: "Método no permitido." });
  }

  const origin = String(request.headers.origin ?? "");
  if (origin && !["https://www.olmondconsulting.com", "https://olmondconsulting.com"].includes(origin)) {
    return response.status(403).json({ success: false, message: "Solicitud no permitida." });
  }

  if (isRateLimited(getClientKey(request))) {
    return response.status(429).json({ success: false, message: "Esperá un momento antes de volver a intentar." });
  }

  const body = parseRequestBody(request.body);
  const email = normalizeEmail(body.email);
  const consentGiven = body.consentimiento === true || body.consentimiento === "true";
  response.setHeader(
    "X-Olmond-Newsletter-Debug",
    [
      typeof request.body,
      Object.keys(body).sort().join(","),
      isValidEmail(email) ? "email-ok" : "email-bad",
      typeof body.consentimiento,
      String(body.consentimiento ?? "missing"),
      String(body.website ?? "") ? "honeypot" : "no-honeypot",
    ].join("|").slice(0, 240),
  );
  if (
    JSON.stringify(body).length > 4096 ||
    String(body.website ?? "").trim() ||
    !isValidEmail(email) ||
    !consentGiven
  ) {
    return response.status(400).json({ success: false, message: "No pudimos registrar la suscripción." });
  }

  const webhookUrl = safeWebhookUrl();
  if (!webhookUrl) {
    return response.status(503).json({ success: false, message: "El servicio está temporalmente no disponible." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...body,
        email,
        consentimiento: true,
        fecha_alta: new Date().toISOString(),
      }),
      signal: controller.signal,
      redirect: "error",
    });
    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || result?.success !== true) {
      return response.status(400).json({ success: false, message: "No pudimos registrar la suscripción." });
    }
    return response.status(200).json({ success: true, message: "Suscripción registrada." });
  } catch {
    return response.status(502).json({ success: false, message: "No pudimos registrar la suscripción." });
  } finally {
    clearTimeout(timeout);
  }
}

export {
  isRateLimited,
  isValidEmail,
  normalizeEmail,
  parseRequestBody,
  safeWebhookUrl,
};
