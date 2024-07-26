/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Circle,
  Container,
  Heading,
  Link,
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

const serviceDetail = [
  {
    title: "chatBots.helpYou.title",
    description: "chatBots.helpYou.description",
  },
  {
    title: "chatBots.benefit.title",
    description: "chatBots.benefit.description",
  },
  {
    title: "chatBots.efficiency.title",
    description: "chatBots.efficiency.description",
  },
  {
    title: "chatBots.queries.title",
    description: "chatBots.queries.description",
  },
  {
    title: "chatBots.success.title",
    description: "chatBots.success.description",
  },
];

const benefiCard = [
  {
    icon: MdEventAvailable,
    title: "chatBots.availability.title",
    description: "chatBots.availability.description",
  },
  {
    icon: MdSavings,
    title: "chatBots.reduction.title",
    description: "chatBots.reduction.description",
  },
  {
    icon: FaStopwatch,
    title: "chatBots.response.title",
    description: "chatBots.response.description",
  },
  {
    icon: TbSettingsAutomation,
    title: "chatBots.automation.title",
    description: "chatBots.automation.description",
  },
  {
    icon: GrMultiple,
    title: "chatBots.scalability.title",
    description: "chatBots.scalability.description",
  },
  {
    icon: IoIosPerson,
    title: "chatBots.personalization.title",
    description: "chatBots.personalization.description",
  },
  {
    icon: MdSentimentVerySatisfied,
    title: "chatBots.satisfaction.title",
    description: "chatBots.satisfaction.description",
  },
  {
    icon: MdDataset,
    title: "chatBots.collection.title",
    description: "chatBots.collection.description",
  },
];

export const ChatBot = () => {
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
        <Heading size="xl" mb={4} textAlign="center">
          {t("services.services.chatBots.title")}
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
              borderColor: "#256a60",
              zIndex: 1,
            }}
            transition="all 0.3s"
            opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Heading size="lg" mb={4}>
              {t(title)}
            </Heading>
            <Text mt={2} fontSize="xl">
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
            <Heading p={{ base: 10, md: 10, lg: 0 }} mb={6}>
              {t("chatBots.benefits")}
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
                      color="#256a60"
                      border="2px solid #256a60"
                    >
                      <Icon size={30} />
                    </Circle>
                  </Stack>
                  <Heading size="md" mb={4}>
                    {t(title)}
                  </Heading>
                  <Text mt={2} fontSize="xl">
                    {t(description)}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </div>
        <Box textAlign="center">
          <div data-aos="zoom-in" data-aos-duration="1000">
            <Text fontSize="3xl" fontWeight="bold" mb={8}>
              {t("chatBots.question")}
            </Text>
          </div>
          <Link href="http://calendly.com/equipo-olmondconsulting" isExternal>
            <Button
              variant="outline"
              size="lg"
              color="white"
              bgGradient="linear(to-r, #1a3a35, #256a60)"
              _hover={{ bgGradient: "linear(to-r, #1a3a35, #256a60)" }}
            >
              {t("talkToUs")}
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};
