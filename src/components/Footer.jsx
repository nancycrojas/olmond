/* eslint-disable react/prop-types */
import { Box, Container, Grid, Link, Stack, Text } from "@chakra-ui/react";

import { Brand } from "../components/ui/Brand.jsx";

const serviceLinks = [
  {
    label: "Impact Sprint",
    href: "#impact-sprint",
  },
  {
    label: "Academy",
    href: "#academy",
  },
  {
    label: "Método",
    href: "#como-trabajamos",
  },
];

const informationLinks = [
  {
    label: "Preguntas frecuentes",
    href: "#preguntas-frecuentes",
  },
];

function FooterColumn({ title, children }) {
  return (
    <Stack spacing={5}>
      <Text
        fontSize="sm"
        fontWeight="700"
        color="white"
        letterSpacing="-0.01em"
      >
        {title}
      </Text>

      <Stack spacing={3.5}>{children}</Stack>
    </Stack>
  );
}

function FooterLink({ children, ...props }) {
  return (
    <Link
      width="fit-content"
      fontSize="sm"
      lineHeight="1.5"
      color="whiteAlpha.600"
      transition="color 0.2s ease, transform 0.2s ease"
      _hover={{
        color: "white",
        textDecoration: "none",
        transform: "translateX(2px)",
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

export const Footer = () => {
  return (
    <Box
      as="footer"
      position="relative"
      overflow="hidden"
      bg="#10121B"
      color="white"
    >
      {/* Iluminación sutil */}
      <Box
        position="absolute"
        top="-220px"
        left="-180px"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="rgba(94, 105, 202, 0.08)"
        filter="blur(130px)"
        pointerEvents="none"
      />

      <Container
        maxW="6xl"
        position="relative"
        pt={{
          base: 14,
          md: 16,
        }}
        pb={{
          base: 7,
          md: 8,
        }}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "1.35fr 0.8fr 0.8fr 0.9fr",
          }}
          gap={{
            base: 10,
            md: 12,
            lg: 16,
          }}
          alignItems="start"
        >
          {/* Marca */}
          <Box>
            <Brand />

            <Text
              mt={6}
              maxW="300px"
              fontSize="sm"
              lineHeight="1.7"
              color="whiteAlpha.600"
            >
              Inteligencia artificial aplicada a procesos operativos de PyMEs.
            </Text>
          </Box>

          {/* Servicios */}
          <FooterColumn title="Servicios">
            {serviceLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Información */}
          <FooterColumn title="Información">
            {informationLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Contacto */}
          <FooterColumn title="Contacto">
            <FooterLink href="mailto:contacto@olmondconsulting.com">
              hola@olmondconsulting.com
            </FooterLink>
          </FooterColumn>
        </Grid>

        {/* Pie inferior */}
        <Box
          mt={{
            base: 12,
            md: 16,
          }}
          pt={6}
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
        >
          <Text fontSize="xs" lineHeight="1.6" color="whiteAlpha.400">
            Copyright © {new Date().getFullYear()} Olmond Consulting. Todos los
            derechos reservados.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
