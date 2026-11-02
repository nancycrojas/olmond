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
  Link,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const faqs = [
  {
    id: "faq-empezar",
    question:
      "¿Por dónde empiezo si todavía no sé cómo aplicar IA en mi empresa?",
    answer:
      "Te ayudamos a identificar qué conviene mejorar y qué necesitás para avanzar: una consultoría para definir prioridades, una capacitación para preparar a tu equipo o un desarrollo para resolver un proceso concreto. Podés empezar con nuestro diagnóstico gratuito para tener una primera orientación.",
    guide: { href: "/guias/como-empezar-con-ia.html", label: "Cómo elegir el primer proyecto" },
  },
  {
    id: "faq-conocimientos",
    question: "¿Necesito conocimientos técnicos?",
    answer:
      "No. Vos y tu equipo conocen el negocio; nosotros aportamos el conocimiento técnico y te explicamos las opciones con claridad. Las capacitaciones y las soluciones se adaptan a las tareas reales de quienes van a usarlas.",
  },
  {
    id: "faq-costos",
    question: "¿Cuánto cuesta trabajar con Olmond?",
    answer:
      "La inversión depende del servicio, el alcance y la complejidad del trabajo. Antes de empezar, recibís una propuesta por escrito con el precio, los entregables y los plazos, para que sepas qué estás contratando y puedas decidir con información clara.",
    guide: { href: "/guias/cuanto-cuesta-implementar-ia.html", label: "Qué tener en cuenta al evaluar costos" },
  },
  {
    id: "faq-dedicacion",
    question: "¿Cuánto tiempo tiene que dedicar mi equipo?",
    answer:
      "La participación depende del servicio. En una implementación, necesitamos una persona de referencia que conozca el proceso y participe en las validaciones y pruebas. Acordamos la dedicación y los momentos de trabajo antes de empezar.",
  },
  {
    id: "faq-herramientas",
    question: "¿Pueden trabajar con las herramientas que ya usamos?",
    answer:
      "Buscamos aprovechar las herramientas que ya usa tu equipo. Antes de definir el desarrollo, revisamos qué sistemas pueden conectarse con la solución y qué ajustes harían falta. Las posibilidades dependen de cada herramienta y de lo que necesite el proyecto.",
    guide: { href: "/guias/automatizar-tareas-repetitivas.html", label: "Cómo empezar a automatizar tareas" },
  },
];

export const GeneralFAQ = () => {
  const { hash } = useLocation();
  const [expanded, setExpanded] = useState(-1);

  useEffect(() => {
    const index = faqs.findIndex(faq => `#${faq.id}` === hash);
    if (index === -1) return;
    setExpanded(index);
    const frame = requestAnimationFrame(() => {
      const question = document.getElementById(faqs[index].id);
      question?.scrollIntoView({ block: "start" });
      question?.querySelector("button")?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

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
              mx={{ base: "auto", lg: 0 }}
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
          <Accordion allowToggle index={expanded} onChange={setExpanded} borderTop="1px solid" borderColor="#E1E3EC">
            {faqs.map(({ id, question, answer, guide }) => (
              <AccordionItem
                key={id}
                id={id}
                border="none"
                borderBottom="1px solid"
                borderColor="#E1E3EC"
              >
                {({ isExpanded }) => (
                  <>
                    <Box as="h3" id={id} scrollMarginTop={{ base: "100px", lg: "128px" }}>
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
                          outline: "2px solid #805AD5",
                          outlineOffset: "4px",
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
                    </Box>

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
                        {guide && (
                          <>
                            {" "}<Link href={guide.href} color="purple.600" textDecoration="underline">
                              {guide.label}
                            </Link>.
                          </>
                        )}
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
