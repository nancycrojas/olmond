export const values = [
  {
    title: "team.innovation.title",
    description: "team.innovation.description",
  },
  {
    title: "team.integrity.title",
    description: "team.integrity.description",
  },
  {
    title: "team.collaboration.title",
    description: "team.collaboration.description",
  },
  {
    title: "team.adaptability.title",
    description: "team.adaptability.description",
  },
];

export const WHATSAPP_URL = "https://wa.me/5491133872411";

export const GRADIENT_BRAND = "linear(to-r, #667eea, #764ba2)";
export const GRADIENT_BRAND_BR = "linear(to-br, #667eea, #764ba2)";

export const BRAND_GRADIENT =
  "linear-gradient(135deg, #667eea 0%, #764ba2 62%, #EC4899 120%)";

export const BRAND_ACCENT = "#EC4899";
// TODO: reemplazar por el número real de Olmond

// Endpoint productivo del workflow WF-A en n8n (entrada web con CORS habilitado)
export const N8N_WEBHOOK_URL =
  "https://olmond.app.n8n.cloud/webhook/diagnostico-ia-web";

// IMPORTANTE: las keys (label) deben coincidir EXACTAMENTE con las labels del
// formulario del workflow de n8n. El nodo "Calcular Puntaje y Nivel" mapea por label.
export const FORM_FIELDS = [
  {
    label: "Nombre y apellido",
    type: "text",
    required: true,
    placeholder: "Ej: Ana García",
  },
  {
    label: "Tu correo (acá llega tu resultado)",
    type: "email",
    required: true,
    placeholder: "ana@tuempresa.com",
  },
  {
    label: "Nombre de tu empresa",
    type: "text",
    required: false,
    placeholder: "Ej: Tienda Norte",
  },
  {
    label: "1. ¿Cuál es tu rol en la empresa?",
    type: "select",
    required: true,
    options: [
      "Dueño/a o socio/a",
      "Gerente/a o directivo/a",
      "Mando medio",
      "Empleado/a",
      "Independiente o freelance",
    ],
  },
  {
    label: "2. ¿Cuántas personas trabajan en tu empresa?",
    type: "select",
    required: true,
    options: [
      "Solo yo",
      "2 a 10 personas",
      "11 a 50 personas",
      "51 a 200 personas",
      "Más de 200 personas",
    ],
  },
  {
    label: "3. ¿En qué rubro opera tu empresa?",
    type: "select",
    required: true,
    options: [
      "E-commerce",
      "Retail físico",
      "Retail mixto (físico y online)",
      "Servicios",
      "Otro",
    ],
  },
  {
    label: "4. ¿Cuántas horas semanales dedica tu equipo a tareas repetitivas?",
    type: "select",
    required: true,
    options: [
      "Más de 20 horas",
      "Entre 10 y 20 horas",
      "Entre 5 y 10 horas",
      "Menos de 5 horas",
    ],
  },
  {
    label: "5. ¿Cómo gestionan hoy la atención al cliente?",
    type: "select",
    required: true,
    options: [
      "Todo manual, consulta por consulta",
      "Con templates y respuestas guardadas",
      "Chatbot básico o FAQ automatizada",
      "Sistema con IA que resuelve la mayoría",
    ],
  },
  {
    label: "6. ¿Cómo generan los reportes del negocio?",
    type: "select",
    required: true,
    options: [
      "Planillas armadas a mano cada vez",
      "Planillas con fórmulas que alguien actualiza",
      "Dashboards que se actualizan solos",
      "Dashboards con alertas automáticas",
    ],
  },
  {
    label: "7. ¿Usan herramientas de IA en el día a día?",
    type: "select",
    required: true,
    options: [
      "No, ninguna",
      "Alguien usa ChatGPT por su cuenta",
      "Usamos IA en algunos procesos definidos",
      "La IA está integrada en procesos clave",
    ],
  },
  {
    label: "8. ¿Los datos del negocio están ordenados y accesibles?",
    type: "select",
    required: true,
    options: [
      "Dispersos en papeles, mails y planillas",
      "En planillas, pero desordenados",
      "Centralizados en un sistema",
      "Centralizados y los usamos para decidir",
    ],
  },
  {
    label:
      "9. ¿Qué tan documentados están los procesos principales de la empresa?",
    type: "select",
    required: true,
    options: [
      "No están documentados, cada uno trabaja a su manera",
      "Algunos están claros, pero no escritos",
      "Documentados parcialmente",
      "La mayoría están documentados y se siguen",
    ],
  },
  {
    label: "10. ¿Hay un responsable de mejorar procesos con tecnología?",
    type: "select",
    required: true,
    options: [
      "Nadie",
      "Yo, cuando puedo",
      "Alguien lo tiene como tarea secundaria",
      "Hay un responsable claro",
    ],
  },
  {
    label:
      "11. ¿Facturación mensual aproximada? (opcional: solo la uso para calibrar las recomendaciones, no se comparte)",
    type: "select",
    required: false,
    options: [
      "Menos de USD 5.000",
      "USD 5.000 a 20.000",
      "USD 20.000 a 100.000",
      "Más de USD 100.000",
      "Prefiero no decirlo",
    ],
  },
  {
    label: "12. ¿Cuál es tu principal freno para avanzar con IA?",
    type: "select",
    required: true,
    options: [
      "No sé por dónde empezar",
      "Falta de tiempo",
      "Presupuesto",
      "Resistencia del equipo al cambio",
      "Ya avanzamos, quiero escalar",
    ],
  },
];

export const DIAGNOSTICO_URL = "https://www.olmondconsulting.com/diagnostico";

export const NAV_ITEMS = [
  { label: "Impact Sprint", href: "#impact-sprint" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "Formación", href: "#academy" },
  { label: "Nosotros", href: "#nosotros" },
];
