import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { LuMessageCircle, LuSparkles } from "react-icons/lu";

import { GRADIENT_BRAND } from "../../lib/constants";
import { CTA } from "./CTA";

const NAV_LINKS = [
  { href: "#objetivos", label: "Objetivos" },
  { href: "#contenidos", label: "Contenidos" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#inversion", label: "Inversión" },
];

export const Navbar = () => {
  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg="blackAlpha.500"
      backdropFilter="blur(8px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Container maxW="7xl" px={6} py={4}>
        <Flex align="center" justify="space-between">
          <HStack spacing={2} color="white">
            <Flex
              h={8}
              w={8}
              align="center"
              justify="center"
              borderRadius="lg"
              bgGradient={GRADIENT_BRAND}
              boxShadow="md"
            >
              <Icon as={LuSparkles} boxSize={4} />
            </Flex>
            <Text fontSize="sm" fontWeight="semibold" letterSpacing="tight">
              Workshop IA · Lagostena
            </Text>
          </HStack>
          <HStack spacing={7} display={{ base: "none", md: "flex" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                fontSize="sm"
                color="whiteAlpha.800"
                _hover={{ color: "white", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </HStack>
          <CTA
            variant="ghost"
            size="sm"
            px={4}
            py={2}
            fontSize="xs"
            leftIcon={<LuMessageCircle />}
          >
            Solicitar propuesta
          </CTA>
        </Flex>
      </Container>
    </Box>
  );
};
