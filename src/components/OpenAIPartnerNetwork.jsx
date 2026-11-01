import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { RiOpenaiFill } from "react-icons/ri";

import { BRAND_GRADIENT, WHATSAPP_URL } from "../lib/constants.js";
import { CTA } from "./ui/CTA";

const contactUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hola, vi la web de Olmond Consulting y me gustaría conversar sobre cómo aplicar IA en mi empresa.",
)}`;

export function OpenAIPartnerNetwork() {
  return (
    <Box
      as="section"
      id="openai-partner-network"
      aria-labelledby="openai-partner-title"
      position="relative"
      bg="#151523"
      color="white"
      bgImage="radial-gradient(ellipse at 85% 30%, rgba(138, 72, 212, 0.22), transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(228, 69, 167, 0.16), transparent 50%)"
      py={{ base: 14, md: 20, lg: 24 }}
      scrollMarginTop="104px"
    >
      <Container maxW="6xl">
        <Grid
          templateColumns={{ base: "minmax(0, 1fr)", lg: "1.2fr 1fr" }}
          gap={{ base: 10, lg: 14 }}
          alignItems="center"
        >
          <Box minW={0}>
            <Text
              color="#C5A6FF"
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.24em"
              textTransform="uppercase"
              mb={6}
            >
              Nuestra red
            </Text>
            <Heading
              as="h2"
              id="openai-partner-title"
              fontSize={{ base: "30px", sm: "38px", md: "44px", xl: "48px" }}
              fontWeight="600"
              lineHeight="1.12"
              letterSpacing="-0.04em"
            >
              Somos parte de
              <Box as="span" display="block">
                OpenAI Partner Network
              </Box>
            </Heading>
            <Text
              mt={6}
              color="#D3D0DD"
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight="1.7"
              maxW="560px"
              mx={{ base: "auto", lg: 0 }}
            >
              Integramos la red de socios de OpenAI y acompañamos a las empresas
              en la adopción práctica y responsable de inteligencia artificial.
            </Text>
            <CTA
              as="a"
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              mt={8}
              maxW="100%"
              px={{ base: 5, sm: 8 }}
              fontSize={{ base: "sm", sm: "md" }}
              bgImage={BRAND_GRADIENT}
              rightIcon={<ArrowForwardIcon aria-hidden="true" />}
              _focusVisible={{ outline: "3px solid #C5A6FF", outlineOffset: "4px" }}
            >
              Conversemos sobre tu empresa
            </CTA>
          </Box>
          <Flex
            direction="column"
            align="center"
            justify="center"
            bg="white"
            color="black"
            borderRadius="24px"
            minH={{ base: "230px", md: "300px" }}
            p={{ base: 6, md: 10 }}
            boxShadow="0 16px 64px rgba(138, 72, 212, 0.16)"
            aria-label="OpenAI Partner Network"
          >
            <Flex align="center" justify="center" gap={{ base: 3, md: 4 }}>
              <Box
                as={RiOpenaiFill}
                boxSize={{ base: "56px", sm: "70px", md: "84px" }}
                flexShrink={0}
                aria-hidden="true"
              />
              <Text
                fontFamily="Arial, sans-serif"
                fontSize={{ base: "44px", sm: "56px", md: "64px" }}
                fontWeight="600"
                letterSpacing="-0.05em"
                lineHeight="1"
              >
                OpenAI
              </Text>
            </Flex>
            <Text
              mt={4}
              fontFamily="Arial, sans-serif"
              fontSize={{ base: "22px", md: "28px" }}
              fontWeight="500"
            >
              Partner Network
            </Text>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}
