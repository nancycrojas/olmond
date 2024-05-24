import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const About = () => {
  return (
    <Stack
      id="about"
      p={8}
      color="white"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      spacing={32}
      mb={8}
      maxW={["100%", "75%"]}
      m="auto"
    >
      <Heading as="h3" size="2xl" textAlign="center">
        Sobre Nosotros
      </Heading>
      <Text fontSize="2xl">
        Somos una consultora que se especializa en la implementación de
        inteligencia artificial en empresas, con el objetivo de mejorar el
        rendimiento de sus operaciones.
      </Text>

      <Stack spacing={32}>
        <Stack
          as="section"
          align="center"
          textAlign="center"
          spacing={5}
          maxW={["90%", "75%"]}
          m="auto"
        >
          <Heading as="h3" size="xl" mb={10}>
            Lorem ipsum dolor sit.
          </Heading>
          <Text fontSize="2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            recusandae itaque quidem quis dicta id maiores esse odio dolorem
            porro.
          </Text>
          <Button as={RouterLink} to="/">
            Get started
          </Button>
        </Stack>

        <Stack
          as="section"
          align="center"
          textAlign="center"
          spacing={5}
          maxW={["90%", "75%"]}
          m="auto"
        >
          <Heading as="h3" size="xl" mb={10}>
            Lorem ipsum dolor sit.
          </Heading>
          <Text fontSize="2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            numquam hic placeat quos laboriosam sunt eum ducimus praesentium
            magni enim?
          </Text>
          <Button as={RouterLink} to="/">
            Get started
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default About;
