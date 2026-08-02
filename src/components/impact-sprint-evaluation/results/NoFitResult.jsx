/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GoAlert } from "react-icons/go";

import { ConditionCard } from "../EvaluationUI.jsx";

export function NoFitResult({ conditions, onReview, onClose }) {
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
        bg="#FFF4E5"
        color="#DD7A16"
        border="1px solid"
        borderColor="#F5D4A8"
        boxShadow="0 18px 38px rgba(190, 115, 34, 0.12)"
      >
        <GoAlert size={38} strokeWidth={1.9} aria-hidden="true" />
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
        El proceso todavía no reúne las condiciones mínimas.
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
        Antes de iniciar un Impact Sprint conviene trabajar sobre las
        condiciones que faltan. Podés revisar tus respuestas y volver a evaluar
        el proceso.
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

      {/* Orientación */}
      <Flex
        mt={8}
        w="full"
        px={{
          base: 5,
          md: 6,
        }}
        py={{
          base: 5,
          md: 6,
        }}
        textAlign="left"
        bg="#FFF9F0"
        border="1px solid"
        borderColor="#F1D8B5"
        borderRadius="16px"
      >
        <Text
          fontSize={{
            base: "sm",
            md: "md",
          }}
          lineHeight="1.7"
          color="gray.700"
        >
          El encaje puede mejorar al definir una persona responsable, reunir
          registros suficientes o seleccionar un proceso con mayor volumen y
          repetición.
        </Text>
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
