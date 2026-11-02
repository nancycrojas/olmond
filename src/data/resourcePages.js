const riskReference = {
  label: "NIST · Marco de gestión de riesgos de IA",
  href: "https://www.nist.gov/itl/ai-risk-management-framework",
};
const generativeReference = {
  label: "NIST · Perfil de riesgos de IA generativa",
  href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
};

// The same content drives the page, its metadata and the prerendered document.
export const resourcePages = [
  {
    path: "/guias/automatizar-tareas-repetitivas.html",
    kind: "guide", label: "Guía práctica", title: "Automatizar tareas", accent: "sin perder el control.",
    metaTitle: "Cómo automatizar tareas repetitivas | Olmond Consulting",
    description: "Cómo elegir un proceso, combinar reglas e IA, probar excepciones y medir el resultado completo de una automatización.",
    intro: "Elegí qué automatizar, cómo probarlo y qué controles necesitás para que la mejora se sostenga en el trabajo diario.",
    back: "/#faq-herramientas", backLabel: "Volver a la pregunta",
    summary: "Una tarea repetitiva es un punto de partida. Para automatizarla necesitás entender sus variaciones, las decisiones que contiene y las consecuencias de un error.",
    sections: [
      { title: "Entendé el proceso completo", paragraphs: [
        "Delimitá qué inicia el trabajo, qué información entra y cuándo se considera terminado. Registrá quién interviene, cuánto tiempo dedica y en qué situaciones tiene que corregir o pedir ayuda. Una tarea frecuente puede esconder excepciones que cambian por completo la solución.",
        "Elegí un proceso con un responsable, datos accesibles y un resultado verificable. Si las reglas cambian continuamente o nadie puede explicar cómo se resuelven los casos difíciles, primero conviene ordenar el trabajo. Automatizar ese desorden puede hacerlo más rápido, pero también más difícil de detectar."
      ] },
      { title: "Separá reglas de interpretación", paragraphs: [
        "Cuando la decisión puede expresarse mediante condiciones explícitas, suele convenir una regla: verificar un campo obligatorio, calcular un total o asignar una solicitud según una categoría ya definida. La IA puede aportar cuando hace falta interpretar texto, extraer información de documentos variables o proponer una clasificación.",
        "Una respuesta plausible no garantiza que sea correcta. Por eso, las salidas de IA necesitan validaciones acordes con la tarea: formato, datos admitidos, consistencia con la fuente y revisión de los casos ambiguos. Un puntaje de confianza generado por el propio modelo no reemplaza una evaluación con ejemplos reales."
      ] },
      { title: "Definí qué puede hacer y qué debe consultar", paragraphs: [
        "Separá leer información, preparar una propuesta y ejecutar una acción. Cada paso necesita permisos específicos. Las operaciones que comprometen dinero, modifican registros relevantes o afectan a personas requieren controles proporcionales a su impacto, incluida la aprobación humana cuando corresponda.",
        "También hay que prever fallos de conexión, datos incompletos y solicitudes repetidas. Un reintento no debería duplicar una operación ya realizada: eso exige identificar cada solicitud y comprobar su estado. Conservá registros suficientes para reconstruir lo ocurrido, evitando guardar información sensible que no sea necesaria."
      ], example: "Ejemplo ilustrativo: un flujo puede clasificar un correo, proponer una respuesta y dejarla para revisión. Enviar el mensaje o modificar la cuenta del cliente son acciones diferentes y deben tener sus propios permisos y condiciones." },
      { title: "Probá las excepciones antes de ampliar", paragraphs: [
        "La prueba debe incluir casos habituales y casos difíciles: documentos incompletos, solicitudes duplicadas, respuestas inesperadas y servicios externos no disponibles. Definí antes qué resultado es aceptable, cuándo se deriva a una persona y cómo se detiene el proceso.",
        "Empezá con un volumen acotado. Compará los resultados con una referencia revisada por quienes conocen el trabajo y reservá casos que no se hayan usado para ajustar la solución. Antes de ampliar, comprobá también cómo se recuperan operaciones pendientes y quién responde ante un incidente."
      ] },
      { title: "Medí la mejora de punta a punta", paragraphs: [
        "Compará tiempo de trabajo, errores, correcciones y costo por caso resuelto. Incluí la supervisión, el mantenimiento y el consumo de servicios. Ahorrar minutos en una etapa no alcanza si después aumentan las revisiones o las demoras en otra.",
        "Revisá esos indicadores cuando cambien el proceso, los datos o las herramientas. La automatización necesita un responsable que pueda detectar desvíos, ajustar las reglas y decidir cuándo conviene volver temporalmente al procedimiento manual."
      ] }
    ],
    takeaway: "Antes de ampliar, deberías poder explicar qué resuelve el flujo, qué puede salir mal, cómo se detecta y quién interviene.",
    references: [riskReference, generativeReference],
  },
  {
    path: "/guias/como-empezar-con-ia.html",
    kind: "guide", label: "Guía práctica", title: "Tu primer proyecto de IA", accent: "empieza por una decisión.",
    metaTitle: "Cómo empezar con IA en tu empresa | Olmond Consulting",
    description: "Un criterio para elegir el primer proyecto de IA: problema, datos, riesgo, prueba acotada y resultados que permitan decidir cómo seguir.",
    intro: "Elegí un problema concreto, definí cómo vas a evaluar la mejora y avanzá con una prueba que tu equipo pueda sostener.",
    back: "/#faq-empezar", backLabel: "Volver a la pregunta",
    summary: "El primer proyecto tiene que producir evidencia útil para decidir. Su valor depende de resolver una necesidad real, con un alcance y un riesgo que puedas gestionar.",
    sections: [
      { title: "Definí el problema de negocio", paragraphs: [
        "Describí qué ocurre hoy, a quién afecta y qué resultado necesitás mejorar. Es más útil hablar de demoras al responder consultas o de correcciones en un reporte que de incorporar una herramienta de IA sin una tarea definida.",
        "Medí el punto de partida con casos representativos: volumen, tiempo dedicado, errores y calidad esperada. Acordá quién es responsable del proceso y quién puede validar el resultado. Sin esa referencia, una demostración convincente puede confundirse con una mejora que todavía no fue comprobada."
      ] },
      { title: "Compará alternativas posibles", paragraphs: [
        "La solución puede ser simplificar un procedimiento, mejorar una planilla, conectar sistemas o incorporar IA. Compará esas alternativas según el problema que resuelven, el esfuerzo de implementación y el costo de mantenerlas.",
        "La IA generativa puede ayudar a redactar, resumir o interpretar información variable. Cuando el resultado depende de reglas precisas o cálculos verificables, conviene conservar controles deterministas. Un proyecto puede combinar ambos enfoques sin delegar todas las decisiones al modelo."
      ] },
      { title: "Revisá datos, viabilidad y riesgo", paragraphs: [
        "Comprobá si la información está disponible, es suficientemente consistente y puede utilizarse para el propósito previsto. Revisá también los permisos de acceso, las integraciones y las condiciones del servicio que procesaría los datos.",
        "La prioridad no depende solo del ahorro potencial. Importan la posibilidad de evaluar el resultado, el impacto de equivocarse y la capacidad del equipo para supervisar. Para empezar, suele ser conveniente una tarea acotada y reversible, con una persona que revise antes de que el resultado tenga efectos relevantes."
      ] },
      { title: "Diseñá una prueba que permita decidir", paragraphs: [
        "Definí una hipótesis verificable: qué debería mejorar y qué no debería deteriorarse. Elegí indicadores de tiempo y calidad, un presupuesto, un período de prueba y condiciones para continuar, ajustar o detener el proyecto.",
        "Probá con casos habituales y excepciones. Compará contra el procedimiento actual y registrá los errores, incluida la carga de revisión. Si cambiás la solución durante la prueba, reservá ejemplos nuevos para evaluar si la mejora se mantiene fuera de los casos utilizados para ajustarla."
      ], example: "Ejemplo ilustrativo: preparar borradores de respuestas puede ser una primera prueba. El equipo compara exactitud, pertinencia y tiempo total de revisión; los mensajes se envían únicamente después de una aprobación." },
      { title: "Prepará la operación cotidiana", paragraphs: [
        "Antes de extender el uso, documentá el procedimiento, asigná responsables y capacitá a quienes van a utilizarlo. Acordá qué se revisa, cómo se informa un error y qué alternativa se usa si la herramienta deja de estar disponible.",
        "Una prueba exitosa no demuestra por sí sola que la solución esté lista para toda la empresa. La ampliación requiere revisar volumen, costos, permisos y soporte. Cada decisión de crecimiento debería apoyarse en resultados observados, no únicamente en expectativas."
      ] }
    ],
    takeaway: "Empezá por un proceso que puedas describir, medir y supervisar. La herramienta se elige después de entender esas condiciones.",
    references: [riskReference],
  },
  {
    path: "/guias/cuanto-cuesta-implementar-ia.html",
    kind: "guide", label: "Guía práctica", title: "Evaluá la inversión", accent: "más allá de la licencia.",
    metaTitle: "Cuánto cuesta implementar IA en una empresa | Olmond Consulting",
    description: "Qué incluir al evaluar una inversión en IA: implementación, operación, revisión humana, mantenimiento y beneficios que puedan comprobarse.",
    intro: "Una propuesta se evalúa por el trabajo que resuelve, lo que incluye y el costo de sostenerla durante su uso.",
    back: "/#faq-costos", backLabel: "Volver a la pregunta",
    summary: "No hay un precio único para implementar IA. El alcance, las integraciones, la calidad de los datos y los controles necesarios cambian el esfuerzo y el costo del proyecto.",
    sections: [
      { title: "Separá implementación y operación", paragraphs: [
        "La inversión inicial puede incluir relevamiento, preparación de datos, diseño, desarrollo, integración, pruebas, documentación y capacitación. Es importante saber cuáles de esas actividades están contempladas y cuáles dependen de tu equipo.",
        "La operación puede sumar licencias, infraestructura, consumo de modelos, almacenamiento, soporte y mantenimiento. Incluí también el tiempo de las personas que revisan resultados y resuelven excepciones. El precio de una herramienta representa solo una parte del costo total."
      ] },
      { title: "Identificá qué cambia el presupuesto", paragraphs: [
        "El volumen de trabajo, la cantidad de sistemas involucrados y el estado de los datos afectan la complejidad. También influyen los permisos, la disponibilidad requerida y las consecuencias de un error. Dos soluciones con una interfaz parecida pueden necesitar controles muy diferentes.",
        "Pedí que los supuestos queden explícitos: número de usuarios, volumen previsto, integraciones incluidas y tareas de revisión. Si un servicio se cobra por consumo, conviene estimar distintos niveles de uso y definir cómo se detectan y gestionan los desvíos."
      ] },
      { title: "Compará propuestas con el mismo alcance", paragraphs: [
        "Una comparación útil considera entregables, criterios de aceptación, responsabilidades, plazo y soporte posterior. Revisá quién conserva la documentación, cómo se administran los accesos y qué ocurre cuando cambia una herramienta o termina el servicio.",
        "Preguntá qué queda fuera: limpieza de datos, nuevas integraciones, ajustes por cambios del proceso o ampliaciones de volumen. El presupuesto debería permitir distinguir una corrección incluida de una modificación que requiere un nuevo alcance."
      ] },
      { title: "No confundas tiempo liberado con ahorro", paragraphs: [
        "Reducir tiempo de una tarea puede liberar capacidad, mejorar el servicio o permitir absorber más trabajo. Ese beneficio no se convierte automáticamente en una reducción de gastos: depende de cómo se utilice la capacidad disponible y de qué costos cambien efectivamente.",
        "Para evaluar el resultado, compará beneficios y costos incrementales durante un mismo período. Evitá contar dos veces el mismo efecto, por ejemplo, como horas ahorradas y como ingresos adicionales sin explicar la relación entre ambos. Cuando la evidencia sea limitada, trabajá con escenarios y supuestos visibles."
      ], example: "Ejemplo ilustrativo: si un equipo prepara reportes más rápido pero mantiene la misma estructura de costos, el beneficio inmediato puede ser capacidad disponible y menor demora. Su valor debe evaluarse según el uso que la empresa haga de ese tiempo." },
      { title: "Invertí por etapas verificables", paragraphs: [
        "Una prueba acotada permite contrastar utilidad, calidad y costo antes de comprometer una implementación mayor. Acordá qué se necesita aprender, cuánto se va a invertir y con qué evidencia se decidirá el siguiente paso.",
        "La prueba también tiene un costo. Conviene que deje resultados reutilizables: criterios de evaluación, documentación del proceso y una estimación más precisa de la operación. La decisión puede ser ampliar, ajustar o no continuar."
      ] }
    ],
    takeaway: "Un presupuesto sólido permite entender qué vas a recibir, qué necesitás aportar y qué costos seguirán existiendo después de la puesta en marcha.",
  },
  {
    path: "/servicios/consultoria-ia-pymes.html",
    kind: "service", label: "Consultoría", title: "Definí dónde aplicar IA", accent: "y en qué orden.",
    metaTitle: "Consultoría de IA para empresas | Olmond Consulting",
    description: "Consultoría para evaluar oportunidades de IA, comparar alternativas y definir una hoja de ruta con alcance, responsables e indicadores.",
    intro: "Analizamos tus procesos y te ayudamos a decidir qué conviene mejorar, qué requiere preparación y qué no justifica una inversión.",
    back: "/#que-hacemos", backLabel: "Volver a servicios",
    summary: "Una decisión de inversión necesita conectar una necesidad del negocio con una solución viable. Evaluamos impacto, esfuerzo, riesgo y capacidad de implementación.",
    sections: [
      { title: "Partimos del trabajo real", paragraphs: [
        "Relevamos cómo se realiza el proceso, qué información utiliza y dónde aparecen demoras, correcciones o tareas innecesarias. Contrastamos la visión de quienes deciden con la experiencia de quienes ejecutan el trabajo.",
        "El objetivo es construir una referencia compartida: problema, causas probables, volumen, responsables y resultado esperado. Esa base permite evitar que la elección de una herramienta reemplace la definición del problema."
      ] },
      { title: "Comparamos oportunidades y alternativas", paragraphs: [
        "Evaluamos si conviene simplificar, automatizar mediante reglas o incorporar IA. Revisamos la disponibilidad de datos, las integraciones, la posibilidad de medir el resultado y los controles que requeriría cada alternativa.",
        "La priorización considera el beneficio esperado junto con el esfuerzo, la incertidumbre y el impacto de una falla. Los supuestos quedan explícitos para que puedan revisarse cuando aparezca nueva información."
      ] },
      { title: "Definimos una hoja de ruta", paragraphs: [
        "Organizamos las oportunidades en una secuencia de trabajo con dependencias, responsables e indicadores. Para la iniciativa priorizada, delimitamos alcance, entregables y criterios que permitan decidir si avanzar.",
        "Cuando hay incertidumbre relevante, proponemos una validación acotada antes de ampliar la inversión. El resultado de esa prueba debe servir para confirmar, ajustar o descartar la solución."
      ] },
      { title: "Dejamos decisiones documentadas", paragraphs: [
        "Según el alcance acordado, recibís el relevamiento del proceso, la priorización de oportunidades y una hoja de ruta con objetivos medibles. Las recomendaciones explican qué evidencia las respalda y qué falta comprobar.",
        "Acordamos de antemano la participación de tu equipo y los entregables. Una consultoría puede preparar una implementación posterior, pero no implica contratarla: la decisión queda en tus manos."
      ] }
    ],
    takeaway: "Una buena hoja de ruta también explica qué no conviene hacer todavía y qué condiciones tendrían que cambiar para reconsiderarlo.",
  },
  {
    path: "/servicios/automatizacion-ia.html",
    kind: "service", label: "Desarrollos", title: "Llevá la IA", accent: "al trabajo cotidiano.",
    metaTitle: "Automatización y agentes de IA para empresas | Olmond Consulting",
    description: "Desarrollo de automatizaciones, asistentes y agentes de IA conectados con tus sistemas, con pruebas, controles y documentación.",
    intro: "Diseñamos e implementamos soluciones para procesos concretos, conectadas con las herramientas que tu equipo ya usa.",
    back: "/#que-hacemos", backLabel: "Volver a servicios",
    summary: "La solución debe ser útil para quienes la operan y controlable para quienes responden por el proceso. El alcance incluye cómo funciona y qué ocurre cuando falla.",
    sections: [
      { title: "Elegimos la arquitectura según la tarea", paragraphs: [
        "Un flujo de reglas ejecuta pasos definidos; un asistente ayuda a una persona; un agente puede seleccionar acciones y utilizar herramientas dentro de un alcance autorizado. Son opciones distintas y no requieren el mismo grado de autonomía.",
        "Combinamos esos recursos según el objetivo, las integraciones y el impacto de una decisión incorrecta. Buscamos que cada componente tenga una función clara y que la complejidad sea proporcional al problema."
      ] },
      { title: "Conectamos datos y herramientas", paragraphs: [
        "Revisamos qué sistemas pueden integrarse, cómo se autentican y qué información necesitan intercambiar. Definimos formatos, validaciones y permisos antes de habilitar acciones sobre registros o comunicaciones.",
        "El contenido de un documento o mensaje externo se trata como información a procesar, no como una autorización para cambiar las reglas del sistema. Los permisos y las validaciones se aplican fuera del modelo cuando protegen acciones relevantes."
      ] },
      { title: "Probamos calidad y comportamiento", paragraphs: [
        "Acordamos casos de evaluación y criterios de aceptación antes de la puesta en marcha. Probamos el resultado esperado y las excepciones: datos incompletos, herramientas no disponibles, solicitudes repetidas y respuestas que necesitan revisión.",
        "También comprobamos límites de ejecución, manejo de errores y mecanismos para detener o recuperar el proceso. La supervisión se define según el riesgo de cada acción, con responsables identificados."
      ] },
      { title: "Preparamos la continuidad", paragraphs: [
        "La entrega incluye la documentación y la preparación del equipo previstas en el alcance. Dejamos claro cómo operar la solución, revisar resultados y atender incidentes.",
        "Los modelos, los servicios externos y los procesos cambian. Por eso acordamos qué seguimiento necesita la solución, quién realiza los ajustes y cómo se evalúa una modificación antes de llevarla a producción."
      ] }
    ],
    takeaway: "La autonomía se amplía cuando la evidencia y los controles lo permiten. Cada acción debe tener un propósito, un límite y un responsable.",
    references: [generativeReference],
  },
  {
    path: "/servicios/automatizacion-n8n.html",
    kind: "service", label: "Automatización con n8n", title: "Conectá tus herramientas.", accent: "Ordená el proceso.",
    metaTitle: "Automatización con n8n | Olmond Consulting",
    description: "Diseño y revisión de workflows en n8n: integraciones, permisos, manejo de errores, prevención de duplicados y continuidad operativa.",
    intro: "Diseñamos flujos en n8n para conectar sistemas y reducir tareas manuales, con visibilidad sobre lo que ocurre en cada ejecución.",
    back: "/#que-hacemos", backLabel: "Volver a servicios",
    summary: "Conectar aplicaciones es una parte del trabajo. La confiabilidad depende también de los datos, los permisos y el tratamiento de las excepciones.",
    sections: [
      { title: "Delimitamos el flujo y sus responsabilidades", paragraphs: [
        "Definimos qué evento inicia la ejecución, qué sistemas participan y cuál es el resultado esperado. Revisamos las credenciales, los permisos y las restricciones de cada integración antes de diseñar la secuencia.",
        "Cuando el proceso requiere interpretación, podemos incorporar IA en etapas específicas. Las comprobaciones de formato, permisos y estado de una operación se mantienen como controles explícitos."
      ] },
      { title: "Diseñamos el tratamiento de errores", paragraphs: [
        "Distinguimos fallos transitorios, datos inválidos y problemas de configuración. No todos se resuelven repitiendo una solicitud. Definimos reintentos acotados, esperas cuando corresponden y una derivación clara cuando el flujo no puede continuar.",
        "n8n permite revisar ejecuciones y configurar workflows de error. Esas capacidades necesitan una configuración acorde con el proceso: qué se conserva, quién recibe una alerta y qué información permite investigar el incidente sin exponer datos innecesarios."
      ] },
      { title: "Controlamos duplicados y concurrencia", paragraphs: [
        "Si una solicitud se repite o dos ejecuciones actúan sobre el mismo registro, el resultado no debería depender del azar. Diseñamos identificadores de operación, comprobaciones de estado y mecanismos de coordinación cuando el caso lo requiere.",
        "La prevención de duplicados no se obtiene automáticamente por conectar nodos. Debe comprobarse también en los sistemas de destino y en la recuperación de ejecuciones interrumpidas, especialmente si hubo acciones que ya se completaron."
      ] },
      { title: "Entregamos un flujo que pueda operarse", paragraphs: [
        "Probamos casos normales, excepciones y recuperación antes de habilitar el uso acordado. Documentamos dependencias, accesos, responsables y criterios para detener el flujo.",
        "La modalidad de alojamiento se evalúa según seguridad, volumen y capacidad de mantenimiento. Si la organización administra su propia instancia, también necesita responsables de actualizaciones, respaldos y recuperación. La herramienta no reemplaza esas tareas."
      ] }
    ],
    takeaway: "Un flujo confiable permite saber qué ocurrió, evitar efectos duplicados y recuperar el trabajo sin depender de quien lo construyó.",
    references: [{ label: "n8n · Manejo de errores y ejecuciones", href: "https://docs.n8n.io/flow-logic/error-handling/" }],
  },
  {
    path: "/servicios/capacitacion-ia-empresas.html",
    kind: "service", label: "Capacitaciones", title: "Que tu equipo sepa usar IA", accent: "con criterio.",
    metaTitle: "Capacitación en IA para empresas | Olmond Consulting",
    description: "Capacitación práctica en IA y ChatGPT para equipos: tareas reales, evaluación de resultados, cuidado de la información y criterios de uso.",
    intro: "Trabajamos con las tareas de tu equipo para que pueda elegir cuándo usar IA, cómo pedir un resultado y cómo revisar si sirve.",
    back: "/#que-hacemos", backLabel: "Volver a servicios",
    summary: "Aprender a usar una herramienta es el comienzo. La formación debe ayudar a transferir lo aprendido al trabajo, con criterios de calidad y responsabilidades claras.",
    sections: [
      { title: "Partimos de las tareas del equipo", paragraphs: [
        "Acordamos objetivos, perfiles y situaciones de uso antes de definir los contenidos. Una capacitación para análisis, atención al cliente o gestión necesita ejercicios diferentes y criterios de evaluación propios.",
        "Seleccionamos ejemplos pertinentes sin exponer información confidencial. Cuando corresponde, trabajamos con datos ficticios o preparados para la actividad, conservando la lógica del problema que el equipo necesita resolver."
      ] },
      { title: "Enseñamos a pedir y a evaluar", paragraphs: [
        "Practicamos cómo formular una tarea, aportar contexto, definir restricciones y especificar el resultado esperado. También cómo iterar cuando la primera respuesta es incompleta o incorrecta.",
        "La evaluación es parte del ejercicio: contrastar con fuentes, detectar omisiones, revisar cálculos y reconocer cuándo hace falta intervención especializada. Una redacción convincente no demuestra que el contenido sea verdadero."
      ] },
      { title: "Acordamos criterios de uso responsable", paragraphs: [
        "Trabajamos sobre qué información puede compartirse, qué herramientas están autorizadas y qué resultados requieren revisión. Las reglas deben ser comprensibles y aplicables a las decisiones del día a día.",
        "La responsabilidad por el uso del resultado sigue siendo de las personas y de la organización. Por eso abordamos límites, errores habituales y situaciones en las que conviene no delegar la tarea."
      ] },
      { title: "Buscamos transferencia al trabajo", paragraphs: [
        "Las actividades dejan procedimientos, ejemplos y criterios que el equipo pueda reutilizar. Según el alcance, acordamos una práctica posterior y una instancia para revisar su aplicación.",
        "El aprendizaje se evalúa por la capacidad de resolver y revisar una tarea, no solo por la asistencia o la satisfacción con el encuentro. La modalidad, la duración y los entregables se definen según los objetivos y el punto de partida."
      ] }
    ],
    takeaway: "El objetivo es que tu equipo pueda trabajar mejor, evaluar la calidad de un resultado y reconocer sus límites.",
    references: [generativeReference],
  },
  {
    path: "/equipo/patricio-rouan.html",
    kind: "profile", label: "Quién está detrás", title: "Patricio Rouan", accent: "Experiencia aplicada.",
    metaTitle: "Patricio Rouan | Consultor y docente de IA | Olmond Consulting",
    description: "Perfil profesional de Patricio Rouan, fundador de Olmond Consulting, consultor y docente en inteligencia artificial aplicada.",
    intro: "Fundador de Olmond Consulting. Consultor y docente en inteligencia artificial, con foco en su aplicación a los procesos de las empresas.",
    back: "/#nosotros", backLabel: "Volver a nosotros",
    summary: "Combina consultoría, docencia y experiencia emprendedora para acompañar decisiones de adopción de IA, formación de equipos e implementación de soluciones.",
    sections: [
      { title: "Consultoría e implementación", paragraphs: ["En Olmond Consulting trabaja sobre la identificación de oportunidades, la evaluación de alternativas y la aplicación de IA y automatización a procesos concretos. El enfoque parte del problema de negocio y de la capacidad de la organización para operar la solución.", "La formación del equipo, la documentación y la evaluación de resultados forman parte de ese trabajo. El propósito es que las decisiones puedan entenderse y que la organización conserve el control del proceso."] },
      { title: "Docencia y formación", paragraphs: ["Desarrolla actividad docente en UTN, UBA y UNSAM, y participa como tutor de posgrado en UCEMA. Su trabajo de formación aborda el uso práctico de la inteligencia artificial y la automatización en contextos profesionales.", "En las capacitaciones para empresas, los contenidos se adaptan a los objetivos y las tareas de cada equipo. La práctica incluye tanto la producción de resultados como su revisión y la comprensión de los límites de las herramientas."] },
      { title: "Participación profesional", paragraphs: ["Es Asesor Principal de la Sociedad Argentina de Inteligencia Artificial. Su participación profesional se vincula con la adopción de IA y el desarrollo de capacidades para utilizarla de forma responsable.", "Estas actividades corresponden a su trayectoria personal. Los servicios de Olmond Consulting se definen mediante un alcance propio y no implican aval institucional de las organizaciones mencionadas."] }
    ],
    takeaway: "El criterio de trabajo: entender el problema, decidir con evidencia y preparar a las personas que van a usar la solución.",
  },
];

export const resourceByPath = Object.fromEntries(resourcePages.map(page => [page.path, page]));

const origin = "https://www.olmondconsulting.com";
const escapeHtml = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function resourceHead(page) {
  const url = origin + page.path;
  const name = `${page.title} ${page.accent}`;
  const organization = { "@type": "Organization", "@id": origin + "/#organization", name: "Olmond Consulting", url: origin + "/", logo: origin + "/logo.png", email: "hola@olmondconsulting.com", sameAs: ["https://www.linkedin.com/company/olmond-consulting", "https://www.instagram.com/olmondconsulting/"] };
  const graph = [organization,
    { "@type": "WebSite", "@id": origin + "/#website", name: "Olmond Consulting", url: origin + "/", inLanguage: "es", publisher: { "@id": organization["@id"] } },
    { "@type": "WebPage", "@id": url + "#webpage", name, url, description: page.description, inLanguage: "es", isPartOf: { "@id": origin + "/#website" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: origin + "/" }, { "@type": "ListItem", position: 2, name, item: url }] },
  ];
  if (page.kind === "guide") graph.push({ "@type": "Article", headline: name, description: page.description, inLanguage: "es", author: { "@id": organization["@id"] }, publisher: { "@id": organization["@id"] }, mainEntityOfPage: { "@id": url + "#webpage" }, dateModified: "2026-11-02T22:50:39+00:00" });
  if (page.kind === "service") graph.push({ "@type": "Service", name, url, description: page.description, provider: { "@id": organization["@id"] } });
  if (page.kind === "profile") graph.push({ "@type": "Person", "@id": origin + "/#patricio-rouan", name: "Patricio Rouan", url, jobTitle: "Consultor y docente en inteligencia artificial", worksFor: { "@id": organization["@id"] }, sameAs: ["https://www.linkedin.com/in/patricio-rouan/"] });
  return `<title>${escapeHtml(page.metaTitle)}</title>\n<meta name="description" content="${escapeHtml(page.description)}">\n<link rel="canonical" href="${url}">\n<meta property="og:type" content="${page.kind === "guide" ? "article" : "website"}">\n<meta property="og:site_name" content="Olmond Consulting">\n<meta property="og:title" content="${escapeHtml(page.metaTitle)}">\n<meta property="og:description" content="${escapeHtml(page.description)}">\n<meta property="og:url" content="${url}">\n<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script>`;
}
