/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../lib/constants.js";

const highlights = [
  "Profesor en UTN, UBA y UNSAM",
  "Tutor de posgrado en UCEMA",
  "Asesor Principal en SAIA",
];

function OrbitLabel({ children, top, left, right, bottom }) {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      px={5}
      py={{ base: "1", md: "3" }}
      bg="white"
      border="1px solid"
      borderColor="#D9E1EA"
      borderRadius="full"
      boxShadow="0 10px 24px rgba(26, 35, 58, 0.06)"
      fontSize="xs"
      fontWeight="500"
      color="gray.700"
      whiteSpace="nowrap"
    >
      {children}
    </Box>
  );
}

function ProfileOrbit({ photoSrc = "/patricio-rouan.webp" }) {
  return (
    <Flex
      justify="center"
      align="center"
      position="relative"
      w="full"
      minH={{ base: "420px", md: "520px" }}
    >
      {/* Órbita externa */}
      <Box
        position="absolute"
        w={{ base: "300px", md: "410px" }}
        h={{ base: "300px", md: "410px" }}
        borderRadius="full"
        border="1px solid"
        borderColor="#D9E3F1"
      />

      {/* Órbita interna */}
      <Box
        position="absolute"
        w={{ base: "220px", md: "310px" }}
        h={{ base: "220px", md: "310px" }}
        borderRadius="full"
        border="1px dashed"
        borderColor="#D5DCE8"
      />

      {/* Punto superior */}
      <Flex
        position="absolute"
        top={{ base: "46px", md: "40px" }}
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "28px", md: "30px" }}
        h={{ base: "28px", md: "30px" }}
        align="center"
        justify="center"
        borderRadius="full"
        bg="rgba(226, 82, 168, 0.14)"
      >
        <Box
          w="12px"
          h="12px"
          borderRadius="full"
          bg="#E253A8"
          boxShadow="0 0 12px rgba(226,83,168,0.45)"
        />
      </Flex>

      {/* Etiquetas */}
      <OrbitLabel
        top={{ base: "80px", md: "70px" }}
        right={{ base: "6px", md: "-8px" }}
      >
        Experiencia emprendedora
      </OrbitLabel>

      <OrbitLabel
        bottom={{ base: "58px", md: "66px" }}
        left={{ base: "0px", md: "-10px" }}
      >
        Docencia y formación ejecutiva
      </OrbitLabel>

      {/* Círculo central */}
      <Box
        position="relative"
        w={{ base: "175px", md: "265px" }}
        h={{ base: "175px", md: "265px" }}
        borderRadius="full"
        overflow="hidden"
        bg="#111420"
        border="8px solid"
        borderColor="#151827"
        boxShadow="0 18px 45px rgba(18, 23, 37, 0.18)"
      >
        <Image
          src={photoSrc}
          alt="Patricio Rouan"
          w="100%"
          h="100%"
          objectFit="cover"
        />

        {/* overlay sutil para que quede más premium */}
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, rgba(11,14,24,0.08) 0%, rgba(11,14,24,0.24) 100%)"
        />
      </Box>
    </Flex>
  );
}

export const AboutPatricio = ({ photoSrc = "/patricio-rouan.jpeg" }) => {
  return (
    <Box
      as="section"
      id="nosotros"
      position="relative"
      bg="white"
      color="#151722"
      scrollMarginTop="72px"
    >
      <Container maxW="6xl" py={{ base: 16, md: 20, lg: 24 }}>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "minmax(420px, 0.95fr) minmax(0, 1.05fr)",
          }}
          gap={{ base: 14, lg: 20 }}
          alignItems="center"
        >
          {/* Visual */}
          <Box order={{ base: 2, lg: 1 }}>
            <ProfileOrbit photoSrc={photoSrc} />
          </Box>

          {/* Texto */}
          <Box order={{ base: 1, lg: 2 }}>
            <HStack spacing={4}>
              <Box
                w="34px"
                h="2px"
                flexShrink={0}
                borderRadius="full"
                bgImage={BRAND_GRADIENT}
              />

              <Text
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.16em"
                color="purple.600"
              >
                Quién está detrás
              </Text>
            </HStack>

            <Heading
              as="h2"
              mt={{ base: 6, md: 7 }}
              mx={{ base: "auto", lg: 0 }}
              maxW="760px"
              fontSize={{
                base: "36px",
                sm: "42px",
                md: "52px",
              }}
              lineHeight={{ base: "1.07", md: "1.03" }}
              letterSpacing="-0.055em"
              fontWeight="500"
              color="#171923"
            >
              Experiencia aplicada, con foco operativo.
            </Heading>

            <Text
              mx={{ base: "auto", lg: 0 }}
              mt={{ base: 6, md: 8 }}
              maxW="800px"
              fontSize={{ base: "lg", md: "20px" }}
              lineHeight="1.7"
              color="gray.700"
            >
              Patricio Rouan combina experiencia emprendedora, docencia
              universitaria e implementación de IA para ayudar a que cada
              empresa tome mejores decisiones y pueda sostenerlas.
            </Text>

            <Flex mt={{ base: 8, md: 10 }} gap={3} wrap="wrap">
              {highlights.map((item) => (
                <Text
                  key={item}
                  px={5}
                  py={3}
                  bg="white"
                  border="1px solid"
                  borderColor="#D8E0E9"
                  borderRadius="full"
                  fontSize={{ base: "sm", md: "md" }}
                  color="gray.700"
                  boxShadow="0 6px 18px rgba(26, 35, 58, 0.04)"
                >
                  {item}
                </Text>
              ))}
            </Flex>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};
