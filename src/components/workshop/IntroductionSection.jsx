/* eslint-disable react/prop-types */
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

import { GRADIENT_BRAND } from "../../lib/constants";
import { SectionLabel } from "./SectionShell";

export const IntroductionSection = ({ introParagraph }) => {
  return (
    <Box as="section" id="introduccion" bg="white" py={24}>
      <Container maxW="4xl" px={6}>
        <SectionLabel>Introducción</SectionLabel>
        <Heading
          as="h2"
          mt={5}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          fontWeight="bold"
          letterSpacing="tight"
        >
          Una oportunidad para{" "}
          <Box as="span" bgGradient={GRADIENT_BRAND} bgClip="text">
            potenciar
          </Box>{" "}
          el trabajo de sus equipos
        </Heading>
        <VStack
          mt={8}
          spacing={6}
          align="stretch"
          fontSize={{ base: "md", md: "lg" }}
          lineHeight="tall"
          color="gray.600"
        >
          <Text>
            La Inteligencia Artificial está transformando la forma en que las
            organizaciones trabajan, toman decisiones y gestionan sus procesos.
            Más allá de la tecnología, representa una oportunidad para aumentar
            la productividad, optimizar tareas repetitivas y permitir que las
            personas dediquen más tiempo a actividades de mayor valor.
          </Text>
          {introParagraph && <Text>{introParagraph}</Text>}
        </VStack>
      </Container>
    </Box>
  );
};
