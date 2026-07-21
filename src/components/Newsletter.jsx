import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { CTA } from "../components/ui/CTA.jsx";
import { BRAND_GRADIENT } from "../lib/constants.js";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      return;
    }

    let timeout;
    try {
      setStatus("loading");
      const controller = new AbortController();
      timeout = window.setTimeout(() => controller.abort(), 10000);

      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          email: normalizedEmail,
          consentimiento: true,
          website,
          origen: "web_olmond",
          formulario: "newsletter_home",
          fecha_alta: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo registrar la suscripción.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "No se pudo registrar la suscripción.",
        );
      }

      setEmail("");
      setWebsite("");
      setStatus("success");
    } catch (error) {
      console.error("Error de suscripción:", error);
      setStatus("error");
    } finally {
      if (timeout) window.clearTimeout(timeout);
    }
  };

  return (
    <Box
      as="section"
      id="newsletter"
      position="relative"
      overflow="hidden"
      bg="white"
      color="#151722"
      scrollMarginTop="72px"
    >
      {/* Halo decorativo */}
      <Box
        position="absolute"
        top="-220px"
        right="-180px"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="rgba(102, 126, 234, 0.08)"
        filter="blur(130px)"
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
            lg: "minmax(0, 1fr) minmax(420px, 0.85fr)",
          }}
          gap={{
            base: 10,
            lg: 16,
          }}
          alignItems="center"
        >
          {/* Contenido */}
          <Box>
            <HStack spacing={4}>
              <Box
                w="36px"
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
                color="purple.600"
              >
                Newsletter Olmond
              </Text>
            </HStack>

            <Heading
              as="h2"
              mt={{
                base: 6,
                md: 7,
              }}
              maxW="680px"
              fontSize={{
                base: "36px",
                sm: "42px",
                md: "52px",
              }}
              lineHeight="1.05"
              letterSpacing="-0.05em"
              fontWeight="500"
              color="#171923"
            >
              Una newsletter semanal sobre IA aplicada a PyMEs
            </Heading>

            <Text
              mt={{
                base: 6,
                md: 7,
              }}
              maxW="650px"
              fontSize={{
                base: "md",
                md: "18px",
              }}
              lineHeight="1.75"
              color="gray.600"
            >
              Una selección breve de criterios, casos y aprendizajes para tomar
              mejores decisiones sobre inteligencia artificial y automatización.
            </Text>
          </Box>

          {/* Formulario */}
          <Box
            p={{
              base: 6,
              md: 8,
            }}
            bg="#F4F7FA"
            border="1px solid"
            borderColor="#DCE3EA"
            borderRadius="20px"
            boxShadow="0 18px 50px rgba(30, 39, 65, 0.07)"
          >
            <Text
              fontSize={{
                base: "lg",
                md: "21px",
              }}
              lineHeight="1.4"
              fontWeight="700"
              color="#171923"
            >
              Recibí el próximo envío
            </Text>

            <Text mt={2} fontSize="sm" lineHeight="1.7" color="gray.600">
              Se envía todos los lunes a las 9:00 (hora de Buenos Aires).
            </Text>

            <Box as="form" mt={6} onSubmit={handleSubmit}>
              <Input
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                position="absolute"
                left="-10000px"
                w="1px"
                h="1px"
                opacity={0}
              />

              <FormControl isRequired>
                <FormLabel
                  htmlFor="newsletter-email"
                  fontSize="sm"
                  fontWeight="600"
                  color="gray.700"
                >
                  Correo electrónico
                </FormLabel>

                <Stack
                  direction={{
                    base: "column",
                    sm: "row",
                  }}
                  spacing={3}
                >
                  <Input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus("idle");
                    }}
                    placeholder="nombre@empresa.com"
                    h="56px"
                    px={5}
                    bg="white"
                    borderColor="#D7DEE8"
                    borderRadius="full"
                    _hover={{
                      borderColor: "purple.300",
                    }}
                    _focusVisible={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 1px #805AD5",
                    }}
                  />

                  <CTA
                    type="submit"
                    flexShrink={0}
                    minW={{
                      sm: "150px",
                    }}
                    h="56px"
                    px={7}
                    py={0}
                    isLoading={status === "loading"}
                    loadingText="Enviando"
                  >
                    Suscribirme
                  </CTA>
                </Stack>
              </FormControl>

              <Text mt={4} fontSize="xs" lineHeight="1.6" color="gray.500">
                Al suscribirte aceptás recibir la newsletter semanal de Olmond.
                Podés darte de baja desde cualquier envío.
              </Text>

              {status === "success" && (
                <Text mt={4} fontSize="sm" fontWeight="600" color="green.600">
                  Listo. Tu correo fue registrado correctamente.
                </Text>
              )}

              {status === "error" && (
                <Text mt={4} fontSize="sm" fontWeight="600" color="red.600">
                  No pudimos registrar tu correo. Intentá nuevamente.
                </Text>
              )}

            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};
