import { Box, Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import {
  LuBot,
  LuBrainCircuit,
  LuFileSearch,
  LuShieldCheck,
  LuSparkles,
  LuTarget,
  LuZap,
} from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";
import { SectionShell } from "./SectionShell";

const OBJECTIVES = [
  {
    icon: LuZap,
    text: "incorporen herramientas de Inteligencia Artificial para mejorar su productividad diaria",
  },
  {
    icon: LuBot,
    text: "aprendan a interactuar de manera efectiva con asistentes de IA",
  },
  {
    icon: LuBrainCircuit,
    text: "desarrollen asistentes especializados para sus propias funciones",
  },
  {
    icon: LuFileSearch,
    text: "utilicen IA para analizar información y agilizar la toma de decisiones",
  },
  {
    icon: LuTarget,
    text: "identifiquen procesos con potencial de mejora mediante automatización",
  },
  {
    icon: LuShieldCheck,
    text: "comprendan buenas prácticas para el uso seguro de la información corporativa",
  },
  {
    icon: LuSparkles,
    text: "detecten oportunidades concretas de aplicación dentro de la empresa",
  },
];

export const ObjectivesSection = () => {
  return (
    <SectionShell
      id="objetivos"
      eyebrow="Objetivos"
      title="El workshop tiene como objetivo que los participantes:"
      muted
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {OBJECTIVES.map((objective, index) => (
          <Box
            key={index}
            position="relative"
            overflow="hidden"
            bg="white"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="sm"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-4px)",
              borderColor: "brand.500",
              boxShadow: "xl",
            }}
          >
            <Flex
              display="inline-flex"
              h={35}
              w={35}
              mb={4}
              align="center"
              justify="center"
              borderRadius="xl"
              bgGradient={GRADIENT_BRAND}
              color="white"
              boxShadow="md"
            >
              <Icon as={objective.icon} boxSize={5} />
            </Flex>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="tall"
              color="gray.900"
            >
              {objective.text}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
};
