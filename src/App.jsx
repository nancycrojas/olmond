import { Container } from "@chakra-ui/react";

import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { Home } from "@/components/Home";
import Services from "@/components/Services";
import Team from "@/components/Team";

import background from "./assets/background.jpg";

function App() {
  return (
    <Container
      maxW="full"
      bg="#060606"
      bgImage={`url(${background})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Header />
      <Home />
      <About />
      <Services />
      <Team />
      <ContactForm />
      <Footer />
    </Container>
  );
}

export default App;
