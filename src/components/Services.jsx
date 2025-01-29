import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { t } = useTranslation();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const services = [
    {
      title: "services.services.rpa.title",
      description: "services.services.rpa.description",
      link: "/rpa",
    },
    {
      title: "services.services.chatBots.title",
      description: "services.services.chatBots.description",
      link: "/chat-bots",
    },
    {
      title: "services.services.dataAnatytics.title",
      description: "services.services.dataAnatytics.description",
      link: "/data-analytics",
    },
  ];

  return (
    <Container maxW="1400px">
      <Stack color="white" alignItems="center" justifyContent="center" my={20}>
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center" mb={20}>
            {t("services.ourServices")}
          </Heading>
        </div>
        <HStack
          alignItems="center"
          justifyContent="center"
          gap={6}
          flexDirection={{ base: "column", lg: "row" }}
        >
          {services.map(({ title, description, link }, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="1000"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                color="#FFFFFF"
                padding={8}
                w="320px"
                h="400px"
                borderRadius={8}
                sx={{
                  background: "hsla(0, 0%, 100%, 0.05)",
                  boxShadow:
                    "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
                  borderRadius: "10px",
                }}
                _hover={{
                  borderColor: "#256a60",
                  transform: "scale(1.05)",
                  zIndex: 1,
                }}
                transition="all 0.3s"
                opacity={
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.5
                }
              >
                <Heading size="lg" mb={8}>
                  {t(title)}
                </Heading>
                <Text mb={8}>{t(description)}</Text>
                <Button
                  as={Link}
                  to={link}
                  _hover={{ bg: "#256a60", color: "#FFFFFF" }}
                >
                  {t("moreInformation")}
                </Button>
              </Box>
            </div>
          ))}
        </HStack>
      </Stack>
    </Container>
  );
};
