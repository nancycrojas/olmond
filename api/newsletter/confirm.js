import {
  callNewsletterWebhook,
  isValidToken,
  resolveWebhookUrl,
  sendHtml,
} from "../../shared/newsletterApi.js";

const WEBHOOK_PATH = "olmond-newsletter-confirm-v2";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return sendHtml(response, 405, {
      success: false,
      title: "Método no permitido",
      message: "Abrí el enlace original que recibiste por correo.",
    });
  }

  const token = String(request.query?.token ?? "").trim();
  if (!isValidToken(token)) {
    return sendHtml(response, 400, {
      success: false,
      title: "El enlace no es válido",
      message: "Solicitá una nueva suscripción desde el sitio de Olmond.",
    });
  }

  const webhookUrl = resolveWebhookUrl(
    "N8N_NEWSLETTER_CONFIRM_WEBHOOK_URL",
    WEBHOOK_PATH,
  );
  if (!webhookUrl) {
    return sendHtml(response, 503, {
      success: false,
      title: "Servicio temporalmente no disponible",
      message: "Intentá nuevamente dentro de unos minutos.",
    });
  }

  try {
    const result = await callNewsletterWebhook(webhookUrl, token);
    if (!result.ok) {
      return sendHtml(response, result.status >= 500 ? 502 : 400, {
        success: false,
        title: "No pudimos confirmar la suscripción",
        message: "El enlace puede haber vencido. Volvé a suscribirte para recibir uno nuevo.",
      });
    }
    return sendHtml(response, 200, {
      success: true,
      title: "Suscripción confirmada",
      message: "Vas a recibir la próxima edición el lunes a las 9:00, hora de Buenos Aires.",
    });
  } catch {
    return sendHtml(response, 502, {
      success: false,
      title: "No pudimos confirmar la suscripción",
      message: "Intentá nuevamente dentro de unos minutos.",
    });
  }
}
