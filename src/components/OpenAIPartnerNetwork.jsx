import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { RiOpenaiFill } from "react-icons/ri";

import { WHATSAPP_URL } from "../lib/constants.js";

const contactUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hola, vi la web de Olmond Consulting y me gustaría conversar sobre cómo aplicar IA en mi empresa.",
)}`;

export function OpenAIPartnerNetwork() {
  return (
    <Box
      as="section"
      id="openai-partner-network"
      aria-labelledby="openai-partner-title"
      bg="#F7F6FB"
      color="#171827"
      borderBottom="1px solid #E1E3EC"
      py={{ base: 16, md: 20, lg: 24 }}
      scrollMarginTop="104px"
    >
      <Container maxW="6xl">
        <Flex
          data-reveal=""
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={{ base: 10, md: 12, lg: 16 }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Box minW={0} flex="1">
            <Text
              color="purple.600"
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="800"
              letterSpacing="0.2em"
              textTransform="uppercase"
            >
              Nuestra red
            </Text>
            <Heading
              as="h2"
              id="openai-partner-title"
              mt={{ base: 6, md: 7 }}
              fontSize={{ base: "40px", sm: "48px", md: "56px", lg: "60px" }}
              fontWeight="500"
              lineHeight="1.05"
              letterSpacing="-0.05em"
            >
              Somos parte de OpenAI Partner Network
            </Heading>
            <Text mt={{ base: 6, md: 7 }} color="#666A86" fontSize={{ base: "17px", md: "18px" }} lineHeight="1.65">
              Integramos la red de socios de OpenAI y acompañamos a las empresas
              en la adopción práctica y responsable de inteligencia artificial.
            </Text>
            <Link
              data-motion-cta=""
              display="inline-flex"
              alignItems="center"
              gap={2}
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              mt={3}
              py={2}
              color="purple.600"
              fontSize={{ base: "sm", lg: "md" }}
              fontWeight="700"
              _focusVisible={{ outline: "3px solid #805AD5", outlineOffset: "4px" }}
            >
              Conversemos sobre tu empresa
              <ArrowForwardIcon data-motion-arrow="" aria-hidden="true" />
            </Link>
          </Box>
          <Flex
            direction="column"
            align="center"
            flexShrink={0}
            maxW="full"
            color="#171827"
            aria-label="OpenAI Partner Network"
          >
            <Flex align="center" gap={{ base: 3, lg: 4 }}>
              <Box as={RiOpenaiFill} boxSize={{ base: "48px", md: "64px", lg: "88px" }} flexShrink={0} aria-hidden="true" />
              <Text fontFamily="Arial, sans-serif" fontSize={{ base: "40px", md: "56px", lg: "72px" }} fontWeight="600" letterSpacing="-0.05em" lineHeight="1">
                OpenAI
              </Text>
            </Flex>
            <Text mt={3} fontFamily="Arial, sans-serif" fontSize={{ base: "18px", md: "22px", lg: "26px" }} fontWeight="500">
              Partner Network
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
