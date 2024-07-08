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
import { AiFillProduct } from "react-icons/ai";
import { FaAsterisk } from "react-icons/fa";
import { GiGearStickPattern, GiProcessor } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { MdAltRoute, MdSentimentVerySatisfied } from "react-icons/md";
import { PiLineSegmentsFill } from "react-icons/pi";

const serviceDetail = [
  {
    title: "¿Qué es Data Analytics?",
    description:
      "Es un proceso que busca analizar datos crudos para extraer información útil que ayude a tomar decisiones informadas. Utiliza técnicas y herramientas avanzadas para transformar datos en conocimientos valiosos, impulsando el crecimiento y la eficiencia de tu negocio.",
  },
  {
    title: "¿Qué beneficios ofrece el análisis de datos a tu empresa?",
    description:
      "El análisis de datos ofrece numerosos beneficios, como la identificación de tendencias del mercado, la mejora en la toma de decisiones, la optimización de operaciones y la personalización de la experiencia del cliente. Esto te permite adelantarte a la competencia y maximizar tus recursos.",
  },
  {
    title: "¿Cómo funcionan los servicios de Data Analytics?",
    description:
      "Los servicios de Data Analytics funcionan recolectando datos de diversas fuentes, limpiándolos y analizando patrones y tendencias mediante algoritmos y herramientas especializadas. Los resultados se presentan en informes y visualizaciones claras, facilitando la comprensión y la toma de decisiones.",
  },
  {
    title: "¿Qué tipos de problemas puede resolver el análisis de datos?",
    description:
      "El análisis de datos puede resolver una amplia gama de problemas, desde la optimización de la cadena de suministro y la mejora de la satisfacción del cliente, hasta la detección de fraudes y la identificación de nuevas oportunidades de negocio. Es una herramienta poderosa para abordar desafíos complejos.",
  },
  {
    title:
      "¿Cómo puedes medir el éxito de la toma de decisiones basadas en datos?",
    description:
      "Puedes medir el éxito de la toma de decisiones basadas en datos a través de indicadores clave de rendimiento (KPIs) como el aumento en las ventas, la mejora en la eficiencia operativa, la reducción de costos y la satisfacción del cliente. Estas métricas te ayudarán a evaluar y ajustar tus estrategias continuamente.",
  },
];

const benefitCard = [
  {
    icon: MdAltRoute,
    title: "Toma de decisiones informada",
    description:
      "El análisis de datos permite la toma de decisiones basadas en datos precisos en lugar de suposiciones, mejorando la eficacia empresarial.",
  },
  {
    icon: GiGearStickPattern,
    title: "Identificación de patrones",
    description:
      "Ayuda a descubrir patrones y tendencias en grandes volúmenes de datos, proporcionando información valiosa para la estrategia.",
  },
  {
    icon: GiProcessor,
    title: "Optimización de procesos",
    description:
      "La analítica de datos optimiza procesos, reduciendo costos y aumentando la eficiencia operativa.",
  },
  {
    icon: PiLineSegmentsFill,
    title: "Segmentación de clientes",
    description:
      "Permite una segmentación precisa de clientes, mejorando las estrategias de marketing y aumentando la conversión.",
  },
  {
    icon: GrResources,
    title: "Eficiencia en recursos",
    description:
      "Incrementa la eficiencia en la gestión de recursos y tiempo, permitiendo una mejor planificación y ejecución.",
  },
  {
    icon: AiFillProduct,
    title: "Innovación de productos",
    description:
      "Proporciona insights que fomentan la innovación y el desarrollo de nuevos productos y servicios adaptados al mercado.",
  },
  {
    icon: FaAsterisk,
    title: "Prevención de fraudes",
    description:
      "Utiliza análisis predictivo para detectar y prevenir fraudes, protegiendo los activos de la empresa.",
  },
  {
    icon: MdSentimentVerySatisfied,
    title: "Mejora de satisfacción",
    description:
      "Mejora la satisfacción del cliente mediante la personalización de experiencias basadas en sus preferencias y comportamientos.",
  },
];

export const DataAnalytics = () => {
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
          Data Analytics
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
              Beneficios del Data Analytics
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
              px={{ base: 8, md: 8, lg: 0 }}
              spacing={6}
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
              ¿Listo para transformar tu empresa y tomar decisiones basadas en
              datos que impulsen tu éxito?
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
