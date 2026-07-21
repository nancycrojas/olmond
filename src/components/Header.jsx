import {
  Box,
  Container,
  Flex,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { LuMenu, LuX } from "react-icons/lu";

import { Brand } from "../components/ui/Brand.jsx";
import { CTA } from "../components/ui/CTA.jsx";
import { DIAGNOSTICO_URL, NAV_ITEMS } from "../lib/constants.js";

export const Header = () => {
  const menu = useDisclosure();
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="banner"
      bg="rgba(16,18,27,.92)"
      color="white"
      backdropFilter="blur(14px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="6xl">
        <Flex h="72px" align="center" justify="space-between">
          <Link
            href="#inicio"
            aria-label="Olmond Consulting, inicio"
            _hover={{ textDecoration: "none" }}
          >
            <Brand />
          </Link>
          <Flex
            as="nav"
            aria-label="Navegación principal"
            display={{ base: "none", lg: "flex" }}
            align="center"
            gap={7}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                fontFamily="heading"
                fontSize="sm"
                fontWeight="600"
                color="whiteAlpha.800"
                _hover={{ color: "white" }}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
          <CTA
            as="a"
            href={DIAGNOSTICO_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            py={5}
            display={{ base: "none", lg: "inline-flex" }}
          >
            Hacer diagnóstico &nbsp; ↗
          </CTA>
          <IconButton
            display={{ base: "inline-flex", lg: "none" }}
            variant="ghost"
            color="white"
            aria-label={menu.isOpen ? "Cerrar menú" : "Abrir menú"}
            icon={menu.isOpen ? <LuX /> : <LuMenu />}
            onClick={menu.onToggle}
          />
        </Flex>
        {menu.isOpen && (
          <Stack
            as="nav"
            aria-label="Navegación móvil"
            display={{ base: "flex", lg: "none" }}
            direction="column"
            align="stretch"
            spacing={1}
            w="full"
            pt={3}
            pb={6}
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={menu.onClose}
                display="block"
                w="full"
                px={4}
                py={3}
                borderRadius="lg"
                fontFamily="heading"
                fontSize="md"
                fontWeight="600"
                color="whiteAlpha.800"
                transition="all 0.2s ease"
                _hover={{
                  bg: "whiteAlpha.100",
                  color: "white",
                  textDecoration: "none",
                  transform: "translateX(4px)",
                }}
              >
                {item.label}
              </Link>
            ))}

            <CTA
              as="a"
              href={DIAGNOSTICO_URL}
              target="_blank"
              rel="noopener noreferrer"
              w="full"
              mt={4}
              justifyContent="center"
              onClick={menu.onClose}
            >
              Hacer diagnóstico
            </CTA>
          </Stack>
        )}
      </Container>
    </Box>
  );
};
