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

import { CTA } from "../components/ui/CTA.jsx";
import { EvaluationCTA } from "../components/ui/EvaluationCTA.jsx";
import { SectionLabel } from "../components/ui/SectionShell.jsx";
import { BRAND_GRADIENT } from "../lib/constants.js";

const MotionBox = motion(Box);

export const Hero = () => {
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
      {/* Fondo principal */}
      <Box
        position="absolute"
        inset={0}
        bgImage={`
          radial-gradient(
            circle at 12% 22%,
            rgba(89, 103, 196, 0.18) 0%,
            transparent 34%
          ),
          radial-gradient(
            circle at 42% 88%,
            rgba(211, 73, 169, 0.10) 0%,
            transparent 30%
          ),
          radial-gradient(
            circle at 96% 5%,
            rgba(77, 86, 171, 0.14) 0%,
            transparent 28%
          ),
          linear-gradient(
            115deg,
            #20243a 0%,
            #181927 43%,
            #11131d 100%
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
      />

      <Container
        maxW="6xl"
        position="relative"
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <SectionLabel light>
              Consultoría e implementación de IA para PyMEs
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
                Inteligencia artificial aplicada a{" "}
              </Box>

              <Box
                as="span"
                display={{ base: "inline", md: "block" }}
                bgImage={BRAND_GRADIENT}
                bgClip="text"
              >
                la operación de su empresa
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
              Olmond Consulting diagnostica, diseña e implementa
              automatizaciones en procesos concretos. Antes de construir,
              acordamos cómo medir el resultado y preparamos a su equipo para
              operar la solución.
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
                No empezamos por una herramienta. Empezamos por un proceso.
              </Text>
            </HStack>

            <Flex
              mt={{ base: 7, md: 8 }}
              gap={3}
              wrap="wrap"
              align="center"
              justify="center"
            >
              <EvaluationCTA>Evaluar un proceso &nbsp; ↗</EvaluationCTA>

              <CTA as="a" href="#impact-sprint" variant="light">
                Conocer Impact Sprint
              </CTA>
            </Flex>

            <Text
              mt={3.5}
              fontSize="16px"
              lineHeight="1.5"
              color="whiteAlpha.400"
              textAlign="center"
            >
              Cinco preguntas. Resultado inmediato.
            </Text>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
};
