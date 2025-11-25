import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import patricio_rouan from "../assets/patricio_rouan.png";

export const Team = () => {
  const { t } = useTranslation();

  return (
    <Box
      maxW="70%"
      mx="auto"
      py={16}
      color="white"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <Box textAlign="center">
          <Heading
            as="h3"
            display="inline-block"
            size="xl"
            mb={{ base: 12, md: 24 }}
            background="linear-gradient(to right, #113cff, #f42ea8)"
            bgClip="text"
          >
            {t("team.founder")}
          </Heading>
        </Box>
      </div>
      <div data-aos="fade-up" data-aos-duration="1000">
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={12}>
          <Box flex="1">
            <Image
              src={patricio_rouan}
              alt="Patricio Rouan"
              borderRadius="lg"
              w={{ base: "80%", md: "100%" }}
              mx="auto"
              boxShadow="0 6px 20px rgba(0,0,0,0.4)"
            />
          </Box>
          <Box flex="1" maxW={{ base: "100%", md: "400px" }}>
            <Stack as="ul" spacing={{ base: 4, md: 6, lg: 8 }}>
              <li>{t("team.advisor")}</li>
              <li> {t("team.passion")}</li>
              <li> {t("team.fifteen")}</li>
              <li> {t("team.consultant")}</li>
              <li> {t("team.professor")}</li>
              <li>{t("team.tutor")}</li>
            </Stack>
          </Box>
        </Flex>
      </div>
      <Flex
        mt={12}
        direction={{ base: "column", md: "row" }}
        gap={6}
        justify="center"
      >
        <Box
          flex="1"
          p={6}
          textAlign="center"
          borderRadius="lg"
          bg="rgba(255,255,255,0.08)"
          boxShadow="inset 0 2px 6px rgba(199,211,234,0.4), 0 6px 12px rgba(0,0,0,0.5)"
        >
          <Text fontSize="xl" fontWeight="bold">
            {t("team.companies")}
          </Text>
        </Box>

        <Box
          flex="1"
          p={6}
          textAlign="center"
          borderRadius="lg"
          bg="rgba(255,255,255,0.08)"
          boxShadow="inset 0 2px 6px rgba(199,211,234,0.4), 0 6px 12px rgba(0,0,0,0.5)"
        >
          <Text fontSize="xl" fontWeight="bold">
            {t("team.professionals")}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
