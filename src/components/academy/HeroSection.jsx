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
  FaCheckCircle,
  FaClock,
  FaDownload,
} from "react-icons/fa";

export const HeroSection = () => {
  const whatsappNumber = "5491133872411";

  const whatsappMessage = encodeURIComponent(
    "Hola! Quiero aumentar mi productividad con IA",
  );
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <Container maxW="7xl" py={{ base: 12, md: 20 }}>
      <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
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

        <Text
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          color="gray.600"
          maxW="3xl"
          lineHeight="tall"
        >
          Sin programar, sin tener conocimientos técnicos y aplicando un método
          simple y práctico con herramientas como{" "}
          <Text as="span" fontWeight="bold" color="gray.900">
            ChatGPT
          </Text>{" "}
          y{" "}
          <Text as="span" fontWeight="bold" color="gray.900">
            NotebookLM
          </Text>
          .
        </Text>

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
  );
};

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
