import "./carousel.css";

import { Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const features = [
  {
    title: "home.features.feature_1.title",
    description: "home.features.feature_1.description",
  },
  {
    title: "home.features.feature_2.title",
    description: "home.features.feature_2.description",
  },
  {
    title: "home.features.feature_3.title",
    description: "home.features.feature_3.description",
  },
  {
    title: "home.features.feature_4.title",
    description: "home.features.feature_4.description",
  },
];

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack spacing={32} color="white">
      <Stack
        as="section"
        align="center"
        textAlign="center"
        spacing={5}
        m="auto"
      >
        <Heading
          as="h3"
          size="xl"
          mb={10}
          background="linear-gradient(to right, #113cff, #f42ea8)"
          bgClip="text"
        >
          {t("home.whyUs")}
        </Heading>
        <Stack
          className="carousel"
          position="relative"
          overflow="hidden"
          maxH="400px"
          minH={{ base: "420px", md: "300px" }}
          minW={{ base: "300px", md: "600px" }}
        >
          {features.map(({ title, description }, index) => (
            <Stack
              className={`carousel-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <Heading as="h4" fontSize="3xl" mb={4}>
                {t(title)}
              </Heading>
              <Text fontSize={{ base: "xl", md: "2xl" }}>{t(description)}</Text>
            </Stack>
          ))}
        </Stack>
        <div className="carousel-indicators">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
      </Stack>
    </Stack>
  );
};
