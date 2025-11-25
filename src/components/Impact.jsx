import "animate.css";

import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
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
        maxWidth={{ base: "80%", lg: "50%" }}
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
        <Text fontSize="md">{t("impact.analysis")}</Text>
        <Text fontSize="md">{t("impact.time")}</Text>
        <Text fontSize="md">{t("impact.errors")}</Text>
        <Text fontSize="md">{t("impact.scale")}</Text>
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
          {t("impact.cta")}
        </Button>
      </Stack>
    </Flex>
  );
};
