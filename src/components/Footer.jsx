import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

import logo from "../assets/logo-olmond.png";

const footerLinks = [
  {
    label: "Servicios",
    href: "#que-hacemos",
  },
  {
    label: "Nosotros",
    href: "#por-que-olmond",
  },
  {
    label: "Diagnóstico",
    href: "#diagnostico",
  },
];

export const Footer = () => {
  return (
    <Box as="footer" position="relative" bg="#101220" color="white">
      <Container
        maxW="6xl"
        py={{
          base: 10,
          md: 12,
          lg: 14,
        }}
      >
        {/* Parte superior */}
        <Flex
          align={{
            base: "flex-start",
            md: "center",
          }}
          justify="space-between"
          direction={{
            base: "column",
            md: "row",
          }}
          gap={{
            base: 9,
            md: 8,
          }}
        >
          {/* Logo */}
          <Link
            href="#inicio"
            aria-label="Olmond Consulting, inicio"
            display="inline-flex"
            alignItems="center"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Image
              src={logo}
              alt="Olmond Consulting"
              h={{
                base: "56px",
                md: "64px",
              }}
              w="auto"
              maxW={{
                base: "250px",
                md: "300px",
              }}
              objectFit="contain"
              objectPosition="left center"
            />
          </Link>

          {/* Navegación */}
          <Flex
            as="nav"
            aria-label="Navegación del pie"
            align={{
              base: "flex-start",
              md: "center",
            }}
            direction={{
              base: "column",
              sm: "row",
            }}
            wrap="wrap"
            gap={{
              base: 4,
              sm: 6,
              lg: 8,
            }}
          >
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                fontFamily="heading"
                fontSize={{
                  base: "15px",
                  md: "16px",
                }}
                fontWeight="600"
                color="whiteAlpha.800"
                transition="color 0.2s ease"
                _hover={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
        </Flex>

        {/* Línea */}
        <Box
          mt={{
            base: 9,
            md: 10,
          }}
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
        />

        {/* Parte inferior */}
        <Flex
          mt={6}
          align={{
            base: "flex-start",
            sm: "center",
          }}
          justify="space-between"
          direction={{
            base: "column",
            sm: "row",
          }}
          gap={5}
        >
          <Text
            fontSize={{
              base: "13px",
              md: "14px",
            }}
            color="whiteAlpha.600"
          >
            Copyright © {new Date().getFullYear()} Olmond Consulting. Todos los
            derechos reservados.
          </Text>

          {/* Redes y contacto */}
          <HStack spacing={3}>
            <Link
              href="https://www.linkedin.com/company/olmond-consulting"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Olmond Consulting en LinkedIn"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="40px"
              h="40px"
              borderRadius="full"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="whiteAlpha.700"
              transition="all 0.2s ease"
              _hover={{
                color: "white",
                borderColor: "whiteAlpha.400",
                bg: "whiteAlpha.100",
                transform: "translateY(-2px)",
              }}
            >
              <FaLinkedinIn size={18} />
            </Link>

            <Link
              href="mailto:hola@olmondconsulting.com"
              aria-label="Enviar email a Olmond Consulting"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="40px"
              h="40px"
              borderRadius="full"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="whiteAlpha.700"
              transition="all 0.2s ease"
              _hover={{
                color: "white",
                borderColor: "whiteAlpha.400",
                bg: "whiteAlpha.100",
                transform: "translateY(-2px)",
              }}
            >
              <LuMail size={18} />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
