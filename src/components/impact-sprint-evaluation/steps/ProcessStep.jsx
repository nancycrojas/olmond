/* eslint-disable react/prop-types */
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

import { QuestionHeader } from "../EvaluationUI.jsx";

export function ProcessStep({ answers, updateAnswer }) {
  return (
    <Stack spacing={8}>
      <QuestionHeader
        eyebrow="El proceso"
        title="¿Qué proceso quiere evaluar?"
        description="Describa una operación concreta que hoy consuma tiempo, genere errores o limite el crecimiento. No incluya nombres, correos ni información confidencial."
      />

      <FormControl isRequired>
        <FormLabel htmlFor="evaluation-process" fontSize="md" fontWeight="700">
          Proceso a evaluar
        </FormLabel>

        <Input
          id="evaluation-process"
          value={answers.process}
          onChange={(event) => updateAnswer("process", event.target.value)}
          placeholder="Ej.: conciliación de pagos y facturas"
          h="76px"
          px={5}
          fontSize={{ base: "md", md: "20px" }}
          borderRadius="14px"
          borderColor="#CBD5E0"
          _focusVisible={{
            borderColor: "#6679FF",
            boxShadow: "0 0 0 5px rgba(102,121,255,0.12)",
          }}
        />
      </FormControl>
    </Stack>
  );
}
