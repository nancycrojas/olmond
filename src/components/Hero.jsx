import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LuCheck } from "react-icons/lu";

import { CTA } from "../components/ui/CTA.jsx";
import { EvaluationCTA } from "../components/ui/EvaluationCTA.jsx";
import { SectionLabel } from "../components/ui/SectionShell.jsx";
import { BRAND_GRADIENT } from "../lib/constants.js";

const MotionBox = motion(Box);

function ProcessVisual() {
  const steps = [
    {
      number: "01",
      label: "Entrada",
      title: "Datos disponibles",
    },
    {
      number: "02",
      label: "Decisión",
      title: "Regla validada",
      active: true,
    },
    {
      number: "03",
      label: "Salida",
      title: "Acción trazable",
    },
  ];

  return (
    <Box
      w="full"
      bg="rgba(22, 25, 43, 0.92)"
      color="white"
      borderRadius="20px"
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(255,255,255,0.14)"
      boxShadow="0 30px 80px rgba(0,0,0,0.35)"
      backdropFilter="blur(18px)"
    >
      {/* Cabecera del panel */}
      <Flex
        minH="46px"
        px={{ base: 4, md: 5 }}
        borderBottom="1px solid"
        borderColor="rgba(255,255,255,0.08)"
        align="center"
        justify="space-between"
        gap={4}
      >
        <HStack spacing={4}>
          <HStack spacing="5px">
            {[0, 1, 2].map((item) => (
              <Box
                key={item}
                w="5px"
                h="5px"
                borderRadius="full"
                bg="whiteAlpha.300"
              />
            ))}
          </HStack>

          <Text
            fontSize={{ base: "16px", md: "10px" }}
            fontWeight="600"
            color="whiteAlpha.600"
          >
            Proceso operativo · vista de control
          </Text>
        </HStack>

        <Badge
          display="flex"
          alignItems="center"
          gap={1.5}
          px={2.5}
          py={1}
          borderRadius="full"
          textTransform="none"
          fontSize="16px"
          fontWeight="700"
          bg="rgba(14, 95, 74, 0.2)"
          color="#78E4BD"
          border="1px solid"
          borderColor="rgba(84, 221, 172, 0.22)"
        >
          <Box
            w="5px"
            h="5px"
            borderRadius="full"
            bg="#50D9A7"
            boxShadow="0 0 8px rgba(80,217,167,0.8)"
          />
          Activo
        </Badge>
      </Flex>

      <Stack p={{ base: 4, md: 5 }} spacing={{ base: 4, md: 5 }}>
        {/* Indicador */}
        <Box
          p={{ base: 4, md: 5 }}
          borderRadius="14px"
          bg="rgba(255,255,255,0.045)"
          border="1px solid"
          borderColor="rgba(255,255,255,0.08)"
        >
          <Text fontSize="14px" color="whiteAlpha.500" fontWeight="500">
            Indicador principal
          </Text>

          <Heading
            as="h3"
            mt={1}
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="1.2"
            letterSpacing="-0.03em"
          >
            Tiempo por caso
          </Heading>

          <Box
            mt={4}
            h="3px"
            bg="whiteAlpha.100"
            borderRadius="full"
            overflow="hidden"
          >
            <Box
              w="72%"
              h="full"
              bgImage={BRAND_GRADIENT}
              borderRadius="full"
              boxShadow="0 0 14px rgba(190,90,220,0.35)"
            />
          </Box>

          <Text mt={3} fontSize="14px" color="whiteAlpha.400">
            Línea de base definida antes de implementar
          </Text>
        </Box>

        {/* Flujo del proceso */}
        <Stack spacing={0}>
          {steps.map(({ number, label, title, active }, index) => {
            const isLast = index === steps.length - 1;

            return (
              <Box key={number} position="relative" pb={isLast ? 0 : 5}>
                <Flex
                  minH={{ base: "58px", md: "62px" }}
                  px={{ base: 3, md: 4 }}
                  py={3}
                  align="center"
                  gap={3}
                  borderRadius="12px"
                  bg={
                    active
                      ? "rgba(92, 101, 186, 0.16)"
                      : "rgba(7, 10, 22, 0.42)"
                  }
                  border="1px solid"
                  borderColor={
                    active
                      ? "rgba(137, 145, 255, 0.55)"
                      : "rgba(255,255,255,0.08)"
                  }
                  boxShadow={
                    active ? "0 0 28px rgba(103, 92, 220, 0.08)" : "none"
                  }
                >
                  <Flex
                    flexShrink={0}
                    w="30px"
                    h="30px"
                    align="center"
                    justify="center"
                    borderRadius="8px"
                    bgImage={BRAND_GRADIENT}
                    fontSize="10px"
                    fontWeight="800"
                    color="white"
                    boxShadow="0 8px 20px rgba(102, 76, 205, 0.22)"
                  >
                    {number}
                  </Flex>

                  <Box>
                    <Text
                      fontSize="14px"
                      color="whiteAlpha.400"
                      lineHeight="1.2"
                    >
                      {label}
                    </Text>

                    <Text
                      mt={0.5}
                      fontSize={{ base: "md", md: "sm" }}
                      lineHeight="1.2"
                      fontWeight="700"
                      color="whiteAlpha.900"
                    >
                      {title}
                    </Text>
                  </Box>
                </Flex>

                {!isLast && (
                  <Box
                    position="absolute"
                    left={{ base: "27px", md: "31px" }}
                    bottom="3px"
                    w="1px"
                    h="14px"
                    bgImage={BRAND_GRADIENT}
                    opacity={0.8}
                  />
                )}
              </Box>
            );
          })}
        </Stack>

        {/* Controles inferiores */}
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2.5}>
          <HStack
            p={3}
            spacing={3}
            borderRadius="11px"
            bg="rgba(255,255,255,0.045)"
            border="1px solid"
            borderColor="rgba(255,255,255,0.04)"
          >
            <Flex
              flexShrink={0}
              w="24px"
              h="24px"
              borderRadius="full"
              align="center"
              justify="center"
              bg="rgba(37, 178, 130, 0.12)"
              color="#67D9B1"
            >
              <LuCheck size={13} />
            </Flex>

            <Box>
              <Text fontSize="16px" fontWeight="700">
                Control humano
              </Text>
              <Text mt={0.5} fontSize="14px" color="whiteAlpha.400">
                Excepciones y aprobación
              </Text>
            </Box>
          </HStack>

          <HStack
            p={3}
            spacing={3}
            borderRadius="11px"
            bg="rgba(255,255,255,0.045)"
            border="1px solid"
            borderColor="rgba(255,255,255,0.04)"
          >
            <Flex
              flexShrink={0}
              w="24px"
              h="24px"
              borderRadius="full"
              align="center"
              justify="center"
              bg="rgba(37, 178, 130, 0.12)"
              color="#67D9B1"
            >
              <LuCheck size={13} />
            </Flex>

            <Box>
              <Text fontSize="16px" fontWeight="700">
                Evidencia
              </Text>
              <Text mt={0.5} fontSize="14px" color="whiteAlpha.400">
                Antes y después
              </Text>
            </Box>
          </HStack>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}

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
