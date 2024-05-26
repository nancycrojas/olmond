import "animate.css";

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
      <Heading
        w="70%"
        fontSize={{ base: "30px", md: "40px" }}
        lineHeight="inherit"
        mb={8}
      >
        Únete a la revolución de la IA, el análisis de datos y la automatización
        de procesos. Transforma tu negocio y alcanza nuevos niveles de
        innovación y eficiencia.
      </Heading>
      <Text w="70%" fontSize={{ base: "lg", md: "xl" }} mb={10}>
        Descubre cómo la IA, el análisis de datos y la automatización pueden
        llevar tu negocio al siguiente nivel.
      </Text>
      <Link href="/#contact" _hover="">
        <Button
          className="animate__animated animate__slideInLeft"
          variant="outline"
          size="lg"
          color="white"
          bgGradient="linear(to-r, #1a3a35, #256a60)"
          _hover={{ bgGradient: "linear(to-r, #1a3a35, #256a60)" }}
          rightIcon={<FaLongArrowAltRight />}
        >
          Habla con nosotros
        </Button>
      </Link>
    </Stack>
  );
};
