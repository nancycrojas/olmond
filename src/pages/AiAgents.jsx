/* eslint-disable react/prop-types */
import {
  Box,
  Circle,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStopwatch } from "react-icons/fa";
import { GrMultiple } from "react-icons/gr";
import { IoIosPerson } from "react-icons/io";
import {
  MdDataset,
  MdEventAvailable,
  MdSavings,
  MdSentimentVerySatisfied,
} from "react-icons/md";
import { TbSettingsAutomation } from "react-icons/tb";

import { Contactus } from "../components/Contactus";

const serviceDetail = [
  {
    title: "aiAgents.helpYou.title",
    description: "aiAgents.helpYou.description",
  },
  {
    title: "aiAgents.benefit.title",
    description: "aiAgents.benefit.description",
  },
  {
    title: "aiAgents.efficiency.title",
    description: "aiAgents.efficiency.description",
  },
  {
    title: "aiAgents.queries.title",
    description: "aiAgents.queries.description",
  },
  {
    title: "aiAgents.success.title",
    description: "aiAgents.success.description",
  },
];

const benefiCard = [
  {
    icon: MdEventAvailable,
    title: "aiAgents.availability.title",
    description: "aiAgents.availability.description",
  },
  {
    icon: MdSavings,
    title: "aiAgents.reduction.title",
    description: "aiAgents.reduction.description",
  },
  {
    icon: FaStopwatch,
    title: "aiAgents.response.title",
    description: "aiAgents.response.description",
  },
  {
    icon: TbSettingsAutomation,
    title: "aiAgents.automation.title",
    description: "aiAgents.automation.description",
  },
  {
    icon: GrMultiple,
    title: "aiAgents.scalability.title",
    description: "aiAgents.scalability.description",
  },
  {
    icon: IoIosPerson,
    title: "aiAgents.personalization.title",
    description: "aiAgents.personalization.description",
  },
  {
    icon: MdSentimentVerySatisfied,
    title: "aiAgents.satisfaction.title",
    description: "aiAgents.satisfaction.description",
  },
  {
    icon: MdDataset,
    title: "aiAgents.collection.title",
    description: "aiAgents.collection.description",
  },
];

export const AiAgents = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Container maxW="1400px" py={10} color="#FFFFFF">
      <VStack spacing={6}>
        <Heading
          size="xl"
          mb={4}
          textAlign="center"
          background="linear-gradient(to right, #113cff, #f42ea8)"
          bgClip="text"
        >
          {t("services.services.aiAgents.title")}
        </Heading>
        {serviceDetail.map(({ title, description }, index) => (
          <Box
            key={index}
            py={8}
            borderRadius="md"
            w="full"
            p={6}
            textAlign="center"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            _hover={{
              zIndex: 1,
            }}
            transition="all 0.3s"
            opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Heading size="md" mb={4}>
              {t(title)}
            </Heading>
            <Text mt={2} fontSize="lg">
              {t(description)}
            </Text>
          </Box>
        ))}

        <div data-aos="zoom-in" data-aos-duration="1000">
          <Box
            w="100%"
            my={10}
            spacing={{ base: 0, md: 20 }}
            p={{ base: 0, lg: 20 }}
            borderRadius="20px"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            textAlign="center"
            pb={4}
          >
            <Heading
              p={{ base: 10, md: 10, lg: 0 }}
              mb={6}
              background="linear-gradient(to right, #113cff, #f42ea8)"
              bgClip="text"
            >
              {t("aiAgents.benefits")}
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
              px={{ base: 8, md: 8, lg: 0 }}
              spacing={10}
              mb={8}
            >
              {benefiCard.map(({ icon: Icon, title, description }, index) => (
                <Box
                  key={index}
                  borderRadius={6}
                  p={6}
                  textAlign="center"
                  sx={{
                    background: "hsla(0, 0%, 100%, 0.05)",
                    boxShadow:
                      "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                  }}
                  color="white"
                  boxShadow="md"
                  _hover={{ boxShadow: "xl" }}
                >
                  <Stack mb={4} align="center">
                    <Circle
                      size="50px"
                      bg="linear-gradient(to right, #7d3f98, #4e2673)"
                    >
                      <Icon size={30} />
                    </Circle>
                  </Stack>
                  <Heading size="sm" mb={4}>
                    {t(title)}
                  </Heading>
                  <Text mt={2} fontSize="md">
                    {t(description)}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </div>
      </VStack>
      <Contactus />
    </Container>
  );
};
