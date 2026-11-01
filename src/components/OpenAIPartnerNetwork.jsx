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
      py={{ base: 8, md: 10 }}
      scrollMarginTop="104px"
    >
      <Container maxW="6xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: 6, md: 10, lg: 14 }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Box minW={0} flex="1">
            <Text
              color="purple.600"
              fontSize="xs"
              fontWeight="800"
              letterSpacing="0.2em"
              textTransform="uppercase"
              mb={3}
            >
              Nuestra red
            </Text>
            <Heading
              as="h2"
              id="openai-partner-title"
              fontSize={{ base: "24px", md: "28px", lg: "30px" }}
              fontWeight="600"
              lineHeight="1.2"
              letterSpacing="-0.035em"
            >
              Somos parte de OpenAI Partner Network
            </Heading>
            <Text mt={3} color="#666A86" fontSize="15px" lineHeight="1.65">
              Integramos la red de socios de OpenAI y acompañamos a las empresas
              en la adopción práctica y responsable de inteligencia artificial.
            </Text>
            <Link
              display="inline-flex"
              alignItems="center"
              gap={2}
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              mt={3}
              py={2}
              color="purple.600"
              fontSize="sm"
              fontWeight="700"
              _focusVisible={{ outline: "3px solid #805AD5", outlineOffset: "4px" }}
            >
              Conversemos sobre tu empresa
              <ArrowForwardIcon aria-hidden="true" />
            </Link>
          </Box>
          <Flex
            direction="column"
            align="center"
            flexShrink={0}
            color="#171827"
            aria-label="OpenAI Partner Network"
          >
            <Flex align="center" gap={3}>
              <Box as={RiOpenaiFill} boxSize="42px" flexShrink={0} aria-hidden="true" />
              <Text fontFamily="Arial, sans-serif" fontSize="36px" fontWeight="600" letterSpacing="-0.05em" lineHeight="1">
                OpenAI
              </Text>
            </Flex>
            <Text mt={2} fontFamily="Arial, sans-serif" fontSize="17px" fontWeight="500">
              Partner Network
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
