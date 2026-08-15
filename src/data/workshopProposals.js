const buildCompanyProposal = ({
  id,
  path,
  companyName,
  recipients,
  showCompanyIntro = false,
  copy = {},
}) => {
  const defaultCopy = {
    navbarTitle: `Workshop IA · ${companyName}`,
    heroTitle: `Inteligencia Artificial Aplicada para ${companyName}`,
    heroAlt: `Centro de distribución de ${companyName} utilizado como imagen principal de la propuesta de workshop de Inteligencia Artificial Aplicada.`,
    introParagraph: showCompanyIntro
      ? `${companyName} cuenta con un importante volumen de información generado por sus sistemas de gestión y herramientas de análisis. En este contexto, incorporar Inteligencia Artificial de manera ordenada permitirá potenciar el trabajo de sus equipos, mejorar la gestión del conocimiento y acompañar el proceso de transformación digital de la organización. Esta propuesta busca brindar herramientas prácticas para que los colaboradores incorporen la IA en sus tareas diarias de forma segura, responsable y alineada con los objetivos de la empresa.`
      : null,
    expectedResultsIntro: `Al finalizar el workshop, ${companyName} contará con colaboradores capaces de:`,
    finalCtaTitle: `Inteligencia Artificial Aplicada para ${companyName}`,
  };

  return {
    id,
    path,
    companyName,
    showCompanyIntro,
    recipients,
    copy: {
      ...defaultCopy,
      ...copy,
    },
  };
};

export const workshopProposals = [
  buildCompanyProposal({
    id: "lagostena",
    path: "propuesta-distribuidora-lagostena",
    companyName: "Distribuidora Mayorista Lagostena",
    showCompanyIntro: true,
    recipients:
      "Administración, Compras, Comercial, Logística y Depósito, Capital Humano",
  }),

  buildCompanyProposal({
    id: "maprin",
    path: "propuesta-maprin",
    companyName: "Maprin S.A.C.I",
    showCompanyIntro: false,
    recipients:
      "Administración, Compras, Comercial, Logística y Depósito, Capital Humano",
  }),

  buildCompanyProposal({
    id: "colegio",
    path: "propuesta-colegio-de-abogados-san-martin",
    companyName: "Colegio de Abogados de San Martín",
    showCompanyIntro: false,
    recipients: "Miembros del Colegio de Abogados de San Martín",
  }),

  {
    id: "general",
    path: "propuesta-de-workshop",
    companyName: null,
    showCompanyIntro: true,
    recipients:
      "Equipos de trabajo, áreas operativas, administrativas y de gestión",
    copy: {
      navbarTitle: "Workshop de Inteligencia Artificial Aplicada",
      heroTitle: "Inteligencia Artificial Aplicada para Empresas",
      heroAlt:
        "Imagen ilustrativa utilizada como portada de la propuesta de Workshop de Inteligencia Artificial Aplicada.",
      introParagraph:
        "Todas las organizaciones generan diariamente grandes volúmenes de información a través de sus sistemas de gestión, documentos y herramientas de trabajo. Incorporar Inteligencia Artificial de manera ordenada permite potenciar el trabajo de los equipos, mejorar la gestión del conocimiento y acompañar los procesos de transformación digital. Esta propuesta brinda herramientas prácticas para que los colaboradores incorporen la IA en sus tareas diarias de forma segura, responsable y alineada con los objetivos de la organización.",
      expectedResultsIntro:
        "Al finalizar el workshop, la organización contará con colaboradores capaces de:",
      finalCtaTitle: "Workshop de Inteligencia Artificial Aplicada",
    },
  },
];
