import { Heading, Stack, Text } from "@chakra-ui/react";

export const MoreAbout = () => {
  return (
    <Stack spacing={32} color="white">
      <Stack
        as="section"
        align="center"
        textAlign="center"
        spacing={5}
        m="auto"
        gap={20}
        maxW="5xl"
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" mb={10}>
            ¿Por qué nosotros?
          </Heading>
        </div>

        <div data-aos="fade-right" data-aos-duration="1000">
          <Stack
            id="contact"
            p={8}
            color="white"
            border="1px"
            borderColor={"muted"}
            borderRadius={10}
          >
            <Heading as="h4" fontSize="4xl" mb={4}>
              Enfoque estratégico
            </Heading>
            <Text fontSize="2xl">
              No solo implementamos tecnología, sino que te guiamos en tu camino
              hacia la transformación digital.
            </Text>
          </Stack>
        </div>

        <div data-aos="fade-left" data-aos-duration="1000">
          <Stack
            id="contact"
            p={8}
            color="white"
            border="1px"
            borderColor={"muted"}
            borderRadius={10}
          >
            <Heading as="h4" fontSize="4xl" mb={4}>
              Resultados medibles
            </Heading>
            <Text fontSize="2xl">
              Nos enfocamos en ofrecer soluciones que no solo mejoran la
              eficiencia, sino que también generan resultados tangibles.
            </Text>
          </Stack>
        </div>

        <div data-aos="fade-right" data-aos-duration="1000">
          <Stack
            id="contact"
            p={8}
            color="white"
            border="1px"
            borderColor={"muted"}
            borderRadius={10}
          >
            <Heading as="h4" fontSize="4xl" mb={4}>
              Innovación constante
            </Heading>
            <Text fontSize="2xl">
              Nos mantenemos al tanto de las últimas tendencias y tecnologías
              para ofrecerte siempre lo mejor.
            </Text>
          </Stack>
        </div>

        <div data-aos="fade-left" data-aos-duration="1000">
          <Stack
            id="contact"
            p={8}
            color="white"
            border="1px"
            borderColor={"muted"}
            borderRadius={10}
          >
            <Heading as="h4" fontSize="4xl" mb={4}>
              Relación a largo plazo
            </Heading>
            <Text fontSize="2xl">
              Nos comprometemos a ser tu socio tecnológico, acompañándote en
              cada paso de tu crecimiento.
            </Text>
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
};
