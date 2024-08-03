import "animate.css";

import { Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
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
          {t("home.title")}
          <Text as="span">{t("home.title_2")}</Text>
          <Text as="span">{t("home.title_3")}</Text>
          <Text as="span">{t("home.title_4")}</Text>
        </Heading>
        <Text w="70%" fontSize={{ base: "lg", md: "xl" }} mb={10}>
          {t("home.description")}
        </Text>
        <Link
          href="http://calendly.com/equipo-olmondconsulting"
          isExternal
          _hover=""
        >
          <Button
            className="animate__animated animate__slideInLeft"
            variant="outline"
            size="lg"
            color="white"
            bgGradient="linear(to-r, #1a3a35, #256a60)"
            _hover={{ bgGradient: "linear(to-r, #1a3a35, #256a60)" }}
            rightIcon={<FaLongArrowAltRight />}
          >
            {t("home.talkToUs")}
          </Button>
        </Link>
      </Stack>
      <About />
      <Team />
      <Carousel />
      <Services />
      {/* <Contact /> */}
    </Stack>
  );
};
