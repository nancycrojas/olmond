import { Button, Heading, HStack, Link, Stack } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export const Header = () => {
  return (
    <HStack justify="space-between" gap={8} p={4}>
      <Link to="/" as={RouterLink} color="white" _hover="">
        <Heading size="md">Olmond Consulting</Heading>
      </Link>
      <HStack gap={8} ml={20} w="100%">
        <Link
          to="/"
          as={RouterLink}
          fontWeight="semibold"
          color="white"
          _hover=""
        >
          Quienes somos
        </Link>
        <Link
          to="/"
          as={RouterLink}
          fontWeight="semibold"
          color="white"
          _hover=""
        >
          Servicios
        </Link>
        <Link
          to="/"
          as={RouterLink}
          fontWeight="semibold"
          color="white"
          _hover=""
        >
          Productos
        </Link>
      </HStack>
      <Stack>
        <Button
          as={RouterLink}
          to="/"
          variant="outline"
          border="2px solid purple.800"
          color="white"
          bgGradient="linear(to-r, purple.600, purple.700)"
          _hover={{ bgGradient: "linear(to-r, purple.500, purple.800)" }}
          rightIcon={<FaLongArrowAltRight />}
        >
          Habla con nosotros
        </Button>
      </Stack>
    </HStack>
  );
};
