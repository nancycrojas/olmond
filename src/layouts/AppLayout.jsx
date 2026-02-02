import { Container, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const AppLayout = () => {
  return (
    <Container
      maxW="full"
      bg="#060606"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack maxW="7xl" w="full">
        <Stack as="main" flex="1"></Stack>
        <Header />
        <Outlet />
        <Footer />
      </Stack>
    </Container>
  );
};
