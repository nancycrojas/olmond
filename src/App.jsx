import { Container, Stack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Home } from "@/components/Home";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFoundLayout } from "@/layouts/NotFoundLayout";
import { NotFound } from "@/pages/NotFound";

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
