import "animate.css";
import "./home-motion.css";

import { Box, Stack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import { observeReveals } from "../lib/revealMotion.js";
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
  const motionRoot = useRef(null);
  useEffect(() => observeReveals(motionRoot.current), []);

  return (
    <Stack ref={motionRoot} data-motion-root="" minH="90vh" gap={8} textAlign={{ base: "center", lg: "start" }}>
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
