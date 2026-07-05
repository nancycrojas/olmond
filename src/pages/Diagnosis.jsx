import { Box } from "@chakra-ui/react";

import { Autoridad } from "../components/diagnosis/Autoridad.jsx";
import { CierreCta } from "../components/diagnosis/CierreCta.jsx";
import { Faq } from "../components/diagnosis/Faq.jsx";
import { FormularioScorecard } from "../components/diagnosis/FormularioScorecard.jsx";
import { Hero } from "../components/diagnosis/Hero.jsx";
import { Problema } from "../components/diagnosis/Problema.jsx";
import { QueTeLlevas } from "../components/diagnosis/QueTeLlevas.jsx";

export function Diagnosis() {
  return (
    <Box bg="white">
      <Hero />
      <Problema />
      <QueTeLlevas />
      <FormularioScorecard />
      <Autoridad />
      <Faq />
      <CierreCta />
    </Box>
  );
}
