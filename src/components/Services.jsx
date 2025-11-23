import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { t } = useTranslation();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const services = [
    {
      title: "services.services.rpa.title",
      item_1: "services.services.rpa.item_1",
      item_2: "services.services.rpa.item_2",
      item_3: "services.services.rpa.item_3",
      button: "services.services.rpa.button_1",
    },
    {
      title: "services.services.aiAgents.title",
      item_1: "services.services.aiAgents.item_1",
      item_2: "services.services.aiAgents.item_2",
      item_3: "services.services.aiAgents.item_3",
      button: "services.services.aiAgents.button_2",
    },
    {
      title: "services.services.dataAnatytics.title",
      item_1: "services.services.dataAnatytics.item_1",
      item_2: "services.services.dataAnatytics.item_2",
      item_3: "services.services.dataAnatytics.item_3",
      button: "services.services.dataAnatytics.button_3",
    },
  ];

  return (
    <Stack
      color="white"
      alignItems="center"
      justifyContent="center"
      my={20}
      textAlign="center"
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <Heading
          as="h3"
          size="xl"
          textAlign="center"
          mb={20}
          background="linear-gradient(to right, #113cff, #f42ea8)"
          bgClip="text"
        >
          {t("services.ourServices")}
        </Heading>
      </div>
      <HStack
        alignItems="center"
        justifyContent="center"
        gap={6}
        flexDirection={{ base: "column", lg: "row" }}
      >
        {services.map(({ title, item_1, item_2, item_3, button }, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-duration="1000"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              color="#FFFFFF"
              padding={8}
              w="320px"
              h="380px"
              borderRadius={8}
              sx={{
                background: "hsla(0, 0%, 100%, 0.05)",
                boxShadow:
                  "inset 0 2px 6px rgba(199, 211, 234, 0.4), inset 0 24px 48px rgba(199, 211, 234, 0.2), 0 6px 12px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
              }}
              _hover={{
                transform: "scale(1.05)",
                zIndex: 1,
              }}
              transition="all 0.3s"
              opacity={
                hoveredIndex === null || hoveredIndex === index ? 1 : 0.5
              }
            >
              <Heading
                fontSize="2xl"
                mb={8}
                background="linear-gradient(to right, #113cff, #f42ea8)"
                bgClip="text"
              >
                {t(title)}
              </Heading>
              <Box as="ul" listStylePosition={{ lg: "inside" }}>
                <li>{t(item_1)}</li>
                <li>{t(item_2)}</li>
                <li>{t(item_3)}</li>
              </Box>
              <Button
                as="a"
                href="https://wa.me/541133872411?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20solicitar%20una%20reuni%C3%B3n%20para%20conocer%20m%C3%A1s%20acerca%20de%20sus%20servicios"
                target="_blank"
                rounded="full"
                px={8}
                color="white"
                bgGradient="linear(to-r, #113cff, #f42ea8 )"
                _hover={{
                  transform: "scale(1.05)",
                }}
                mt={8}
              >
                {t(button)}
              </Button>
            </Box>
          </div>
        ))}
      </HStack>
    </Stack>
  );
};
