import { Button, Heading, Link, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Contactus = () => {
  const { t } = useTranslation();

  return (
    <VStack
      p={{ base: 8, md: 14 }}
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
      mb={4}
    >
      <Heading as="h3" size="lg" textAlign="center" mb={6}>
        {t("contactus")}
      </Heading>

      <Link href="https://tally.so/r/3yovMW" isExternal _hover="">
        <Button
          className="animate__animated animate__slideInLeft"
          size="lg"
          color="white"
          bgGradient="linear(to-r, #113cff, #f42ea8)"
          rounded="full"
          fontSize="md"
          px={8}
          _hover={{
            "& svg": {
              transform: "translateX(5px)",
            },
          }}
        >
          {t("freeConsultation")}
        </Button>
      </Link>
    </VStack>
  );
};
