/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

import { GRADIENT_BRAND, WHATSAPP_URL } from "../../lib/constants";

const variantStyles = {
  primary: {
    bgGradient: GRADIENT_BRAND,
    color: "white",
    boxShadow: "0 10px 30px -12px rgba(102, 126, 234, 0.6)",
    _hover: {
      bgGradient: GRADIENT_BRAND,
      boxShadow: "0 18px 40px -12px rgba(118, 75, 162, 0.7)",
      transform: "translateY(-2px)",
    },
  },
  secondary: {
    bg: "white",
    color: "brand.600",
    border: "1px solid",
    borderColor: "gray.200",
    _hover: { borderColor: "brand.500", color: "brand.500" },
  },
  ghost: {
    bg: "whiteAlpha.200",
    color: "whiteAlpha.900",
    border: "1px solid",
    borderColor: "whiteAlpha.500",
    backdropFilter: "blur(8px)",
    _hover: { bg: "whiteAlpha.300" },
  },
};

export const CTA = ({ children, variant = "primary", ...rest }) => {
  return (
    <Button
      as="a"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      size="lg"
      fontSize="sm"
      fontWeight="semibold"
      borderRadius="2xl"
      px={6}
      py={7}
      transition="all 0.3s"
      whiteSpace="nowrap"
      {...variantStyles[variant]}
      {...rest}
    >
      {children}
    </Button>
  );
};
