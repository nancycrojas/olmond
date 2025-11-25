import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const WhatStopsYou = () => {
  const { t } = useTranslation();

  return (
    <Box
      maxW="85%"
      mx="auto"
      py={20}
      color="white"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={12}
        align="stretch"
        justify="space-between"
      >
        <Flex
          flex="1"
          direction="column"
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h3"
            display="inline-block"
            size="lg"
            mb={6}
            background="linear-gradient(to right, #113cff, #f42ea8)"
            bgClip="text"
          >
            {t("whatStopsYou.whats_holding_you_back.title")}
          </Heading>

          <Stack spacing={4} fontSize="lg">
            <Text>{t("whatStopsYou.whats_holding_you_back.item_1")}</Text>
            <Text>{t("whatStopsYou.whats_holding_you_back.item_2")}</Text>
            <Text>{t("whatStopsYou.whats_holding_you_back.item_3")}</Text>
            <Text>{t("whatStopsYou.whats_holding_you_back.item_4")}</Text>
          </Stack>

          <Box mt="auto" pt={8}>
            <Button
              as="a"
              href="https://wa.me/541133872411?text=Hola%2C%20quiero%20analizar%20mis%20desaf%C3%ADos%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              rounded="full"
              px={8}
              py={5}
              color="white"
              bgGradient="linear(to-r, #113cff, #f42ea8)"
              fontSize="md"
              _hover={{ transform: "scale(1.05)" }}
              w="full"
              maxW="280px"
              mx={{ base: "auto", md: "0" }}
            >
              {t("whatStopsYou.whats_holding_you_back.button_1")}
            </Button>
          </Box>
        </Flex>

        <Flex
          flex="1"
          direction="column"
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h3"
            display="inline-block"
            size="lg"
            mb={6}
            background="linear-gradient(to right, #f42ea8, #ff7c48)"
            bgClip="text"
          >
            {t("whatStopsYou.what_you_will_achieve.title")}
          </Heading>

          <Stack spacing={4} fontSize="lg">
            <Text>{t("whatStopsYou.what_you_will_achieve.item_1")}</Text>
            <Text>{t("whatStopsYou.what_you_will_achieve.item_2")}</Text>
            <Text>{t("whatStopsYou.what_you_will_achieve.item_3")}</Text>
            <Text>{t("whatStopsYou.what_you_will_achieve.item_4")}</Text>
          </Stack>

          <Box mt="auto" pt={8}>
            <Button
              as="a"
              href="https://wa.me/541133872411?text=Hola%2C%20quiero%20llevar%20mi%20empresa%20al%20siguiente%20nivel"
              target="_blank"
              rel="noopener noreferrer"
              rounded="full"
              px={8}
              py={5}
              color="white"
              bgGradient="linear(to-r, #f42ea8, #ff7c48)"
              fontSize="md"
              _hover={{ transform: "scale(1.05)" }}
              w="full"
              maxW="280px"
              mx={{ base: "auto", md: "0" }}
            >
              {t("whatStopsYou.what_you_will_achieve.button_2")}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
