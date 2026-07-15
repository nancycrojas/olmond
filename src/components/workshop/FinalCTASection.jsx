/* eslint-disable react/prop-types */
import { Box, Container, Heading, HStack, Text } from "@chakra-ui/react";
import { LuArrowRight, LuMessageCircle } from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";
import { CTA } from "./CTA";

export const FinalCTASection = ({ companyName }) => {
  return (
    <Box as="section" position="relative" overflow="hidden" bg="white" py={24}>
      <Container maxW="6xl" px={6}>
        <Box
          position="relative"
          overflow="hidden"
          p={{ base: 10, md: 16 }}
          borderRadius="2.5rem"
          bgGradient={GRADIENT_BRAND}
          color="white"
        >
          <Box
            position="absolute"
            right={-20}
            top={-20}
            h={72}
            w={72}
            borderRadius="full"
            bg="whiteAlpha.300"
            filter="blur(64px)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            left={-20}
            bottom={-20}
            h={72}
            w={72}
            borderRadius="full"
            bg="rgba(236, 72, 153, 0.4)"
            filter="blur(64px)"
            pointerEvents="none"
          />
          <Box position="relative" maxW="3xl">
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="whiteAlpha.800"
            >
              Propuesta de Workshop
            </Text>
            <Heading
              as="h2"
              mt={4}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              fontWeight="extrabold"
              lineHeight="shorter"
              letterSpacing="tight"
            >
              Inteligencia Artificial Aplicada para {companyName}
            </Heading>
            <Text
              mt={5}
              maxW="2xl"
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.800"
            >
              Avancemos con la propuesta y coordinemos el inicio del workshop.
            </Text>
            <HStack mt={8} spacing={3} flexWrap="wrap">
              <CTA rightIcon={<LuArrowRight />}>Avanzar con la propuesta</CTA>
              <CTA variant="ghost" leftIcon={<LuMessageCircle />}>
                Solicitar propuesta
              </CTA>
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
