import {
  callNewsletterWebhook,
  isValidToken,
  resolveWebhookUrl,
  sendHtml,
} from "../../shared/newsletterApi.js";

const WEBHOOK_PATH = "olmond-newsletter-unsubscribe-v2";

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
      message: "No se realizó ningún cambio sobre tu suscripción.",
    });
  }

  const webhookUrl = resolveWebhookUrl(
    "N8N_NEWSLETTER_UNSUBSCRIBE_WEBHOOK_URL",
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
        title: "No pudimos procesar la baja",
        message: "Intentá nuevamente o escribinos a hola@olmondconsulting.com.",
      });
    }
    return sendHtml(response, 200, {
      success: true,
      title: "Suscripción cancelada",
      message: "La baja quedó registrada y no vas a recibir nuevos envíos.",
    });
  } catch {
    return sendHtml(response, 502, {
      success: false,
      title: "No pudimos procesar la baja",
      message: "Intentá nuevamente o escribinos a hola@olmondconsulting.com.",
    });
  }
}
