import { Box, Container, Heading, Text } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../../lib/constants.js";
import { CTA } from "../ui/CTA.jsx";

const scrollToForm = () => {
  document
    .getElementById("diagnostico")
    ?.scrollIntoView({ behavior: "smooth" });
};

export function CierreCta() {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="gray.900"
      color="white"
    >
      <Box
        position="absolute"
        inset={0}
        bgImage={BRAND_GRADIENT}
        opacity={0.3}
        pointerEvents="none"
      />
      <Container
        maxW="4xl"
        position="relative"
        py={{ base: 16, md: 24 }}
        textAlign="center"
      >
        <Heading as="h2" size="xl" fontWeight="800">
          Cada semana sin adoptar IA tiene un costo
        </Heading>
        <Text fontSize="lg" mt={5} color="whiteAlpha.800" maxW="2xl" mx="auto">
          Las tareas repetitivas que hoy se hacen a mano consumen horas, margen
          y foco de tu equipo. La buena noticia: no hace falta una gran
          inversión para empezar a recuperarlos. Hace falta saber por dónde
          empezar. Ese es el propósito de este diagnóstico: darte un punto de
          partida claro, en 3 minutos y sin costo.
        </Text>
        <Box mt={8}>
          <CTA onClick={scrollToForm}>
            Hacer mi diagnóstico gratis — 3 minutos
          </CTA>
        </Box>
      </Container>
    </Box>
  );
}
