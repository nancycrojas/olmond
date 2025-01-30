import { Container, Stack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Home } from "@/components/Home";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundLayout } from "@/layouts/NotFoundLayout";
import { AboutUs } from "@/pages/AboutUs";
import { ChatBot } from "@/pages/ChatBot";
import { DataAnalytics } from "@/pages/DataAnalytics";
import { NotFound } from "@/pages/NotFound";
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
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/rpa" element={<Rpa />} />
            <Route path="/ai-agents" element={<ChatBot />} />
            <Route path="/data-analytics" element={<DataAnalytics />} />
          </Route>
          <Route element={<NotFoundLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Stack>
    </Container>
  );
}

export default App;
