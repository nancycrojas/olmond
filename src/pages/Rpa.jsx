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

export const Rpa = () => {
  return (
    <Stack color="#FFFFFF">
      <VStack spacing={6}>
        <div data-aos="fade-up" data-aos-duration="1000">
          <Box
            w="100%"
            border="2px solid #777777"
            p={8}
            borderRadius="20px"
            mb={10}
            // bg="#777777"
            bgGradient="linear(to-r, #256a60, #777777)"
            _hover={{ bgGradient: "linear(to-r, #256a60, #777777)" }}
          >
            <Heading size="xl" textAlign="center">
              Automatización Robótica de Procesos (RPA)
            </Heading>
          </Box>
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué es la automatización robótica de procesos (RPA)?"
            description=" La automatización robótica de procesos (RPA) es una tecnología que
          emplea robots de software virtuales, conocidos como robots digitales
          o bots, para llevar a cabo tareas manuales que suelen ser
          repetitivas y consumen mucho tiempo."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué tipos de tareas maneja la RPA?"
            description="La RPA maneja tareas manuales y repetitivas, de gran volumen y que
          requieren el uso de múltiples sistemas, como la carga de datos y los
          flujos de trabajo de aprobación."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Cómo funciona la RPA?"
            description=" La RPA se ejecuta en computadoras de escritorio o virtuales en las
          que los robots de software interactúan con aplicaciones internas,
          sitios web, portales de usuarios y otras apps, emulando acciones de
          los humanos mientras realizan la misma tarea."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title="¿Qué industrias se benefician de la RPA?"
            description="La RPA beneficia a todas las industrias, desde finanzas hasta
          recursos humanos y servicio al cliente, mejorando la eficiencia y
          reduciendo costos en diversas áreas."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <ServiceDetail
            title=" ¿Cómo se implementa una estrategia de RPA?"
            description="Una estrategia efectiva de RPA comienza con la evaluación de flujos
          de trabajo, identificando los mejores casos para la automatización y
          utilizando herramientas basadas en la nube para escalar y gestionar
          los bots."
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
            Beneficios de la Automatización Robótica de Procesos (RPA)
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
                1. Es rápida y confiable
              </Heading>
              <Text mt={2} fontSize="xl">
                Ejecución veloz y sin margen de error
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <GrCertificate size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                2. Mejora la valoración de sus empleados
              </Heading>
              <Text mt={2} fontSize="xl">
                Sus empleados podrán dedicarse a tareas que los robots no
                realicen
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                3. Generación de informes
              </Heading>
              <Text mt={2} fontSize="xl">
                Los bots pueden proporcionarle detalles completos de las
                operaciones
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                4. Incremento en la productividad
              </Heading>
              <Text mt={2} fontSize="xl">
                Combinará el trabajo de sus empleados con una fuerza laboral
                digital
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
                5. Altamente escalable
              </Heading>
              <Text mt={2} fontSize="xl">
                Maneja procesos de cualquier escala sin retrasos
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <GrCertificate size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                6. Excelente atención al cliente
              </Heading>
              <Text mt={2} fontSize="xl">
                Los robots pueden gestionar solicitudes, procesar pagos, dar
                respuestas y atender peticiones o reclamos las 24 horas del día,
                los 365 días del año, sin interrupciones.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                7. Integración con sistemas existentes
              </Heading>
              <Text mt={2} fontSize="xl">
                La RPA puede integrarse fácilmente con las aplicaciones y
                sistemas que ya utiliza su empresa, sin necesidad de grandes
                modificaciones.
              </Text>
            </Box>
            <Box borderRadius={6}>
              <Stack mb={4}>
                <Circle size="50px" bg="brand.500" color="#777777">
                  <PiBuildingsFill size={40} />
                </Circle>
              </Stack>
              <Heading size="md" mb={4}>
                8. No requiere inversión en nuevo hardware
              </Heading>
              <Text mt={2} fontSize="xl">
                Puede utilizar el equipo existente de su empresa
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </div>
      <div data-aos="zoom-in" data-aos-duration="1000">
        <Text fontSize="4xl" fontWeight="bold" color="#777777" mb={8}>
          ¿Listo para liberar el potencial de tu empresa y aumentar la
          eficiencia con RPA? ¡Habla con nosotros y descubre cómo podemos
          ayudarte a implementar soluciones de automatización que transformen tu
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
