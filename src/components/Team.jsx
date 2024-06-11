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
  return (
    <Stack
      id="team"
      py={8}
      color="white"
      alignItems="center"
      justifyContent="center"
      my={20}
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <Heading as="h3" size="2xl" textAlign="center" mb={20}>
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
            description="Líder en innovación y estrategia de tecnología."
            image={patricio_rouan}
          />
          <TeamMember
            name="Juan Manuel Rossi"
            role="Co-Founder"
            description="Experto en desarrollo tecnológico y sistemas de IA."
            image={juan_rossi}
          />
          <TeamMember
            name="Pedro Spinozzi"
            role="Co-Founder"
            image={pedro_spinozzi}
            description="Experto en desarrollo tecnológico y sistemas de IA."
          />
        </HStack>
      </div>
    </Stack>
  );
};

// eslint-disable-next-line react/prop-types
const TeamMember = ({ name, role, description, image }) => (
  <Card maxW="md">
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
    </CardHeader>
    <CardBody>
      <Text>{description}</Text>
      <Text>
        With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer
        to create a screen.
      </Text>
    </CardBody>
  </Card>
);
