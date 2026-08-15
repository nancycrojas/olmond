/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { LuArrowRight, LuSparkles } from "react-icons/lu";

import { CTA } from "./CTA";

const slowZoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.08); }
`;

const MotionBox = motion(Box);

export const HeroSection = ({ heroTitle }) => {
  return (
    <Box
      as="section"
      position="relative"
      minH="90vh"
      w="full"
      overflow="hidden"
    >
      <Box position="absolute" inset={0} overflow="hidden">
        <Box
          as="img"
          src="/"
          alt={`Centro de distribución de ${heroTitle} utilizado como imagen principal de la propuesta de workshop de Inteligencia Artificial Aplicada.`}
          h="full"
          w="full"
          objectFit="cover"
          objectPosition="center"
          animation={`${slowZoom} 18s ease-in-out infinite alternate`}
          bgGradient="linear(to-br, #1a1a2e, #764ba2)"
        />
      </Box>
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-br, blackAlpha.800, blackAlpha.600, rgba(118, 75, 162, 0.6))"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-t, blackAlpha.700, transparent, blackAlpha.400)"
      />

      <Container maxW="7xl" px={6} position="relative" zIndex={10}>
        <Flex minH="90vh" direction="column" justify="center" pt={32} pb={20}>
          <MotionBox
            maxW="3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <HStack
              display="inline-flex"
              spacing={2}
              mb={6}
              px={4}
              py={1.5}
              borderRadius="full"
              border="1px solid"
              borderColor="whiteAlpha.400"
              bg="whiteAlpha.200"
              backdropFilter="blur(8px)"
            >
              <Icon as={LuSparkles} boxSize={3.5} color="white" />
              <Text
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.16em"
                color="white"
              >
                Propuesta de Workshop
              </Text>
            </HStack>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
              fontWeight="extrabold"
              lineHeight={1.05}
              letterSpacing="tight"
              color="white"
            >
              {heroTitle}
            </Heading>
            <Text
              mt={6}
              maxW="2xl"
              fontSize={{ base: "md", sm: "lg" }}
              lineHeight="tall"
              color="whiteAlpha.800"
            >
              La IA puede ayudar con tareas repetitivas, mejorar la toma de
              decisiones y agilizar procesos para que las personas aporten más
              valor mientras crecen profesionalmente.
            </Text>
            <HStack mt={8} spacing={3} flexWrap="wrap">
              <CTA variant="primary" rightIcon={<LuArrowRight />}>
                Solicitar propuesta
              </CTA>
              <CTA variant="ghost">Consultar detalles</CTA>
            </HStack>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};
