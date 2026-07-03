import { Box, Flex, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";

import { GRADIENT_BRAND } from "../../lib/constants";
import { SectionShell } from "./SectionShell";

const CONTENTS = [
  {
    title: "IA aplicada al trabajo diario",
    body: "Los participantes aprenderán a utilizar asistentes de Inteligencia Artificial para redactar documentos, resumir información, generar contenido, resolver consultas y optimizar tareas habituales de su puesto.",
  },
  {
    title: "Creación de asistentes especializados",
    body: "Se trabajará en el diseño de asistentes adaptados a distintas áreas de la empresa, aprovechando documentación interna, procedimientos y conocimientos específicos para facilitar las tareas cotidianas.",
  },
  {
    title: "Organización y análisis de información",
    body: "Se explorarán herramientas que permitan analizar documentos, generar resúmenes, obtener conclusiones y transformar grandes volúmenes de información en conocimiento útil para la toma de decisiones.",
  },
  {
    title: "Productividad en las distintas áreas",
    body: "Se desarrollarán ejemplos aplicados a procesos propios de Administración, Compras, Comercial, Logística, Depósito y Capital Humano, identificando oportunidades concretas de mejora mediante Inteligencia Artificial.",
  },
  {
    title: "Automatización de procesos",
    body: "Se presentará cómo la Inteligencia Artificial puede integrarse con herramientas de automatización para reducir tareas repetitivas y optimizar procesos internos, analizando qué tipo de soluciones resultan más adecuadas según cada necesidad.",
  },
  {
    title: "Buenas prácticas y uso responsable",
    body: "Se compartirán recomendaciones para utilizar Inteligencia Artificial en entornos corporativos, contemplando aspectos vinculados con la seguridad de la información, privacidad y buenas prácticas de adopción.",
  },
];

export const ContentsSection = () => {
  return (
    <SectionShell
      id="contenidos"
      eyebrow="Contenidos"
      title="Durante el workshop se abordarán, mediante demostraciones y ejercicios prácticos, los siguientes ejes de trabajo:"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {CONTENTS.map((content, index) => (
          <Box
            key={content.title}
            bg="white"
            p={8}
            borderRadius="3xl"
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
            <HStack spacing={3} mb={4}>
              <Flex
                h={9}
                w={9}
                align="center"
                justify="center"
                borderRadius="lg"
                bgGradient={GRADIENT_BRAND}
                color="white"
                fontSize="sm"
                fontWeight="bold"
                boxShadow="md"
              >
                {String(index + 1).padStart(2, "0")}
              </Flex>
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="bold"
                color="gray.900"
              >
                {content.title}
              </Heading>
            </HStack>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="tall"
              color="gray.600"
            >
              {content.body}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </SectionShell>
  );
};
