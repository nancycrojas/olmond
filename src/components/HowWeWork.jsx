/* eslint-disable react/prop-types */
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../lib/constants";

const steps = [
  {
    number: "1",
    title: "Diagnóstico",
    description:
      "Entendemos tu proceso y medimos el punto de partida: tiempo, volumen y errores.",
    deliverable: "El punto de partida, medido.",
  },
  {
    number: "2",
    title: "Plan",
    description:
      "Definimos objetivos, plazos y qué se va a medir para decir que funcionó.",
    deliverable: "Objetivos y plazos por escrito.",
  },
  {
    number: "3",
    title: "Implementación",
    description:
      "Desarrollamos la solución y capacitamos a tu equipo para usarla.",
    deliverable: "Solución funcionando y equipo capacitado.",
  },
  {
    number: "4",
    title: "Resultados",
    description:
      "Comparamos contra el punto de partida y dejamos todo documentado.",
    deliverable: "Comparación de resultados y documentación.",
  },
];

function ProcessStep({ number, title, description, deliverable }) {
  return (
    <Box>
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
      {/* <Text
        fontSize={{
          base: "54px",
          md: "64px",
        }}
        lineHeight="1"
        fontWeight="300"
        color="#706DE8"
      >
        {number}
      </Text> */}
      <Text
        fontSize={{ base: "54px", md: "64px" }}
        lineHeight="1"
        fontWeight="300"
        bgImage={BRAND_GRADIENT}
        bgClip="text"
      >
        {number}
      </Text>
      {/* Título */}
      <Heading
        as="h3"
        mt={8}
        fontSize={{
          base: "25px",
          md: "27px",
        }}
        lineHeight="1.2"
        letterSpacing="-0.035em"
        fontWeight="600"
        color="white"
      >
        {title}
      </Heading>

      {/* Descripción */}
      <Text
        mt={5}
        minH={{ md: "115px" }}
        maxW="300px"
        fontSize={{
          base: "16px",
          md: "17px",
        }}
        lineHeight="1.7"
        color="whiteAlpha.600"
      >
        {description}
      </Text>

      {/* Separador */}
      <Box mt={6} borderTop="1px dashed" borderColor="whiteAlpha.200" />

      {/* Entregable */}
      <Box mt={6}>
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
          maxW="300px"
          fontSize={{
            base: "15px",
            md: "16px",
          }}
          lineHeight="1.6"
          color="whiteAlpha.800"
        >
          {deliverable}
        </Text>
      </Box>
    </Box>
  );
}

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
          as="h2"
          mt={7}
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
