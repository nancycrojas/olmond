import { Heading, HStack, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { FaEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Stack py={8} color="white">
      <HStack w="full" justify="space-between" p={4}>
        <Link to="/" as={RouterLink} color="white" _hover="">
          <Heading size="md">
            Olmond <br></br> Consulting
          </Heading>
        </Link>

        <HStack justifyContent="center" spacing={6} my={4}>
          <Link href="https://linkedin.com" isExternal>
            <Icon as={FaLinkedin} w={8} h={8} />
          </Link>
          <Link href="https://whatsapp.com" isExternal>
            <Icon as={FaWhatsapp} w={8} h={8} />
          </Link>
          <Link href="mailto:email@example.com">
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

export default Footer;
