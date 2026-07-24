const DEFAULT_WEBHOOK_URL =
  "https://olmond.app.n8n.cloud/webhook/olmond-social-review-v1";
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const attempts = new Map();

function clientKey(request) {
  return String(request.headers["x-forwarded-for"] ?? request.socket?.remoteAddress ?? "unknown")
    .split(",")[0].trim();
}

function limited(key, now = Date.now()) {
  const current = attempts.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    attempts.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function tokenOf(value) {
  const token = String(value ?? "").trim();
  return /^[A-Za-z0-9_-]{24,160}$/.test(token) ? token : "";
}

function parseBody(value) {
  if (value && typeof value === "object") return value;
  try { return JSON.parse(String(value ?? "{}")); } catch { return {}; }
}

function webhookUrl() {
  const value = String(globalThis.process?.env?.N8N_SOCIAL_REVIEW_WEBHOOK_URL ?? DEFAULT_WEBHOOK_URL).trim();
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== "olmond.app.n8n.cloud" || !url.pathname.startsWith("/webhook/")) {
    throw new Error("invalid_webhook");
  }
  return url;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (!new Set(["GET", "POST"]).has(request.method)) {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ success: false, message: "Método no permitido." });
  }
  if (limited(clientKey(request))) {
    return response.status(429).json({ success: false, message: "Esperá un momento antes de volver a intentar." });
  }
  const body = request.method === "POST" ? parseBody(request.body) : {};
  const token = tokenOf(request.method === "GET" ? request.query?.token : body.token);
  if (!token || JSON.stringify(body).length > 40_000) {
    return response.status(400).json({ success: false, message: "Revisión inválida o vencida." });
  }
  const upstreamUrl = webhookUrl();
  if (request.method === "GET") upstreamUrl.searchParams.set("token", token);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: request.method === "POST" ? JSON.stringify({ ...body, token }) : undefined,
      signal: controller.signal,
      redirect: "error",
    });
    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || !result) {
      const status = upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
      const message =
        (result && typeof result.message === "string" && result.message.trim()) ||
        "No pudimos procesar la revisión.";
      return response.status(status).json({ success: false, message });
    }
    return response.status(200).json(result);
  } catch {
    return response.status(502).json({ success: false, message: "No pudimos conectar con el sistema editorial." });
  } finally {
    clearTimeout(timeout);
  }
}

export { limited, parseBody, tokenOf, webhookUrl };
