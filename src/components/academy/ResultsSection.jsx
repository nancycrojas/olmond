import {
  Badge,
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaBriefcase,
  FaChalkboardTeacher,
  FaClock,
  FaGlobe,
  FaImage,
  FaLink,
  FaRobot,
} from "react-icons/fa";

const benefits = [
  {
    icon: FaBriefcase,
    title: "Crear asistentes que trabajan para vos",
    description:
      "Ante tareas complejas y tediosas, obtené resultados de alto nivel profesional",
  },
  {
    icon: FaClock,
    title: "Ahorrar horas por semana",
    description:
      "En tareas repetitivas: emails, documentos, resúmenes, análisis, reportes",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Mejorar la calidad de tus resultados",
    description: "Entregables más pulidos y profesionales con menos esfuerzo",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Presentaciones profesionales en minutos",
    description: "Creá slides impactantes en una fracción del tiempo habitual",
  },
  {
    icon: FaImage,
    title: "Imágenes y videos sin depender de terceros",
    description: "Generá contenido visual para comunicar mejor tu mensaje",
  },
  {
    icon: FaRobot,
    title: "Asistentes expertos con ChatGPT y NotebookLM",
    description: "Trabajá con tus propios materiales de forma inteligente",
  },
  {
    icon: FaLink,
    title: "Primeros pasos en automatización",
    description: "Introducción a creación de agentes con herramientas como n8n",
  },
  {
    icon: FaGlobe,
    title: "Páginas web simples con IA",
    description: "Validá ideas, vendé servicios o mostrá tu trabajo en minutos",
  },
];

export const ResultsSection = () => {
  return (
    <Box bg="gray.50" py={{ base: 12, md: 20 }}>
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
            ✨ Resultados Reales
          </Badge>

          <VStack spacing={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="black"
              color="gray.900"
              maxW="4xl"
              lineHeight="shorter"
            >
              Lo que vas a lograr si{" "}
              <Box
                as="span"
                bgGradient="linear(to-r, #4318FF, #EC4899)"
                bgClip="text"
              >
                implementás el sistema
              </Box>
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              maxW="3xl"
            >
              Beneficios concretos que impactan directamente en tu productividad
              diaria
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 5, md: 6 }}
            w="full"
            pt={8}
            maxW="5xl"
            mx="auto"
          >
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const BenefitCard = ({ icon, title, description }) => {
  return (
    <Box
      bg="white"
      p={{ base: 5, md: 6 }}
      borderRadius="2xl"
      boxShadow="sm"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-4px)",
      }}
      transition="all 0.3s"
      border="1px"
      borderColor="gray.200"
    >
      <VStack align="start" spacing={3}>
        {" "}
        <Box
          bgGradient="linear(to-br, #667eea, #764ba2)"
          p={3}
          borderRadius="xl"
        >
          <Icon as={icon} boxSize={5} color="white" />
        </Box>
        <Heading
          as="h3"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="gray.900"
        >
          {title}
        </Heading>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.600"
          lineHeight="tall"
        >
          {description}
        </Text>
      </VStack>
    </Box>
  );
};
