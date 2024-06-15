import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const services = [
    {
      title: "Automatización Robótica de Procesos (RPA)",
      description:
        "Automatizá tus procesos con RPA y optimizá la eficiencia de tu negocio. ¡Transformá tu futuro!",
      link: "/rpa",
    },
    {
      title: "Chatbots de IA",
      description:
        "Implementá nuestros chatbots de IA para mejorar el servicio al cliente y aumentar la eficiencia de tu negocio. ¡Revolucioná la interacción!",
      link: "/chat-bot",
    },
    {
      title: "Data Analytics",
      description:
        "Descubrí el poder de tus datos con nuestros servicios de Data Analytics. Tomá decisiones informadas, optimizá procesos y generá valor para tu negocio.",
      link: "/data-analyst",
    },
  ];

  return (
    <Container maxW="1400px">
      <Stack color="white" alignItems="center" justifyContent="center" my={20}>
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center" mb={20}>
            Nuestros Servicios
          </Heading>
        </div>
        <HStack
          alignItems="center"
          justifyContent="center"
          gap={6}
          flexDirection={{ base: "column", lg: "row" }}
        >
          {services.map(({ title, description, link }, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="1000"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                color="#FFFFFF"
                border="2px solid #FFFFFF"
                padding={8}
                w="320px"
                h="400px"
                borderRadius={8}
                _hover={{
                  borderColor: "#256a60",
                  transform: "scale(1.05)",
                  zIndex: 1,
                }}
                transition="all 0.3s"
                opacity={
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.5
                }
              >
                <Heading size="lg" mb={8}>
                  {title}
                </Heading>
                <Text mb={8}>{description}</Text>
                <Button
                  as={Link}
                  to={link}
                  _hover={{ bg: "#256a60", color: "#FFFFFF" }}
                  // transition="background-color 0.3s"
                >
                  Más info
                </Button>
              </Box>
            </div>
          ))}
        </HStack>
      </Stack>
    </Container>
  );
};
