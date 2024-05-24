import { Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";

export const Home = () => {
  return (
    <Stack
      minH="90vh"
      color="white"
      alignItems="center"
      justifyContent="center"
      gap={8}
    >
      <Heading w="70%" fontSize={{ base: "40px", md: "80px" }}>
        Lorem ipsum dolor sit amet.
      </Heading>
      <Text w="70%" mb={8}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
        molestias distinctio odit commodi facilis hic voluptatum libero harum
        mollitia impedit?
      </Text>
      <Link href="/#contact" _hover="">
        <Button
          variant="outline"
          size="lg"
          color="white"
          bgGradient="linear(to-r, #014643, #014643)"
          _hover={{ bgGradient: "linear(to-r, #014643,#014643)" }}
          rightIcon={<FaLongArrowAltRight />}
        >
          Habla con nosotros
        </Button>
      </Link>
    </Stack>
  );
};
