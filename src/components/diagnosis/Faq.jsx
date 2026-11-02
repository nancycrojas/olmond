import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

import { SectionShell } from "../ui/SectionShell.jsx";

const faqs = [
  {
    q: "¿Es gratuito?",
    a: "Sí, completamente. El diagnóstico, el informe con su nivel de madurez y sus 3 prioridades no tienen costo ni compromiso posterior. Es la primera etapa de la metodología de trabajo de Olmond Consulting: antes de hablar de soluciones, entender el punto de partida. Si después del resultado desea profundizar, la decisión es suya.",
  },
  {
    q: "¿Qué tratamiento se le da a mis datos?",
    a: "Sus respuestas y su correo se utilizan exclusivamente para generar y enviarle el resultado del diagnóstico. No se ceden a terceros ni se usan con fines comerciales ajenos a este proceso. Eventualmente puede recibir contenido de valor sobre IA aplicada a pymes, y en cualquier momento puede darse de baja con un clic.",
  },
  {
    q: "¿Sirve si mi empresa es muy chica?",
    a: "Sí. El diagnóstico fue diseñado para pymes de cualquier tamaño e industria: comercio, servicios, industria, agro, profesionales independientes con equipo a cargo. De hecho, las empresas más chicas suelen ser las que más rápido capitalizan el resultado, porque tienen menos estructura que modificar y pueden implementar mejoras en semanas, no en meses.",
  },
  {
    q: "¿Necesito saber de tecnología para responderlo?",
    a: "No, en absoluto. Las 12 preguntas están pensadas para dueños y directivos, no para perfiles técnicos. Se refieren a cómo opera su empresa en el día a día: cómo se cargan los datos, cómo se responde a los clientes, cómo se arman los reportes. Si conoce su negocio, tiene todo lo necesario para completarlo.",
  },
];

export function Faq() {
  return (
    <SectionShell
      label="Dudas frecuentes"
      title="Antes de arrancar"
      bg="gray.50"
    >
      <Accordion allowToggle maxW="3xl">
        {faqs.map((f) => (
          <AccordionItem
            key={f.q}
            border="none"
            bg="white"
            borderRadius="xl"
            mb={3}
            overflow="hidden"
          >
            <AccordionButton
              py={5}
              px={6}
              _expanded={{ color: "brand.600", fontWeight: "700" }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize="lg"
                fontWeight="600"
              >
                {f.q}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={6} pb={5} color="gray.600">
              {f.a}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}
