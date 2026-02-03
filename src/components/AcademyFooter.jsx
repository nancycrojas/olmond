import { Box, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

import image from "../assets/logo_academy.jpg";

export const AcademyFooter = () => {
  return (
    <Box bg="#2D3748" color="white" py={12} px={4}>
      <VStack spacing={6} maxW="7xl" mx="auto" textAlign="center">
        <HStack spacing={3}>
          <Box p={2}>
            <Image
              src={image}
              boxSize={"50px"}
              objectFit="cover"
              borderRadius="2xl"
            />
          </Box>

          <Text fontSize="2xl" fontWeight="bold" color="white">
            Olmond Academy
          </Text>
        </HStack>

        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.300"
          maxW={{ base: "100%", md: "2xl" }}
          lineHeight="tall"
          px={{ base: 2, md: 0 }}
        >
          Formación práctica de inteligencia artificial aplicada para
          profesionales que quieren resultados reales.
        </Text>

        <Stack align="center" spacing={2}>
          <FaInstagram size={24} />
          <Text fontSize="md" fontWeight="medium">
            @olmond.academy
          </Text>
        </Stack>

        <Box w="full" maxW="4xl" h="1px" bg="gray.600" />

        <Text fontSize="sm" color="gray.400">
          © 2026 Olmond Academy. Todos los derechos reservados.
        </Text>
      </VStack>
    </Box>
  );
};
