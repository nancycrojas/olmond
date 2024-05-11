import { Container } from "@chakra-ui/react";

import { Header } from "@/components/Header";
import { Home } from "@/components/Home";

function App() {
  return (
    <Container maxW="full" bg="#060606">
      <Header />
      <Home />
    </Container>
  );
}

export default App;
