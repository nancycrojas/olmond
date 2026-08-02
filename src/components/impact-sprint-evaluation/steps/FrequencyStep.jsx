/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Stack,
} from "@chakra-ui/react";

import { QuestionHeader } from "../EvaluationUI.jsx";

export function FrequencyStep({ answers, updateAnswer }) {
  return (
    <Stack spacing={8}>
      <QuestionHeader
        eyebrow="La frecuencia"
        title="¿Cuántas veces por mes se ejecuta?"
        description="Use una estimación conservadora. Luego podrá validarse contra datos reales."
      />

      <FormControl isRequired>
        <FormLabel
          htmlFor="evaluation-frequency"
          fontSize="md"
          fontWeight="700"
          color="#202330"
        >
          Ejecuciones mensuales aproximadas
        </FormLabel>

        <NumberInput
          min={1}
          value={answers.frequency}
          onChange={(valueString) => updateAnswer("frequency", valueString)}
        >
          <NumberInputField
            id="evaluation-frequency"
            h="76px"
            px={5}
            fontSize={{ base: "md", md: "lg" }}
            placeholder="Ej.: 80"
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
      </FormControl>
    </Stack>
  );
}
