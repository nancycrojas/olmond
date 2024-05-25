import { Box, Heading, Stack, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Stack
      id="about"
      color="white"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      spacing={32}
      mb={8}
      maxW={["100%", "75%"]}
      m="auto"
    >
      <Heading as="h3" size="2xl" textAlign="center">
        Sobre Nosotros
      </Heading>
      <Text fontSize="2xl">
        En Olmond Consulting, transformamos tu empresa con soluciones de RPA,
        Data Analytics y Chatbots de IA. Nuestra misión es empoderar a las
        organizaciones, ofreciendo herramientas innovadoras y personalizadas que
        impulsan su transformación digital. Nos comprometemos a ser tu socio
        estratégico, guiándote en el cambiante paisaje tecnológico con
        consultoría de vanguardia, desarrollo y capacitación en IA. ¡Mejora tu
        competitividad y eficiencia operativa con Olmond Consulting, y convertí
        la tecnología en tu ventaja!
      </Text>

      <Stack spacing={32}>
        <Stack
          as="section"
          align="center"
          textAlign="center"
          spacing={5}
          m="auto"
          gap={20}
        >
          <Heading as="h3" size="2xl" mb={10}>
            ¿Por qué nosotros?
          </Heading>
          <Box>
            <Heading as="h4" fontSize="4xl">
              Enfoque estratégico
            </Heading>
          </Box>
          <Text fontSize="2xl">
            No solo implementamos tecnología, sino que te guiamos en tu camino
            hacia la transformación digital.
          </Text>
          <Heading as="h4" fontSize="4xl">
            Resultados medibles
          </Heading>
          <Text fontSize="2xl">
            Nos enfocamos en ofrecer soluciones que no solo mejoran la
            eficiencia, sino que también generan resultados tangibles.
          </Text>
          <Heading as="h4" fontSize="4xl">
            Innovación constante
          </Heading>
          <Text fontSize="2xl">
            Nos mantenemos al tanto de las últimas tendencias y tecnologías para
            ofrecerte siempre lo mejor.
          </Text>
          <Heading as="h4" fontSize="4xl">
            Relación a largo plazo
          </Heading>
          <Text fontSize="2xl">
            Nos comprometemos a ser tu socio tecnológico, acompañándote en cada
            paso de tu crecimiento.
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default About;
