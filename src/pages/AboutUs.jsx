import { Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { About } from "../components/About";
import { Team } from "../components/Team";
import { values } from "../lib/constants";

export const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <>
      <About />
      <Team />
      <Stack
        color="white"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        spacing={24}
        maxW={["100%", "75%"]}
        m="auto"
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center">
            {t("team.mission")}
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
            }}
            borderColor={"muted"}
            borderRadius={10}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.3s"
          >
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              {t("team.desc_mission")}
            </Text>
          </Stack>
        </div>
      </Stack>
      <Stack
        color="white"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        spacing={24}
        maxW={["100%", "75%"]}
        m="auto"
        mt={{ base: 16, lg: 16 }}
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center">
            {t("team.vision")}
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
            }}
            borderColor={"muted"}
            borderRadius={10}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.3s"
          >
            <Text fontSize={{ base: "xl", md: "2xl" }}>
              {t("team.desc_vision")}
            </Text>
          </Stack>
        </div>
      </Stack>
      <Stack
        color="white"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        spacing={24}
        maxW={["100%", "75%"]}
        m="auto"
        mt={{ base: 16, lg: 16 }}
      >
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center">
            {t("team.values")}
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
            }}
            borderColor={"muted"}
            borderRadius={10}
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="all 0.3s"
          >
            {values.map(({ title, description }, index) => (
              <Stack key={index}>
                <Heading as="h4" size="lg" textAlign="center">
                  {t(title)}
                </Heading>
                <Text fontSize={{ base: "xl", md: "2xl" }} mb={8}>
                  {t(description)}
                </Text>
              </Stack>
            ))}
          </Stack>
        </div>
      </Stack>
    </>
  );
};
