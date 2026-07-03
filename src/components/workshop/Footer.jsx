import { Container, Link, Stack, Text } from "@chakra-ui/react";

import { WHATSAPP_URL } from "../../lib/constants";

export const Footer = () => {
  return (
    <Container
      as="footer"
      maxW="full"
      py={8}
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
    >
      <Container maxW="7xl" px={6}>
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          spacing={3}
          fontSize="sm"
          color="gray.500"
        >
          <Text>Propuesta de Workshop · Inteligencia Artificial Aplicada</Text>
          <Link
            href={WHATSAPP_URL}
            isExternal
            fontWeight="medium"
            color="brand.600"
            _hover={{ color: "brand.500", textDecoration: "none" }}
          >
            Contacto por WhatsApp
          </Link>
        </Stack>
      </Container>
    </Container>
  );
};
