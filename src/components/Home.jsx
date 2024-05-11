import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
  return (
    <Stack
      bg="#060606"
      minH="90vh"
      color="white"
      alignItems="center"
      justifyContent="center"
      gap={8}
    >
      <Heading w="70%" fontSize="80px">
        Lorem ipsum dolor sit amet.
      </Heading>
      <Text w="70%">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
        molestias distinctio odit commodi facilis hic voluptatum libero harum
        mollitia impedit?
      </Text>
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
  );
};
