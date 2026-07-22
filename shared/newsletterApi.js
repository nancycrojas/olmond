const N8N_HOSTNAME = "olmond.app.n8n.cloud";

export function isValidToken(value) {
  return /^[a-f0-9]{64}$/i.test(String(value ?? "").trim());
}

export function resolveWebhookUrl(environmentName, fallbackPath) {
  const raw = String(
    globalThis.process?.env?.[environmentName] ??
      `https://${N8N_HOSTNAME}/webhook/${fallbackPath}`,
  ).trim();

  try {
    const url = new URL(raw);
    if (
      url.protocol !== "https:" ||
      url.hostname !== N8N_HOSTNAME ||
      !url.pathname.startsWith("/webhook/")
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

export async function callNewsletterWebhook(url, token) {
  const target = new URL(url);
  target.searchParams.set("token", token);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const upstream = await fetch(target, {
      method: "GET",
      headers: { Accept: "application/json" },
      redirect: "error",
      signal: controller.signal,
    });
    const payload = await upstream.json().catch(() => null);
    return {
      ok: upstream.ok && payload?.success === true,
      payload,
      status: upstream.status,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderNewsletterPage({ title, message, success }) {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const badge = success ? "Estado actualizado" : "No pudimos completar la acción";

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>${safeTitle} · Olmond Consulting</title>
    <style>
      *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#f4f7fa;color:#171923;font-family:"Open Sans",Arial,sans-serif}.card{width:min(640px,100%);overflow:hidden;border:1px solid #dce3ea;border-radius:24px;background:#fff;box-shadow:0 22px 70px rgba(30,39,65,.1)}.bar{height:7px;background:linear-gradient(135deg,#667eea 0%,#764ba2 55%,#ec4899 100%)}.content{padding:48px}.eyebrow{margin:0 0 18px;color:#6b5dd3;font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase}h1{margin:0;color:#171923;font-family:Raleway,"Open Sans",Arial,sans-serif;font-size:clamp(32px,6vw,46px);font-weight:500;letter-spacing:-.04em;line-height:1.08}p{margin:22px 0 0;color:#5f6673;font-size:17px;line-height:1.75}.button{display:inline-block;margin-top:30px;padding:14px 22px;border-radius:999px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;text-decoration:none;font-weight:700}.footer{margin-top:34px;padding-top:22px;border-top:1px solid #e8edf2;color:#8a909b;font-size:13px;line-height:1.6}@media(max-width:520px){.content{padding:34px 26px}}
    </style>
  </head>
  <body>
    <main class="card">
      <div class="bar"></div>
      <div class="content">
        <p class="eyebrow">${badge}</p>
        <h1>${safeTitle}</h1>
        <p>${safeMessage}</p>
        <a class="button" href="https://www.olmondconsulting.com/">Volver a Olmond</a>
        <div class="footer">Olmond Consulting · IA y automatización aplicada a PyMEs.</div>
      </div>
    </main>
  </body>
</html>`;
}

export function sendHtml(response, status, page) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "no-referrer");
  return response.status(status).send(renderNewsletterPage(page));
}
