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

export const DataAnalyst = () => {
  return (
    <Stack color="#FFFFFF">
      <VStack spacing={6}>
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
              Data Analytics
            </Heading>
          </Box>
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué es Data Analytics?"
            description="Es un proceso que busca analizar datos crudos para extraer información útil que ayude a tomar decisiones informadas. Utiliza técnicas y herramientas avanzadas para transformar datos en conocimientos valiosos, impulsando el crecimiento y la eficiencia de tu negocio."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué beneficios ofrece el análisis de datos a tu empresa?"
            description="El análisis de datos ofrece numerosos beneficios, como la identificación de tendencias del mercado, la mejora en la toma de decisiones, la optimización de operaciones y la personalización de la experiencia del cliente. Esto te permite adelantarte a la competencia y maximizar tus recursos."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Cómo funcionan los servicios de Data Analytics?"
            description="Los servicios de Data Analytics funcionan recolectando datos de diversas fuentes, limpiándolos y analizando patrones y tendencias mediante algoritmos y herramientas especializadas. Los resultados se presentan en informes y visualizaciones claras, facilitando la comprensión y la toma de decisiones."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué tipos de problemas puede resolver el análisis de datos?"
            description="El análisis de datos puede resolver una amplia gama de problemas, desde la optimización de la cadena de suministro y la mejora de la satisfacción del cliente, hasta la detección de fraudes y la identificación de nuevas oportunidades de negocio. Es una herramienta poderosa para abordar desafíos complejos."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Cómo puedes medir el éxito de la toma de decisiones basadas en datos?"
            description="Puedes medir el éxito de la toma de decisiones basadas en datos a través de indicadores clave de rendimiento (KPIs) como el aumento en las ventas, la mejora en la eficiencia operativa, la reducción de costos y la satisfacción del cliente. Estas métricas te ayudarán a evaluar y ajustar tus estrategias continuamente."
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
            Beneficios del Data Analytics
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
                1. Toma de decisiones informada
              </Heading>
              <Text mt={2} fontSize="xl">
                El análisis de datos permite la toma de decisiones basadas en
                datos precisos en lugar de suposiciones, mejorando la eficacia
                empresarial.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <GrCertificate size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                2. Identificación de patrones
              </Heading>
              <Text mt={2} fontSize="xl">
                Ayuda a descubrir patrones y tendencias en grandes volúmenes de
                datos, proporcionando información valiosa para la estrategia.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                3. Optimización de procesos
              </Heading>
              <Text mt={2} fontSize="xl">
                La analítica de datos optimiza procesos, reduciendo costos y
                aumentando la eficiencia operativa.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                4. Segmentación de clientes
              </Heading>
              <Text mt={2} fontSize="xl">
                Permite una segmentación precisa de clientes, mejorando las
                estrategias de marketing y aumentando la conversión.
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
                5. Eficiencia en recursos
              </Heading>
              <Text mt={2} fontSize="xl">
                Incrementa la eficiencia en la gestión de recursos y tiempo,
                permitiendo una mejor planificación y ejecución.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <GrCertificate size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                6. Innovación de productos
              </Heading>
              <Text mt={2} fontSize="xl">
                Proporciona insights que fomentan la innovación y el desarrollo
                de nuevos productos y servicios adaptados al mercado.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                7. Prevención de fraudes
              </Heading>
              <Text mt={2} fontSize="xl">
                Utiliza análisis predictivo para detectar y prevenir fraudes,
                protegiendo los activos de la empresa.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                8. Mejora de satisfacción
              </Heading>
              <Text mt={2} fontSize="xl">
                Mejora la satisfacción del cliente mediante la personalización
                de experiencias basadas en sus preferencias y comportamientos.
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </div>
      <div data-aos="zoom-in" data-aos-duration="1000">
        <Text fontSize="4xl" fontWeight="bold" color="#777777" mb={8}>
          ¿Listo para transformar tu empresa y tomar decisiones basadas en datos
          que impulsen tu éxito? ¡Habla con nosotros y descubre cómo el análisis
          de datos puede llevar tu negocio al siguiente nivel!
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
