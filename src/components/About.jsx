import { Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();

  return (
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
        <Heading as="h3" size="2xl" textAlign="center">
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
        >
          <Text fontSize={{ base: "lg", md: "2xl" }}>
            {t("home.aboutDescription")}
          </Text>
        </Stack>
      </div>
    </Stack>
  );
};
