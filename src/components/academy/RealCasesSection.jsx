import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight, FaLightbulb } from "react-icons/fa";

const cases = [
  {
    problem: "Tengo que preparar una propuesta y me toma 4 horas",
    solution: "Con IA la tenés lista en unos minutos",
  },
  {
    problem: "Me cuesta ordenar info para una reunión",
    solution: "Con IA obtenés un resumen con información clave y accionables",
  },
  {
    problem: "Necesito una presentación clara y convincente",
    solution: "Con IA generás las slides en minutos",
  },
  {
    problem: "Me pierdo entre mensajes y tareas repetidas",
    solution: "Con ChatGPT o NotebookLM podés organizarte y recibir ayuda",
  },
  {
    problem: "Quiero contenido visual pero no soy diseñador",
    solution: "Con IA podés crear imágenes y videos en segundos",
  },
  {
    problem: "Necesito una web para vender/validar",
    solution: "Con IA podés crearla sin saber programar",
  },
];

export const RealCasesSection = () => {
  return (
    <Box bg="gray.50" py={{ base: 12, md: 20 }}>
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
            💡 Casos Reales
          </Badge>

          {/* Título */}
          <VStack spacing={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="black"
              color="gray.900"
              lineHeight="shorter"
            >
              Casos reales que{" "}
              <Box
                as="span"
                bgGradient="linear(to-r, #667eea, #EC4899)"
                bgClip="text"
              >
                resolvés con esto
              </Box>
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              maxW="3xl"
            >
              Situaciones cotidianas transformadas con IA
            </Text>
          </VStack>

          {/* Lista de casos */}
          <VStack spacing={5} w="full" pt={8}>
            {cases.map((caseItem, index) => (
              <CaseCard key={index} {...caseItem} />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const CaseCard = ({ problem, solution }) => {
  return (
    <HStack
      bg="white"
      p={{ base: 5, md: 6 }}
      borderRadius="xl"
      boxShadow="sm"
      spacing={{ base: 3, md: 6 }}
      w="full"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-2px)",
      }}
      transition="all 0.3s"
      align="center"
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      {/* Problema */}
      <Text
        fontSize={{ base: "sm", md: "md" }}
        color="gray.500"
        fontStyle="italic"
        flex={1}
        minW={{ base: "100%", md: "auto" }}
      >
        &ldquo;{problem}&rdquo;
      </Text>

      {/* Flecha */}
      <Icon
        as={FaArrowRight}
        color="purple.500"
        boxSize={{ base: 4, md: 5 }}
        flexShrink={0}
        display={{ base: "none", md: "block" }}
      />

      {/* Solución */}
      <HStack
        spacing={2}
        flex={1}
        minW={{ base: "100%", md: "auto" }}
        mt={{ base: 3, md: 0 }}
      >
        <Icon as={FaLightbulb} color="purple.600" boxSize={5} flexShrink={0} />
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.900"
          fontWeight="semibold"
        >
          {solution}
        </Text>
      </HStack>
    </HStack>
  );
};
