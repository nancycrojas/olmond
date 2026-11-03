/* eslint-disable react/prop-types */
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../lib/constants";

const steps = [
  {
    number: "1",
    title: "Diagnóstico",
    description:
      "Analizamos tu proceso y medimos tiempos, volumen de trabajo y errores para identificar oportunidades de mejora.",
    deliverable: "Diagnóstico del proceso e indicadores iniciales.",
  },
  {
    number: "2",
    title: "Planificación",
    description:
      "Definimos el alcance, los objetivos, los plazos y los indicadores para evaluar los resultados.",
    deliverable: "Plan de trabajo con objetivos, plazos y criterios de éxito.",
  },
  {
    number: "3",
    title: "Implementación",
    description:
      "Desarrollamos, probamos y ponemos la solución en producción. Capacitamos a tu equipo para utilizarla.",
    deliverable: "Solución en producción y equipo capacitado.",
  },
  {
    number: "4",
    title: "Evaluación de resultados",
    description:
      "Medimos el impacto de la solución frente al diagnóstico inicial e identificamos ajustes y mejoras.",
    deliverable: "Informe de resultados y documentación de la solución.",
  },
];

const ProcessStep = ({ number, title, description, deliverable }) => {
  return (
    <Box data-reveal="" data-reveal-order={Number(number) - 1} w="full" minW={0} textAlign="center">
      {/* Línea superior */}
      <Box position="relative" h="1px" bg="whiteAlpha.200" mb={7}>
        <Box
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
          w="10px"
          h="10px"
          borderRadius="full"
          bg="#E253A8"
          boxShadow="0 0 14px rgba(226,83,168,.25)"
        />
      </Box>

      {/* Número */}
      <Text
        fontSize={{
          base: "54px",
          md: "64px",
        }}
        lineHeight="1"
        fontWeight="300"
        bgImage={BRAND_GRADIENT}
        bgClip="text"
        textAlign="center"
      >
        {number}
      </Text>

      {/* Título */}
      <Heading
        as="h3"
        mt={8}
        mx="auto"
        fontSize={{
          base: "25px",
          md: "27px",
        }}
        lineHeight="1.2"
        letterSpacing="-0.035em"
        fontWeight="600"
        color="white"
        textAlign="center"
      >
        {title}
      </Heading>

      {/* Descripción */}
      <Text
        mt={5}
        mx="auto"
        minH={{ md: "115px" }}
        maxW="340px"
        fontSize={{
          base: "16px",
          md: "17px",
        }}
        lineHeight="1.7"
        color="whiteAlpha.600"
        textAlign="center"
      >
        {description}
      </Text>

      {/* Separador */}
      <Box
        mt={6}
        w="full"
        borderTop="1px dashed"
        borderColor="whiteAlpha.200"
      />

      {/* Entregable */}
      <Box mt={6} textAlign="center">
        <Text
          fontSize="12px"
          fontWeight="800"
          textTransform="uppercase"
          letterSpacing="0.16em"
          color="#AAB4FF"
        >
          Entregable
        </Text>

        <Text
          mt={3}
          mx="auto"
          maxW="340px"
          fontSize={{
            base: "15px",
            md: "16px",
          }}
          lineHeight="1.6"
          color="whiteAlpha.800"
          textAlign="center"
        >
          {deliverable}
        </Text>
      </Box>
    </Box>
  );
};

export const HowWeWork = () => {
  return (
    <Box
      as="section"
      id="como-trabajamos"
      position="relative"
      overflow="hidden"
      bg="#171925"
      color="white"
      scrollMarginTop="72px"
    >
      {/* Fondo */}
      <Box
        position="absolute"
        inset={0}
        bgImage={`
          radial-gradient(
            circle at 5% 10%,
            rgba(57, 80, 180, 0.15) 0%,
            transparent 34%
          ),
          radial-gradient(
            circle at 45% 100%,
            rgba(94, 66, 190, 0.10) 0%,
            transparent 38%
          ),
          linear-gradient(
            120deg,
            #191B2B 0%,
            #1B1D31 52%,
            #202442 100%
          )
        `}
        pointerEvents="none"
      />

      {/* Halo inferior */}
      <Box
        position="absolute"
        left="30%"
        bottom="-350px"
        w="700px"
        h="700px"
        borderRadius="full"
        bg="rgba(88, 79, 200, 0.09)"
        filter="blur(150px)"
        pointerEvents="none"
      />

      <Container
        maxW="6xl"
        position="relative"
        py={{
          base: 16,
          md: 20,
          lg: 24,
        }}
      >
        {/* Etiqueta */}
        <Text
          fontSize={{
            base: "xs",
            md: "sm",
          }}
          fontWeight="800"
          textTransform="uppercase"
          letterSpacing="0.2em"
          color="#8EA1FF"
        >
          Cómo trabajamos
        </Text>

        {/* Título */}
        <Heading
          data-reveal=""
          as="h2"
          mt={{ base: 6, md: 7 }}
          maxW="1100px"
          fontSize={{
            base: "40px",
            sm: "48px",
            md: "56px",
            lg: "60px",
          }}
          lineHeight="1.04"
          letterSpacing="-0.05em"
          fontWeight="500"
          color="white"
        >
          Cuatro pasos, cada uno con un entregable.
        </Heading>

        {/* Pasos */}
        <Grid
          mt={{
            base: 12,
            md: 16,
          }}
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          }}
          columnGap={{
            base: 8,
            lg: 10,
          }}
          rowGap={{
            base: 12,
            md: 14,
          }}
        >
          {steps.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
