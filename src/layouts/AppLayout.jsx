import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { EvaluationModalProvider } from "../context/EvaluationModalContext.jsx";

export const AppLayout = () => {
  return (
    <EvaluationModalProvider>
      <Flex flexDirection="column" minHeight="100vh">
        <Header />

        <Box as="main" flex="1">
          <Outlet />
        </Box>

        <Footer />
      </Flex>
    </EvaluationModalProvider>
  );
};
