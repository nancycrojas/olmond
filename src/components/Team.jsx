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

import patricio_rouan from "../assets/patricio_rouan.jpg";

const teamMember = [
  {
    name: "Patricio Rouan",
    image: patricio_rouan,
    description: "team.members.rouan",
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
      color="white"
      alignItems="center"
      justifyContent="center"
      my={{ base: 12, md: 24 }}
      textAlign="start"
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <Heading
          as="h3"
          size="xl"
          textAlign="center"
          mb={{ base: 12, md: 24 }}
          background="linear-gradient(to right, #113cff, #f42ea8)"
          bgClip="text"
        >
          {t("team.founder")}
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
              maxW={{ base: "90%", sm: "75%" }}
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
                <Stack mt={6} spacing={2}>
                  {t(description)
                    .split("\n")
                    .map((line, id) => (
                      <Text key={id}>{line}</Text>
                    ))}
                </Stack>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          ))}
        </HStack>
      </div>
    </Stack>
  );
};
