import "./swiper/styles.css";

import { Heading, Text, VStack } from "@chakra-ui/react";

// import { useTranslation } from "react-i18next";
import { SwiperCarousel } from "./swiper/SwiperCarousel";

export const Integrations = () => {
  //   const { t } = useTranslation();

  return (
    <VStack py={6} color="white" textAlign="center">
      <Heading
        as="h3"
        size="xl"
        mb={10}
        background="linear-gradient(to right, #113cff, #f42ea8)"
        bgClip="text"
      >
        Integraciones
      </Heading>
      <Text fontSize={{ base: "xl", md: "2xl" }} mb={8}>
        Potencia las herramientas que tu equipo ya usa
      </Text>
      <SwiperCarousel />
    </VStack>
  );
};
