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
import { GrLineChart } from "react-icons/gr";
import {
  MdIntegrationInstructions,
  MdSavings,
  MdSecurity,
  MdThumbUp,
  MdUpgrade,
} from "react-icons/md";
import { PiChartLineUp, PiRobotFill } from "react-icons/pi";

const serviceDetail = [
  {
    title: "¿Qué es la automatización robótica de procesos (RPA)?",
    description:
      " La automatización robótica de procesos (RPA) es una tecnología que emplea robots de software virtuales, conocidos como robots digitales o bots, para llevar a cabo tareas manuales que suelen ser repetitivas y consumen mucho tiempo.",
  },
  {
    title: "¿Qué tipos de tareas maneja la RPA?",
    description:
      "La RPA maneja tareas manuales y repetitivas, de gran volumen y que requieren el uso de múltiples sistemas, como la carga de datos y los flujos de trabajo de aprobación.",
  },
  {
    title: "¿Cómo funciona la RPA?",
    description:
      " La RPA se ejecuta en computadoras de escritorio o virtuales en las que los robots de software interactúan con aplicaciones internas, sitios web, portales de usuarios y otras apps, emulando acciones de los humanos mientras realizan la misma tarea.",
  },
  {
    title: "¿Qué industrias se benefician de la RPA?",
    description:
      "La RPA beneficia a todas las industrias, desde finanzas hasta recursos humanos y servicio al cliente, mejorando la eficiencia y reduciendo costos en diversas áreas.",
  },
  {
    title: " ¿Cómo se implementa una estrategia de RPA?",
    description:
      "Una estrategia efectiva de RPA comienza con la evaluación de flujos de trabajo, identificando los mejores casos para la automatización y utilizando herramientas basadas en la nube para escalar y gestionar los bots.",
  },
];

const benefitCard = [
  {
    icon: MdSecurity,
    title: "Es rápida y confiable",
    description: "Ejecución veloz y sin margen de error",
  },
  {
    icon: MdThumbUp,
    title: "Mejora la valoración de sus empleados",
    description:
      "Sus empleados podrán dedicarse a tareas que los robots no realicen",
  },
  {
    icon: GrLineChart,
    title: "Generación de informes",
    description:
      "Los bots pueden proporcionarle detalles completos de las operaciones",
  },
  {
    icon: MdUpgrade,
    title: "Incremento en la productividad",
    description:
      "Combinará el trabajo de sus empleados con una fuerza laboral digital",
  },
  {
    icon: PiChartLineUp,
    title: "Altamente escalable",
    description: "Maneja procesos de cualquier escala sin retrasos",
  },
  {
    icon: PiRobotFill,
    title: "Excelente atención al cliente",
    description:
      "Los robots pueden gestionar solicitudes, procesar pagos, dar respuestas y atender peticiones o reclamos las 24 horas del día, los 365 días del año, sin interrupciones.",
  },
  {
    icon: MdIntegrationInstructions,
    title: "Integración con sistemas existentes",
    description:
      "La RPA puede integrarse fácilmente con las aplicaciones y sistemas que ya utiliza su empresa, sin necesidad de grandes modificaciones.",
  },
  {
    icon: MdSavings,
    title: "No requiere inversión en nuevo hardware",
    description: "Puede utilizar el equipo existente de su empresa",
  },
];

export const Rpa = () => {
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
          Automatización Robótica de Procesos (RPA)
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
              Beneficios de la Automatización Robótica de Procesos (RPA)
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
              px={{ base: 8, md: 8, lg: 0 }}
              spacing={10}
              mb={8}
            >
              {benefitCard.map(({ icon: Icon, title, description }, index) => (
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
              ¿Listo para liberar el potencial de tu empresa y aumentar la
              eficiencia con RPA?
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
