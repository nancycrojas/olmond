import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

import { GRADIENT_BRAND } from "../../lib/constants";
import { SectionLabel } from "./SectionShell";

export const IntroductionSection = () => {
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
          <Text>
            Distribuidora Mayorista Lagostena cuenta con un importante volumen
            de información generado por sus sistemas de gestión y herramientas
            de análisis. En este contexto, incorporar Inteligencia Artificial de
            manera ordenada permitirá potenciar el trabajo de sus equipos,
            mejorar la gestión del conocimiento y acompañar el proceso de
            transformación digital de la organización. Esta propuesta busca
            brindar herramientas prácticas para que los colaboradores incorporen
            la IA en sus tareas diarias de forma segura, responsable y alineada
            con los objetivos de la empresa.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
