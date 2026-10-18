import {
  Box,
  Container,
  Flex,
  Grid,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaLinkedinIn } from "react-icons/fa";
import { LuArrowUp, LuMail } from "react-icons/lu";

import logo from "../assets/logo-olmond.png";

const footerLinks = [
  {
    label: "Servicios",
    href: "#que-hacemos",
  },
  {
    label: "Cómo trabajamos",
    href: "#como-trabajamos",
  },
  {
    label: "Nosotros",
    href: "#nosotros",
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      as="footer"
      position="relative"
      overflow="hidden"
      bg="#0E101D"
      color="white"
    >
      {/* Fondo sutil */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bgImage={`
          radial-gradient(
            circle at 12% 30%,
            rgba(83, 91, 190, 0.08) 0%,
            transparent 34%
          ),
          radial-gradient(
            circle at 85% 100%,
            rgba(109, 68, 185, 0.05) 0%,
            transparent 32%
          )
        `}
      />

      <Container
        maxW="6xl"
        position="relative"
        py={{
          base: 12,
          md: 14,
          lg: 16,
        }}
      >
        {/* =========================
            PARTE SUPERIOR
        ========================== */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "1.25fr 0.75fr",
            lg: "1.4fr 1fr",
          }}
          gap={{
            base: 12,
            md: 12,
            lg: 20,
          }}
          alignItems="center"
        >
          {/* Marca */}
          <Box>
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
                  base: "52px",
                  md: "58px",
                  lg: "68px",
                }}
                w="auto"
                maxW={{
                  base: "260px",
                  md: "300px",
                }}
                objectFit="contain"
                objectPosition="left center"
              />
            </Link>

            <Text
              mt={4}
              maxW="440px"
              fontSize={{
                base: "15px",
                md: "16px",
              }}
              lineHeight="1.6"
              color="whiteAlpha.600"
            >
              Consultoría, capacitación y desarrollo en IA.
            </Text>
          </Box>

          {/* Navegación + contacto */}
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
            }}
            gap={{
              base: 10,
              sm: 0,
            }}
            alignItems="start"
          >
            {/* Explorá */}
            <Stack
              spacing={4}
              pr={{
                sm: 8,
                lg: 12,
              }}
            >
              <Text
                fontSize={{
                  base: "16px",
                  md: "17px",
                }}
                fontWeight="700"
                color="white"
              >
                Explorá
              </Text>

              <Stack spacing={2.5}>
                {footerLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    width="fit-content"
                    fontSize={{
                      base: "15px",
                      md: "16px",
                    }}
                    lineHeight="1.5"
                    color="whiteAlpha.600"
                    transition="all 0.2s ease"
                    _hover={{
                      color: "white",
                      textDecoration: "none",
                      transform: "translateX(3px)",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Stack>

            {/* Conectemos */}
            <Stack
              spacing={4}
              pl={{
                base: 0,
                sm: 8,
                lg: 12,
              }}
              borderLeft={{
                base: "none",
                sm: "1px solid",
              }}
              borderColor="whiteAlpha.100"
              minH={{
                sm: "140px",
              }}
            >
              <Text
                fontSize={{
                  base: "16px",
                  md: "17px",
                }}
                fontWeight="700"
                color="white"
              >
                Conectemos
              </Text>

              <Stack spacing={4}>
                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/company/olmond-consulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  width="fit-content"
                  color="whiteAlpha.600"
                  transition="all 0.2s ease"
                  _hover={{
                    color: "white",
                    textDecoration: "none",
                    transform: "translateX(3px)",
                  }}
                >
                  <Flex
                    w="28px"
                    h="28px"
                    align="center"
                    justify="center"
                    flexShrink={0}
                    color="whiteAlpha.800"
                  >
                    <FaLinkedinIn size={23} />
                  </Flex>

                  <Text
                    fontSize={{
                      base: "15px",
                      md: "16px",
                    }}
                  >
                    LinkedIn
                  </Text>
                </Link>

                {/* Email */}
                <Link
                  href="mailto:hola@olmondconsulting.com"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  width="fit-content"
                  color="whiteAlpha.600"
                  transition="all 0.2s ease"
                  _hover={{
                    color: "white",
                    textDecoration: "none",
                    transform: "translateX(3px)",
                  }}
                >
                  <Flex
                    w="28px"
                    h="28px"
                    align="center"
                    justify="center"
                    flexShrink={0}
                    color="whiteAlpha.800"
                  >
                    <LuMail size={24} strokeWidth={1.7} />
                  </Flex>

                  <Text
                    fontSize={{
                      base: "15px",
                      md: "16px",
                    }}
                  >
                    Escribinos
                  </Text>
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* =========================
            DIVISOR
        ========================== */}
        <Box
          mt={{
            base: 12,
            md: 14,
          }}
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
        />

        {/* =========================
            PARTE INFERIOR
        ========================== */}
        <Flex
          mt={7}
          align={{
            base: "flex-start",
            sm: "center",
          }}
          justify="space-between"
          direction={{
            base: "column",
            sm: "row",
          }}
          gap={6}
        >
          <Text
            fontSize={{
              base: "13px",
              md: "14px",
            }}
            lineHeight="1.6"
            color="whiteAlpha.500"
          >
            © {new Date().getFullYear()} Olmond Consulting. Todos los derechos
            reservados.
          </Text>

          {/* Volver arriba */}
          <Flex
            as="button"
            type="button"
            onClick={scrollToTop}
            align="center"
            gap={3}
            p={0}
            bg="transparent"
            border="none"
            color="whiteAlpha.500"
            cursor="pointer"
            fontFamily="inherit"
            transition="all 0.2s ease"
            _hover={{
              color: "white",
              transform: "translateY(-2px)",
            }}
          >
            <Text
              fontSize={{
                base: "13px",
                md: "14px",
              }}
            >
              Volver arriba
            </Text>

            <LuArrowUp size={20} strokeWidth={1.6} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
