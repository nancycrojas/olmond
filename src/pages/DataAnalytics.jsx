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
import { AiFillProduct } from "react-icons/ai";
import { FaAsterisk } from "react-icons/fa";
import { GiGearStickPattern, GiProcessor } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { MdAltRoute, MdSentimentVerySatisfied } from "react-icons/md";
import { PiLineSegmentsFill } from "react-icons/pi";

const serviceDetail = [
  {
    title: "data.data.title",
    description: "data.data.description",
  },
  {
    title: "data.benefit.title",
    description: "data.benefit.description",
  },
  {
    title: "data.services.title",
    description: "data.services.description",
  },
  {
    title: "data.solve.title",
    description: "data.solve.description",
  },
  {
    title: "data.success.title",
    description: "data.success.description",
  },
];

const benefitCard = [
  {
    icon: MdAltRoute,
    title: "data.decision.title",
    description: "data.decision.description",
  },
  {
    icon: GiGearStickPattern,
    title: "data.patterns.title",
    description: "data.patterns.description",
  },
  {
    icon: GiProcessor,
    title: "data.process.title",
    description: "data.process.description",
  },
  {
    icon: PiLineSegmentsFill,
    title: "data.segmentation.title",
    description: "data.segmentation.description",
  },
  {
    icon: GrResources,
    title: "data.efficiency.title",
    description: "data.efficiency.description",
  },
  {
    icon: AiFillProduct,
    title: "data.innovation.title",
    description: "data.innovation.description",
  },
  {
    icon: FaAsterisk,
    title: "data.prevention.title",
    description: "data.prevention.description",
  },
  {
    icon: MdSentimentVerySatisfied,
    title: "data.satisfaction.title",
    description: "data.satisfaction.description",
  },
];

export const DataAnalytics = () => {
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
          Data Analytics
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
              {t("data.benefits")}
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
              px={{ base: 8, md: 8, lg: 0 }}
              spacing={6}
              mb={8}
            >
              {benefitCard.map(({ icon: Icon, title, description }, index) => (
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
        <Box textAlign="center">
          <div data-aos="zoom-in" data-aos-duration="1000">
            <Text fontSize="3xl" fontWeight="bold" mb={8}>
              {t("data.question")}
            </Text>
          </div>
          <Link href="http://calendly.com/equipo-olmondconsulting" isExternal>
            <Button
              size="lg"
              color="white"
              bgGradient="linear(to-r, #113cff, #f42ea8)"
              _hover={{
                transform: "scale(1.05)",
              }}
              rounded="full"
              fontSize="md"
              px={8}
            >
              {t("talkToUs")}
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};
