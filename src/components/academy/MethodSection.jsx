import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaBriefcase,
  FaComments,
  FaRocket,
} from "react-icons/fa";

const steps = [
  {
    number: 1,
    icon: FaComments,
    title: "Prompting Avanzado",
    description:
      "Vas a aprender cómo hablarle a la IA para obtener mejores resultados.",
  },
  {
    number: 2,
    icon: FaBriefcase,
    title: "Asistentes que Trabajan para Vos",
    description: "Creamos asistentes para tareas reales o áreas específicas:",
    tags: [
      "Marketing",
      "Ventas",
      "Administración",
      "Operaciones",
      "Soporte interno",
      "Recursos humanos",
      "Y más...",
    ],
  },
  {
    number: 3,
    icon: FaRocket,
    title: "Prácticas que Potencian Resultados",
    description: "Exploramos herramientas que amplían tu capacidad:",
    list: [
      "Presentaciones con IA: guión, narrativa, slides y diseño práctico",
      "Imágenes y videos con IA: comunicación y contenido",
      "n8n (introducción): Creación de agentes de IA",
      "Web con IA: presencia mínima efectiva para validar y convertir",
    ],
  },
];

export const MethodSection = () => {
  const whatsappNumber = "5491234567890"; // Reemplaza con tu número
  const whatsappMessage = encodeURIComponent(
    "Hola! Quiero acceder al método de Pack Olmond",
  );
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Box bg="gray.50" py={{ base: 12, md: 20 }}>
      <Container maxW="6xl">
        <VStack spacing={{ base: 8, md: 12 }}>
          {/* Badge superior */}
          <Badge
            bgGradient="linear(to-r, #667eea, #EC4899)"
            color="white"
            px={4}
            py={2}
            borderRadius="full"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="bold"
            textTransform="none"
          >
            📋 El Método
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
              Pack Olmond te brinda un{" "}
              <Box
                as="span"
                bgGradient="linear(to-r, #4318FF, #EC4899)"
                bgClip="text"
              >
                Método en 3 Etapas
              </Box>
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              maxW="3xl"
            >
              Para aumentar tu Productividad entre un 20% y un 50%
            </Text>
          </VStack>

          <VStack spacing={6} w="full" pt={8}>
            {steps.map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </VStack>

          <Button
            as="a"
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            bgGradient="linear(to-r, #4318FF, #8B5CF6, #EC4899)"
            color="white"
            px={{ base: 8, md: 12 }}
            py={{ base: 6, md: 8 }}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            borderRadius="full"
            rightIcon={<FaArrowRight />}
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 20px 40px rgba(67, 24, 255, 0.3)",
            }}
            transition="all 0.3s"
            mt={8}
          >
            Quiero acceder al método
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
/* eslint-disable react/prop-types */
const StepCard = ({ number, icon, title, description, tags, list }) => {
  return (
    <Box
      bg="white"
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      borderLeft="4px solid"
      borderColor="purple.500"
      boxShadow="md"
      w="full"
      _hover={{
        boxShadow: "xl",
        transform: "translateX(4px)",
      }}
      transition="all 0.3s"
    >
      <HStack align="start" spacing={{ base: 4, md: 6 }}>
        <Box
          bgGradient="linear(to-br, #667eea, #764ba2)"
          minW={{ base: "50px", md: "60px" }}
          h={{ base: "50px", md: "60px" }}
          borderRadius="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="black"
            color="white"
          >
            {number}
          </Text>
        </Box>

        <VStack align="start" spacing={3} flex={1}>
          <HStack spacing={2}>
            <Icon as={icon} color="purple.600" boxSize={{ base: 5, md: 6 }} />
            <Heading
              as="h3"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              color="gray.900"
            >
              {title}
            </Heading>
          </HStack>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.600"
            lineHeight="tall"
          >
            {description}
          </Text>

          {/* Tags (si existen) */}
          {tags && (
            <Wrap spacing={2} pt={2}>
              {tags.map((tag, idx) => (
                <WrapItem key={idx}>
                  <Badge
                    bg="purple.50"
                    color="purple.700"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {tag}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          )}

          {/* Lista (si existe) */}
          {list && (
            <VStack align="start" spacing={2} pt={2} pl={2}>
              {list.map((item, idx) => (
                <HStack key={idx} align="start" spacing={2}>
                  <Box
                    w="6px"
                    h="6px"
                    bg="purple.500"
                    borderRadius="full"
                    mt={2}
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
          )}
        </VStack>
      </HStack>
    </Box>
  );
};
