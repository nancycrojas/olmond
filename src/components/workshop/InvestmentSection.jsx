/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";
import { CTA } from "./CTA";
import { SectionLabel } from "./SectionShell";

export const InvestmentSection = ({ recipients }) => {
  const DETAILS = [
    { key: "Modalidad", value: "Virtual" },
    { key: "Duración", value: "6 encuentros" },
    { key: "Carga horaria total", value: "12 horas" },
    {
      key: "Destinatarios",
      value: recipients,
    },
  ];

  return (
    <Box as="section" id="inversion" bg="white" py={24}>
      <Container maxW="5xl" px={6}>
        <Flex justify="center" mb={10}>
          <SectionLabel>Inversión</SectionLabel>
        </Flex>
        <Box
          position="relative"
          overflow="hidden"
          p={{ base: 8, md: 14 }}
          borderRadius="2rem"
          border="1px solid"
          borderColor="gray.200"
          bgGradient="linear(to-br, white, white, gray.50)"
          boxShadow="0 30px 80px -30px rgba(102, 126, 234, 0.4)"
        >
          <Box
            position="absolute"
            right={-24}
            top={-24}
            h={72}
            w={72}
            borderRadius="full"
            bgGradient={GRADIENT_BRAND}
            opacity={0.2}
            filter="blur(64px)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            left={-24}
            bottom={-24}
            h={72}
            w={72}
            borderRadius="full"
            bg="brand.accent"
            opacity={0.1}
            filter="blur(64px)"
            pointerEvents="none"
          />

          <Heading
            as="h2"
            position="relative"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            color="gray.900"
          >
            Workshop de Inteligencia Artificial Aplicada para la Productividad
            Empresarial
          </Heading>

          <SimpleGrid
            position="relative"
            columns={{ base: 1, md: 2 }}
            spacing={5}
            mt={10}
          >
            {DETAILS.map((row) => (
              <Box
                key={row.key}
                bg="white"
                p={5}
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.200"
              >
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="gray.500"
                >
                  {row.key}
                </Text>
                <Text
                  mt={2}
                  fontSize="md"
                  fontWeight="semibold"
                  color="gray.900"
                >
                  {row.value}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Stack
            position="relative"
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            spacing={6}
            mt={10}
            p={8}
            borderRadius="2xl"
            bgGradient={GRADIENT_BRAND}
            color="white"
            textAlign={{ base: "center", md: "left" }}
          >
            <Box>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.16em"
                color="whiteAlpha.800"
              >
                Inversión total
              </Text>
              <Text
                mt={2}
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                USD 1.200
              </Text>
            </Box>
            <CTA rightIcon={<LuArrowRight />}>Avanzar con la propuesta</CTA>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
