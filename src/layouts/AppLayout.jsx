import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const AppLayout = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box as="main" flex="1">
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </Flex>
  );
};
