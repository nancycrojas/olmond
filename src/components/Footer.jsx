import { HStack, Icon, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

import { Logo } from "./Logo";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <HStack w="full" justify="space-between" color="white">
        <Logo />
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

      <HStack
        as="ul"
        justifyContent="center"
        spacing={3}
        my={4}
        listStyleType="none"
        color="white"
        display="flex"
        flexWrap="wrap"
      >
        <Text as="li">
          <Link
            href="mailto:contacto@olmondconsulting.com"
            _hover={{ color: "gray" }}
          >
            Contacto
          </Link>
        </Text>
        <Text>|</Text>
        <Text as="li">
          <Link as={RouterLink} to="/about-us" _hover={{ color: "gray" }}>
            Sobre nosotros
          </Link>
        </Text>
        <Text>|</Text>
        <Text as="li">
          <Link as={RouterLink} to="/rpa" _hover={{ color: "gray" }}>
            RPA
          </Link>
        </Text>
        <Text>|</Text>
        <Text as="li">
          <Link as={RouterLink} to="/ai-agents" _hover={{ color: "gray" }}>
            Agentes de IA
          </Link>
        </Text>
        <Text>|</Text>
        <Text as="li">
          <Link as={RouterLink} to="data-analytics" _hover={{ color: "gray" }}>
            Data Analytics
          </Link>
        </Text>
      </HStack>

      <Text
        fontSize="sm"
        alignSelf="center"
        textAlign="center"
        mb={2}
        color="white"
      >
        Copyright © {new Date().getFullYear()} Olmond Consulting.{" "}
        {t("allRightsReserved")}
      </Text>
    </>
  );
};
