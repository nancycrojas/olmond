import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLongArrowAltRight } from "react-icons/fa";

import healthcare_image from "../assets/healthcare.jpg";

const services = [
  {
    title: "healthcare.attention.title",
    description: "healthcare.attention.description",
  },
  {
    title: "healthcare.automated.title",
    description: "healthcare.automated.description",
  },
  {
    title: "healthcare.predictive.title",
    description: "healthcare.predictive.description",
  },
];

export const Healthcare = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Container maxW="1400px">
      <Stack
        color="white"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        spacing={24}
        mb={8}
        maxW={["100%", "75%"]}
        m="auto"
        mt={{ base: 10, lg: 10 }}
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" mx={8} textAlign="center">
            {t("healthcare.title")}
          </Heading>
        </div>
        <div data-aos="fade-right" data-aos-duration="1000">
          <Stack
            p={{ base: 8, md: 16 }}
            color="white"
            sx={{
              background: "hsla(0, 0%, 100%, 0.05)",
              boxShadow:
                "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              paddingX: "20px",
            }}
            borderColor={"muted"}
            borderRadius={10}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.3s"
          >
            <Image src={healthcare_image} alt="healthacre_image" />
            <Text fontSize={{ base: "lg", md: "2xl" }} mt={6}>
              {t("healthcare.description")}
            </Text>

            <Stack
              color="white"
              alignItems="center"
              justifyContent="center"
              my={20}
            >
              <HStack
                alignItems="center"
                justifyContent="center"
                gap={6}
                flexDirection={{ base: "column", lg: "row" }}
              >
                {services.map(({ title, description }, index) => (
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
                      h="320px"
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
                        hoveredIndex === null || hoveredIndex === index
                          ? 1
                          : 0.5
                      }
                    >
                      <Heading size="md" mb={8}>
                        {t(title)}
                      </Heading>
                      <Text mb={8}>{t(description)}</Text>
                    </Box>
                  </div>
                ))}
              </HStack>
            </Stack>
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              {t("healthcare.contact")}
            </Text>
            <Link
              href="http://calendly.com/equipo-olmondconsulting"
              isExternal
              _hover=""
              mt={6}
            >
              <Button
                className="animate__animated animate__slideInLeft"
                variant="outline"
                size="lg"
                color="white"
                bgGradient="linear(to-r, #1a3a35, #256a60)"
                _hover={{
                  "& svg": {
                    transform: "translateX(5px)",
                  },
                }}
              >
                <Flex align="center">
                  {t("healthcare.advice")}
                  <FaLongArrowAltRight
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      marginLeft: "10px",
                    }}
                  />
                </Flex>
              </Button>
            </Link>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};
