import "animate.css";

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
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
          <Box as="ul" lineHeight={10} listStylePosition={{ lg: "inside" }}>
            <li>{t("success.subtitle")}</li>
            <li>{t("success.conversion")}</li>
            <li>{t("success.inventory")}</li>
            <li>{t("success.speed")}</li>
            <li>{t("success.data")}</li>
          </Box>
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
            mb={6}
          >
            {t("success.cta")}
          </Button>
        </Stack>
        <Image
          src={image}
          boxSize={{ base: "300px", md: "400", lg: "450px" }}
          objectFit="cover"
          borderRadius="lg"
        />
      </Flex>
    </>
  );
};
