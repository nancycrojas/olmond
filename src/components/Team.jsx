import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import juan_rossi from "../assets/juan_rossi.jpg";
import patricio_rouan from "../assets/patricio_rouan.jpg";
import pedro_spinozzi from "../assets/pedro_spinozzi.jpg";

export const Team = () => {
  // const gradientTextStyle = {
  //   background: "linear-gradient(90deg, #256a60, #1b5148)",
  //   WebkitBackgroundClip: "text",
  //   WebkitTextFillColor: "transparent",
  // };

  return (
    <Stack
      py={8}
      color="white"
      alignItems="center"
      justifyContent="center"
      my={20}
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <Heading
          as="h3"
          size="2xl"
          textAlign="center"
          mb={20}
          // style={gradientTextStyle}
        >
          Nuestro Equipo
        </Heading>
      </div>
      <div data-aos="fade-up" data-aos-duration="1000">
        <HStack
          spacing={4}
          justifyContent="center"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <TeamMember
            name="Patricio Rouan"
            role="Co-Founder"
            image={patricio_rouan}
            description="Patricio Rouan es un profesional con más de una década y media de trayectoria en el mundo del emprendimiento y una profunda pasión por la inteligencia artificial, la transformación digital y la innovación tecnológica. Ejerce en la actualidad como Director de Operaciones en la Sociedad Argentina de Inteligencia Artificial (SAIA). Se desempeña también como tutor en el Posgrado en Gestión Estratégica de Inteligencia Artificial y Automatización Empresarial en UCEMA."
          />
          <TeamMember
            name="Juan Manuel Rossi"
            role="Co-Founder"
            image={juan_rossi}
            description="Juan Martin Rossi es un apasionado de la ciencia y la tecnología. Al culminar la secundaria continuó sus estudios universitarios en la ciudad de Córdoba. Es Data Scientist y actualmente se encuentra finalizando sus estudios en la carrera de física y inteligencia artificial, estudiar estos campos le permitió combinar su pasión por la ciencia y la tecnología."
          />
          <TeamMember
            name="Pedro Spinozzi"
            role="Co-Founder"
            image={pedro_spinozzi}
            description="Pedro Spinozzi es Licenciado en Gestión de Negocios y Tecnología del ITBA. Con experiencia en gestión de proyectos, ventas y crecimiento. Formó parte del programa Business Fellow de Makers del tercer cohort en 2023."
          />
        </HStack>
      </div>
    </Stack>
  );
};

// eslint-disable-next-line react/prop-types
const TeamMember = ({ name, role, description, image }) => (
  <Card minW="320px" maxW="320px" minH="440px" maxH="440px">
    <CardHeader>
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name={name} src={image} />

          <Box>
            <Heading size="sm">{name}</Heading>
            <Text>{role}</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
      </Flex>
      <Text mt={6}> {description}</Text>
    </CardHeader>
    <CardBody></CardBody>
  </Card>
);
