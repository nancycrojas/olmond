import "animate.css";

import { Stack } from "@chakra-ui/react";

// import { About } from "./About";
import { AboutPatricio } from "./AboutPatricio";
//import { AcademySection } from "./AcademySection";
import { DiagnosticCTA } from "./DiagnosticCTA";
// import { Carousel } from "./carousel/Carousel";
// import { FAQ } from "./FAQ";
//import { FAQS } from "./FAQS";
//import { FinalCTA } from "./FinalCTA";
import { GeneralFAQ } from "./GeneralFAQ";
import { Hero } from "./Hero";
import { HowWeWork } from "./HowWeWork";
// import { Impact } from "./Impact";
//import { ImpactSprint } from "./ImpactSprint";
// import { Integrations } from "./Integrations";
//import { Measurement } from "./Measurement";
//import { Newsletter } from "./Newsletter";
//import { Paths } from "./Paths";
//import { Problem } from "./Problem";
import { WhatWeDo } from "./WhatWeDo";
import { WhyOlmond } from "./WhyOlmond";
// import { Services } from "./Services";
// import { Success } from "./Success";
// import { Team } from "./Team";
// import { WhatStopsYou } from "./WhatStopsYou";

export const Home = () => {
  return (
    <Stack minH="90vh" gap={8} textAlign={{ base: "center", lg: "start" }}>
      <Hero />
      <WhatWeDo />
      <HowWeWork />
      <AboutPatricio />
      <WhyOlmond />
      <GeneralFAQ />
      <DiagnosticCTA />
      {/* <Problem /> */}
      {/* <Methodology /> */}
      {/* <Paths />
      <ImpactSprint />
      <Measurement />
      <AcademySection />
      <FAQS />
      <FinalCTA />
      <Newsletter /> */}
      {/* <About />
      <Services />
      <Team />
      <Impact />
      <Success />
      <Carousel />
      <WhatStopsYou />
      <FAQ /> */}
      {/* <Integrations /> */}
    </Stack>
  );
};
