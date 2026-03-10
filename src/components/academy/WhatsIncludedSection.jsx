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
import {
  FaBook,
  FaGlobe,
  FaHeadset,
  FaImage,
  FaKey,
  FaLaptop,
  FaLink,
  FaVideo,
} from "react-icons/fa";
import { MdDiamond } from "react-icons/md";

const includedItems = [
  {
    icon: FaVideo,
    title: "8 Clases",
    description: "Avanzá paso a paso en la implementación de IA",
  },
  {
    icon: FaBook,
    title: "Biblioteca de Prompts",
    description: "Listas para copiar y pegar",
  },
  {
    icon: FaLaptop,
    title: "Plantillas de Asistentes",
    description: "ChatGPT + NotebookLM por caso de uso",
  },
  {
    icon: FaKey,
    title: "Kit de Presentaciones",
    description: "Estructura + narrativa + prompts",
  },
  {
    icon: FaImage,
    title: "Prompts de Imágenes y Videos",
    description: "Prompts + buenas prácticas",
  },
  {
    icon: FaLink,
    title: "Primeros Flujos en n8n",
    description: "Ejemplos de automatización simples",
  },
  {
    icon: FaGlobe,
    title: "Template de Web con IA",
    description: "Prompts para generar páginas web",
  },
  {
    icon: FaHeadset,
    title: "Soporte Online",
    description: "Acompañamiento durante el proceso",
  },
];

export const WhatsIncludedSection = () => {
  return (
    <Box bg="white" py={{ base: 12, md: 20 }}>
      <Container maxW="6xl">
        <VStack spacing={{ base: 8, md: 12 }}>
          {/* Badge superior */}
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
            📦 Todo Incluido
          </Badge>

          {/* Título */}
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="black"
            color="gray.900"
            textAlign="center"
            lineHeight="shorter"
          >
            Qué incluye la{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, #667eea, #764ba2)"
              bgClip="text"
            >
              formación
            </Box>
          </Heading>

          {/* Grid de items incluidos */}
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 4, md: 6 }}
            w="full"
            pt={8}
          >
            {includedItems.map((item, index) => (
              <IncludedItem key={index} {...item} />
            ))}
          </SimpleGrid>

          {/* Valor total */}
          <HStack
            spacing={3}
            bg="white"
            px={{ base: 6, md: 8 }}
            py={4}
            borderRadius="full"
            boxShadow="lg"
            border="2px"
            borderColor="purple.200"
            mt={8}
          >
            <Icon as={MdDiamond} color="purple.600" boxSize={6} />
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="medium"
              color="gray.700"
            >
              Valor total de mercado:
            </Text>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="black"
              bgGradient="linear(to-r, #667eea, #764ba2)"
              bgClip="text"
            >
              $708.000 ARS
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const IncludedItem = ({ icon, title, description }) => {
  return (
    <HStack
      spacing={4}
      bg="gray.50"
      p={{ base: 4, md: 5 }}
      borderRadius="xl"
      _hover={{
        bg: "purple.50",
        transform: "translateX(4px)",
      }}
      transition="all 0.3s"
      align="start"
    >
      <Box
        bgGradient="linear(to-br, #667eea, #764ba2)"
        p={3}
        borderRadius="lg"
        flexShrink={0}
      >
        <Icon as={icon} boxSize={5} color="white" />
      </Box>

      <VStack align="start" spacing={1}>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="gray.900"
        >
          {title}
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};
