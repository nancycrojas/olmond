import { Heading, Stack, Text } from "@chakra-ui/react";

import { About } from "../components/About";
import { Team } from "../components/Team";
import { values } from "../lib/constants";

export const AboutUs = () => {
  return (
    <>
      <About />
      <Team />
      <Stack
        color="white"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        spacing={24}
        maxW={["100%", "75%"]}
        m="auto"
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center">
            Misión
          </Heading>
        </div>
        <div data-aos="fade-right" data-aos-duration="1000">
          <Stack
            p={{ base: 8, md: 16 }}
            color="white"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            borderColor={"muted"}
            borderRadius={10}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.3s"
          >
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              La misión de Olmond Consulting es empoderar a las organizaciones a
              través de la inteligencia artificial, análisis de datos y RPA,
              ofreciendo soluciones innovadoras y personalizadas que impulsen su
              transformación digital. Nos comprometemos a ser socios
              estratégicos de nuestros clientes, guiándolos en el cambiante
              paisaje tecnológico mediante consultoría de vanguardia, desarrollo
              y capacitación en IA, con el objetivo de mejorar su competitividad
              y eficiencia operativa.
            </Text>
          </Stack>
        </div>
      </Stack>
      <Stack
        color="white"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        spacing={24}
        maxW={["100%", "75%"]}
        m="auto"
        mt={{ base: 16, lg: 16 }}
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center">
            Visión
          </Heading>
        </div>
        <div data-aos="fade-right" data-aos-duration="1000">
          <Stack
            p={{ base: 8, md: 16 }}
            color="white"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            borderColor={"muted"}
            borderRadius={10}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.3s"
          >
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              La visión de Olmond Consulting es convertirse en la consultora
              líder en inteligencia artificial en Latinoamérica, destacada por
              su capacidad para anticipar y adaptarse a las tendencias
              tecnológicas, promoviendo el éxito y la innovación en cada
              organización que asesora. Aspiramos a transformar el panorama
              empresarial, creando un ecosistema donde la tecnología de IA sea
              accesible, comprensible y aprovechada al máximo por empresas de
              todos los tamaños y sectores.
            </Text>
          </Stack>
        </div>
      </Stack>
      <Stack
        color="white"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        spacing={24}
        maxW={["100%", "75%"]}
        m="auto"
        mt={{ base: 16, lg: 16 }}
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center">
            Valores
          </Heading>
        </div>
        <div data-aos="fade-right" data-aos-duration="1000">
          <Stack
            p={{ base: 8, md: 16 }}
            color="white"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            borderColor={"muted"}
            borderRadius={10}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.3s"
          >
            {values.map(({ title, description }, index) => (
              <Stack key={index}>
                <Heading as="h4" size="lg" textAlign="center">
                  {title}
                </Heading>
                <Text fontSize={{ base: "xl", md: "2xl" }} mb={8}>
                  {description}
                </Text>
              </Stack>
            ))}
          </Stack>
        </div>
      </Stack>
    </>
  );
};
