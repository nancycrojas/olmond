import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import dalle from "../assets/dalle.webp";

export const Contact = () => {
  return (
    <Container maxW="4xl">
      <Stack
        p={8}
        color="white"
        border="1px"
        borderColor={"muted"}
        borderRadius={10}
      >
        <Heading textAlign="center" mb={6}>
          Habla con Nosotros
        </Heading>
        <VStack
          as="form"
          action="https://formsubmit.co/patorouan@gmail.com"
          method="POST"
          spacing={4}
          bgImage={`url(${dalle})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              placeholder="Nombre"
              type="text"
              name="text"
              bg="white"
              color="black"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              bg="white"
              color="black"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mensaje</FormLabel>
            <Textarea
              placeholder="Mensaje"
              name="message"
              bg="white"
              color="black"
            />
          </FormControl>
        </VStack>
        <Stack justifyContent="center" alignItems="center">
          <Button type="submit" bg="#256a60" color="white" mt={8} w={150}>
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
