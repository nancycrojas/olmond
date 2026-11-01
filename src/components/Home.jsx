import "animate.css";

import { Box, Stack } from "@chakra-ui/react";

import { AboutPatricio } from "./AboutPatricio";
import { DiagnosticCTA } from "./DiagnosticCTA";
import { GeneralFAQ } from "./GeneralFAQ";
import { Hero } from "./Hero";
import { HowWeWork } from "./HowWeWork";
import { OpenAIPartnerNetwork } from "./OpenAIPartnerNetwork";
import { WhatWeDo } from "./WhatWeDo";
import { WhyOlmond } from "./WhyOlmond";
//import { AcademySection } from "./AcademySection";
// import { Carousel } from "./carousel/Carousel";
// import { Integrations } from "./Integrations";

export const Home = () => {
  return (
    <Stack minH="90vh" gap={8} textAlign={{ base: "center", lg: "start" }}>
      <Box>
        <Hero />
        <OpenAIPartnerNetwork />
      </Box>
      <WhatWeDo />
      <HowWeWork />
      <AboutPatricio />
      <WhyOlmond />
      <GeneralFAQ />
      <DiagnosticCTA />

      {/*
      <AcademySection />
      <Carousel />
      <Integrations /> */}
    </Stack>
  );
};
