import "./carousel.css";

import { Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
        <Heading as="h3" size="2xl" mb={10}>
          ¿Por qué nosotros?
        </Heading>
        <Stack
          className="carousel"
          position="relative"
          overflow="hidden"
          maxH="400px"
          minH={{ base: "400px", md: "300px" }}
        >
          <Stack
            className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}
          >
            <Heading as="h4" fontSize="3xl" mb={4}>
              Enfoque estratégico
            </Heading>
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              No solo implementamos tecnología, sino que te guiamos en tu camino
              hacia la transformación digital.
            </Text>
          </Stack>
          <Stack
            className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}
          >
            <Heading as="h4" fontSize="3xl" mb={4}>
              Resultados medibles
            </Heading>
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              Nos enfocamos en ofrecer soluciones que no solo mejoran la
              eficiencia, sino que también generan resultados tangibles.
            </Text>
          </Stack>
          <Stack
            className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}
          >
            <Heading as="h4" fontSize="3xl" mb={4}>
              Innovación constante
            </Heading>
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              Nos mantenemos al tanto de las últimas tendencias y tecnologías
              para ofrecerte siempre lo mejor.
            </Text>
          </Stack>
          <Stack
            className={`carousel-item ${activeIndex === 3 ? "active" : ""}`}
          >
            <Heading as="h4" fontSize="3xl" mb={4}>
              Relación a largo plazo
            </Heading>
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              Nos comprometemos a ser tu socio tecnológico, acompañándote en
              cada paso de tu crecimiento.
            </Text>
          </Stack>
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
