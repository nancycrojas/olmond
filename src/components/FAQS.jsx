/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

import { BRAND_GRADIENT } from "../lib/constants.js";

const faqs = [
  {
    question: "¿Qué es exactamente Impact Sprint?",
    answer:
      "Una intervención con una duración concreta sobre un proceso prioritario. Definimos una métrica, implementamos una solución acotada y comparamos el resultado con la línea de base.",
  },
  {
    question: "¿Cómo sé si mi empresa encaja?",
    answer:
      "Complete la evaluación de doce preguntas. Si el proceso es repetitivo, tiene una persona responsable, datos accesibles y volumen suficiente, podrá agendar una conversación.",
  },
  {
    question: "¿Qué recibe mi equipo al terminar?",
    answer:
      "Una solución funcional, controles operativos, documentación, un equipo preparado para operar y un informe con resultados y próximos pasos.",
  },
  {
    question: "¿Cuánto tiempo requiere de nuestro equipo?",
    answer:
      "Una persona responsable participa en el diagnóstico, las validaciones y las pruebas. La dedicación se acuerda antes de comenzar según la complejidad del proceso.",
  },
  {
    question: "¿Se garantiza un resultado económico?",
    answer:
      "No. Antes de comenzar, acordamos una métrica operativa y registramos la línea de base. El resultado se compara con evidencia.",
  },
  {
    question: "¿Qué pasa después de la implementación?",
    answer:
      "Con la evidencia, definimos si conviene ajustar, escalar o cerrar la iniciativa. El siguiente paso queda documentado; no hay continuidad automática.",
  },
];

function FAQIcon({ isOpen }) {
  return (
    <Flex
      flexShrink={0}
      w="30px"
      h="30px"
      align="center"
      justify="center"
      borderRadius="full"
      bg="#F1F0FC"
      color="#7557C4"
      transition="all 0.2s ease"
    >
      {isOpen ? (
        <LuMinus size={16} strokeWidth={1.8} />
      ) : (
        <LuPlus size={16} strokeWidth={1.8} />
      )}
    </Flex>
  );
}

export const FAQS = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Box
      as="section"
      id="preguntas-frecuentes"
      position="relative"
      bg="#F4F7FA"
      color="#151722"
      scrollMarginTop="72px"
    >
      <Container
        maxW="6xl"
        py={{
          base: 16,
          md: 20,
          lg: 24,
        }}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "minmax(320px, 0.78fr) minmax(0, 1.22fr)",
          }}
          gap={{
            base: 12,
            lg: 20,
          }}
          alignItems="start"
        >
          {/* Columna izquierda */}
          <Box
            position={{
              base: "static",
              lg: "sticky",
            }}
            top={{
              lg: "120px",
            }}
          >
            <HStack spacing={4}>
              <Box
                w="36px"
                h="2px"
                flexShrink={0}
                borderRadius="full"
                bgImage={BRAND_GRADIENT}
              />

              <Text
                fontSize={{
                  base: "xs",
                  md: "sm",
                }}
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.16em"
                color="purple.600"
              >
                Preguntas frecuentes
              </Text>
            </HStack>

            <Heading
              as="h2"
              mt={{
                base: 7,
                md: 8,
              }}
              maxW="520px"
              fontSize={{
                base: "36px",
                sm: "42px",
                md: "52px",
              }}
              lineHeight="1.05"
              letterSpacing="-0.052em"
              fontWeight="500"
              color="#171923"
            >
              Lo necesario antes de decidir
            </Heading>

            <Text
              mt={{
                base: 7,
                md: 9,
              }}
              maxW="500px"
              fontSize={{
                base: "lg",
                md: "21px",
              }}
              lineHeight="1.75"
              color="gray.600"
            >
              Alcance y condiciones claras. Un siguiente paso sin fricción.
            </Text>
          </Box>

          {/* Preguntas */}
          <Accordion
            index={openIndex}
            onChange={(index) => setOpenIndex(index)}
            allowToggle
          >
            <Stack spacing={3}>
              {faqs.map(({ question, answer }, index) => {
                const isOpen = openIndex === index;

                return (
                  <AccordionItem
                    key={question}
                    overflow="hidden"
                    bg="white"
                    border="1px solid"
                    borderColor={
                      isOpen ? "rgba(104, 112, 255, 0.34)" : "#DCE3EA"
                    }
                    borderRadius="16px"
                    boxShadow={
                      isOpen ? "0 5px 14px rgba(39, 48, 80, 0.06)" : "none"
                    }
                    transition="border-color 0.2s ease, box-shadow 0.2s ease"
                  >
                    <h3>
                      <AccordionButton
                        minH={{
                          base: "78px",
                          md: "80px",
                        }}
                        px={{
                          base: 5,
                          md: 7,
                        }}
                        py={{
                          base: 5,
                          md: 6,
                        }}
                        gap={5}
                        bg="white"
                        textAlign="left"
                        _hover={{
                          bg: "white",
                        }}
                        _focusVisible={{
                          boxShadow:
                            "inset 0 0 0 2px rgba(102, 126, 234, 0.35)",
                        }}
                      >
                        <Text
                          flex="1"
                          fontFamily="heading"
                          fontSize={{
                            base: "md",
                            md: "16px",
                          }}
                          lineHeight="1.4"
                          letterSpacing="-0.025em"
                          fontWeight="600"
                          color="#151722"
                        >
                          {question}
                        </Text>

                        <FAQIcon isOpen={isOpen} />
                      </AccordionButton>
                    </h3>

                    <AccordionPanel
                      px={{
                        base: 5,
                        md: 7,
                      }}
                      pt={0}
                      pb={{
                        base: 6,
                        md: 7,
                      }}
                    >
                      <Text
                        maxW="760px"
                        fontSize={{
                          base: "md",
                          md: "14px",
                        }}
                        lineHeight="1.75"
                        color="gray.600"
                      >
                        {answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Stack>
          </Accordion>
        </Grid>
      </Container>
    </Box>
  );
};
