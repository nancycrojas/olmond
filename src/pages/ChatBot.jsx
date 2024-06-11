/* eslint-disable react/prop-types */
import {
  Box,
  Circle,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GrCertificate } from "react-icons/gr";
import { PiBuildingsFill } from "react-icons/pi";

export const ChatBot = () => {
  return (
    <Stack color="#FFFFFF">
      <VStack maxW="8xl" spacing={4}>
        <div data-aos="fade-up" data-aos-duration="1000">
          <Box
            w="100%"
            border="2px solid #777777"
            p={8}
            borderRadius="20px"
            my={10}
            bgGradient="linear(to-r, #256a60, #777777)"
            _hover={{ bgGradient: "linear(to-r, #256a60, #777777)" }}
          >
            <Heading size="xl" textAlign="center">
              Chatbots de IA
            </Heading>
          </Box>
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Cómo puede ayudarte un Chatbot de IA conversacional?"
            description="Un Chatbot de IA conversacional puede ayudarte a brindar atención al cliente las 24 horas del día, los 7 días de la semana, respondiendo consultas comunes de manera rápida y precisa. Esto mejora la satisfacción del cliente y libera a tu equipo para enfocarse en tareas más complejas."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué beneficios ofrece un Chatbot de IA en la atención al cliente?"
            description="Un Chatbot de IA en la atención al cliente puede manejar grandes volúmenes de consultas de manera eficiente, reduciendo tiempos de espera y aumentando la rapidez de respuesta. Además, ayuda a mantener una atención consistente y personalizada, mejorando la experiencia del cliente."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Cómo puede un Chatbot de IA mejorar la eficiencia de tu equipo?"
            description="Al automatizar las respuestas a preguntas frecuentes y tareas repetitivas, un Chatbot de IA permite que tu equipo se enfoque en resolver problemas más complejos y en tareas estratégicas. Esto no solo aumenta la productividad, sino que también mejora la moral del equipo al reducir la carga de trabajo rutinaria."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué tipos de consultas puede manejar un Chatbot de IA?"
            description="Un Chatbot de IA puede manejar una amplia variedad de consultas, desde preguntas sobre productos y servicios hasta soporte técnico básico y gestión de pedidos. Su capacidad de aprendizaje continuo le permite adaptarse y mejorar con el tiempo, proporcionando respuestas cada vez más precisas."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Cómo puedes medir el éxito de un Chatbot de IA en la atención al cliente?"
            description="Puedes medir el éxito de un Chatbot de IA en la atención al cliente a través de métricas como la tasa de resolución de consultas, el tiempo de respuesta, la satisfacción del cliente y la reducción en la carga de trabajo del equipo humano. Estas métricas te permitirán ajustar y mejorar continuamente el desempeño del chatbot."
          />
        </div>
      </VStack>
      <div data-aos="zoom-in" data-aos-duration="1000">
        <VStack
          my={10}
          spacing={{ base: 0, md: 20 }}
          p={{ base: 0, lg: 20 }}
          border="2px solid #777777"
          borderRadius="20px"
        >
          <Heading p={{ base: 10, md: 10, lg: 0 }} textAlign="center">
            Beneficios de los Chatbots de IA
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            px={{ base: 8, md: 8, lg: 0 }}
            spacing={6}
          >
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                1. Disponibilidad 24/7/365
              </Heading>
              <Text mt={2} fontSize="xl">
                Los chatbots de IA están disponibles las 24 horas del día, los 7
                días de la semana y los 365 días del año, proporcionando
                asistencia continua a los clientes.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <GrCertificate size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                2. Reducción de costos
              </Heading>
              <Text mt={2} fontSize="xl">
                Reducen costos operacionales al manejar consultas frecuentes y
                repetitivas sin la necesidad de intervención humana.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                3. Respuesta instantánea
              </Heading>
              <Text mt={2} fontSize="xl">
                Proporcionan respuestas instantáneas a las consultas de los
                usuarios, mejorando la experiencia del cliente y reduciendo
                tiempos de espera.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                4. Automatización de tareas
              </Heading>
              <Text mt={2} fontSize="xl">
                Automatizan tareas repetitivas y administrativas, liberando al
                personal para enfocarse en actividades de mayor valor.
              </Text>
            </Box>
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            px={{ base: 8, md: 8, lg: 0 }}
            spacing={6}
            mb={{ base: 6 }}
          >
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                5. Escalabilidad
              </Heading>
              <Text mt={2} fontSize="xl">
                Pueden manejar múltiples consultas simultáneamente, escalando
                fácilmente según la demanda sin comprometer la calidad del
                servicio.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <GrCertificate size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                6. Personalización
              </Heading>
              <Text mt={2} fontSize="xl">
                Ofrecen experiencias personalizadas a los usuarios mediante el
                análisis de sus interacciones y comportamientos anteriores.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                7. Mejora de satisfacción
              </Heading>
              <Text mt={2} fontSize="xl">
                Aumentan la satisfacción del cliente al proporcionar respuestas
                precisas y rápidas, resolviendo problemas de manera eficiente.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                8. Recopilación de datos
              </Heading>
              <Text mt={2} fontSize="xl">
                Recopilan y analizan datos de las interacciones con los
                usuarios, proporcionando insights valiosos para mejorar
                productos y servicios.
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </div>
      <div data-aos="zoom-in" data-aos-duration="1000">
        <Text fontSize="4xl" fontWeight="bold" color="#777777" mb={8}>
          ¿Listo para transformar la atención al cliente en tu empresa y
          alcanzar nuevos niveles de eficiencia y satisfacción? ¡Habla con
          nosotros y descubre cómo un Chatbot de IA puede revolucionar tu
          negocio!
        </Text>
      </div>
    </Stack>
  );
};

const ServiceDetail = ({ title, description }) => (
  <Box py={8} borderRadius="md" w="full">
    <Heading size="lg" textAlign="center" mb={4}>
      {title}
    </Heading>
    <Text mt={2} fontSize="xl">
      {description}
    </Text>
  </Box>
);
