/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../lib/constants.js";

const criteria = [
  {
    number: "01",
    title: "Línea de base",
    copy: "El estado inicial queda registrado antes de intervenir.",
  },
  {
    number: "02",
    title: "Muestra suficiente",
    copy: "Medimos sobre un volumen suficiente para comparar.",
  },
  {
    number: "03",
    title: "Validación operativa",
    copy: "El equipo confirma que la solución funciona en el trabajo real.",
  },
  {
    number: "04",
    title: "Confirmación escrita",
    copy: "El criterio y el resultado quedan documentados.",
  },
];

function CriterionItem({ number, title, copy, isLast }) {
  return (
    <Flex
      role="group"
      position="relative"
      gap={{
        base: 5,
        md: 7,
      }}
      align="flex-start"
      minH={{
        base: "132px",
        md: "145px",
      }}
    >
      {/* Número y línea vertical */}
      <Flex
        position="relative"
        flexShrink={0}
        alignSelf="stretch"
        w={{
          base: "58px",
          md: "72px",
        }}
        justify="center"
      >
        {!isLast && (
          <Box
            position="absolute"
            zIndex={0}
            top={{
              base: "57px",
              md: "69px",
            }}
            bottom="-1px"
            left="50%"
            w="1px"
            bg="#DCE3EB"
            transform="translateX(-50%)"
          />
        )}

        <Flex
          position="relative"
          zIndex={1}
          w={{
            base: "58px",
            md: "70px",
          }}
          h={{
            base: "58px",
            md: "70px",
          }}
          align="center"
          justify="center"
          borderRadius="full"
          bg="white"
          border="1px solid"
          borderColor="#DCE3EB"
          boxShadow="0 2px 7px rgba(25, 35, 60, 0.03)"
          transition="all 0.25s ease"
          _groupHover={{
            bgImage: BRAND_GRADIENT,
            borderColor: "transparent",
            boxShadow: "0 10px 26px rgba(103, 84, 200, 0.28)",
            transform: "scale(1.04)",
          }}
        >
          <Text
            fontSize={{
              base: "11px",
              md: "12px",
            }}
            fontWeight="700"
            color="purple.600"
            transition="color 0.25s ease"
            _groupHover={{
              color: "white",
            }}
          >
            {number}
          </Text>
        </Flex>
      </Flex>

      {/* Contenido */}
      <Box pt={{ base: 1, md: 2 }}>
        <Heading
          as="h3"
          fontSize={{
            base: "xl",
            md: "23px",
          }}
          lineHeight="1.25"
          letterSpacing="-0.03em"
          fontWeight="600"
          color="#151722"
        >
          {title}
        </Heading>

        <Text
          mt={{
            base: 2,
            md: 3,
          }}
          maxW="620px"
          fontSize={{
            base: "md",
            md: "18px",
          }}
          lineHeight="1.65"
          color="gray.600"
        >
          {copy}
        </Text>
      </Box>
    </Flex>
  );
}

export const Measurement = () => {
  return (
    <Box
      as="section"
      id="como-medimos"
      position="relative"
      bg="white"
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
            lg: "minmax(0, 0.9fr) minmax(520px, 1.1fr)",
          }}
          gap={{
            base: 14,
            lg: 20,
          }}
          alignItems="start"
        >
          {/* Columna izquierda */}
          <Box>
            <HStack spacing={4}>
              <Box
                w="38px"
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
                Cómo medimos
              </Text>
            </HStack>

            <Heading
              as="h2"
              mt={{
                base: 7,
                md: 8,
              }}
              maxW="600px"
              fontSize={{
                base: "36px",
                sm: "42px",
                md: "52px",
              }}
              lineHeight="1.04"
              letterSpacing="-0.052em"
              fontWeight="500"
              color="#171923"
            >
              La evidencia guía cada decisión
            </Heading>

            <Text
              mt={{
                base: 7,
                md: 9,
              }}
              maxW="610px"
              fontSize={{
                base: "lg",
                md: "22px",
              }}
              lineHeight="1.75"
              color="gray.600"
            >
              Solo comunicamos resultados que pueden reconstruirse y
              verificarse.
            </Text>
          </Box>

          {/* Línea de criterios */}
          <Stack spacing={0}>
            {criteria.map((criterion, index) => (
              <CriterionItem
                key={criterion.number}
                {...criterion}
                isLast={index === criteria.length - 1}
              />
            ))}
          </Stack>
        </Grid>

        {/* Aviso inferior */}
        <Flex
          mt={{
            base: 12,
            md: 16,
            lg: 18,
          }}
          minH={{
            base: "88px",
            md: "92px",
          }}
          px={{
            base: 5,
            md: 7,
          }}
          py={{
            base: 5,
            md: 6,
          }}
          gap={{
            base: 4,
            md: 5,
          }}
          align="center"
          bg="#F5F8FB"
          border="1px solid"
          borderColor="#DEE5EC"
          borderRadius="16px"
        >
          <Flex
            flexShrink={0}
            w="28px"
            h="28px"
            align="center"
            justify="center"
            borderRadius="full"
            bg="rgba(101, 121, 255, 0.10)"
          >
            <Box
              w="10px"
              h="10px"
              borderRadius="full"
              bg="#6D7FFF"
              boxShadow="0 0 10px rgba(109, 127, 255, 0.4)"
            />
          </Flex>

          <Text
            fontSize={{
              base: "sm",
              md: "17px",
            }}
            lineHeight="1.65"
            color="gray.600"
          >
            Los primeros casos están en etapa de implementación y medición. Los
            resultados se publicarán cuando cumplan los criterios de evidencia
            establecidos.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
