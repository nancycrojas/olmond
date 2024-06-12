import { Container, Stack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Home } from "@/components/Home";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AboutUs } from "@/pages/AboutUs";
import { ChatBot } from "@/pages/ChatBot";
import { DataAnalyst } from "@/pages/DataAnalyst";
import { Rpa } from "@/pages/Rpa";

function App() {
  return (
    <Container
      maxW="full"
      bg="#060606"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack maxW="7xl">
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/rpa" element={<Rpa />} />
          <Route path="/chat-bot" element={<ChatBot />} />
          <Route path="/data-analyst" element={<DataAnalyst />} />
        </Routes>
        <Footer />
      </Stack>
    </Container>
  );
}

export default App;
