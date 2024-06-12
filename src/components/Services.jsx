import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Services = () => {
  return (
    <Container maxW="1400px">
      <Stack color="white" alignItems="center" justifyContent="center" my={20}>
        <div data-aos="fade-up" data-aos-duration="1000">
          <Heading as="h3" size="2xl" textAlign="center" mb={20}>
            Nuestros Servicios
          </Heading>
        </div>
        <HStack
          alignItems="center"
          justifyContent="center"
          gap={6}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <div data-aos="fade-right" data-aos-duration="1000">
            <Box
              color="#FFFFFF"
              border="1px solid #FFFFFF"
              padding={8}
              w="320px"
              h="400px"
              borderRadius={8}
            >
              <Heading size="lg" mb={8}>
                Automatización Robótica de Procesos (RPA)
              </Heading>
              <Text mb={8}>
                View a summary of all your customers over the last month.
              </Text>
              <Button as={Link} to="/rpa">
                Más info
              </Button>
            </Box>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000">
            <Box
              color="#FFFFFF"
              border="1px solid #FFFFFF"
              padding={8}
              w="320px"
              h="400px"
              borderRadius={8}
            >
              <Heading size="lg" mb={8}>
                Chatbots de IA
              </Heading>
              <Text mb={8}>
                View a summary of all your customers over the last month.
              </Text>
              <Button as={Link} to="/chat-bot">
                Más info
              </Button>
            </Box>
          </div>
          <div data-aos="fade-left" data-aos-duration="1000">
            <Box
              color="#FFFFFF"
              border="1px solid #FFFFFF"
              padding={8}
              w="320px"
              h="400px"
              borderRadius={8}
            >
              <Heading size="lg" mb={8}>
                Data Analytics
              </Heading>
              <Text mb={8}>
                View a summary of all your customers over the last month.
              </Text>
              <Button as={Link} to="/data-analyst">
                Más info
              </Button>
            </Box>
          </div>
        </HStack>
      </Stack>
    </Container>
  );
};
