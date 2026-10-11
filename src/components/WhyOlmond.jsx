/* eslint-disable react/prop-types */
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";

const principles = [
  {
    title: "Primero decidimos, después implementamos.",
    description:
      "Si algo no conviene automatizar, te lo decimos antes de que gastes.",
  },
  {
    title: "Medimos contra el punto de partida.",
    description:
      "No prometemos porcentajes de ahorro. Mostramos el resultado en tu propio proceso.",
  },
  {
    title: "Un mismo equipo de punta a punta.",
    description:
      "Asesoramos, capacitamos y desarrollamos con el mismo criterio.",
  },
  {
    title: "Tu equipo queda preparado.",
    description:
      "Dejamos todo documentado para que puedan operar la solución por su cuenta.",
  },
];

function Principle({ title, description }) {
  return (
    <Box
      pt={{
        base: 7,
        md: 8,
      }}
      pb={{
        base: 8,
        md: 9,
      }}
      borderTop="1px solid"
      borderColor="whiteAlpha.300"
    >
      <Heading
        as="h3"
        maxW="620px"
        fontSize={{
          base: "25px",
          md: "29px",
          lg: "31px",
        }}
        lineHeight="1.25"
        letterSpacing="-0.035em"
        fontWeight="600"
        color="white"
      >
        {title}
      </Heading>

      <Text
        mt={{
          base: 4,
          md: 5,
        }}
        maxW="650px"
        fontSize={{
          base: "16px",
          md: "18px",
        }}
        lineHeight="1.7"
        color="whiteAlpha.600"
      >
        {description}
      </Text>
    </Box>
  );
}

export const WhyOlmond = () => {
  return (
    <Box
      as="section"
      id="por-que-olmond"
      position="relative"
      overflow="hidden"
      bg="#191B2B"
      color="white"
      scrollMarginTop="72px"
    >
      {/* Fondo */}
      <Box
        position="absolute"
        inset={0}
        bgImage={`
          radial-gradient(
            circle at 8% 10%,
            rgba(66, 78, 177, 0.12) 0%,
            transparent 32%
          ),
          radial-gradient(
            circle at 78% 100%,
            rgba(73, 84, 187, 0.10) 0%,
            transparent 38%
          ),
          linear-gradient(
            120deg,
            #191B2B 0%,
            #1C1E33 50%,
            #202442 100%
          )
        `}
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
        {/* Encabezado */}
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1.05fr 0.95fr",
          }}
          gap={{
            base: 8,
            lg: 16,
          }}
          alignItems="end"
        >
          <Box>
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
              Por qué Olmond
            </Text>

            <Heading
              as="h2"
              mt={{
                base: 6,
                md: 7,
              }}
              maxW="680px"
              fontSize={{
                base: "40px",
                sm: "48px",
                md: "56px",
                lg: "60px",
              }}
              lineHeight="1.05"
              letterSpacing="-0.05em"
              fontWeight="500"
              color="white"
            >
              Lo que podés esperar de nosotros.
            </Heading>
          </Box>

          <Text
            maxW="550px"
            pb={{ lg: 2 }}
            fontSize={{
              base: "18px",
              md: "20px",
            }}
            lineHeight="1.7"
            color="whiteAlpha.600"
          >
            Cuatro principios que aplicamos en consultoría, capacitaciones y
            desarrollos.
          </Text>
        </Grid>

        {/* Principios */}
        <Grid
          mt={{
            base: 12,
            md: 16,
          }}
          templateColumns={{
            base: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          }}
          columnGap={{
            base: 0,
            md: 14,
            lg: 16,
          }}
          rowGap={0}
        >
          {principles.map((principle) => (
            <Principle key={principle.title} {...principle} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
