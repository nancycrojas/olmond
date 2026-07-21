/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

import { CTA } from "../components/ui/CTA.jsx";
import { BRAND_GRADIENT, DIAGNOSTICO_URL } from "../lib/constants.js";

const metrics = [
  {
    value: "01",
    label: "Proceso",
  },
  {
    value: "01",
    label: "Métrica",
  },
  {
    value: "01",
    label: "Plazo estimado",
  },
  {
    value: "01",
    label: "Decisión basada en evidencia",
  },
];

const deliverables = [
  {
    number: "01",
    title: "Diagnóstico y línea de base",
    copy: "Proceso, restricción e indicador acordados.",
  },
  {
    number: "02",
    title: "Diseño de la solución",
    copy: "Alcance, accesos, riesgos y criterios de aceptación.",
  },
  {
    number: "03",
    title: "Implementación funcional",
    copy: "Integración y prueba sobre casos reales.",
  },
  {
    number: "04",
    title: "Controles operativos",
    copy: "Excepciones, trazabilidad y supervisión.",
  },
  {
    number: "05",
    title: "Documentación y transferencia",
    copy: "Su equipo queda preparado para operar la solución.",
  },
  {
    number: "06",
    title: "Informe de resultados",
    copy: "Evidencia obtenida y recomendación para el siguiente paso.",
  },
];

const fitConditions = [
  "Es repetitivo y reconocible.",
  "Tiene una persona responsable.",
  "Hay datos disponibles o accesibles.",
  "Supera 50 casos o 20 horas manuales por mes.",
];

function MetricItem({ value, label, isLast }) {
  return (
    <Box>
      <Flex align="center" gap={5}>
        <Text
          flexShrink={0}
          fontSize={{ base: "2xl", md: "28px" }}
          lineHeight="1"
          fontWeight="700"
          letterSpacing="-0.04em"
          color="#B8C2FF"
        >
          {value}
        </Text>

        {!isLast && (
          <Box
            display={{ base: "none", md: "block" }}
            flex="1"
            h="1px"
            bg="whiteAlpha.200"
          />
        )}
      </Flex>

      <Text mt={1.5} fontSize="11px" lineHeight="1.3" color="whiteAlpha.500">
        {label}
      </Text>
    </Box>
  );
}

function DeliverableItem({ number, title, copy }) {
  return (
    <Box
      minH={{ base: "140px", md: "150px" }}
      px={{ base: 6, md: 7 }}
      py={{ base: 6, md: 7 }}
    >
      <Flex align="flex-start" gap={4}>
        <Text
          flexShrink={0}
          pt="2px"
          fontSize="11px"
          fontWeight="700"
          color="#8292FF"
        >
          {number}
        </Text>

        <Box>
          <Heading
            as="h4"
            fontSize={{ base: "sm", md: "15px" }}
            lineHeight="1.4"
            fontWeight="700"
            letterSpacing="-0.015em"
            color="whiteAlpha.900"
          >
            {title}
          </Heading>

          <Text mt={2} fontSize="12px" lineHeight="1.6" color="whiteAlpha.500">
            {copy}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

function FitCondition({ children }) {
  return (
    <HStack spacing={3} align="flex-start">
      <Flex
        mt="1px"
        flexShrink={0}
        w="21px"
        h="21px"
        align="center"
        justify="center"
        borderRadius="full"
        bg="rgba(101, 119, 211, 0.24)"
        color="#AFC0FF"
      >
        <LuCheck size={12} strokeWidth={3} />
      </Flex>

      <Text
        fontSize={{ base: "sm", md: "15px" }}
        lineHeight="1.55"
        color="whiteAlpha.700"
      >
        {children}
      </Text>
    </HStack>
  );
}

export function ImpactSprint() {
  return (
    <Box
      as="section"
      id="impact-sprint"
      position="relative"
      overflow="hidden"
      bg="#151722"
      color="white"
      scrollMarginTop="72px"
    >
      {/* Fondo sutil */}
      <Box
        position="absolute"
        inset={0}
        bgImage="
          radial-gradient(
            circle at 88% 5%,
            rgba(80, 91, 174, 0.10),
            transparent 34%
          ),
          radial-gradient(
            circle at 14% 90%,
            rgba(182, 68, 156, 0.06),
            transparent 34%
          ),
          linear-gradient(
            115deg,
            #171925 0%,
            #141620 55%,
            #12141D 100%
          )
        "
        pointerEvents="none"
      />

      <Container
        maxW="6xl"
        position="relative"
        py={{
          base: 16,
          md: 20,
          lg: 24,
        }}
      >
        {/* Encabezado */}
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "minmax(0, 1.35fr) minmax(320px, 0.65fr)",
          }}
          gap={{
            base: 8,
            lg: 16,
          }}
          alignItems="end"
        >
          <Box>
            <HStack spacing={4}>
              <Box
                w="28px"
                h="2px"
                flexShrink={0}
                borderRadius="full"
                bgImage={BRAND_GRADIENT}
              />

              <Text
                fontSize="xs"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.15em"
                color="whiteAlpha.700"
              >
                Impact Sprint
              </Text>
            </HStack>

            <Heading
              as="h2"
              mt={6}
              maxW="780px"
              fontSize={{
                base: "36px",
                sm: "42px",
                md: "52px",
              }}
              lineHeight={{
                base: "1.08",
                md: "1.02",
              }}
              letterSpacing="-0.052em"
              fontWeight="500"
              color="white"
            >
              Un proceso prioritario. Un indicador definido. Un plazo concreto
              de implementación
            </Heading>
          </Box>

          <Text
            maxW="440px"
            pb={{ lg: 2 }}
            fontSize={{ base: "md", md: "17px" }}
            lineHeight="1.75"
            color="whiteAlpha.700"
          >
            No transformamos toda la empresa de una vez: seleccionamos un
            proceso, construimos una solución operativa y comparamos el
            resultado con la línea de base.
          </Text>
        </Grid>

        {/* Indicadores */}
        <SimpleGrid
          mt={{
            base: 12,
            md: 14,
          }}
          columns={{
            base: 2,
            md: 4,
          }}
          spacing={{
            base: 7,
            md: 5,
          }}
          px={{
            base: 6,
            md: 8,
          }}
          py={{
            base: 6,
            md: 7,
          }}
          bg="rgba(255,255,255,0.025)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          borderRadius="16px"
        >
          {metrics.map((metric, index) => (
            <MetricItem
              key={metric.label}
              {...metric}
              isLast={index === metrics.length - 1}
            />
          ))}
        </SimpleGrid>

        {/* Contenido inferior */}
        <Grid
          mt={{
            base: 14,
            md: 16,
          }}
          templateColumns={{
            base: "1fr",
            lg: "minmax(0, 1.2fr) minmax(360px, 0.8fr)",
          }}
          gap={{
            base: 10,
            lg: 14,
          }}
          alignItems="start"
        >
          {/* Entregables */}
          <Box>
            <Heading
              as="h3"
              fontSize={{
                base: "2xl",
                md: "25px",
              }}
              lineHeight="1.2"
              letterSpacing="-0.035em"
              fontWeight="600"
            >
              Qué recibe su empresa
            </Heading>

            <SimpleGrid
              mt={8}
              columns={{
                base: 1,
                md: 2,
              }}
              spacing={0}
              overflow="hidden"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="16px"
              sx={{
                "& > div": {
                  borderBottom: "1px solid",
                  borderBottomColor: "rgba(255,255,255,0.10)",
                },
                "& > div:nth-of-type(odd)": {
                  borderRight: {
                    base: "none",
                    md: "1px solid rgba(255,255,255,0.10)",
                  },
                },
                "& > div:nth-last-of-type(-n+2)": {
                  borderBottom: {
                    base: "1px solid rgba(255,255,255,0.10)",
                    md: "none",
                  },
                },
                "& > div:last-of-type": {
                  borderBottom: "none",
                },
              }}
            >
              {deliverables.map((item) => (
                <DeliverableItem key={item.number} {...item} />
              ))}
            </SimpleGrid>
          </Box>

          {/* Encaje mínimo */}
          <Box
            p={{
              base: 7,
              md: 9,
            }}
            bg="rgba(255,255,255,0.055)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="18px"
            boxShadow="0 24px 60px rgba(0,0,0,0.16)"
          >
            <Text
              fontSize="11px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color="#AFBAFF"
            >
              Viabilidad mínima
            </Text>

            <Heading
              as="h3"
              mt={6}
              maxW="430px"
              fontSize={{
                base: "2xl",
                md: "27px",
              }}
              lineHeight="1.35"
              letterSpacing="-0.035em"
              fontWeight="600"
            >
              El Sprint funciona cuando el proceso ya existe.
            </Heading>

            <Stack mt={8} spacing={4}>
              {fitConditions.map((condition) => (
                <FitCondition key={condition}>{condition}</FitCondition>
              ))}
            </Stack>

            {/* Advertencia */}
            <Box
              mt={8}
              px={5}
              py={5}
              bg="rgba(255,255,255,0.045)"
              borderLeft="3px solid"
              borderColor="#D753AA"
            >
              <Text fontSize="12px" fontWeight="700" color="whiteAlpha.800">
                No es adecuado para
              </Text>

              <Text
                mt={2}
                fontSize="12px"
                lineHeight="1.6"
                color="whiteAlpha.500"
              >
                Problemas indefinidos, procesos sin responsable, ausencia de
                datos o transformaciones simultáneas de varias áreas.
              </Text>
            </Box>

            <CTA
              as="a"
              href={DIAGNOSTICO_URL}
              target="_blank"
              rel="noopener noreferrer"
              w="full"
              mt={8}
              px={{ base: 5, md: 7 }}
              whiteSpace="normal"
              textAlign="center"
            >
              Solicitar evaluación de viabilidad
            </CTA>

            <Text
              mt={4}
              textAlign="center"
              fontSize="10px"
              lineHeight="1.5"
              color="whiteAlpha.400"
            >
              Si el proceso cumple las condiciones, podrá agendar una
              conversación.
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
