import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const forYouItems = [
  "Querés potenciar tus capacidades, ampliar tus alcances y mejorar tus resultados",
  "Estás buscando crecer profesionalmente o escalar tu negocio",
  "Sos profesional, emprendedor/a, parte de un equipo o líder y necesitás ejecutar con mayor rapidez y eficiencia",
  "Querés aprender sin tecnicismos, con ejemplos y plantillas listas",
];

const notForYouItems = [
  'Buscás "atajos mágicos" sin implementar nada',
  "Querés programación avanzada o desarrollo técnico profundo",
];

export const IsForYouSection = () => {
  return (
    <Box bg="white" py={{ base: 12, md: 20 }}>
      <Container maxW="4xl">
        <VStack spacing={{ base: 8, md: 12 }}>
          <Badge
            bgGradient="linear(to-r, #4318FF, #EC4899)"
            color="white"
            px={4}
            py={2}
            borderRadius="full"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="bold"
            textTransform="none"
          >
            🎯 ¿Es para vos?
          </Badge>

          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="black"
            color="gray.900"
            textAlign="center"
            lineHeight="shorter"
          >
            Esto es para vos{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, #667eea, #764ba2)"
              bgClip="text"
            >
              si...
            </Box>
          </Heading>

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 6, md: 8 }}
            w="full"
            pt={8}
          >
            <Box
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              borderLeft="4px solid"
              borderColor="green.400"
              boxShadow="md"
              position="relative"
            >
              <HStack spacing={3} mb={6}>
                <Icon as={FaCheck} color="green.500" boxSize={6} />
                <Heading
                  as="h3"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  color="gray.900"
                >
                  Sí, es para vos si:
                </Heading>
              </HStack>

              <VStack spacing={4} align="start">
                {forYouItems.map((item, index) => (
                  <HStack key={index} align="start" spacing={3}>
                    <Icon
                      as={FaCheck}
                      color="green.500"
                      boxSize={5}
                      mt={1}
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.700"
                      lineHeight="tall"
                    >
                      {item}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box
              bg="white"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              borderLeft="4px solid"
              borderColor="red.400"
              boxShadow="md"
              position="relative"
            >
              <HStack spacing={3} mb={6}>
                <Icon as={FaTimes} color="red.500" boxSize={6} />
                <Heading
                  as="h3"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  color="gray.900"
                >
                  No es para vos si:
                </Heading>
              </HStack>
              <VStack spacing={4} align="start">
                {notForYouItems.map((item, index) => (
                  <HStack key={index} align="start" spacing={3}>
                    <Icon
                      as={FaTimes}
                      color="red.500"
                      boxSize={5}
                      mt={1}
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.700"
                      lineHeight="tall"
                    >
                      {item}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};
