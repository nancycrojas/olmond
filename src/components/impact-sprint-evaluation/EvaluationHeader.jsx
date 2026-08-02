/* eslint-disable react/prop-types */
import { Box, Heading, IconButton, Text } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

export function EvaluationHeader({ onClose }) {
  return (
    <Box
      position="relative"
      flexShrink={0}
      px={{
        base: 6,
        md: 10,
      }}
      py={{
        base: 7,
        md: 9,
      }}
      pr={{
        base: 20,
        md: 24,
      }}
      bg="#171925"
      color="white"
    >
      <Text
        fontSize={{
          base: "xs",
          md: "sm",
        }}
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="0.08em"
        color="#AEB9FF"
      >
        Evaluación de análisis inicial
      </Text>

      <Heading
        as="h2"
        mt={3}
        maxW="760px"
        fontSize={{
          base: "26px",
          md: "36px",
        }}
        lineHeight="1.1"
        letterSpacing="-0.04em"
        fontWeight="500"
        color="white"
      >
        ¿Este proceso puede ser un Impact Sprint?
      </Heading>

      <IconButton
        position="absolute"
        top={{
          base: 5,
          md: 8,
        }}
        right={{
          base: 5,
          md: 8,
        }}
        w="50px"
        h="50px"
        minW="50px"
        aria-label="Cerrar evaluación"
        icon={<LuX size={20} />}
        onClick={onClose}
        borderRadius="full"
        color="white"
        bg="whiteAlpha.50"
        border="1px solid"
        borderColor="whiteAlpha.200"
        transition="all 0.2s ease"
        _hover={{
          bg: "whiteAlpha.100",
          borderColor: "whiteAlpha.300",
          transform: "scale(1.04)",
        }}
        _active={{
          bg: "whiteAlpha.200",
          transform: "scale(0.97)",
        }}
        _focusVisible={{
          boxShadow: "0 0 0 3px rgba(174,185,255,0.35)",
        }}
      />
    </Box>
  );
}
