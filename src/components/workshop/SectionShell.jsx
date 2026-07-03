/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { GRADIENT_BRAND } from "../../lib/constants";

export const SectionLabel = ({ children }) => {
  return (
    <HStack
      display="inline-flex"
      spacing={2}
      bg="white"
      px={4}
      py={1.5}
      borderRadius="full"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Box h="6px" w="6px" borderRadius="full" bgGradient={GRADIENT_BRAND} />
      <Text
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="0.14em"
        color="brand.600"
      >
        {children}
      </Text>
    </HStack>
  );
};

export const SectionShell = ({
  id,
  eyebrow,
  title,
  intro,
  children,
  muted = false,
}) => {
  return (
    <Box as="section" id={id} py={24} bg={muted ? "gray.50" : "white"}>
      <Container maxW="7xl" px={6}>
        <VStack spacing={5} maxW="3xl" mx="auto" mb={14} textAlign="center">
          <SectionLabel>{eyebrow}</SectionLabel>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            color="gray.900"
          >
            {title}
          </Heading>
          {intro && (
            <Box
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="tall"
              color="gray.600"
            >
              {intro}
            </Box>
          )}
        </VStack>
        {children}
      </Container>
    </Box>
  );
};
