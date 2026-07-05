import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { GoAlert } from "react-icons/go";
import { LuListChecks, LuMap } from "react-icons/lu";

import { SectionShell } from "../ui/SectionShell.jsx";

const items = [
  {
    icon: LuMap,
    title: "Tu nivel de madurez en IA",
    text: "De Pyme Manual a Pyme Aumentada: una referencia clara de dónde está parada tu empresa frente al mercado.",
  },
  {
    icon: LuListChecks,
    title: "Tus 3 prioridades específicas",
    text: "Elaboradas a partir de tus respuestas. No es un consejo genérico: es un punto de partida concreto para tu operación.",
  },
  {
    icon: GoAlert,
    title: "El error típico de tu nivel",
    text: "El que lleva a la mayoría de las pymes a invertir en tecnología que después no se usa. Identificarlo a tiempo evita gastos innecesarios.",
  },
];

export function QueTeLlevas() {
  return (
    <SectionShell
      label="Qué te llevás"
      title="En 3 minutos te llevás:"
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
