import { Box, Flex, Text } from "@chakra-ui/react";

import { GradientDivider } from "../ui/GradientDivider.jsx";
import { SectionShell } from "../ui/SectionShell.jsx";

export function Autoridad() {
  return (
    <SectionShell
      label="La metodología detrás del diagnóstico"
      title="Un modelo de evaluación probado, adaptado a la realidad operativa de las pymes"
    >
      <Flex
        gap={10}
        direction={{ base: "column", md: "row" }}
        align="flex-start"
      >
        {/* TODO: reemplazar por foto real de Pato (dando clase o en evento) */}
        <Box
          flexShrink={0}
          w={{ base: "full", md: "260px" }}
          h="260px"
          borderRadius="2xl"
          bgGradient="linear(135deg, brand.500, brand.600)"
          opacity={0.9}
        />
        <Box maxW="2xl">
          <Text fontSize="lg" mb={4}>
            Este diagnóstico se basa en una metodología propia de evaluación de
            madurez en IA, alineada con los marcos internacionales de referencia
            y adaptada a la realidad operativa de las pymes.
          </Text>
          <GradientDivider />
          <Text fontSize="lg" color="gray.600">
            El modelo evalúa las dimensiones clave que determinan la capacidad
            de una empresa para adoptar inteligencia artificial con resultados:
            sus procesos, sus datos, su equipo y su forma de tomar decisiones. A
            partir de tus respuestas, el sistema identifica tu nivel de madurez
            y las prioridades con mayor impacto para tu etapa.
          </Text>
          <GradientDivider />
          <Text fontSize="lg" color="gray.600">
            No es un test genérico: fue desarrollado y perfeccionado a partir de
            la experiencia de implementación en pymes reales y de la formación
            de profesionales en programas universitarios de IA aplicada. Cada
            resultado refleja lo que funciona en empresas como la tuya, no
            teoría importada de otros contextos.
          </Text>
        </Box>
      </Flex>
    </SectionShell>
  );
}
