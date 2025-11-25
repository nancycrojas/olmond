import { Button, Heading, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Contactus = () => {
  const { t } = useTranslation();

  return (
    <VStack
      id="contact"
      p={{ base: 4, md: 14 }}
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
      mb={20}
      mx={4}
    >
      <Heading as="h3" size="lg" textAlign="center" mb={6}>
        {t("contactus")}
      </Heading>

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
        {t("freeConsultationToday")}
      </Button>
    </VStack>
  );
};
