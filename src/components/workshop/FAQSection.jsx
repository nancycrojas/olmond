import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

import { SectionShell } from "./SectionShell";

const FAQS = [
  {
    question: "¿Se requieren conocimientos técnicos previos?",
    answer: "No se requieren conocimientos técnicos previos.",
  },
  {
    question: "¿A qué áreas está orientado el workshop?",
    answer:
      "La capacitación está orientada a colaboradores de las áreas de: Administración, Compras, Comercial, Logística y Depósito, y Capital Humano.",
  },
  {
    question: "¿Cuál es la modalidad?",
    answer: "Modalidad virtual.",
  },
  {
    question: "¿Cuántos encuentros incluye?",
    answer:
      "6 encuentros en vivo, con una duración estimada de 2 horas por encuentro y una carga horaria total de 12 horas.",
  },
  {
    question: "¿Qué herramientas se utilizarán?",
    answer:
      "A lo largo de la capacitación se utilizarán distintas herramientas de Inteligencia Artificial Generativa, entre ellas: ChatGPT, Claude y NotebookLM. Cada una será presentada según sus fortalezas y casos de uso, permitiendo que los participantes comprendan cuándo resulta conveniente utilizar una u otra.",
  },
  {
    question: "¿Qué resultados se esperan al finalizar?",
    answer:
      "Al finalizar el workshop, Distribuidora Mayorista Lagostena contará con colaboradores capaces de: incorporar IA en su trabajo cotidiano; crear asistentes especializados para sus funciones; reducir tiempos dedicados a tareas repetitivas; mejorar la calidad de documentos y comunicaciones; aprovechar mejor la información disponible en la organización; identificar oportunidades de mejora y automatización de procesos; adoptar la Inteligencia Artificial de manera segura y responsable.",
  },
];

export const FAQSection = () => {
  return (
    <SectionShell
      eyebrow="Preguntas frecuentes"
      title="Todo lo que necesita saber sobre la propuesta"
      muted
    >
      <Box maxW="3xl" mx="auto">
        <Accordion allowToggle display="flex" flexDirection="column" gap={3}>
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              bg="white"
              px={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="sm"
            >
              <AccordionButton py={5} _hover={{ bg: "transparent" }}>
                <Text
                  flex={1}
                  textAlign="left"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  color="gray.900"
                >
                  {faq.question}
                </Text>
                <AccordionIcon color="brand.600" />
              </AccordionButton>
              <AccordionPanel
                pb={5}
                px={0}
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="tall"
                color="gray.600"
              >
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </SectionShell>
  );
};
