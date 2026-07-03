import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";

import { GRADIENT_BRAND_BR } from "../../lib/constants";
import { SectionShell } from "./SectionShell";

const STEPS = [
  "La propuesta combina una metodología eminentemente práctica, con demostraciones en vivo, resolución de casos reales y ejercicios aplicados al contexto de la empresa.",
  "Durante el desarrollo del workshop se promoverá que los participantes trabajen sobre situaciones concretas de su actividad diaria, generando soluciones que puedan implementarse inmediatamente dentro de la organización.",
];

export const MethodologySection = () => {
  return (
    <SectionShell
      id="metodologia"
      eyebrow="Metodología"
      title="Un enfoque práctico, aplicado y accionable"
      muted
    >
      <Box position="relative" maxW="4xl" mx="auto">
        <Box
          position="absolute"
          left={6}
          top={2}
          bottom={2}
          w="1px"
          bgGradient="linear(to-b, #667eea, #764ba2, #EC4899)"
          display={{ base: "none", md: "block" }}
        />
        <VStack spacing={6} align="stretch">
          {STEPS.map((step, index) => (
            <HStack
              key={index}
              position="relative"
              spacing={6}
              align="flex-start"
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="sm"
            >
              <Flex
                position="relative"
                zIndex={10}
                h={12}
                w={12}
                flexShrink={0}
                align="center"
                justify="center"
                borderRadius="full"
                bgGradient={GRADIENT_BRAND_BR}
                color="white"
                boxShadow="md"
              >
                <Text fontSize="sm" fontWeight="bold">
                  {String(index + 1).padStart(2, "0")}
                </Text>
              </Flex>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="tall"
                color="gray.900"
              >
                {step}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </SectionShell>
  );
};
