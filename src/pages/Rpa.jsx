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
import { GrLineChart } from "react-icons/gr";
import {
  MdIntegrationInstructions,
  MdSavings,
  MdSecurity,
  MdThumbUp,
  MdUpgrade,
} from "react-icons/md";
import { PiChartLineUp, PiRobotFill } from "react-icons/pi";

const serviceDetail = [
  {
    title: "rpa.automation.title",
    description: "rpa.automation.description",
  },
  {
    title: "rpa.tasks.title",
    description: "rpa.tasks.description",
  },
  {
    title: "rpa.work.title",
    description: "rpa.work.description",
  },
  {
    title: "rpa.benefit.title",
    description: "rpa.benefit.description",
  },
  {
    title: "rpa.implemented.title",
    description: "rpa.implemented.description",
  },
];

const benefitCard = [
  {
    icon: MdSecurity,
    title: "rpa.fast.title",
    description: "rpa.fast.description",
  },
  {
    icon: MdThumbUp,
    title: "rpa.employees.title",
    description: "rpa.employees.description",
  },
  {
    icon: GrLineChart,
    title: "rpa.report.title",
    description: "rpa.report.description",
  },
  {
    icon: MdUpgrade,
    title: "rpa.productivity.title",
    description: "rpa.productivity.description",
  },
  {
    icon: PiChartLineUp,
    title: "rpa.scalable.title",
    description: "rpa.scalable.description",
  },
  {
    icon: PiRobotFill,
    title: "rpa.service.title",
    description: "rpa.service.description",
  },
  {
    icon: MdIntegrationInstructions,
    title: "rpa.systems.title",
    description: "rpa.systems.description",
  },
  {
    icon: MdSavings,
    title: "rpa.investment.title",
    description: "rpa.investment.description",
  },
];

export const Rpa = () => {
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
          {t("services.services.rpa.title")}
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
            <Heading p={{ base: 10, md: 10, lg: 0 }} mb={6}>
              {t("rpa.benefits")}
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
              px={{ base: 8, md: 8, lg: 0 }}
              spacing={10}
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
                      color="#256a60"
                      border="2px solid #256a60"
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
              {t("rpa.question")}
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
