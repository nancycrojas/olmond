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
import { useState } from "react";
import { useTranslation } from "react-i18next";

import juan_rossi from "../assets/juan_rossi.jpg";
import patricio_rouan from "../assets/patricio_rouan.jpg";
import pedro_spinozzi from "../assets/pedro_spinozzi.jpg";

const teamMember = [
  {
    name: "Patricio Rouan",
    role: "Co-Founder",
    image: patricio_rouan,
    description: "team.members.rouan",
  },
  {
    name: "Juan Manuel Rossi",
    role: "Co-Founder",
    image: juan_rossi,
    description: "team.members.rossi",
  },
  {
    name: "Pedro Spinozzi",
    role: "Co-Founder",
    image: pedro_spinozzi,
    description: "team.members.spinozzi",
  },
];

export const Team = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Stack
      py={8}
      color="white"
      alignItems="center"
      justifyContent="center"
      my={20}
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <Heading as="h3" size="2xl" textAlign="center" mb={20}>
          {t("team.ourTeam")}
        </Heading>
      </div>
      <div data-aos="fade-up" data-aos-duration="1000">
        <HStack
          spacing={6}
          justifyContent="center"
          flexDirection={{ base: "column", lg: "row" }}
        >
          {teamMember.map(({ name, role, description, image }, index) => (
            <Card
              key={index}
              minW="320px"
              maxW="320px"
              minH="450px"
              maxH="450px"
              _hover={{
                transform: "scale(1.05)",
              }}
              transition="all 0.3s"
              opacity={
                hoveredIndex === null || hoveredIndex === index ? 1 : 0.5
              }
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name={name} src={image} />
                    <Box>
                      <Heading size="sm">{name}</Heading>
                      <Text>{role}</Text>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                  />
                </Flex>
                <Text mt={6}>{t(description)}</Text>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          ))}
        </HStack>
      </div>
    </Stack>
  );
};
