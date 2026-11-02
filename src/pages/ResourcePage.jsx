import {
  Box, Container, Flex, Grid, Heading, Image, Link, Stack, Text,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";
import { useLocation } from "react-router-dom";

import logo from "../assets/logo-olmond.png";
import { Footer } from "../components/Footer";
import { resourceByPath } from "../data/resourcePages";
import { BRAND_GRADIENT, WHATSAPP_URL } from "../lib/constants";

export function ResourcePage() {
  const { pathname } = useLocation();
  const page = resourceByPath[pathname];
  if (!page) return null;

  return (
    <Box bg="white" color="#171827" id="inicio">
      <Link href="#contenido" position="absolute" left="-9999px" zIndex={20}
        _focus={{ left: 4, top: 4, bg: "white", color: "#171827", p: 4 }}>
        Ir al contenido
      </Link>
      <Box as="header" bg="#0E101D" color="white" borderBottom="1px solid" borderColor="whiteAlpha.100">
        <Container maxW="6xl" py={{ base: 5, md: 6 }}>
          <Flex align="center" justify="space-between" gap={4}>
            <Link href={page.back} display="inline-flex" alignItems="center" gap={3}
              minH="44px" fontSize={{ base: "14px", md: "16px" }} color="#E4E3F0"
              _hover={{ color: "white", textDecoration: "none" }}
              _focusVisible={{ outline: "2px solid #B49BFF", outlineOffset: "5px", borderRadius: "4px" }}>
              <LuArrowLeft size={22} aria-hidden="true" />
              {page.backLabel}
            </Link>
            <Image src={logo} alt="Olmond Consulting" w={{ base: "130px", md: "192px" }} h="auto" flexShrink={0} />
          </Flex>
        </Container>
      </Box>

      <Box as="main" id="contenido">
        <Box as="section" bg="#111321" color="white" position="relative" overflow="hidden"
          bgImage="radial-gradient(ellipse at 80% 10%, rgba(114,87,234,.14), transparent 65%)">
          <Container maxW="6xl" py={{ base: 14, md: 20, lg: 24 }}>
            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="800" letterSpacing=".18em"
              textTransform="uppercase" color="#BEAFF7">{page.label}</Text>
            <Heading as="h1" mt={6} maxW="1000px" fontSize={{ base: "40px", sm: "48px", md: "60px", lg: "68px" }}
              fontWeight="500" letterSpacing="-.045em" lineHeight="1.08">
              {page.title}{" "}
              <Box as="span" display="block" color="#BCA6FF">{page.accent}</Box>
            </Heading>
            <Text mt={7} maxW="760px" fontSize={{ base: "18px", md: "21px" }} lineHeight="1.65" color="#C8CAD9">
              {page.intro}
            </Text>
          </Container>
        </Box>

        <Box as="article">
          <Box bg="#F5F3FA" borderBottom="1px solid #E9E5F2">
            <Container maxW="6xl" py={{ base: 9, md: 12 }}>
              <Grid templateColumns={{ base: "1fr", lg: ".65fr 1.35fr" }} gap={{ base: 4, lg: 16 }}>
                <Text fontSize="12px" fontWeight="800" letterSpacing=".16em" textTransform="uppercase" color="purple.600">
                  El punto de partida
                </Text>
                <Text fontSize={{ base: "18px", md: "21px" }} lineHeight="1.65" color="#35354C" maxW="740px">
                  {page.summary}
                </Text>
              </Grid>
            </Container>
          </Box>

          <Container maxW="6xl" pt={{ base: 4, md: 6 }} pb={{ base: 10, md: 14 }}>
            {page.sections.map((section, index) => (
              <Grid as="section" key={section.title} aria-labelledby={`seccion-${index + 1}`}
                templateColumns={{ base: "1fr", lg: ".65fr 1.35fr" }} gap={{ base: 6, lg: 16 }}
                py={{ base: 10, md: 14 }} borderBottom="1px solid #E1E3EC">
                <Box>
                  <Text fontSize="12px" fontWeight="700" letterSpacing=".14em" color="purple.600" mb={4} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Heading as="h2" id={`seccion-${index + 1}`} fontSize={{ base: "29px", md: "34px" }}
                    fontWeight="500" lineHeight="1.16" letterSpacing="-.035em" maxW="370px">
                    {section.title}
                  </Heading>
                </Box>
                <Stack spacing={5} maxW="740px">
                  {section.paragraphs.map(paragraph => (
                    <Text key={paragraph} fontSize={{ base: "17px", md: "18px" }} lineHeight="1.8" color="#51566D">
                      {paragraph}
                    </Text>
                  ))}
                  {section.example && (
                    <Box mt={2} pl={5} py={2} borderLeft="2px solid #8A48D4">
                      <Text fontSize="16px" lineHeight="1.75" color="#51566D">{section.example}</Text>
                    </Box>
                  )}
                </Stack>
              </Grid>
            ))}
            <Box mt={{ base: 10, md: 14 }} maxW="850px">
              <Text fontSize="12px" fontWeight="800" letterSpacing=".16em" textTransform="uppercase" color="purple.600" mb={4}>
                Para decidir
              </Text>
              <Text fontSize={{ base: "23px", md: "30px" }} lineHeight="1.4" letterSpacing="-.02em" fontWeight="500">
                {page.takeaway}
              </Text>
            </Box>
            {page.references && (
              <Box mt={9}>
                <Text fontSize="13px" color="#666A86" mb={3}>Para profundizar</Text>
                <Stack spacing={3} align="start">
                  {page.references.map(reference => (
                    <Link key={reference.href} href={reference.href} target="_blank" rel="noopener noreferrer"
                      fontSize="14px" color="purple.700" textDecoration="underline" display="inline-flex" alignItems="center" gap={2}
                      aria-label={`${reference.label} (abre en otra pestaña)`}>
                      {reference.label}<LuArrowUpRight aria-hidden="true" />
                    </Link>
                  ))}
                </Stack>
              </Box>
            )}
          </Container>
        </Box>

        <Box as="section" bg="#F5F3FA">
          <Container maxW="6xl" py={{ base: 12, md: 16 }}>
            <Grid templateColumns={{ base: "1fr", lg: "1fr auto" }} alignItems="center" gap={8}>
              <Box>
                <Heading as="h2" fontSize={{ base: "32px", md: "42px" }} fontWeight="500" lineHeight="1.1" letterSpacing="-.04em">
                  Conversemos sobre tu empresa.
                </Heading>
                <Text mt={4} maxW="620px" color="#666A86" fontSize="17px" lineHeight="1.65">
                  Contanos qué necesitás mejorar y evaluamos cómo podemos ayudarte.
                </Text>
              </Box>
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" display="inline-flex"
                alignItems="center" justifyContent="center" gap={3} minH="54px" px={8} py={3}
                w={{ base: "full", sm: "fit-content" }} borderRadius="full" bgImage={BRAND_GRADIENT}
                color="white" fontWeight="700" fontSize="17px" boxShadow="0 12px 30px rgba(103,78,210,.18)"
                _hover={{ textDecoration: "none", boxShadow: "0 16px 36px rgba(103,78,210,.26)" }}
                _focusVisible={{ outline: "3px solid #553C9A", outlineOffset: "4px" }}>
                Hablar con un asesor<FaWhatsapp size={21} aria-hidden="true" />
              </Link>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
