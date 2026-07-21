import "./swiper/styles.css";

import { Box, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../lib/constants";
import { SwiperCarousel } from "./swiper/SwiperCarousel";

export const Integrations = () => {
  return (
    <VStack py={6} color="white" textAlign="center">
      <Stack align="center" textAlign="center">
        <HStack spacing={3}>
          <Box
            w="28px"
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
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.16em"
            color="purple.600"
          >
            Integraciones
          </Text>
        </HStack>

        <Heading
          as="h2"
          mt={5}
          maxW="850px"
          fontSize={{
            base: "36px",
            sm: "42px",
            md: "52px",
          }}
          lineHeight={{
            base: "1.07",
            md: "1.04",
          }}
          letterSpacing="-0.052em"
          fontWeight="500"
          color="#171923"
        >
          Potencia las herramientas que tu equipo ya usa
        </Heading>
        {/* <Text
          mt={{
            base: 7,
            md: 9,
          }}
          maxW="930px"
          fontSize={{
            base: "md",
            md: "20px",
          }}
          lineHeight="1.7"
          color="gray.600"
        >
          Potencia las herramientas que tu equipo ya usa
        </Text> */}
      </Stack>

      <SwiperCarousel />
    </VStack>
  );
};
