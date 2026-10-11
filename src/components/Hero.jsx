import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { CTA } from "../components/ui/CTA.jsx";
import { EvaluationCTA } from "../components/ui/EvaluationCTA.jsx";
import { SectionLabel } from "../components/ui/SectionShell.jsx";
import { BRAND_GRADIENT } from "../lib/constants.js";

const MotionBox = motion(Box);

export const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <Box
      as="section"
      id="inicio"
      position="relative"
      overflow="hidden"
      minH={{ lg: "calc(100vh - 72px)" }}
      bg="#121420"
      color="white"
      scrollMarginTop="72px"
    >
      {/* Video de fondo */}
      <Box
        as="video"
        ref={videoRef}
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        pointerEvents="none"
        zIndex={0}
      >
        <source src="/videos/olmond-hero.mp4" type="video/mp4" />
      </Box>
      {/* Overlay para mantener contraste */}
      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        bgImage={`
          radial-gradient(
          circle at 12% 22%,
          rgba(89, 103, 196, 0.22) 0%,
          transparent 34%
          ),
          radial-gradient(
          circle at 42% 88%,
          rgba(211, 73, 169, 0.12) 0%,
          transparent 30%
          ),
          linear-gradient(
          115deg,
          rgba(24, 27, 45, 0.88) 0%,
          rgba(20, 21, 34, 0.82) 45%,
          rgba(13, 15, 24, 0.88) 100%
          )
          `}
      />

      {/* Halo superior derecho */}
      <Box
        position="absolute"
        top="-260px"
        right="-200px"
        w="620px"
        h="620px"
        borderRadius="full"
        bg="rgba(90, 102, 205, 0.16)"
        filter="blur(140px)"
        pointerEvents="none"
        zIndex={1}
      />

      {/* Halo inferior */}
      <Box
        position="absolute"
        left="22%"
        bottom="-280px"
        w="560px"
        h="560px"
        borderRadius="full"
        bg="rgba(211, 71, 164, 0.10)"
        filter="blur(150px)"
        pointerEvents="none"
        zIndex={1}
      />

      <Container
        maxW="6xl"
        position="relative"
        zIndex={2}
        minH={{ lg: "calc(100vh - 72px)" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        pt={{ base: 16, md: 20, lg: 16 }}
        pb={{ base: 10, lg: 8 }}
      >
        <Grid templateColumns="1fr" justifyItems="center" alignItems="center">
          {/* Contenido */}
          <MotionBox
            w="full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionLabel light>
              Consultoría, capacitaciones y desarrollos de IA para PyMEs
            </SectionLabel>

            <Heading
              as="h1"
              mt={5}
              mx="auto"
              maxW="800px"
              fontSize={{
                base: "42px",
                sm: "50px",
                md: "58px",
                lg: "64px",
              }}
              lineHeight={{ base: "1.02", lg: "0.99" }}
              letterSpacing="-0.055em"
              fontWeight="700"
              textAlign="center"
            >
              <Box as="span" display={{ base: "inline", md: "block" }}>
                Tu equipo pierde{" "}
              </Box>

              <Box as="span" display={{ base: "inline", md: "block" }}>
                horas en tareas{" "}
              </Box>

              <Box
                as="span"
                display={{ base: "inline", md: "block" }}
                bgImage={BRAND_GRADIENT}
                bgClip="text"
              >
                que la IA ya puede hacer
              </Box>
            </Heading>

            <Text
              mt={{ base: 6, md: 7 }}
              mx="auto"
              maxW="620px"
              fontSize={{ base: "lg", md: "17px" }}
              lineHeight="1.75"
              color="whiteAlpha.700"
              textAlign="center"
            >
              Te ayudamos a decidir por dónde empezar, a implementarlo y a que
              tu equipo lo use.
            </Text>

            <HStack mt={5} spacing={3} justify="center" align="center">
              <Flex
                flexShrink={0}
                w="16px"
                h="16px"
                borderRadius="full"
                align="center"
                justify="center"
                bg="rgba(223, 76, 165, 0.14)"
                boxShadow="0 0 16px rgba(223,76,165,0.2)"
              >
                <Box w="6px" h="6px" borderRadius="full" bg="#E253A8" />
              </Flex>

              <Text
                fontSize={{ base: "md", md: "sm" }}
                lineHeight="1.5"
                fontWeight="700"
                color="whiteAlpha.900"
              >
                Empezamos por un proceso, no por una herramienta.
              </Text>
            </HStack>

            <Flex
              mt={{ base: 7, md: 8 }}
              gap={3}
              wrap="wrap"
              align="center"
              justify="center"
            >
              <EvaluationCTA>Hacer el diagnóstico gratis ↗</EvaluationCTA>

              <CTA as="a" href="#impact-sprint" variant="light">
                Hablar con un asesor
              </CTA>
            </Flex>

            <Text
              mt={3.5}
              fontSize="16px"
              lineHeight="1.5"
              color="whiteAlpha.400"
              textAlign="center"
            >
              Resultado inmediato. Sin compromiso.
            </Text>

            <Box
              mt={{ base: 12, md: 16 }}
              pt={{ base: 7, md: 8 }}
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
              w="full"
            >
              <Flex
                align={{ base: "flex-start", md: "center" }}
                justify="center"
                direction={{ base: "column", md: "row" }}
                gap={{
                  base: 3,
                  md: 8,
                  lg: 12,
                }}
                wrap="wrap"
                color="whiteAlpha.600"
                fontSize={{
                  base: "15px",
                  md: "17px",
                }}
                lineHeight="1.5"
              >
                <Text>
                  <Box as="span" color="white" fontWeight="700">
                    Patricio Rouan,
                  </Box>{" "}
                  fundador
                </Text>

                <Text>Asesor Principal de SAIA</Text>

                <Text>
                  Docente de IA aplicada en{" "}
                  <Box as="span" color="white" fontWeight="500">
                    UTN, UBA, UNSAM y UCEMA
                  </Box>
                </Text>
              </Flex>
            </Box>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
};
