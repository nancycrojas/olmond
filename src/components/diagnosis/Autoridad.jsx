import { Box, Flex, Text } from "@chakra-ui/react";

import { GradientDivider } from "../ui/GradientDivider.jsx";
import { SectionShell } from "../ui/SectionShell.jsx";

export function Autoridad() {
  return (
    <SectionShell
      label="La metodología detrás del diagnóstico"
      title="Una primera evaluación de la preparación de su empresa para aplicar IA"
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
            Este diagnóstico organiza una primera evaluación de procesos, datos,
            equipo y uso de herramientas para orientar la adopción de IA
            en pequeñas y medianas empresas.
          </Text>
          <GradientDivider />
          <Text fontSize="lg" color="gray.600">
            El modelo evalúa las dimensiones clave que determinan la capacidad
            de una empresa para adoptar inteligencia artificial con resultados:
            sus procesos, sus datos, su equipo y su forma de tomar decisiones. A
            partir de sus respuestas, el sistema orienta sobre su nivel de madurez
            y las prioridades a evaluar en su etapa.
          </Text>
          <GradientDivider />
          <Text fontSize="lg" color="gray.600">
            El resultado depende de la información declarada. Es una orientación
            inicial: las recomendaciones deben contrastarse con los datos,
            las restricciones y las personas responsables de cada proceso
            antes de tomar una decisión de implementación.
          </Text>
        </Box>
      </Flex>
    </SectionShell>
  );
}
