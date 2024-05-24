import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";

const Services = () => {
  return (
    <Stack
      id="services"
      p={{ base: 0, lg: 8 }}
      color="white"
      alignItems="center"
      justifyContent="center"
      my={20}
    >
      <Heading as="h3" size="2xl" textAlign="center" mb={6}>
        Nuestros Servicios
      </Heading>
      <VStack maxW="8xl" spacing={4}>
        <ServiceDetail
          title="Automatización Robótica de Procesos (RPA)"
          description="Descripción: Automatizamos procesos clave en su negocio para mejorar la eficiencia y reducir costos. Beneficios: Mayor productividad, precisión y liberación de recursos humanos para tareas más estratégicas."
        />
        <ServiceDetail
          title="Data Analytics"
          description="Descripción: Utilizamos datos para proporcionar información clave que apoya decisiones estrátegicas informadas. Beneficios: Mejora en la toma de decisiones, identificación de oportunidades y optmización de procesos."
        />
        <ServiceDetail
          title="Chatbots"
          description="Descripción: Desarrollamos y gestionamos chatbots personalizados para mejorar la interacción con sus clientes, optimizando la atención y soporte a través de respuestas automatizadas y eficientes. Beneficios: Reducción de costos operativos, mejora en la experiencia del usuario y aumento de la eficiencia en la gestión de consultas y tareas repetitivas."
        />
      </VStack>
    </Stack>
  );
};

// eslint-disable-next-line react/prop-types
const ServiceDetail = ({ title, description }) => (
  <Box p={8} borderRadius="md" w="full">
    <Heading size="lg">{title}</Heading>
    <Text mt={2} fontSize="xl">
      {description}
    </Text>
  </Box>
);

export default Services;
