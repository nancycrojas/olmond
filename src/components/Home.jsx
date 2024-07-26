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
    <Stack
      minH="90vh"
      color="white"
      alignItems="center"
      justifyContent="center"
      gap={8}
      textAlign="center"
      mt={20}
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
      <About />
      <Team />
      <Carousel />
      <Services />
      {/* <Contact /> */}
    </Stack>
  );
};
