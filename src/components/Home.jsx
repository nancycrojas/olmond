import "animate.css";

import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaLongArrowAltRight } from "react-icons/fa";

import image from "../assets/image.png";
import { About } from "./About";
import { Carousel } from "./carousel/Carousel";
import { Contactus } from "./Contactus";
import { FAQ } from "./FAQ";
import { Impact } from "./Impact";
import { Integrations } from "./Integrations";
import { Services } from "./Services";
import { Success } from "./Success";
import { Team } from "./Team";
import { WhatStopsYou } from "./WhatStopsYou";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Stack minH="90vh" gap={8} textAlign={{ base: "center", lg: "start" }}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        m="auto"
        mt={10}
        p={{ base: 0, lg: 10 }}
        direction={{ base: "column", lg: "row" }}
      >
        <Stack
          spacing={4}
          color="white"
          alignItems={{ base: "center", lg: "start" }}
          width="full"
          maxWidth={{ base: "70%", lg: "50%" }}
        >
          <Heading
            fontSize={{ base: "30px", md: "40px" }}
            lineHeight="inherit"
            mb={4}
          >
            <Text
              as="span"
              background="linear-gradient(to right, #113cff, #f42ea8)"
              bgClip="text"
            >
              {t("home.title_1")}
            </Text>
            <Text as="span" fontWeight="400">
              {t("home.title_2")}
            </Text>
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} mb={8}>
            {t("home.description")}
          </Text>
          <Link
            href="https://calendly.com/contacto-olmondconsulting"
            isExternal
            _hover=""
          >
            <Button
              className="animate__animated animate__slideInLeft"
              size="lg"
              color="white"
              bgGradient="linear(to-r, #113cff, #f42ea8)"
              rounded="full"
              fontSize="md"
              px={8}
              _hover={{
                "& svg": {
                  transform: "translateX(5px)",
                },
              }}
              mb={6}
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
        <Image
          src={image}
          boxSize={{ base: "300px", md: "400", lg: "450px" }}
          objectFit="cover"
          borderRadius="lg"
        />
      </Flex>
      <About />
      <Services />
      <Team />
      <Impact />
      <Success />
      <Carousel />
      <WhatStopsYou />
      <FAQ />
      <Integrations />
      <Contactus />
    </Stack>
  );
};
