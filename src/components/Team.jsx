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

const Team = () => {
  return (
    <Stack
      id="team"
      p={8}
      color="white"
      alignItems="center"
      justifyContent="center"
      my={20}
    >
      <Heading as="h3" size="2xl" textAlign="center" mb={6}>
        Nuestro Equipo
      </Heading>
      <HStack
        spacing={4}
        justifyContent="center"
        flexDirection={{ base: "column", lg: "row" }}
      >
        <TeamMember
          name="Patricio Rouan"
          role="Co-Founder"
          description="Líder en innovación y estrategia de tecnología."
          image="../../members/patricio_rouan.jpg"
        />
        <TeamMember
          name="Juan Manuel Rossi"
          role="Co-Founder"
          description="Experto en desarrollo tecnológico y sistemas de IA."
          image="../../members/juan_rossi.jpg"
        />
        <TeamMember
          name="Pedro Spinozzi"
          role="Co-Founder"
          description="Experto en desarrollo tecnológico y sistemas de IA."
          image="../../members/pedro_spinozzi.jpg"
        />
      </HStack>
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

export default Team;
