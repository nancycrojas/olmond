import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FiBarChart } from "react-icons/fi";
import { LuCrosshair, LuGitBranch } from "react-icons/lu";

import { BRAND_GRADIENT } from "../lib/constants.js";

const problems = [
  {
    icon: FiBarChart,
    title: "Horas consumidas por tareas repetitivas",
    copy: "Personas que buscan, copian, revisan o vuelven a cargar la misma información todos los días.",
  },
  {
    icon: LuGitBranch,
    title: "Información disponible, pero desconectada",
    copy: "Planillas, correos, sistemas y conocimiento informal que no integran un flujo confiable.",
  },
  {
    icon: LuCrosshair,
    title: "Tecnología incorporada sin un problema definido",
    copy: "Licencias y pruebas iniciadas antes de definir el proceso, la línea de base y el resultado esperado.",
  },
];

export const Problem = () => {
  return (
    <Box
      as="section"
      id="problema"
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
        {/* Etiqueta superior */}
        <HStack spacing={4} mb={{ base: 7, md: 8 }}>
          <Box
            w="32px"
            h="2px"
            flexShrink={0}
            bgImage={BRAND_GRADIENT}
            borderRadius="full"
          />

          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.18em"
            color="purple.600"
          >
            El punto de partida
          </Text>
        </HStack>

        {/* Título */}
        <Heading
          as="h2"
          maxW="1100px"
          fontSize={{
            base: "36px",
            sm: "42px",
            md: "52px",
          }}
          lineHeight={{
            base: "1.08",
            md: "1.06",
          }}
          letterSpacing="-0.045em"
          fontWeight="500"
          color="#171924"
        >
          Partimos del mapeo de procesos para determinar si la IA puede aportar
          valor y, de ser así, dónde y de qué manera
        </Heading>

        {/* Introducción */}
        <Text
          mt={{ base: 7, md: 9 }}
          maxW="1050px"
          fontSize={{
            base: "lg",
            md: "lg",
          }}
          lineHeight="1.8"
          color="gray.600"
        >
          La inteligencia artificial genera valor cuando resuelve una
          restricción operativa concreta. Sin diagnóstico, método y un
          responsable definido, cualquier iniciativa avanza a ciegas.
        </Text>
        <Text
          mt={{ base: 7, md: 9 }}
          maxW="1050px"
          fontSize={{
            base: "md",
            md: "lg",
          }}
          textAlign="center"
          lineHeight="1.8"
          color="gray.600"
        >
          Las 3 restricciones más frecuentes de las empresas que nos consultan.
        </Text>

        {/* Tarjetas */}
        <SimpleGrid
          mt={{
            base: 8,
            md: 10,
          }}
          columns={{
            base: 1,
            md: 3,
          }}
          spacing={{
            base: 5,
            lg: 6,
          }}
        >
          {problems.map(({ icon: Icon, title, copy }, index) => (
            <Box
              key={title}
              position="relative"
              display="flex"
              flexDirection="column"
              minH={{
                base: "330px",
                md: "370px",
              }}
              p={{
                base: 7,
                lg: 10,
              }}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="18px"
              boxShadow="0 2px 5px rgba(25, 30, 50, 0.04)"
              transition="transform 0.25s ease, box-shadow 0.25s ease"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "0 18px 45px rgba(25, 30, 50, 0.09)",
              }}
            >
              {/* Número */}
              <Text
                position="absolute"
                top={{
                  base: 7,
                  lg: 9,
                }}
                right={{
                  base: 7,
                  lg: 8,
                }}
                fontSize="xs"
                fontWeight="700"
                color="gray.300"
              >
                {String(index + 1).padStart(2, "0")}
              </Text>

              {/* Ícono */}
              <Flex
                w="62px"
                h="62px"
                flexShrink={0}
                align="center"
                justify="center"
                borderRadius="16px"
                bg="purple.50"
                color="#667eea"
              >
                <Icon size={27} strokeWidth={1.7} />
              </Flex>

              {/* Contenido inferior */}
              <Box mt="10">
                <Heading
                  as="h3"
                  maxW="320px"
                  minH={{ base: "60px", lg: "58px" }}
                  fontSize={{
                    base: "xl",
                    lg: "22px",
                  }}
                  lineHeight="1.25"
                  letterSpacing="-0.025em"
                  fontWeight="600"
                  color="#11131c"
                >
                  {title}
                </Heading>

                <Text
                  mt={4}
                  fontSize={{
                    base: "lg",
                    lg: "17px",
                  }}
                  lineHeight="1.65"
                  color="gray.600"
                >
                  {copy}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* Frase inferior */}
        <Flex
          mt={{
            base: 12,
            md: 16,
          }}
          align="center"
          gap={{
            base: 4,
            md: 5,
          }}
        >
          <Box
            w={{
              base: "48px",
              md: "84px",
            }}
            h="4px"
            flexShrink={0}
            borderRadius="full"
            bgImage={BRAND_GRADIENT}
          />

          <Text
            fontFamily="heading"
            fontSize={{
              base: "xl",
              md: "28px",
            }}
            lineHeight="1.25"
            letterSpacing="-0.025em"
            fontWeight="700"
            color="#121522"
          >
            El desafío no es incorporar tecnología, sino aplicarla con criterio.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
