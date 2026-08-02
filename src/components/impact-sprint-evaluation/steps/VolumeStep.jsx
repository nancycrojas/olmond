/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";

import { QuestionHeader } from "../EvaluationUI.jsx";

function VolumeField({ id, label, value, placeholder, helperText, onChange }) {
  return (
    <Box
      p={{
        base: 5,
        md: 6,
      }}
      bg="#F7FAFC"
      border="1px solid"
      borderColor="#DCE3EA"
      borderRadius="16px"
    >
      <FormControl>
        <FormLabel htmlFor={id} fontSize="md" fontWeight="700" color="#202330">
          {label}
        </FormLabel>

        <NumberInput
          min={0}
          value={value}
          onChange={(valueString) => onChange(valueString)}
        >
          <NumberInputField
            id={id}
            h="74px"
            px={5}
            fontSize={{ base: "md", md: "lg" }}
            placeholder={placeholder}
            bg="white"
            borderRadius="14px"
            borderColor="#CBD5E0"
            _hover={{
              borderColor: "#AEB8C5",
            }}
            _focusVisible={{
              borderColor: "#6679FF",
              boxShadow: "0 0 0 5px rgba(102, 121, 255, 0.12)",
            }}
          />
        </NumberInput>

        <Text mt={3} fontSize="sm" lineHeight="1.6" color="gray.500">
          {helperText}
        </Text>
      </FormControl>
    </Box>
  );
}

export function VolumeStep({ answers, updateAnswer }) {
  return (
    <Stack spacing={8}>
      <QuestionHeader
        eyebrow="El volumen"
        title="¿Qué carga mensual representa?"
        description="Complete uno o ambos campos. El umbral de encaje es 50 casos o 20 horas manuales por mes."
      />

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
        }}
        gap={4}
      >
        <VolumeField
          id="monthly-cases"
          label="Casos por mes"
          value={answers.monthlyCases}
          placeholder="Ej.: 80"
          helperText="Pedidos, consultas, facturas, reportes u otra unidad repetida."
          onChange={(value) => updateAnswer("monthlyCases", value)}
        />

        <VolumeField
          id="monthly-hours"
          label="Horas manuales por mes"
          value={answers.monthlyHours}
          placeholder="Ej.: 24"
          helperText="Tiempo total aproximado que el equipo dedica al proceso."
          onChange={(value) => updateAnswer("monthlyHours", value)}
        />
      </Grid>
    </Stack>
  );
}
