import {
  Box,
  Circle,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GrCertificate } from "react-icons/gr";
import { PiBuildingsFill } from "react-icons/pi";

const Services = () => {
  return (
    <Container maxW="1400px">
      <Stack
        id="services"
        color="white"
        alignItems="center"
        justifyContent="center"
        my={20}
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center" mb={20}>
            Nuestros Servicios
          </Heading>
        </div>
        {/* RPA */}
        <Stack>
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
                    respuestas y atender peticiones o reclamos las 24 horas del
                    día, los 365 días del año, sin interrupciones.
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
              ayudarte a implementar soluciones de automatización que
              transformen tu negocio!
            </Text>
          </div>
        </Stack>
        {/* CHATBOT */}
        <Stack>
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
                    Los chatbots de IA están disponibles las 24 horas del día,
                    los 7 días de la semana y los 365 días del año,
                    proporcionando asistencia continua a los clientes.
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
                    Reducen costos operacionales al manejar consultas frecuentes
                    y repetitivas sin la necesidad de intervención humana.
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
                    Automatizan tareas repetitivas y administrativas, liberando
                    al personal para enfocarse en actividades de mayor valor.
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
                    Pueden manejar múltiples consultas simultáneamente,
                    escalando fácilmente según la demanda sin comprometer la
                    calidad del servicio.
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
                    Ofrecen experiencias personalizadas a los usuarios mediante
                    el análisis de sus interacciones y comportamientos
                    anteriores.
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
                    Aumentan la satisfacción del cliente al proporcionar
                    respuestas precisas y rápidas, resolviendo problemas de
                    manera eficiente.
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
        {/* DATA ANALYST */}
        <Stack>
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
                    El análisis de datos permite la toma de decisiones basadas
                    en datos precisos en lugar de suposiciones, mejorando la
                    eficacia empresarial.
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
                    Ayuda a descubrir patrones y tendencias en grandes volúmenes
                    de datos, proporcionando información valiosa para la
                    estrategia.
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
                    Proporciona insights que fomentan la innovación y el
                    desarrollo de nuevos productos y servicios adaptados al
                    mercado.
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
                    Utiliza análisis predictivo para detectar y prevenir
                    fraudes, protegiendo los activos de la empresa.
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
                    Mejora la satisfacción del cliente mediante la
                    personalización de experiencias basadas en sus preferencias
                    y comportamientos.
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </div>
          <div data-aos="zoom-in" data-aos-duration="1000">
            <Text fontSize="4xl" fontWeight="bold" color="#777777" mb={8}>
              ¿Listo para transformar tu empresa y tomar decisiones basadas en
              datos que impulsen tu éxito? ¡Habla con nosotros y descubre cómo
              el análisis de datos puede llevar tu negocio al siguiente nivel!
            </Text>
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

// eslint-disable-next-line react/prop-types
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

export default Services;
