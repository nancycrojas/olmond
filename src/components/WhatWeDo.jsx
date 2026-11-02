/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
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
  },
];

function ServiceColumn({
  icon: Icon,
  title,
  headline,
  description,
  receives,
  convenient,
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
          alignItems={{
            base: "start",
            lg: "center",
          }}
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
              mt={{ base: 6, md: 7 }}
              mx={{ base: "auto", lg: 0 }}
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
              Elegí por dónde empezar
            </Heading>
          </Stack>

          <List
            mx={{ base: "auto", lg: 0 }}
            maxW="600px"
            w="full"
            pb={{ lg: 2 }}
            spacing={{ base: 3, md: 4 }}
            fontSize={{
              base: "17px",
              md: "19px",
              lg: "18px",
            }}
            lineHeight="1.55"
            color="#666A86"
            textAlign="left"
          >
            <ListItem display="flex" alignItems="flex-start" gap={4}>
              <Box
                flexShrink={0}
                w="7px"
                h="7px"
                mt="11px"
                borderRadius="full"
                bg="#777777"
              />

              <Text>
                <Box as="span" fontWeight="700" color="#55576A">
                  Consultoría
                </Box>{" "}
                para definir dónde y cómo aplicar IA.
              </Text>
            </ListItem>

            <ListItem display="flex" alignItems="flex-start" gap={4}>
              <Box
                flexShrink={0}
                w="7px"
                h="7px"
                mt="11px"
                borderRadius="full"
                bg="#777777"
              />

              <Text>
                <Box as="span" fontWeight="700" color="#55576A">
                  Capacitaciones
                </Box>{" "}
                para que tu equipo aprenda a usarla.
              </Text>
            </ListItem>

            <ListItem display="flex" alignItems="flex-start" gap={4}>
              <Box
                flexShrink={0}
                w="7px"
                h="7px"
                mt="11px"
                borderRadius="full"
                bg="#777777"
              />

              <Text>
                <Box as="span" fontWeight="700" color="#55576A">
                  Desarrollos a medida
                </Box>{" "}
                para llevarla a la práctica.
              </Text>
            </ListItem>
          </List>
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
          <Flex
            mt={{ base: 10, md: 12 }}
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
          >
            <Text
              mb={4}
              fontSize={{
                base: "15px",
                md: "17px",
              }}
              lineHeight="1.6"
              fontWeight="700"
              color="#4F5268"
            >
              Contanos qué necesitás y te ayudamos a dar el próximo paso.
            </Text>

            <Flex
              as="a"
              href="https://wa.me/5491133872411?text=Hola%2C%20vi%20la%20web%20de%20Olmond%20Consulting%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20c%C3%B3mo%20aplicar%20IA%20en%20mi%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              align="center"
              justify="center"
              gap={2.5}
              minW={{
                base: "280px",
                sm: "320px",
              }}
              minH="52px"
              px={8}
              borderRadius="full"
              bgImage={BRAND_GRADIENT}
              color="white"
              fontSize={{
                base: "16px",
                md: "17px",
              }}
              fontWeight="700"
              textDecoration="none"
              boxShadow="0 12px 30px rgba(103, 78, 210, 0.18)"
              transition="all 0.25s ease"
              _hover={{
                textDecoration: "none",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 16px 36px rgba(103, 78, 210, 0.26)",
              }}
            >
              <Text as="span">Hablar con un asesor</Text>

              <Box as={FaWhatsapp} boxSize="21px" flexShrink={0} />
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
