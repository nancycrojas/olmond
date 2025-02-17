import {
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

import logo from "../assets/logo.png";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container maxW="1400px" color="#FFFFFF">
      <VStack
        p={{ base: 8, md: 14 }}
        color="white"
        sx={{
          background: "hsla(0, 0%, 100%, 0.05)",
          boxShadow:
            "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
        borderColor={"muted"}
        borderRadius={10}
        _hover={{
          transform: "scale(1.05)",
        }}
        transition="all 0.3s"
        // mx={{ base: 10, sm: 0 }}
      >
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          {/* {t("allRightsReserved")} */}
          Contáctanos para una asesoría personalizada
        </Heading>

        <Link href="https://tally.so/r/3yovMW" isExternal _hover="">
          <Button
            className="animate__animated animate__slideInLeft"
            size="lg"
            color="white"
            bgGradient="linear(to-r, #113cff, #f42ea8)"
            rounded="full"
            fontSize="md"
            px={8}
            _hover={{
              "& svg": {
                transform: "translateX(5px)",
              },
            }}
            // mb={6}
          >
            Inicia tu consulta gratis
            {/* {t("home.talkToUs")} */}
          </Button>
        </Link>
      </VStack>

      <HStack w="full" justify="space-between" py={4}>
        <Link to="/" as={RouterLink}>
          <Image
            src={logo}
            alt="logo"
            boxSize={{ base: "60%", md: "27%", lg: "20%" }}
          />
        </Link>

        <HStack justifyContent="center" spacing={6} my={4}>
          <Link
            href="https://www.linkedin.com/company/olmond-consulting/"
            isExternal
          >
            <Icon as={FaLinkedin} w={8} h={8} />
          </Link>
          <Link
            href="https://wa.me/541133872411?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20solicitar%20una%20reuni%C3%B3n%20para%20conocer%20m%C3%A1s%20acerca%20de%20sus%20servicios"
            isExternal
          >
            <Icon as={FaWhatsapp} w={8} h={8} />
          </Link>
          <Link href="mailto:contacto@olmondconsulting.com">
            <Icon as={FaEnvelope} w={8} h={8} />
          </Link>
        </HStack>
      </HStack>

      <Text fontSize="sm" alignSelf="center" textAlign="center" mb={2}>
        Copyright © {new Date().getFullYear()} Olmond Consulting.{" "}
        {t("allRightsReserved")}
      </Text>
    </Container>
  );
};
