import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { GoAlert } from "react-icons/go";
import { LuListChecks, LuMap } from "react-icons/lu";

import { SectionShell } from "../ui/SectionShell.jsx";

const items = [
  {
    icon: LuMap,
    title: "Su nivel de madurez en IA",
    text: "De Pyme Manual a Pyme Aumentada: una orientación sobre el estado de su empresa a partir de sus respuestas.",
  },
  {
    icon: LuListChecks,
    title: "Sus 3 prioridades específicas",
    text: "Elaboradas a partir de sus respuestas como punto de partida para evaluar mejoras en su operación.",
  },
  {
    icon: GoAlert,
    title: "Un riesgo a revisar según su nivel",
    text: "Una situación que conviene revisar antes de invertir en tecnología. Requiere validación con los responsables del proceso.",
  },
];

export function QueTeLlevas() {
  return (
    <SectionShell
      label="Qué recibe"
      title="Qué incluye el resultado:"
      bg="gray.50"
    >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {items.map((item) => (
          <Box
            key={item.title}
            bg="white"
            p={8}
            borderRadius="2xl"
            boxShadow="sm"
          >
            <Box as={item.icon} boxSize={8} color="brand.500" mb={4} />
            <Heading as="h3" size="md" fontWeight="700" mb={3}>
              {item.title}
            </Heading>
            <Text color="gray.600">{item.text}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
}
