import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

const faqs = [
  {
    question: "¿Necesito saber programar?",
    answer:
      "No. Pack Olmond está diseñado específicamente para profesionales no técnicos. Todo se explica de forma simple y práctica, sin código.",
  },
  {
    question: "¿Sirve si ya uso ChatGPT?",
    answer:
      "Sí, y mucho. La diferencia está en el método estructurado + plantillas listas + asistentes personalizados + flujos de automatización. Vas a sacarle mucho más provecho.",
  },
  {
    question: "¿Cuánto tiempo necesito invertir?",
    answer:
      "Con pocas horas por semana ya ves impacto, porque aplicás lo que aprendés directamente sobre tus tareas reales. No es teoría, es práctica inmediata.",
  },
  {
    question: "¿El 20%–50% de productividad es realista?",
    answer:
      "Es un rango alcanzable cuando lo aplicás en procesos concretos (documentos, presentaciones, comunicación, organización y automatización liviana). Depende de tu punto de partida y constancia.",
  },
  {
    question: "¿Por qué el precio es tan bajo?",
    answer:
      "Porque el objetivo del pack es que pruebes el modelo y lo veas en acción. No es una apuesta grande, es una prueba real con resultados tangibles y con riesgo mínimo.",
  },
];

export const FAQSection = () => {
  return (
    <Box bg="white" py={{ base: 12, md: 20 }}>
      <Container maxW="4xl">
        <VStack spacing={{ base: 8, md: 12 }}>
          {/* Badge superior */}
          <Badge
            bgGradient="linear(to-r, #4318FF, #EC4899)"
            color="white"
            px={4}
            py={2}
            borderRadius="full"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="bold"
            textTransform="none"
          >
            ❓ Preguntas Frecuentes
          </Badge>

          {/* Título */}
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="black"
            color="gray.900"
            textAlign="center"
            lineHeight="shorter"
          >
            Preguntas{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, #667eea, #764ba2)"
              bgClip="text"
            >
              típicas
            </Box>
          </Heading>

          {/* Accordion */}
          <Accordion allowToggle w="full" pt={8}>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} border="none" mb={4}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      bg={isExpanded ? "white" : "white"}
                      _hover={{ bg: "gray.50" }}
                      p={{ base: 5, md: 6 }}
                      borderRadius="xl"
                      border="1px"
                      borderColor="gray.200"
                      boxShadow={isExpanded ? "md" : "sm"}
                      transition="all 0.3s"
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        color="gray.900"
                      >
                        {faq.question}
                      </Box>
                      <AccordionIcon fontSize="24px" color="purple.600" />
                    </AccordionButton>

                    <AccordionPanel
                      pb={6}
                      pt={4}
                      px={{ base: 5, md: 6 }}
                      bg="white"
                      borderRadius="xl"
                      mt={-2}
                      border="1px"
                      borderColor="gray.200"
                      borderTop="none"
                      borderTopRadius={0}
                    >
                      <Text
                        fontSize={{ base: "sm", md: "md" }}
                        color="gray.600"
                        lineHeight="tall"
                      >
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Container>
    </Box>
  );
};
