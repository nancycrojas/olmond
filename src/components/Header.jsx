/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { LuMenu, LuX } from "react-icons/lu";

import image from "../assets/logo-olmond.png";
import { BRAND_GRADIENT } from "../lib/constants.js";

const headerLinks = [
  {
    label: "Servicios",
    href: "/#que-hacemos",
  },
  {
    label: "Nosotros",
    href: "/#nosotros",
  },
];

const DesktopNavLink = ({ label, href }) => {
  return (
    <Link
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      h="44px"
      px={6}
      border="2px solid"
      borderColor="whiteAlpha.300"
      borderRadius="full"
      fontFamily="heading"
      fontSize={{
        lg: "14px",
        xl: "15px",
      }}
      fontWeight="700"
      color="white"
      whiteSpace="nowrap"
      transition="all 0.2s ease"
      _hover={{
        color: "white",
        borderColor: "whiteAlpha.500",
        bg: "whiteAlpha.50",
        textDecoration: "none",
        transform: "translateY(-1px)",
      }}
    >
      {label}
    </Link>
  );
};

export const Header = () => {
  const menu = useDisclosure();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="banner"
      bg="rgba(18, 19, 31, 0.96)"
      color="white"
      backdropFilter="blur(16px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="6xl">
        <Flex
          minH={{
            base: "80px",
            lg: "104px",
          }}
          align="center"
          justify="space-between"
          gap={8}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Olmond Consulting, inicio"
            display="flex"
            alignItems="center"
            flexShrink={0}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Image
              src={image}
              alt="Olmond Consulting"
              h={{
                base: "52px",
                md: "58px",
                lg: "68px",
              }}
              w="auto"
              maxW={{
                base: "220px",
                md: "270px",
                lg: "300px",
              }}
              objectFit="contain"
              objectPosition="left center"
              display="block"
            />
          </Link>

          {/* Desktop */}
          <Flex
            as="nav"
            aria-label="Navegación principal"
            display={{
              base: "none",
              lg: "flex",
            }}
            align="center"
            justify="flex-end"
            gap={{
              lg: 3,
              xl: 4,
            }}
            flex="1"
          >
            {headerLinks.map((item) => (
              <DesktopNavLink key={item.label} {...item} />
            ))}

            {/* Diagnóstico destacado */}
            <Link
              href="https://www.olmondconsulting.com/diagnostico"
              isExternal
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              h="44px"
              px={6}
              borderRadius="full"
              bgImage={BRAND_GRADIENT}
              fontFamily="heading"
              fontSize={{
                lg: "14px",
                xl: "15px",
              }}
              fontWeight="700"
              color="white"
              whiteSpace="nowrap"
              boxShadow="0 10px 30px rgba(110, 72, 210, 0.16)"
              transition="all 0.2s ease"
              _hover={{
                color: "white",
                textDecoration: "none",
                opacity: 0.94,
                transform: "translateY(-1px)",
              }}
            >
              Diagnóstico
            </Link>
          </Flex>

          {/* Mobile */}
          <IconButton
            display={{
              base: "inline-flex",
              lg: "none",
            }}
            variant="ghost"
            color="white"
            aria-label={menu.isOpen ? "Cerrar menú" : "Abrir menú"}
            icon={menu.isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
            onClick={menu.onToggle}
            _hover={{
              bg: "whiteAlpha.100",
            }}
          />
        </Flex>

        {/* Menú mobile */}
        {menu.isOpen && (
          <Stack
            as="nav"
            aria-label="Navegación móvil"
            display={{
              base: "flex",
              lg: "none",
            }}
            direction="column"
            align="stretch"
            spacing={2}
            w="full"
            pt={4}
            pb={7}
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
          >
            {headerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={menu.onClose}
                display="flex"
                alignItems="center"
                w="full"
                minH="52px"
                px={5}
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="full"
                fontFamily="heading"
                fontSize="md"
                fontWeight="600"
                color="whiteAlpha.900"
                transition="all 0.2s ease"
                _hover={{
                  bg: "whiteAlpha.100",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="https://www.olmondconsulting.com/diagnostico"
              isExternal
              onClick={menu.onClose}
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="full"
              minH="54px"
              mt={2}
              px={5}
              borderRadius="full"
              bgImage={BRAND_GRADIENT}
              fontFamily="heading"
              fontSize="md"
              fontWeight="700"
              color="white"
              _hover={{
                color: "white",
                textDecoration: "none",
                opacity: 0.94,
              }}
            >
              Diagnóstico
            </Link>
          </Stack>
        )}
      </Container>
    </Box>
  );
};
