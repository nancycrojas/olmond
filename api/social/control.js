import crypto from "node:crypto";

const DEFAULT_WEBHOOK_URL =
  "https://olmond.app.n8n.cloud/webhook/olmond-social-control-v1";
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;
const MAX_BODY_BYTES = 24_000;
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

function parseBody(value) {
  if (value && typeof value === "object") return value;
  try { return JSON.parse(String(value ?? "{}")); } catch { return {}; }
}

function tokenOf(value) {
  const token = String(value ?? "").trim();
  return /^[A-Za-z0-9_-]{32,160}$/.test(token) ? token : "";
}

function normalizeSourceUrls(value) {
  const entries = Array.isArray(value) ? value : String(value ?? "").split(/[\n,]/u);
  return [...new Set(entries.map((entry) => String(entry).trim()).filter(Boolean))]
    .map((entry) => {
      const url = new URL(entry);
      if (url.protocol !== "https:") throw new Error("source_url_invalid");
      return url.toString();
    })
    .slice(0, 12);
}

function normalizeRequest(body) {
  const mode = String(body.mode ?? "").trim().toLowerCase();
  if (!new Set(["manual", "urgent"]).has(mode)) throw new Error("mode_invalid");

  const nonce = String(body.client_request_nonce ?? "").trim().toLowerCase();
  if (!/^[a-f0-9-]{20,64}$/.test(nonce)) throw new Error("nonce_invalid");

  if (!Array.isArray(body.topics) || body.topics.length < 1 || body.topics.length > 3) {
    throw new Error("topics_invalid");
  }

  const topics = body.topics.map((raw, index) => {
    const requestedTopic = String(raw?.requested_topic ?? "").replace(/\s+/gu, " ").trim();
    const instructions = String(raw?.editorial_instructions ?? "").trim();
    const slotKey = String(raw?.slot_key ?? `s${index + 1}`).trim().toLowerCase();
    const scheduledAt = String(raw?.scheduled_at ?? "").trim();
    if (requestedTopic.length < 8 || requestedTopic.length > 1200) throw new Error("topic_invalid");
    if (instructions.length > 4000) throw new Error("instructions_invalid");
    if (!/^(?:s[123]|urgent_[a-z0-9_-]{1,38})$/.test(slotKey)) throw new Error("slot_invalid");
    if (mode === "manual" && !Number.isFinite(Date.parse(scheduledAt))) throw new Error("schedule_invalid");
    const sourceUrls = normalizeSourceUrls(raw?.source_urls ?? []);
    return {
      requested_topic: requestedTopic,
      editorial_instructions: instructions,
      slot_key: mode === "urgent" ? `urgent_${nonce.slice(0, 12)}_${index + 1}` : slotKey,
      scheduled_at: mode === "urgent" ? "" : new Date(scheduledAt).toISOString(),
      source_urls: sourceUrls,
      priority: mode === "urgent" ? 100 : 80,
    };
  });

  const request = {
    mode,
    request_version: 1,
    client_request_nonce: nonce,
    topics,
  };
  const canonical = JSON.stringify(request);
  return {
    ...request,
    request_sha256: crypto.createHash("sha256").update(canonical).digest("hex"),
  };
}

function webhookUrl() {
  const value = String(globalThis.process?.env?.N8N_SOCIAL_CONTROL_WEBHOOK_URL ?? DEFAULT_WEBHOOK_URL).trim();
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
  if (JSON.stringify(body).length > MAX_BODY_BYTES) {
    return response.status(413).json({ success: false, message: "La solicitud supera el tamaño permitido." });
  }
  const token = tokenOf(request.method === "GET" ? request.query?.token : body.token);
  if (!token) return response.status(400).json({ success: false, message: "Acceso inválido o vencido." });

  let normalized;
  if (request.method === "POST") {
    try {
      normalized = normalizeRequest(body);
    } catch {
      return response.status(400).json({
        success: false,
        message: "Revisá los temas, las fuentes y los horarios antes de enviar.",
      });
    }
  }

  const upstreamUrl = webhookUrl();
  if (request.method === "GET") upstreamUrl.searchParams.set("token", token);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: request.method === "POST" ? JSON.stringify({ token, ...normalized }) : undefined,
      signal: controller.signal,
      redirect: "error",
    });
    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || !result) {
      const status = upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
      const message = result?.message || "No pudimos registrar la solicitud editorial.";
      return response.status(status).json({ success: false, message });
    }
    return response.status(200).json(result);
  } catch {
    return response.status(502).json({ success: false, message: "No pudimos conectar con el sistema editorial." });
  } finally {
    clearTimeout(timeout);
  }
}

export { limited, normalizeRequest, normalizeSourceUrls, parseBody, tokenOf, webhookUrl };
