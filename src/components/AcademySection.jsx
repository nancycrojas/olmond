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

import { BRAND_GRADIENT } from "../lib/constants.js";

const formats = [
  {
    number: "01",
    title: "Briefing ejecutivo",
    copy: "Una sesión para alinear oportunidades, riesgos y criterios de decisión.",
    audience: "Dirección y socios",
  },
  {
    number: "02",
    title: "Taller aplicado",
    copy: "Trabajo sobre casos reales del equipo, con ejercicios y protocolos de uso.",
    audience: "Equipos funcionales",
  },
  {
    number: "03",
    title: "Programa online",
    copy: "Desarrollo progresivo de capacidad, gobierno y adopción en la operación.",
    audience: "Organizaciones",
  },
];

function AcademyCard({ number, title, copy, audience }) {
  return (
    <Flex
      role="group"
      direction="column"
      minH={{
        base: "310px",
        md: "330px",
      }}
      p={{
        base: 7,
        md: 8,
      }}
      bg="white"
      border="1px solid"
      borderColor="#D9E1EA"
      borderRadius="17px"
      boxShadow="0 3px 8px rgba(28, 38, 62, 0.04)"
      transition="transform 0.25s ease, box-shadow 0.25s ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 20px 45px rgba(28, 38, 62, 0.10)",
      }}
    >
      {/* Número */}
      <Flex
        w="44px"
        h="44px"
        flexShrink={0}
        align="center"
        justify="center"
        borderRadius="11px"
        bgImage={BRAND_GRADIENT}
        color="white"
        fontSize="11px"
        fontWeight="800"
        boxShadow="0 9px 22px rgba(96, 76, 190, 0.20)"
        transition="transform 0.25s ease, box-shadow 0.25s ease"
        _groupHover={{
          transform: "scale(1.06)",
          boxShadow: "0 12px 28px rgba(96, 76, 190, 0.30)",
        }}
      >
        {number}
      </Flex>

      {/* Contenido */}
      <Box mt={{ base: 10, md: 12 }}>
        <Heading
          as="h3"
          fontSize={{
            base: "xl",
            md: "22px",
          }}
          lineHeight="1.25"
          letterSpacing="-0.035em"
          fontWeight="600"
          color="#151722"
        >
          {title}
        </Heading>

        <Text
          mt={4}
          maxW="340px"
          fontSize={{
            base: "sm",
            md: "15px",
          }}
          lineHeight="1.7"
          color="gray.600"
        >
          {copy}
        </Text>
      </Box>

      {/* Audiencia */}
      <Text
        mt="auto"
        pt={8}
        fontSize="11px"
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="0.045em"
        color="purple.600"
      >
        {audience}
      </Text>
    </Flex>
  );
}

export const AcademySection = () => {
  return (
    <Box
      as="section"
      id="academy"
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
              w="28px"
              h="2px"
              flexShrink={0}
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
              Olmond Academy
            </Text>
          </HStack>

          <Heading
            as="h2"
            mt={5}
            maxW="850px"
            fontSize={{
              base: "36px",
              sm: "42px",
              md: "52px",
            }}
            lineHeight={{
              base: "1.07",
              md: "1.04",
            }}
            letterSpacing="-0.052em"
            fontWeight="500"
            color="#171923"
          >
            Cuando el desafío no es implementar, sino desarrollar capacidad
            interna
          </Heading>

          <Text
            mt={5}
            maxW="760px"
            fontSize={{
              base: "md",
              md: "18px",
            }}
            lineHeight="1.7"
            color="gray.600"
          >
            Formatos para que líderes y equipos adopten IA con criterio
            operativo.
          </Text>
        </Stack>

        {/* Tarjetas */}
        <SimpleGrid
          mt={{
            base: 12,
            md: 14,
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
          {formats.map((format) => (
            <AcademyCard key={format.number} {...format} />
          ))}
        </SimpleGrid>

        {/* Cierre */}
        <Text
          mt={{
            base: 12,
            md: 14,
          }}
          mx="auto"
          maxW="930px"
          textAlign="center"
          fontFamily="heading"
          fontSize={{
            base: "xl",
            md: "25px",
          }}
          lineHeight="1.35"
          letterSpacing="-0.03em"
          fontWeight="600"
          color="#151722"
        >
          No se enseña solo cómo usar herramientas de IA. Se desarrolla la
          capacidad de decidir cuándo, dónde y cómo utilizarlas.
        </Text>
      </Container>
    </Box>
  );
};
