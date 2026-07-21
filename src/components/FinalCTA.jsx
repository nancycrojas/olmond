import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import { CTA } from "../components/ui/CTA.jsx";
import { BRAND_GRADIENT, DIAGNOSTICO_URL } from "../lib/constants.js";

export const FinalCTA = () => {
  return (
    <Box
      as="section"
      id="siguiente-paso"
      position="relative"
      overflow="hidden"
      bg="#171925"
      color="white"
      scrollMarginTop="72px"
    >
      {/* Fondo */}
      <Box
        position="absolute"
        inset={0}
        bgImage={`
          radial-gradient(
            circle at 5% 50%,
            rgba(88, 101, 190, 0.18) 0%,
            transparent 38%
          ),
          radial-gradient(
            circle at 98% 100%,
            rgba(86, 99, 190, 0.15) 0%,
            transparent 35%
          ),
          radial-gradient(
            circle at 50% 100%,
            rgba(205, 71, 165, 0.06) 0%,
            transparent 34%
          ),
          linear-gradient(
            110deg,
            #22263f 0%,
            #181925 44%,
            #141620 100%
          )
        `}
        pointerEvents="none"
      />

      {/* Halo decorativo */}
      <Box
        position="absolute"
        top="-220px"
        left="-180px"
        w="520px"
        h="520px"
        borderRadius="full"
        bg="rgba(92, 104, 202, 0.13)"
        filter="blur(130px)"
        pointerEvents="none"
      />

      <Container
        maxW="6xl"
        position="relative"
        py={{
          base: 20,
          md: 24,
          lg: 28,
        }}
      >
        <Stack align="center" textAlign="center" spacing={0}>
          {/* Etiqueta */}
          <HStack spacing={4}>
            <Box
              w="38px"
              h="2px"
              flexShrink={0}
              borderRadius="full"
              bgImage={BRAND_GRADIENT}
            />

            <Text
              fontSize={{
                base: "xs",
                md: "sm",
              }}
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.16em"
              color="whiteAlpha.700"
            >
              Siguiente paso
            </Text>
          </HStack>

          {/* Título */}
          <Heading
            as="h2"
            mt={{
              base: 7,
              md: 8,
            }}
            maxW="1100px"
            fontSize={{
              base: "36px",
              sm: "42px",
              md: "52px",
            }}
            lineHeight={{
              base: "1.08",
              md: "1.03",
            }}
            letterSpacing="-0.055em"
            fontWeight="500"
            color="white"
          >
            Empiece por un proceso específico.
          </Heading>

          {/* Descripción */}
          <Text
            mt={{
              base: 7,
              md: 9,
            }}
            maxW="930px"
            fontSize={{
              base: "md",
              md: "20px",
            }}
            lineHeight="1.7"
            color="whiteAlpha.700"
          >
            Seleccione una operación que consuma tiempo, genere errores o limite
            el crecimiento. Doce preguntas permiten saber rápidamente si están
            dadas las condiciones para avanzar.
          </Text>

          {/* Botones */}
          <Flex
            mt={{
              base: 9,
              md: 10,
            }}
            justify="center"
            align="center"
            gap={4}
            direction={{
              base: "column",
              md: "row",
            }}
            w={{
              base: "full",
              sm: "auto",
            }}
          >
            <CTA
              as="a"
              href={DIAGNOSTICO_URL}
              target="_blank"
              rel="noopener noreferrer"
              w={{
                base: "full",
                sm: "auto",
              }}
              minW={{
                sm: "290px",
              }}
            >
              Evaluar un proceso &nbsp; ↗
            </CTA>

            <CTA
              as="a"
              href="#impact-sprint"
              variant="light"
              w={{
                base: "full",
                sm: "auto",
              }}
              minW={{
                sm: "290px",
              }}
            >
              Conocer Impact Sprint
            </CTA>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};
