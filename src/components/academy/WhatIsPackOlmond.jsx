import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBriefcase, FaChartLine } from "react-icons/fa";

export const WhatIsPackOlmond = () => {
  return (
    <Container maxW="5xl" py={{ base: 12, md: 16 }}>
      <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
        <Box
          bgGradient="linear(to-br, #667eea, #764ba2)"
          p={{ base: 4, md: 5 }}
          borderRadius="2xl"
          boxShadow="0 10px 30px rgba(102, 126, 234, 0.3)"
        >
          <Icon as={FaBriefcase} boxSize={{ base: 8, md: 10 }} color="white" />
        </Box>

        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="black"
          color="gray.900"
        >
          ¿Qué es{" "}
          <Box
            as="span"
            bgGradient="linear(to-r, #667eea, #764ba2)"
            bgClip="text"
          >
            Pack Olmond
          </Box>
          ?
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          maxW="3xl"
          lineHeight="tall"
        >
          Pack Olmond es una formación práctica de inteligencia artificial
          aplicada para que crees{" "}
          <Text as="span" fontWeight="bold" color="gray.900">
            &ldquo;empleados de IA&rdquo;
          </Text>{" "}
          que te ayudan en tu día a día laboral.
        </Text>

        <HStack
          spacing={2}
          bg="purple.50"
          px={{ base: 4, md: 6 }}
          py={3}
          borderRadius="full"
          border="2px"
          borderColor="purple.200"
        >
          <Icon as={FaChartLine} color="purple.600" boxSize={4} />
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="semibold"
            color="purple.900"
          >
            Método probado con +2000 profesionales
          </Text>
        </HStack>
      </VStack>
    </Container>
  );
};
