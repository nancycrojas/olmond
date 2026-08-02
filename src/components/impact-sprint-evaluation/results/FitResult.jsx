/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuCalendar, LuCheck } from "react-icons/lu";

import { AGENDA_URL, BRAND_GRADIENT } from "../../../lib/constants.js";
import { ConditionCard } from "../EvaluationUI.jsx";

export function FitResult({ conditions, onReview, onClose }) {
  const { responsibleIdentified, dataAccessible, volumeSufficient } =
    conditions;

  return (
    <Stack align="center" textAlign="center" spacing={0} w="full">
      {/* Ícono de resultado */}
      <Flex
        w={{
          base: "76px",
          md: "86px",
        }}
        h={{
          base: "76px",
          md: "86px",
        }}
        align="center"
        justify="center"
        borderRadius="full"
        bgImage={BRAND_GRADIENT}
        color="white"
        boxShadow="0 18px 38px rgba(92, 76, 190, 0.25)"
      >
        <LuCheck size={42} strokeWidth={2.2} aria-hidden="true" />
      </Flex>

      {/* Resultado */}
      <Heading
        as="h3"
        mt={8}
        maxW="780px"
        fontSize={{
          base: "28px",
          md: "38px",
        }}
        lineHeight="1.15"
        letterSpacing="-0.045em"
        fontWeight="500"
        color="#171923"
      >
        El proceso podría encajar en un Impact Sprint.
      </Heading>

      <Text
        mt={4}
        maxW="760px"
        fontSize={{
          base: "md",
          md: "18px",
        }}
        lineHeight="1.7"
        color="gray.600"
      >
        Reúne las condiciones mínimas para avanzar. El siguiente paso es una
        reunión breve para validar el alcance, los accesos necesarios y la
        métrica de resultado.
      </Text>

      {/* Condiciones evaluadas */}
      <SimpleGrid
        mt={8}
        columns={{
          base: 1,
          md: 3,
        }}
        spacing={3}
        w="full"
      >
        <ConditionCard valid={responsibleIdentified}>
          Responsable identificado
        </ConditionCard>

        <ConditionCard valid={dataAccessible}>Datos accesibles</ConditionCard>

        <ConditionCard valid={volumeSufficient}>
          Volumen suficiente
        </ConditionCard>
      </SimpleGrid>

      {/* Agenda */}
      <Flex
        mt={8}
        w="full"
        p={{
          base: 5,
          md: 6,
        }}
        align={{
          base: "stretch",
          md: "center",
        }}
        justify="space-between"
        direction={{
          base: "column",
          md: "row",
        }}
        gap={5}
        textAlign="left"
        bg="#F7F7FF"
        border="1px solid"
        borderColor="#CFD4FF"
        borderRadius="16px"
      >
        <Box>
          <Text
            fontSize={{
              base: "md",
              md: "lg",
            }}
            fontWeight="700"
            color="#202330"
          >
            Agenda habilitada
          </Text>

          <Text
            mt={1}
            maxW="480px"
            fontSize="sm"
            lineHeight="1.6"
            color="gray.500"
          >
            Seleccioná el horario que mejor se adapte a tu agenda para revisar
            el proceso.
          </Text>
        </Box>

        <Button
          as="a"
          href={AGENDA_URL}
          target="_blank"
          rel="noopener noreferrer"
          leftIcon={<LuCalendar />}
          flexShrink={0}
          minW={{
            md: "230px",
          }}
          h="56px"
          px={7}
          borderRadius="full"
          bgImage={BRAND_GRADIENT}
          color="white"
          fontWeight="700"
          transition="all 0.2s ease"
          _hover={{
            opacity: 0.92,
            transform: "translateY(-2px)",
            boxShadow: "lg",
            textDecoration: "none",
          }}
          _active={{
            opacity: 0.86,
            transform: "translateY(0)",
          }}
        >
          Agendar una reunión
        </Button>
      </Flex>

      {/* Acciones */}
      <HStack
        mt={8}
        spacing={3}
        w={{
          base: "full",
          sm: "auto",
        }}
        flexDirection={{
          base: "column",
          sm: "row",
        }}
      >
        <Button
          type="button"
          variant="outline"
          w={{
            base: "full",
            sm: "auto",
          }}
          h="54px"
          px={7}
          borderRadius="full"
          borderColor="#CBD5E0"
          color="#343746"
          fontWeight="700"
          onClick={onReview}
          _hover={{
            bg: "gray.50",
            borderColor: "gray.400",
          }}
        >
          Revisar respuestas
        </Button>

        <Button
          type="button"
          w={{
            base: "full",
            sm: "auto",
          }}
          h="54px"
          px={7}
          borderRadius="full"
          bg="#5E45B5"
          color="white"
          fontWeight="700"
          onClick={onClose}
          _hover={{
            bg: "#513BA4",
          }}
        >
          Cerrar
        </Button>
      </HStack>
    </Stack>
  );
}
