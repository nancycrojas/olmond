import { Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";

import { Logo } from "./Logo";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Flex
        w="full"
        justify="space-between"
        align="center"
        color="white"
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
        my={4}
      >
        <Logo />
        <HStack spacing={6}>
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
      </Flex>
      {/* <HStack
        as="ul"
        justifyContent="center"
        spacing={3}
        my={4}
        listStyleType="none"
        color="white"
        flexWrap="wrap"
      >
        <Text as="li">
          <Link
            href="mailto:contacto@olmondconsulting.com"
            _hover={{ color: "gray" }}
          >
            {t("contact")}
          </Link>
        </Text>
        <Text>|</Text>
      </HStack> */}
      <Text fontSize="sm" textAlign="center" mb={2} color="white">
        Copyright © {new Date().getFullYear()} Olmond Consulting.{" "}
        {t("allRightsReserved")}
      </Text>
    </>
  );
};
