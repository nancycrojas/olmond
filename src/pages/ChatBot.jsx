/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Circle,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaStopwatch } from "react-icons/fa";
import { GrMultiple } from "react-icons/gr";
import { IoIosPerson } from "react-icons/io";
import {
  MdDataset,
  MdEventAvailable,
  MdSavings,
  MdSentimentVerySatisfied,
} from "react-icons/md";
import { TbSettingsAutomation } from "react-icons/tb";

const serviceDetail = [
  {
    title: "¿Cómo puede ayudarte un Chatbot de IA conversacional?",
    description:
      "Un Chatbot de IA conversacional puede ayudarte a brindar atención al cliente las 24 horas del día, los 7 días de la semana, respondiendo consultas comunes de manera rápida y precisa. Esto mejora la satisfacción del cliente y libera a tu equipo para enfocarse en tareas más complejas.",
  },
  {
    title: "¿Qué beneficios ofrece un Chatbot de IA en la atención al cliente?",
    description:
      "Un Chatbot de IA en la atención al cliente puede manejar grandes volúmenes de consultas de manera eficiente, reduciendo tiempos de espera y aumentando la rapidez de respuesta. Además, ayuda a mantener una atención consistente y personalizada, mejorando la experiencia del cliente.",
  },
  {
    title: "¿Cómo puede un Chatbot de IA mejorar la eficiencia de tu equipo?",
    description:
      "Al automatizar las respuestas a preguntas frecuentes y tareas repetitivas, un Chatbot de IA permite que tu equipo se enfoque en resolver problemas más complejos y en tareas estratégicas. Esto no solo aumenta la productividad, sino que también mejora la moral del equipo al reducir la carga de trabajo rutinaria.",
  },
  {
    title: "¿Qué tipos de consultas puede manejar un Chatbot de IA?",
    description:
      "Un Chatbot de IA puede manejar una amplia variedad de consultas, desde preguntas sobre productos y servicios hasta soporte técnico básico y gestión de pedidos. Su capacidad de aprendizaje continuo le permite adaptarse y mejorar con el tiempo, proporcionando respuestas cada vez más precisas.",
  },
  {
    title:
      "¿Cómo puedes medir el éxito de un Chatbot de IA en la atención al cliente?",
    description:
      "Puedes medir el éxito de un Chatbot de IA en la atención al cliente a través de métricas como la tasa de resolución de consultas, el tiempo de respuesta, la satisfacción del cliente y la reducción en la carga de trabajo del equipo humano. Estas métricas te permitirán ajustar y mejorar continuamente el desempeño del chatbot.",
  },
];

const benefiCard = [
  {
    icon: MdEventAvailable,
    title: "Disponibilidad 24/7/365",
    description:
      "Los chatbots de IA están disponibles las 24 horas del día, los 7 días de la semana y los 365 días del año, proporcionando asistencia continua a los clientes.",
  },
  {
    icon: MdSavings,
    title: "Reducción de costos",
    description:
      "Reducen costos operacionales al manejar consultas frecuentes y repetitivas sin la necesidad de intervención humana.",
  },
  {
    icon: FaStopwatch,
    title: "Respuesta instantánea",
    description:
      "Proporcionan respuestas instantáneas a las consultas de los usuarios, mejorando la experiencia del cliente y reduciendo tiempos de espera.",
  },
  {
    icon: TbSettingsAutomation,
    title: "Automatización de tareas",
    description:
      "Automatizan tareas repetitivas y administrativas, liberando al personal para enfocarse en actividades de mayor valor.",
  },
  {
    icon: GrMultiple,
    title: "Escalabilidad",
    description:
      "Pueden manejar múltiples consultas simultáneamente, escalando fácilmente según la demanda sin comprometer la calidad del servicio.",
  },
  {
    icon: IoIosPerson,
    title: "Personalización",
    description:
      "Ofrecen experiencias personalizadas a los usuarios mediante el análisis de sus interacciones y comportamientos anteriores.",
  },
  {
    icon: MdSentimentVerySatisfied,
    title: "Mejora de satisfacción",
    description:
      "Aumentan la satisfacción del cliente al proporcionar respuestas precisas y rápidas, resolviendo problemas de manera eficiente.",
  },
  {
    icon: MdDataset,
    title: "Recopilación de datos",
    description:
      "Recopilan y analizan datos de las interacciones con los usuarios, proporcionando insights valiosos para mejorar productos y servicios.",
  },
];

export const ChatBot = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Container maxW="1400px" py={10} color="#FFFFFF">
      <VStack spacing={6}>
        <Heading size="xl" mb={4} textAlign="center">
          Chatbots de IA
        </Heading>
        {serviceDetail.map(({ title, description }, index) => (
          <Box
            key={index}
            py={8}
            borderRadius="md"
            w="full"
            p={6}
            textAlign="center"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            _hover={{
              borderColor: "#256a60",
              zIndex: 1,
            }}
            transition="all 0.3s"
            opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Heading size="lg" mb={4}>
              {title}
            </Heading>
            <Text mt={2} fontSize="xl">
              {description}
            </Text>
          </Box>
        ))}

        <div data-aos="zoom-in" data-aos-duration="1000">
          <Box
            w="100%"
            my={10}
            spacing={{ base: 0, md: 20 }}
            p={{ base: 0, lg: 20 }}
            borderRadius="20px"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            textAlign="center"
            pb={4}
          >
            <Heading p={{ base: 10, md: 10, lg: 0 }} mb={6}>
              Beneficios de los Chatbots de IA
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
              px={{ base: 8, md: 8, lg: 0 }}
              spacing={10}
              mb={8}
            >
              {benefiCard.map(({ icon: Icon, title, description }, index) => (
                <Box
                  key={index}
                  borderRadius={6}
                  p={6}
                  textAlign="center"
                  sx={{
                    background: "hsla(0, 0%, 100%, 0.05)",
                    boxShadow:
                      "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                  }}
                  color="white"
                  boxShadow="md"
                  _hover={{ boxShadow: "xl" }}
                >
                  <Stack mb={4} align="center">
                    <Circle
                      size="50px"
                      color="#256a60"
                      border="2px solid #256a60"
                    >
                      <Icon size={30} />
                    </Circle>
                  </Stack>
                  <Heading size="md" mb={4}>
                    {title}
                  </Heading>
                  <Text mt={2} fontSize="xl">
                    {description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </div>
        <Box textAlign="center">
          <div data-aos="zoom-in" data-aos-duration="1000">
            <Text fontSize="3xl" fontWeight="bold" mb={8}>
              ¿Listo para transformar la atención al cliente en tu empresa y
              alcanzar nuevos niveles de eficiencia y satisfacción?
            </Text>
          </div>
          <Link href="http://calendly.com/equipo-olmondconsulting" isExternal>
            <Button
              variant="outline"
              size="lg"
              color="white"
              bgGradient="linear(to-r, #1a3a35, #256a60)"
              _hover={{ bgGradient: "linear(to-r, #1a3a35, #256a60)" }}
            >
              ¡Habla con nosotros!
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};
