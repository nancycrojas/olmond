import { Box } from "@chakra-ui/react";

import { HeroSection } from "../components/academy/HeroSection";
import { InstructorSection } from "../components/academy/InstructorSection";
import { WhatIsPackOlmond } from "../components/academy/WhatIsPackOlmond";

export const Academy = () => {
  return (
    <Box bg="white">
      <HeroSection />
      {/* Línea divisoria con degradado */}
      <Box
        h="2px"
        bgGradient="linear(to-r, transparent, #EC4899, transparent)"
        maxW="4xl"
        mx="auto"
        mb={{ base: 8, md: 12 }}
      />
      <WhatIsPackOlmond />
      <InstructorSection />
    </Box>
  );
};
