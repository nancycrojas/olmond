/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

const faqs = [
  {
    question: "¿Necesito conocimientos técnicos?",
    answer:
      "No. Vos conocés tu negocio y nosotros lo traducimos a lo técnico, sin jerga.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende del alcance. Antes de empezar te enviamos una propuesta por escrito con alcance y plazos.",
  },
  {
    question: "¿Cuánto tiempo requiere de mi equipo?",
    answer:
      "Una persona responsable participa en el diagnóstico, las validaciones y las pruebas. La dedicación se acuerda antes de arrancar.",
  },
  {
    question: "¿Qué pasa con mis datos?",
    answer:
      "Definimos qué datos se usan, dónde quedan y quién accede, antes de tocar nada.",
  },
  {
    question: "¿Y si mi proceso no califica?",
    answer:
      "Te lo decimos y te sugerimos qué ordenar primero. No te proponemos algo que no va a funcionar.",
  },
];

export const GeneralFAQ = () => {
  return (
    <Box
      as="section"
      id="preguntas-frecuentes"
      position="relative"
      bg="white"
      color="#171827"
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
            lg: "0.8fr 1.2fr",
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
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
              }}
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="purple.600"
            >
              Preguntas frecuentes
            </Text>

            <Heading
              as="h2"
              mt={{
                base: 6,
                md: 7,
              }}
              maxW="520px"
              fontSize={{
                base: "40px",
                sm: "48px",
                md: "56px",
                lg: "60px",
              }}
              lineHeight="1.05"
              letterSpacing="-0.05em"
              fontWeight="500"
              color="#171827"
            >
              Lo que suelen preguntarnos antes de empezar.
            </Heading>
          </Box>

          {/* Acordeón */}
          <Accordion allowToggle borderTop="1px solid" borderColor="#E1E3EC">
            {faqs.map(({ question, answer }) => (
              <AccordionItem
                key={question}
                border="none"
                borderBottom="1px solid"
                borderColor="#E1E3EC"
              >
                {({ isExpanded }) => (
                  <>
                    <h3>
                      <AccordionButton
                        px={0}
                        py={{
                          base: 6,
                          md: 7,
                        }}
                        minH={{
                          base: "82px",
                          md: "94px",
                        }}
                        gap={5}
                        textAlign="left"
                        bg="transparent"
                        _hover={{
                          bg: "transparent",
                        }}
                        _focusVisible={{
                          boxShadow: "none",
                        }}
                      >
                        <Text
                          flex="1"
                          fontSize={{
                            base: "20px",
                            md: "23px",
                          }}
                          lineHeight="1.35"
                          letterSpacing="-0.025em"
                          fontWeight="600"
                          color="#171827"
                        >
                          {question}
                        </Text>

                        <FlexIcon isExpanded={isExpanded} />
                      </AccordionButton>
                    </h3>

                    <AccordionPanel
                      px={0}
                      pt={0}
                      pb={{
                        base: 6,
                        md: 7,
                      }}
                      pr={{
                        base: 8,
                        md: 14,
                      }}
                    >
                      <Text
                        maxW="720px"
                        fontSize={{
                          base: "16px",
                          md: "18px",
                        }}
                        lineHeight="1.7"
                        color="#666A86"
                      >
                        {answer}
                      </Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Grid>
      </Container>
    </Box>
  );
};

function FlexIcon({ isExpanded }) {
  return (
    <Box
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="32px"
      h="32px"
      color="purple.600"
      transition="transform 0.2s ease"
    >
      {isExpanded ? (
        <LuMinus size={20} strokeWidth={1.7} />
      ) : (
        <LuPlus size={20} strokeWidth={1.7} />
      )}
    </Box>
  );
}
