/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuCode2, LuGitBranch, LuMonitor } from "react-icons/lu";

import { BRAND_GRADIENT } from "../lib/constants.js";

const services = [
  {
    icon: LuGitBranch,
    title: "Consultoría",
    headline: "Definimos dónde aplicar IA y en qué orden.",
    description:
      "Analizamos tus procesos y priorizamos según impacto, costo y simplicidad.",
    receives:
      "Un diagnóstico, una lista priorizada de oportunidades y una hoja de ruta con objetivos medibles.",
    convenient:
      "Querés empezar con criterio y evitar inversiones que no rinden.",
    cta: "Hablar con un asesor",
    href: "mailto:contacto@olmondconsulting.com?subject=Consulta%20sobre%20consultoría%20de%20IA",
  },
  {
    icon: LuMonitor,
    title: "Capacitaciones",
    headline: "Preparamos a tu equipo para usar IA con criterio.",
    description:
      "Talleres prácticos con las tareas reales de cada área, sin tecnicismos.",
    receives:
      "Casos resueltos con tu propia información, buenas prácticas y reglas de uso para toda la empresa.",
    convenient: "Tu equipo ya usa IA, pero cada persona lo hace a su manera.",
    cta: "Solicitar propuesta de workshop",
    href: "mailto:contacto@olmondconsulting.com?subject=Consulta%20sobre%20capacitaciones%20de%20IA",
  },
  {
    icon: LuCode2,
    title: "Desarrollos",
    headline: "Implementamos soluciones de IA y automatización a medida.",
    description:
      "Asistentes y flujos conectados a las herramientas que ya usás, con tecnología simple de mantener.",
    receives:
      "La solución funcionando, documentada y probada, y tu equipo preparado para operarla.",
    convenient: "Ya sabés qué proceso querés mejorar.",
    cta: "Consultar por un desarrollo",
    href: "mailto:contacto@olmondconsulting.com?subject=Consulta%20sobre%20desarrollo%20de%20IA",
  },
];

function ServiceColumn({
  icon: Icon,
  title,
  headline,
  description,
  receives,
  convenient,
  cta,
  href,
  index,
}) {
  return (
    <Flex
      role="group"
      position="relative"
      zIndex={1}
      direction="column"
      h="full"
      px={{
        base: 0,
        md: 7,
        lg: 10,
      }}
      py={{
        base: 9,
        md: 10,
      }}
      borderLeft={{
        base: "none",
        md: index === 0 ? "none" : "1px solid",
      }}
      borderTop={{
        base: index === 0 ? "none" : "1px solid",
        md: "none",
      }}
      borderColor="#E1E3EC"
      transition="all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
      transformOrigin="center"
      _hover={{
        bg: "#F1EDFF",
        zIndex: 2,
        boxShadow: "0 22px 60px rgba(91, 65, 177, 0.16)",
      }}
    >
      {/* Ícono */}
      <Flex
        w="64px"
        h="64px"
        align="center"
        justify="center"
        borderRadius="18px"
        bgImage={BRAND_GRADIENT}
        color="white"
        boxShadow="0 12px 28px rgba(104, 72, 196, 0.18)"
        transition="all 0.3s ease"
        _groupHover={{
          transform: "translateY(-4px) scale(1.04)",
          boxShadow: "0 18px 38px rgba(104, 72, 196, 0.28)",
        }}
      >
        <Icon size={29} strokeWidth={1.8} />
      </Flex>

      {/* Servicio */}
      <Heading
        as="h3"
        mt={10}
        fontSize={{
          base: "30px",
          md: "32px",
        }}
        lineHeight="1.1"
        letterSpacing="-0.04em"
        fontWeight="600"
        color="#171827"
      >
        {title}
      </Heading>

      <Text
        mt={7}
        fontSize={{
          base: "18px",
          md: "19px",
        }}
        lineHeight="1.5"
        fontWeight="700"
        color="#171827"
      >
        {headline}
      </Text>

      <Text
        mt={5}
        fontSize={{
          base: "16px",
          md: "17px",
        }}
        lineHeight="1.65"
        color="#666A86"
      >
        {description}
      </Text>

      {/* Recibís */}
      <Box mt={8}>
        <Text
          fontSize="12px"
          fontWeight="800"
          textTransform="uppercase"
          letterSpacing="0.16em"
          color="purple.600"
        >
          Recibís
        </Text>

        <Text
          mt={3}
          fontSize={{
            base: "16px",
            md: "17px",
          }}
          lineHeight="1.65"
          color="#272938"
        >
          {receives}
        </Text>
      </Box>

      {/* Conviene si */}
      <Box mt={7}>
        <Text
          fontSize="12px"
          fontWeight="800"
          textTransform="uppercase"
          letterSpacing="0.16em"
          color="purple.600"
        >
          Conviene si
        </Text>

        <Text
          mt={3}
          fontSize={{
            base: "16px",
            md: "17px",
          }}
          lineHeight="1.65"
          color="#272938"
        >
          {convenient}
        </Text>
      </Box>

      {/* CTA siempre abajo */}
      <Box mt="auto" pt={9}>
        <Link
          href={href}
          display="inline-flex"
          alignItems="center"
          gap={2}
          pb={2}
          fontSize={{
            base: "16px",
            md: "17px",
          }}
          lineHeight="1.3"
          fontWeight="700"
          color="#5941B1"
          borderBottom="2px solid"
          borderColor="rgba(89,65,177,0.28)"
          transition="all 0.2s ease"
          _groupHover={{
            color: "#7B4BC5",
            borderColor: "#7B4BC5",
          }}
          _hover={{
            color: "#7B4BC5",
            borderColor: "#7B4BC5",
            textDecoration: "none",
            transform: "translateY(-2px)",
          }}
        >
          {cta}

          <Box as="span" fontSize="18px" lineHeight="1" aria-hidden="true">
            ↗
          </Box>
        </Link>
      </Box>
    </Flex>
  );
}

export const WhatWeDo = () => {
  return (
    <Box
      as="section"
      position="relative"
      bg="white"
      color="#171827"
      scrollMarginTop="72px"
    >
      <Container
        maxW="6xl"
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
            lg: "1.15fr 0.85fr",
          }}
          gap={{
            base: 8,
            lg: 16,
          }}
          alignItems="end"
        >
          <Stack spacing={0}>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
              }}
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="purple.600"
            >
              Qué hacemos
            </Text>

            <Heading
              as="h2"
              mt={7}
              maxW="720px"
              fontSize={{
                base: "40px",
                sm: "48px",
                md: "56px",
                lg: "60px",
              }}
              lineHeight="1.04"
              letterSpacing="-0.05em"
              fontWeight="500"
              color="#171827"
            >
              Elegí por dónde empezar: decidir, capacitar o construir.
            </Heading>
          </Stack>

          <Text
            maxW="600px"
            pb={{ lg: 2 }}
            fontSize={{
              base: "18px",
              md: "20px",
            }}
            lineHeight="1.7"
            color="#666A86"
          >
            Consultoría para decidir, capacitaciones para que tu equipo aprenda
            y desarrollos para ponerlo en marcha. Podés empezar por cualquiera.
          </Text>
        </Grid>

        {/* Servicios */}
        <Box
          mt={{
            base: 12,
            md: 16,
          }}
          position="relative"
        >
          {/* Punto exacto al que navega el header */}
          <Box
            id="que-hacemos"
            position="absolute"
            top={0}
            left={0}
            w="1px"
            h="1px"
            scrollMarginTop={{
              base: "80px",
              lg: "104px",
            }}
            pointerEvents="none"
            aria-hidden="true"
          />

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(3, minmax(0, 1fr))",
            }}
            borderTop="1px solid"
            borderColor="#E1E3EC"
          >
            {services.map((service, index) => (
              <ServiceColumn key={service.title} {...service} index={index} />
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
