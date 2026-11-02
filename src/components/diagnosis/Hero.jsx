import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { BRAND_GRADIENT } from "../../lib/constants.js";
import { CTA } from "../ui/CTA.jsx";

const MotionBox = motion(Box);

const scrollToForm = () => {
  document
    .getElementById("diagnostico")
    ?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
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
        opacity={0.25}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w="480px"
        h="480px"
        borderRadius="full"
        bgImage={BRAND_GRADIENT}
        filter="blur(140px)"
        opacity={0.45}
        pointerEvents="none"
      />
      <Container maxW="5xl" position="relative" py={{ base: 24, md: 36 }}>
        <MotionBox
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            fontWeight="800"
            lineHeight="1.15"
            maxW="3xl"
          >
            ¿Qué tan lista está tu pyme para la{" "}
            <Box
              as="span"
              bgImage={BRAND_GRADIENT}
              bgClip="text"
              color="transparent"
            >
              inteligencia artificial
            </Box>
            ?
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            mt={6}
            maxW="2xl"
            color="whiteAlpha.800"
          >
            Descubrilo en 3 minutos con el diagnóstico gratuito para dueños y
            directivos. Recibís tu nivel de madurez y tus 3 prioridades
            concretas para avanzar.
          </Text>
          <Box mt={10}>
            <CTA onClick={scrollToForm}>Hacer mi diagnóstico gratis</CTA>
            <Text mt={4} fontSize="sm" color="whiteAlpha.700">
              12 preguntas · 3 minutos · Resultado inmediato en tu correo
            </Text>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
