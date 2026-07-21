import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuCheck } from "react-icons/lu";

import { BRAND_GRADIENT } from "../lib/constants.js";

const stages = [
  {
    number: "01",
    name: "Diagnóstico",
    summary: "Definir el problema",
    badge: "Criterio de salida definido",
    description:
      "Relevamos el proceso, el responsable, los datos, el volumen y la restricción que limita el resultado.",
    items: [
      "Proceso y alcance delimitados",
      "Línea de base registrada",
      "Condición de éxito acordada",
    ],
    principle: "Sin línea de base no hay resultado demostrable.",
  },
  {
    number: "02",
    name: "Hoja de ruta",
    summary: "Acotar la solución",
    badge: "Solución priorizada",
    description:
      "Definimos el alcance, las integraciones, los controles y los criterios de aceptación.",
    items: [
      "Solución y alcance definidos",
      "Datos y accesos confirmados",
      "Riesgos y responsables acordados",
    ],
    principle:
      "Acotar la solución reduce el riesgo y acelera la implementación.",
  },
  {
    number: "03",
    name: "Implementación",
    summary: "Validación controlada",
    badge: "Solución operativa",
    description: "Implementamos y probamos sin afectar la operación.",
    items: [
      "Solución funcional",
      "Riesgos y excepciones identificados",
      "Controles y aprobaciones definidos",
      "Validación del equipo responsable",
    ],
    principle:
      "Primero se valida en un entorno controlado. Después se decide su incorporación a la operación.",
  },
  {
    number: "04",
    name: "Medición",
    summary: "Decidir con evidencia",
    badge: "Impacto verificado",
    description:
      "Medimos el desempeño de la solución en el entorno controlado y lo comparamos con la línea de base y los criterios acordados.",
    items: [
      "Resultado medido y comparado",
      "Criterios de aceptación verificados",
      "Riesgos y controles documentados",
      "Siguiente paso definido",
    ],
    principle:
      "La evidencia define si corresponde ajustar o continuar el proceso.",
  },
];

export const Methodology = () => {
  const [activeStage, setActiveStage] = useState(0);
  const active = stages[activeStage];

  return (
    <Box
      as="section"
      id="como-trabajamos"
      position="relative"
      bg="#F4F7FA"
      color="#151722"
      scrollMarginTop="72px"
    >
      <Container
        maxW="6xl"
        py={{
          base: 16,
          md: 20,
          lg: 24,
        }}
      >
        {/* Encabezado */}
        <Stack align="center" textAlign="center">
          <HStack spacing={3}>
            <Box
              w="25px"
              h="2px"
              borderRadius="full"
              bgImage={BRAND_GRADIENT}
            />

            <Text
              fontSize="xs"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.16em"
              color="purple.600"
            >
              Cómo trabajamos
            </Text>
          </HStack>

          <Heading
            as="h2"
            mt={4}
            maxW="720px"
            fontSize={{
              base: "36px",
              sm: "42px",
              md: "52px",
            }}
            lineHeight="1.04"
            letterSpacing="-0.045em"
            fontWeight="500"
          >
            Del diagnóstico a una implementación verificable
          </Heading>

          <Text mt={3} fontSize={{ base: "md", md: "lg" }} color="gray.600">
            Cuatro decisiones clave. En el orden correcto.
          </Text>
        </Stack>

        {/* Panel principal */}
        <Grid
          mt={{ base: 12, md: 14 }}
          templateColumns={{
            base: "minmax(0, 1fr)",
            lg: "420px minmax(0, 1fr)",
          }}
          bg="white"
          border="1px solid"
          borderColor="#DDE3EA"
          borderRadius="18px"
          overflow="hidden"
          boxShadow="0 18px 55px rgba(31, 40, 65, 0.08)"
        >
          {/* Selector de etapas */}
          <Stack
            spacing={2}
            p={{
              base: 3,
              md: 4,
            }}
            bg="#FBFCFE"
            borderRight={{
              base: "none",
              lg: "1px solid",
            }}
            borderBottom={{
              base: "1px solid",
              lg: "none",
            }}
            borderColor="#E2E7ED"
          >
            {stages.map((stage, index) => {
              const isActive = index === activeStage;

              return (
                <Flex
                  as="button"
                  type="button"
                  key={stage.number}
                  w="full"
                  minH={{ base: "78px", md: "84px" }}
                  px={{ base: 4, md: 5 }}
                  py={4}
                  align="center"
                  gap={4}
                  textAlign="left"
                  borderRadius="12px"
                  cursor="pointer"
                  transition="all 0.2s ease"
                  bgImage={isActive ? BRAND_GRADIENT : "none"}
                  bg={isActive ? undefined : "transparent"}
                  color={isActive ? "white" : "#23283A"}
                  _hover={{
                    bg: isActive ? undefined : "gray.50",
                    transform: "translateX(2px)",
                  }}
                  onClick={() => setActiveStage(index)}
                  aria-selected={isActive}
                >
                  <Flex
                    flexShrink={0}
                    w="36px"
                    h="36px"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={isActive ? "whiteAlpha.400" : "gray.300"}
                    color={isActive ? "white" : "gray.600"}
                    fontSize="11px"
                    fontWeight="700"
                  >
                    {stage.number}
                  </Flex>

                  <Box>
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="700"
                      lineHeight="1.3"
                    >
                      {stage.name}
                    </Text>

                    <Text
                      mt={1}
                      fontSize="xs"
                      color={isActive ? "whiteAlpha.700" : "gray.500"}
                    >
                      {stage.summary}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
          </Stack>

          {/* Contenido de la etapa */}
          <Box
            key={active.number}
            p={{
              base: 6,
              md: 9,
              lg: 11,
            }}
          >
            <Flex
              align={{ base: "flex-start", sm: "center" }}
              justify="space-between"
              direction={{ base: "column", sm: "row" }}
              gap={4}
            >
              <Text
                fontSize="xs"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.12em"
                color="purple.600"
              >
                Etapa {active.number}
              </Text>

              <Badge
                px={3}
                py={1.5}
                borderRadius="full"
                textTransform="none"
                fontSize="10px"
                fontWeight="600"
                bg="#ECFBF1"
                color="#26764A"
              >
                {active.badge}
              </Badge>
            </Flex>

            <Heading
              as="h3"
              mt={8}
              fontSize={{
                base: "28px",
                md: "32px",
              }}
              lineHeight="1.1"
              letterSpacing="-0.035em"
              fontWeight="600"
            >
              {active.name}
            </Heading>

            <Text
              mt={5}
              maxW="700px"
              fontSize={{ base: "md", md: "17px" }}
              lineHeight="1.7"
              color="gray.600"
            >
              {active.description}
            </Text>

            <Stack mt={7} spacing={3}>
              {active.items.map((item) => (
                <HStack key={item} align="flex-start" spacing={3}>
                  <Flex
                    mt="2px"
                    flexShrink={0}
                    w="20px"
                    h="20px"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg="#5B4FBC"
                    color="white"
                  >
                    <LuCheck size={12} strokeWidth={3} />
                  </Flex>

                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="600"
                    color="#202330"
                  >
                    {item}
                  </Text>
                </HStack>
              ))}
            </Stack>

            <Flex
              mt={8}
              minH="54px"
              align={{ base: "flex-start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={{ base: 2, md: 4 }}
              px={5}
              py={4}
              bg="#F5F8FB"
              borderLeft="3px solid"
              borderColor="#6476FF"
              borderRadius="0 9px 9px 0"
            >
              <Text
                flexShrink={0}
                fontSize="10px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.1em"
                color="gray.500"
              >
                Principio
              </Text>

              <Text fontSize="sm" fontWeight="700" color="#202330">
                {active.principle}
              </Text>
            </Flex>
          </Box>
        </Grid>

        {/* Cierre */}
        <Text
          mt={{ base: 10, md: 12 }}
          textAlign="center"
          fontFamily="heading"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="700"
          letterSpacing="-0.025em"
        >
          Primero el proceso. Después la tecnología.
        </Text>
      </Container>
    </Box>
  );
};
