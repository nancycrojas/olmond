import "animate.css";

import { Box, Flex, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import image from "../assets/team-working.png";

export const Success = () => {
  const { t } = useTranslation();

  return (
    <>
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
          maxWidth={{ base: "80%", lg: "100%" }}
          pr={{ base: 0, lg: 12 }}
        >
          <Heading as="h3" size="lg">
            <Text
              as="span"
              background="linear-gradient(to right, #113cff, #f42ea8)"
              bgClip="text"
            >
              {t("success.title")}
            </Text>
          </Heading>
          <Text fontSize="md">{t("success.world")}</Text>
          <Box as="ul" listStylePosition={{ lg: "inside" }}>
            <li>{t("success.item-1")}</li>
            <li>{t("success.item-2")}</li>
            <li>{t("success.item-3")}</li>
            <li>{t("success.item-4")}</li>
          </Box>
          <Text fontSize="md" mb={8}>
            {t("success.opportunity")}
          </Text>
        </Stack>
        <Image
          src={image}
          boxSize={{ base: "300px", md: "400", lg: "450px" }}
          objectFit="cover"
          borderRadius="lg"
        />
      </Flex>
      <Text
        fontSize="xl"
        mb={8}
        color="white"
        alignItems={{ base: "center", lg: "start" }}
        px={10}
      >
        {t("success.schedule")}
        <Link href="https://tally.so/r/3yovMW" color="#8135d4" isExternal>
          {t("success.here")}
        </Link>
        {t("success.begin")}
      </Text>
    </>
  );
};
