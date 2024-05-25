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

const ContactForm = () => {
  return (
    <Container maxW="4xl">
      <Stack
        id="contact"
        p={8}
        color="white"
        border="1px"
        borderColor={"muted"}
        borderRadius={10}
      >
        <Heading textAlign="center" mb={6}>
          Habla con Nosotros
        </Heading>
        <VStack as="form" spacing={4}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input placeholder="Nombre" type="text" bg="white" color="black" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" type="email" bg="white" color="black" />
          </FormControl>
          <FormControl>
            <FormLabel>Mensaje</FormLabel>
            <Textarea placeholder="Mensaje" bg="white" color="black" />
          </FormControl>
          <Button bg="#256a60" color="white" px={8}>
            Enviar
          </Button>
        </VStack>
      </Stack>
    </Container>
  );
};

export default ContactForm;
