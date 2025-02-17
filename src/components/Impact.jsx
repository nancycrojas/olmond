import "animate.css";

import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import image from "../assets/woman-office.jpeg";

export const Impact = () => {
  const { t } = useTranslation();

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      m="auto"
      mt={10}
      p={{ base: 0, lg: 10 }}
      direction={{ base: "column-reverse", lg: "row" }}
    >
      <Image
        src={image}
        boxSize={{ base: "300px", md: "400", lg: "450px" }}
        objectFit="cover"
        borderRadius="lg"
        mt={{ base: 4, lg: 0 }}
      />
      <Stack
        spacing={4}
        color="white"
        alignItems={{ base: "center", lg: "start" }}
        width="full"
        maxWidth={{ base: "70%", lg: "50%" }}
      >
        <Heading fontSize={{ base: "30px", md: "36px" }} lineHeight="inherit">
          <Text
            as="span"
            background="linear-gradient(to right, #113cff, #f42ea8)"
            bgClip="text"
          >
            {t("impact.title")}
          </Text>
        </Heading>
        <Text fontSize="md">{t("impact.team")}</Text>
        <Text fontSize="md">{t("impact.replace")}</Text>
        <Text fontSize="md">{t("impact.time")}</Text>
        <Text fontSize="md">{t("impact.costly")}</Text>
        <Text fontSize="md">{t("impact.decisions")}</Text>
        <Text fontSize="md" mb={4}>
          {t("impact.transform")}
        </Text>
      </Stack>
    </Flex>
  );
};
