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
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaDownload,
} from "react-icons/fa";
export const Academy = () => {
  const whatsappNumber = "5491133872411";
  const whatsappMessage = encodeURIComponent(
    "Hola! Quiero aumentar mi productividad con IA",
  );
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Box bg="white">
      {/* Hero Section */}
      <Container maxW="7xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
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
            ⚡ Formación Práctica de IA
          </Badge>

          {/* Título principal */}
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
            fontWeight="black"
            color="gray.900"
            maxW="5xl"
            lineHeight="shorter"
          >
            Cómo Profesionales No Técnicos Aumentan Entre Un{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, #4318FF, #EC4899)"
              bgClip="text"
            >
              20% y 50%
            </Box>{" "}
            Su Productividad y Eficiencia Con Inteligencia Artificial
          </Heading>

          {/* Subtítulo */}
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            color="gray.600"
            maxW="3xl"
            lineHeight="tall"
          >
            Sin programar, sin tener conocimientos técnicos y aplicando un
            método simple y práctico con herramientas como{" "}
            <Text as="span" fontWeight="bold" color="gray.900">
              ChatGPT
            </Text>{" "}
            y{" "}
            <Text as="span" fontWeight="bold" color="gray.900">
              NotebookLM
            </Text>
            .
          </Text>

          {/* CTA Button */}
          <Button
            as="a"
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            bgGradient="linear(to-r, #4318FF, #8B5CF6, #EC4899)"
            color="white"
            px={{ base: 6, md: 12 }}
            py={{ base: 6, md: 8 }}
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="bold"
            borderRadius="full"
            rightIcon={<FaArrowRight />}
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 20px 40px rgba(67, 24, 255, 0.3)",
            }}
            transition="all 0.3s"
            mt={4}
            w={{ base: "full", md: "auto" }}
            maxW={{ base: "100%", md: "none" }}
          >
            <Box as="span" display={{ base: "none", md: "inline" }}>
              Quiero aumentar mi productividad y eficiencia con IA
            </Box>
            <Box as="span" display={{ base: "inline", md: "none" }}>
              Aumentar mi productividad con IA
            </Box>
          </Button>

          {/* Features badges */}
          <HStack
            spacing={{ base: 2, md: 4 }}
            flexWrap="wrap"
            justify="center"
            pt={4}
          >
            <FeatureBadge icon={FaCheckCircle} text="Registro seguro" />
            <FeatureBadge icon={FaClock} text="Acceso inmediato" />
            <FeatureBadge icon={FaDownload} text="Material descargable" />
          </HStack>
        </VStack>
      </Container>

      {/* Línea divisoria con degradado */}
      <Box
        h="2px"
        bgGradient="linear(to-r, transparent, #EC4899, transparent)"
        maxW="4xl"
        mx="auto"
        mb={{ base: 8, md: 12 }}
      />

      {/* Sección: ¿Qué es Pack Olmond? */}
      <Container maxW="5xl" py={{ base: 12, md: 16 }}>
        <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
          {/* Ícono */}
          <Box
            bgGradient="linear(to-br, #667eea, #764ba2)"
            p={{ base: 4, md: 5 }}
            borderRadius="2xl"
            boxShadow="0 10px 30px rgba(102, 126, 234, 0.3)"
          >
            <Icon
              as={FaBriefcase}
              boxSize={{ base: 8, md: 10 }}
              color="white"
            />
          </Box>

          {/* Título */}
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="black"
            color="gray.900"
          >
            ¿Qué es{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, #667eea, #764ba2)"
              bgClip="text"
            >
              Pack Olmond
            </Box>
            ?
          </Heading>

          {/* Descripción */}
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            maxW="3xl"
            lineHeight="tall"
          >
            Pack Olmond es una formación práctica de inteligencia artificial
            aplicada para que crees{" "}
            <Text as="span" fontWeight="bold" color="gray.900">
              &ldquo;empleados de IA&rdquo;
            </Text>
            que te ayudan en tu día a día laboral.
          </Text>

          <HStack
            spacing={2}
            bg="purple.50"
            px={{ base: 4, md: 6 }}
            py={3}
            borderRadius="full"
            border="2px"
            borderColor="purple.200"
          >
            <Icon as={FaChartLine} color="purple.600" boxSize={4} />
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="semibold"
              color="purple.900"
            >
              Método probado con +2000 profesionales
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

// Componente auxiliar para los badges de características
// eslint-disable-next-line react/prop-types
const FeatureBadge = ({ icon, text }) => {
  return (
    <HStack
      spacing={2}
      bg="gray.100"
      px={{ base: 3, md: 4 }}
      py={2}
      borderRadius="full"
      fontSize={{ base: "xs", md: "sm" }}
      color="gray.700"
    >
      <Icon as={icon} color="green.500" />
      <Text fontWeight="medium">{text}</Text>
    </HStack>
  );
};
