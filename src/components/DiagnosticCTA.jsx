import { Box, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";

import { CTA } from "../components/ui/CTA.jsx";
import { BRAND_GRADIENT } from "../lib/constants.js";

export const DiagnosticCTA = () => {
  return (
    <Box
      as="section"
      id="diagnostico"
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
            circle at 4% 10%,
            rgba(64, 83, 184, 0.20) 0%,
            transparent 35%
          ),
          radial-gradient(
            circle at 80% 110%,
            rgba(211, 73, 169, 0.16) 0%,
            transparent 40%
          ),
          linear-gradient(
            115deg,
            #1C1F35 0%,
            #181A29 48%,
            #171521 100%
          )
        `}
        pointerEvents="none"
      />

      {/* Halo azul superior izquierdo */}
      <Box
        position="absolute"
        top="-300px"
        left="-240px"
        w="700px"
        h="700px"
        borderRadius="full"
        bg="rgba(72, 91, 202, 0.13)"
        filter="blur(150px)"
        pointerEvents="none"
      />

      {/* Halo magenta inferior derecho */}
      <Box
        position="absolute"
        right="-150px"
        bottom="-380px"
        w="750px"
        h="750px"
        borderRadius="full"
        bg="rgba(224, 49, 158, 0.11)"
        filter="blur(160px)"
        pointerEvents="none"
      />

      <Container
        maxW="6xl"
        position="relative"
        py={{
          base: 16,
          md: 20,
          lg: 24,
        }}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "0.95fr 1.05fr",
          }}
          gap={{
            base: 12,
            lg: 20,
          }}
          alignItems="center"
        >
          {/* Columna izquierda */}
          <Box>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
              }}
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="#91A2FF"
            >
              Diagnóstico gratis
            </Text>

            <Heading
              as="h2"
              mt={{
                base: 6,
                md: 7,
              }}
              maxW="600px"
              fontSize={{
                base: "44px",
                sm: "52px",
                md: "60px",
                lg: "64px",
              }}
              lineHeight="1.03"
              letterSpacing="-0.055em"
              fontWeight="500"
              color="white"
            >
              Empecemos
              <Box as="span" display="block">
                por{" "}
                <Box as="span" bgImage={BRAND_GRADIENT} bgClip="text">
                  un proceso.
                </Box>
              </Box>
            </Heading>

            <Text
              mt={{
                base: 6,
                md: 7,
              }}
              maxW="600px"
              fontSize={{
                base: "18px",
                md: "20px",
              }}
              lineHeight="1.7"
              color="whiteAlpha.600"
            >
              Contestá unas preguntas y sabé si conviene automatizarlo.
              <Box as="span" display="block">
                Resultado inmediato, sin compromiso.
              </Box>
            </Text>
          </Box>

          {/* Columna derecha */}
          <Stack
            spacing={4}
            maxW={{
              base: "full",
              lg: "540px",
            }}
            w="full"
            ml={{
              lg: "auto",
            }}
          >
            <CTA
              as="a"
              href="/diagnostico"
              target="_blank"
              rel="noopener noreferrer"
              w="full"
              minH="68px"
              fontSize={{
                base: "md",
                md: "18px",
              }}
            >
              Hacer el diagnóstico gratis &nbsp; ↗
            </CTA>

            <Text
              pt={3}
              textAlign="center"
              fontSize={{
                base: "sm",
                md: "16px",
              }}
              lineHeight="1.5"
              color="whiteAlpha.400"
            >
              Si tu proceso no califica, te lo decimos.
            </Text>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};
