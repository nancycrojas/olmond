import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <VStack
      color="white"
      alignItems="center"
      justifyContent="center"
      flex={1}
      gap={6}
      textAlign="center"
      minH="80vh"
      p={8}
    >
      <Heading size="4xl">404</Heading>
      <Text fontWeight="semibold">{t("notFound")}</Text>
      <Text>{t("messageNotFound")}</Text>
      <Button onClick={() => navigate(-1)}>{t("back")}</Button>
    </VStack>
  );
};
