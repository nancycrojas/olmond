/* eslint-disable react/prop-types */
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export function SectionLabel({ children }) {
  return (
    <Text
      textTransform="uppercase"
      letterSpacing="0.18em"
      fontSize="sm"
      fontWeight="600"
      color="brand.accent"
      mb={3}
      textAlign="center"
    >
      {children}
    </Text>
  );
}

export function SectionShell({
  label,
  title,
  children,
  bg = "white",
  id,
  ...props
}) {
  return (
    <Box as="section" bg={bg} py={{ base: 16, md: 24 }} id={id} {...props}>
      <Container maxW="5xl">
        {label ? <SectionLabel>{label}</SectionLabel> : null}
        {title ? (
          <Heading as="h2" size="xl" fontWeight="800" mb={8} lineHeight="1.2">
            {title}
          </Heading>
        ) : null}
        {children}
      </Container>
    </Box>
  );
}
