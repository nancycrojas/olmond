/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuArrowDown, LuArrowUpRight, LuCheck } from "react-icons/lu";

import { BRAND_GRADIENT, DIAGNOSTICO_URL } from "../lib/constants.js";

const CheckItem = ({ children, dark = false }) => (
  <HStack spacing={3} align="flex-start">
    <Flex
      mt="1px"
      flexShrink={0}
      w="20px"
      h="20px"
      align="center"
      justify="center"
      borderRadius="full"
      bg={dark ? "whiteAlpha.100" : "purple.50"}
      color={dark ? "#A9B7FF" : "#6B5DD3"}
    >
      <LuCheck size={11} strokeWidth={3} />
    </Flex>

    <Text
      fontSize="sm"
      lineHeight="1.6"
      color={dark ? "whiteAlpha.700" : "gray.600"}
    >
      {children}
    </Text>
  </HStack>
);

const ActionLink = ({
  children,
  href,
  external = false,
  dark = false,
  direction = "up",
}) => {
  const Icon = direction === "down" ? LuArrowDown : LuArrowUpRight;

  return (
    <HStack
      as="a"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      display="inline-flex"
      alignSelf="flex-start"
      spacing={2}
      color={dark ? "#AEB9FF" : "purple.600"}
      fontWeight="700"
      fontSize="md"
      transition="all 0.2s ease"
      _hover={{
        color: dark ? "white" : "purple.700",
        transform: "translateY(-2px)",
        textDecoration: "none",
      }}
    >
      <Text>{children}</Text>
      <Icon size={15} />
    </HStack>
  );
};

export const Paths = () => {
  return (
    <Box
      as="section"
      id="como-avanzar"
      position="relative"
      bg="white"
      color="#171924"
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
              w="28px"
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
              Cómo avanzar
            </Text>
          </HStack>

          <Heading
            as="h2"
            mt={4}
            maxW="780px"
            fontSize={{
              base: "36px",
              sm: "42px",
              md: "52px",
            }}
            lineHeight="1.02"
            letterSpacing="-0.05em"
            fontWeight="500"
          >
            Tres caminos posibles, según su punto de partida
          </Heading>

          <Text
            mt={4}
            maxW="850px"
            fontSize={{
              base: "md",
              md: "lg",
            }}
            lineHeight="1.7"
            color="gray.600"
          >
            Elija el siguiente paso más adecuado para su caso.
          </Text>
        </Stack>

        {/* Tarjetas */}
        <SimpleGrid
          mt={{
            base: 12,
            md: 16,
          }}
          columns={{
            base: 1,
            lg: 3,
          }}
          spacing={{
            base: 5,
            lg: 6,
          }}
          alignItems="stretch"
        >
          {/* Evaluación */}
          <Flex
            direction="column"
            minH={{
              base: "520px",
              lg: "650px",
            }}
            p={{
              base: 7,
              md: 8,
              lg: 9,
            }}
            bg="white"
            border="1px solid"
            borderColor="#D9E0E8"
            borderRadius="18px"
            boxShadow="0 3px 10px rgba(30, 37, 60, 0.025)"
            transition="all 0.25s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "0 18px 45px rgba(30, 37, 60, 0.08)",
            }}
          >
            <Box>
              <Text
                display="inline-flex"
                px={3}
                py={2}
                borderRadius="full"
                bg="purple.50"
                color="purple.600"
                fontSize="10px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.06em"
              >
                Punto de entrada
              </Text>

              <Heading
                as="h3"
                mt={12}
                fontSize={{
                  base: "2xl",
                  md: "27px",
                }}
                lineHeight="1.2"
                letterSpacing="-0.035em"
                fontWeight="600"
              >
                Diagnóstico gratuito
              </Heading>

              <Text mt={5} fontSize="md" lineHeight="1.75" color="gray.600">
                Doce preguntas iniciales antes de agendar una reunión.
              </Text>

              <Stack mt={8} spacing={3}>
                <CheckItem>Sin datos de contacto</CheckItem>
                <CheckItem>Resultado inmediato</CheckItem>
                <CheckItem>Reunión sólo si corresponde avanza</CheckItem>
              </Stack>
            </Box>

            <Box mt="auto" pt={12}>
              <ActionLink href={DIAGNOSTICO_URL} external direction="up">
                Evaluar un proceso
              </ActionLink>
            </Box>
          </Flex>

          {/* Impact Sprint */}
          <Flex
            position="relative"
            direction="column"
            justify="flex-end"
            minH={{
              base: "520px",
              lg: "650px",
            }}
            p={{
              base: 7,
              md: 8,
              lg: 9,
            }}
            overflow="hidden"
            bg="#171925"
            color="white"
            borderRadius="18px"
            boxShadow="0 28px 70px rgba(24, 27, 49, 0.22)"
            transition="all 0.25s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "0 34px 80px rgba(24, 27, 49, 0.28)",
            }}
          >
            {/* Gradiente superior */}
            <Box
              position="absolute"
              inset={0}
              bgImage="
                radial-gradient(
                  circle at 60% 5%,
                  rgba(105, 101, 194, 0.42),
                  transparent 48%
                ),
                linear-gradient(
                  180deg,
                  rgba(46, 52, 96, 0.8) 0%,
                  rgba(23, 25, 37, 0.15) 65%
                )
              "
              pointerEvents="none"
            />

            {/* Halo */}
            <Box
              position="absolute"
              top="-120px"
              right="-100px"
              w="340px"
              h="340px"
              borderRadius="full"
              bg="rgba(112, 95, 200, 0.32)"
              filter="blur(110px)"
              pointerEvents="none"
            />

            <Box position="relative">
              <Text
                display="inline-flex"
                px={3}
                py={2}
                borderRadius="full"
                bg="whiteAlpha.100"
                color="#BFC7FF"
                fontSize="10px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.06em"
              >
                Implementación
              </Text>

              <Heading
                as="h3"
                mt={12}
                fontSize={{
                  base: "2xl",
                  md: "27px",
                }}
                lineHeight="1.2"
                letterSpacing="-0.035em"
                fontWeight="600"
              >
                Impact Sprint
              </Heading>

              <Text
                mt={6}
                fontSize={{
                  base: "md",
                  md: "17px",
                }}
                lineHeight="1.5"
                fontWeight="700"
                color="whiteAlpha.900"
              >
                Intervención acotada para implementar, probar y medir una mejora
                concreta en un proceso.
              </Text>

              <Stack mt={8} spacing={3}>
                <CheckItem>Un proceso</CheckItem>
                <CheckItem>Una métrica</CheckItem>
                <CheckItem>Un plazo concreto de implementación</CheckItem>
              </Stack>

              <Box mt={9}>
                <ActionLink href="#impact-sprint" dark direction="down">
                  Conocer el Sprint
                </ActionLink>
              </Box>
            </Box>
          </Flex>

          {/* Academy */}
          <Flex
            direction="column"
            minH={{
              base: "520px",
              lg: "650px",
            }}
            p={{
              base: 7,
              md: 8,
              lg: 9,
            }}
            bg="white"
            border="1px solid"
            borderColor="#D9E0E8"
            borderRadius="18px"
            boxShadow="0 3px 10px rgba(30, 37, 60, 0.025)"
            transition="all 0.25s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "0 18px 45px rgba(30, 37, 60, 0.08)",
            }}
          >
            <Box>
              <Text
                display="inline-flex"
                px={3}
                py={2}
                borderRadius="full"
                bg="purple.50"
                color="purple.600"
                fontSize="10px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.06em"
              >
                Capacidad interna
              </Text>

              <Heading
                as="h3"
                mt={12}
                fontSize={{
                  base: "2xl",
                  md: "27px",
                }}
                lineHeight="1.2"
                letterSpacing="-0.035em"
                fontWeight="600"
              >
                Olmond Academy
              </Heading>

              <Text mt={5} fontSize="md" lineHeight="1.75" color="gray.600">
                Formación aplicada para líderes y equipos que necesitan decidir
                cuándo, dónde y cómo aplicar IA.
              </Text>

              <Stack mt={8} spacing={3}>
                <CheckItem>Briefing ejecutivo</CheckItem>
                <CheckItem>Taller aplicado</CheckItem>
                <CheckItem>Modalidad virtual</CheckItem>
              </Stack>
            </Box>

            <Box mt="auto" pt={12}>
              <ActionLink href="/academy" direction="down">
                Ver opciones
              </ActionLink>
            </Box>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
