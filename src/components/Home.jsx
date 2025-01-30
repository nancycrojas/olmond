import "animate.css";

import { Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaLongArrowAltRight } from "react-icons/fa";

import { About } from "./About";
import { Carousel } from "./carousel/Carousel";
import { Services } from "./Services";
import { Team } from "./Team";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Stack minH="90vh" gap={8} textAlign="center">
      <Stack
        color="white"
        alignItems="center"
        justifyContent="center"
        mb={8}
        m="auto"
        mt={10}
        minH={{ base: "60vh", md: "70vh" }}
      >
        <Heading
          w="70%"
          fontSize={{ base: "30px", md: "40px" }}
          lineHeight="inherit"
          mb={8}
        >
          <Text as="span">{t("home.title_3")}</Text>
          <Text as="span">{t("home.title_4")}</Text>
        </Heading>
        <Text w="70%" fontSize={{ base: "lg", md: "xl" }} mb={10}>
          {t("home.description")}
        </Text>
        <Link
          href="https://calendly.com/contacto-olmondconsulting"
          isExternal
          _hover=""
          // mt={6}
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
              {t("home.talkToUs")}
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
      <About />
      <Team />
      <Carousel />
      <Services />
      {/* <Healthcare /> */}
      {/* <Contact /> */}
    </Stack>
  );
};
