/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../../lib/constants.js";

const variants = {
  primary: {
    bgImage: BRAND_GRADIENT,
    color: "white",
    _hover: { opacity: 0.92, transform: "translateY(-2px)", boxShadow: "lg" },
    _active: { opacity: 0.85 },
  },
  secondary: {
    bg: "white",
    color: "brand.600",
    border: "2px solid",
    borderColor: "brand.500",
    _hover: { bg: "brand.50", transform: "translateY(-2px)" },
  },
  ghost: {
    bg: "transparent",
    color: "brand.600",
    _hover: { bg: "brand.50" },
  },
};

export function CTA({ variant = "primary", children, ...props }) {
  return (
    <Button
      size="lg"
      px={8}
      py={7}
      fontFamily="heading"
      fontWeight="700"
      borderRadius="full"
      transition="all 0.2s ease"
      {...variants[variant]}
      {...props}
    >
      {children}
    </Button>
  );
}
