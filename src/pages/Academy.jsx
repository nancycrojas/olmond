import { Box } from "@chakra-ui/react";

import { FAQSection } from "../components/academy/FAQSection";
import { HeroSection } from "../components/academy/HeroSection";
import { InstructorSection } from "../components/academy/InstructorSection";
import { IsForYouSection } from "../components/academy/IsForYouSection";
import { MethodSection } from "../components/academy/MethodSection";
import { RealCasesSection } from "../components/academy/RealCasesSection";
import { ResultsSection } from "../components/academy/ResultsSection";
import { WhatIsPackOlmond } from "../components/academy/WhatIsPackOlmond";
import { WhatsIncludedSection } from "../components/academy/WhatsIncludedSection";

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
      <ResultsSection />
      <IsForYouSection />
      <MethodSection />
      <WhatsIncludedSection />
      <RealCasesSection />
      <FAQSection />
    </Box>
  );
};
