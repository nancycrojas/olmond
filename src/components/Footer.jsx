import { HStack, Icon, Image, Link, Stack, Text } from "@chakra-ui/react";
import { FaEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

import logo from "../assets/logo.png";

export const Footer = () => {
  return (
    <Stack py={8} color="white">
      <HStack w="full" justify="space-between" p={4}>
        <Link to="/" as={RouterLink}>
          <Image src={logo} alt="logo" boxSize={{ base: "65%", md: "27%" }} />
        </Link>

        <HStack justifyContent="center" spacing={6} my={4}>
          <Link
            href="https://www.linkedin.com/company/olmond-consulting/"
            isExternal
          >
            <Icon as={FaLinkedin} w={8} h={8} />
          </Link>
          <Link href="https://wa.me/541133872411" isExternal>
            <Icon as={FaWhatsapp} w={8} h={8} />
          </Link>
          <Link href="mailto:info@olmondconsulting.com">
            <Icon as={FaEnvelope} w={8} h={8} />
          </Link>
        </HStack>
      </HStack>

      <Text fontSize="sm" alignSelf="center" textAlign="center" mb={2}>
        Copyright © {new Date().getFullYear()} Olmond Consulting. Todos los
        derechos reservados.
      </Text>
    </Stack>
  );
};
