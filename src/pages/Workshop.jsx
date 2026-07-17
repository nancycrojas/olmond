/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";

import { AudienceSection } from "../components/workshop/AudienceSection";
import { ContentsSection } from "../components/workshop/ContentsSection";
import { ExpectedResultsSection } from "../components/workshop/ExpectedResultsSection";
import { FAQSection } from "../components/workshop/FAQSection";
import { FinalCTASection } from "../components/workshop/FinalCTASection";
import { Footer } from "../components/workshop/Footer";
import { HeroSection } from "../components/workshop/HeroSection";
import { HighlightRow } from "../components/workshop/HighlightRow";
import { IntroductionSection } from "../components/workshop/IntroductionSection";
import { InvestmentSection } from "../components/workshop/InvestmentSection";
import { MethodologySection } from "../components/workshop/MethodologySection";
import { ModalitySection } from "../components/workshop/ModalitySection";
import { Navbar } from "../components/workshop/Navbar";
import { ObjectivesSection } from "../components/workshop/ObjectivesSection";
import { ToolsSection } from "../components/workshop/ToolsSection";

export const Workshop = ({ proposal }) => {
  const companyName = proposal?.companyName ?? "la empresa";
  const showCompanyIntro = proposal?.showCompanyIntro ?? false;
  const recipients =
    proposal?.recipients ??
    "Administración, Compras, Comercial, Logística y Depósito, Capital Humano";

  return (
    <Box bg="white" minH="100vh">
      <Navbar companyName={companyName} />
      <HeroSection companyName={companyName} />
      <HighlightRow />
      <IntroductionSection
        companyName={companyName}
        showCompanyIntro={showCompanyIntro}
      />
      <ObjectivesSection />
      <AudienceSection />
      <ModalitySection />
      <ContentsSection />
      <MethodologySection />
      <ToolsSection />
      <ExpectedResultsSection companyName={companyName} />
      <InvestmentSection recipients={recipients} />
      <FAQSection companyName={companyName} />
      <FinalCTASection companyName={companyName} />
      <Footer />
    </Box>
  );
};
