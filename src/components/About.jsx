import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();

  return (
    <Stack
      id="about"
      color="white"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      spacing={{ base: 12, md: 24 }}
      mb={8}
      maxW={["100%", "75%"]}
      m="auto"
      mt={{ base: 10, lg: 10 }}
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <Heading
          as="h3"
          size="xl"
          textAlign="center"
          background="linear-gradient(to right, #113cff, #f42ea8)"
          bgClip="text"
        >
          {t("home.aboutUs")}
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
          mx={{ base: 4, sm: 0 }}
        >
          <Text fontSize="lg" mb={6}>
            {t("home.aboutIntro")}
          </Text>
          <Text fontSize="lg">{t("home.aboutChallenge")}</Text>
          <Text fontSize="lg" mb={6}>
            {t("home.aboutCallToAction")}
          </Text>
          <Button
            as="a"
            href="https://wa.me/541133872411?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20solicitar%20una%20reuni%C3%B3n%20para%20conocer%20m%C3%A1s%20acerca%20de%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            rounded="full"
            px={8}
            fontSize="md"
            mx="auto"
            mt={4}
            color="white"
            bgGradient="linear(to-r, #113cff, #f42ea8)"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            {t("freeConsultation")}
          </Button>
        </Stack>
      </div>
    </Stack>
  );
};
