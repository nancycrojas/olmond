/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuFileText, LuGraduationCap, LuUsers } from "react-icons/lu";

import { BRAND_GRADIENT } from "../lib/constants.js";

const credentials = [
  {
    icon: LuGraduationCap,
    title: "Profesor en UTN, UBA y UNSAM",
  },
  {
    icon: LuFileText,
    title: "Tutor de posgrado en UCEMA",
  },
  {
    icon: LuUsers,
    title: "Asesor Principal en SAIA",
  },
];

const CredentialItem = ({ icon: Icon, title }) => {
  return (
    <Flex
      align="center"
      gap={{
        base: 4,
        md: 5,
      }}
    >
      {/* Ícono */}
      <Flex
        flexShrink={0}
        w={{
          base: "38px",
          md: "42px",
        }}
        h={{
          base: "38px",
          md: "42px",
        }}
        align="center"
        justify="center"
        color="#814BFF"
      >
        <Icon size={30} strokeWidth={1.8} />
      </Flex>

      {/* Texto */}
      <Text
        fontSize={{
          base: "16px",
          md: "18px",
        }}
        lineHeight="1.5"
        color="#596078"
      >
        <Box as="span" fontWeight="700" color="#30364C">
          {title}
        </Box>{" "}
      </Text>
    </Flex>
  );
};

export const AboutPatricio = ({ photoSrc = "/patricio-rouan.jpeg" }) => {
  return (
    <Box
      as="section"
      id="nosotros"
      position="relative"
      overflow="hidden"
      bg="white"
      color="#151722"
      scrollMarginTop="104px"
    >
      {/* Halo muy sutil */}
      <Box
        position="absolute"
        top="-180px"
        left="10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="rgba(100, 115, 255, 0.035)"
        filter="blur(130px)"
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
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "0.9fr 1.1fr",
          }}
          gap={{
            base: 14,
            md: 16,
            lg: 20,
          }}
          alignItems="center"
        >
          {/* =========================================
              COLUMNA IZQUIERDA
          ========================================= */}
          <Flex direction="column" align="center" justify="center">
            {/* Foto */}
            <Box
              position="relative"
              w={{
                base: "260px",
                sm: "320px",
                md: "360px",
                lg: "380px",
              }}
              h={{
                base: "260px",
                sm: "320px",
                md: "360px",
                lg: "380px",
              }}
              borderRadius="full"
              p="5px"
              bg="white"
              border="2px solid"
              borderColor="#DCE4FF"
              boxShadow="0 18px 50px rgba(37, 45, 82, 0.08)"
            >
              <Image
                src={photoSrc}
                alt="Patricio Rouan"
                w="100%"
                h="100%"
                borderRadius="full"
                objectFit="cover"
                objectPosition="center"
                display="block"
              />
            </Box>

            {/* Nombre */}
            <Heading
              as="h3"
              mt={{
                base: 7,
                md: 8,
              }}
              fontSize={{
                base: "30px",
                md: "34px",
              }}
              lineHeight="1.15"
              letterSpacing="-0.035em"
              fontWeight="700"
              color="#172036"
              textAlign="center"
            >
              Patricio Rouan
            </Heading>

            {/* Rol */}
            <Text
              mt={2}
              fontSize={{
                base: "16px",
                md: "18px",
              }}
              lineHeight="1.5"
              color="#596078"
              textAlign="center"
            >
              Fundador · Consultor y docente en IA
            </Text>
          </Flex>

          {/* =========================================
              COLUMNA DERECHA
          ========================================= */}
          <Box>
            {/* Etiqueta */}
            <Flex
              align="center"
              justify={{
                base: "center",
                lg: "flex-start",
              }}
              gap={4}
            >
              <Box
                w="34px"
                h="2px"
                flexShrink={0}
                borderRadius="full"
                bgImage={BRAND_GRADIENT}
              />

              <Text
                fontSize={{
                  base: "xs",
                  md: "sm",
                }}
                fontWeight="800"
                textTransform="uppercase"
                letterSpacing="0.16em"
                color="purple.600"
              >
                Quién está detrás
              </Text>
            </Flex>

            {/* Título */}
            <Heading
              as="h2"
              mt={{
                base: 6,
                md: 7,
              }}
              mx={{
                base: "auto",
                lg: 0,
              }}
              maxW="650px"
              fontSize={{
                base: "38px",
                sm: "44px",
                md: "50px",
                lg: "52px",
              }}
              lineHeight="1.08"
              letterSpacing="-0.045em"
              fontWeight="700"
              color="#172036"
              textAlign={{
                base: "center",
                lg: "left",
              }}
            >
              IA aplicada a los desafíos de tu empresa.
            </Heading>

            {/* Introducción */}
            <Text
              mt={{
                base: 6,
                md: 8,
              }}
              mx={{
                base: "auto",
                lg: 0,
              }}
              maxW="690px"
              fontSize={{
                base: "17px",
                md: "20px",
              }}
              lineHeight="1.65"
              color="#596078"
              textAlign={{
                base: "center",
                lg: "left",
              }}
            >
              Combina experiencia emprendedora y docencia para ayudarte a
              identificar dónde aplicar IA, implementar soluciones y preparar a
              tu equipo para usarlas.
            </Text>

            <Text mt={4}><Box as="a" href="/equipo/patricio-rouan.html" color="primary.default" textDecoration="underline">Conocer la trayectoria de Patricio Rouan</Box></Text>

            {/* Credenciales */}
            <Stack
              mt={{
                base: 8,
                md: 10,
              }}
              spacing={{
                base: 5,
                md: 6,
              }}
              maxW="700px"
              mx={{
                base: "auto",
                lg: 0,
              }}
              textAlign="left"
            >
              {credentials.map((credential) => (
                <CredentialItem key={credential.title} {...credential} />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};
