/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { OptionCard, QuestionHeader } from "../EvaluationUI.jsx";

export function ResponsibilityStep({ answers, updateAnswer }) {
  return (
    <Stack spacing={8}>
      <QuestionHeader
        eyebrow="La responsabilidad"
        title="¿Hay una persona responsable del proceso?"
        description="Necesitamos una persona que conozca la operación y pueda validar los cambios."
      />

      <FormControl isRequired>
        <FormLabel fontSize="md" fontWeight="700" color="#202330">
          Seleccione una opción
        </FormLabel>

        <RadioGroup
          value={answers.responsible}
          onChange={(value) => updateAnswer("responsible", value)}
        >
          <Stack spacing={3}>
            <OptionCard
              value="yes"
              selectedValue={answers.responsible}
              title="Sí, está identificada"
              description="Puede participar del relevamiento y la validación."
            >
              <Radio value="yes" colorScheme="purple" size="lg" />
            </OptionCard>

            <OptionCard
              value="no"
              selectedValue={answers.responsible}
              title="No, todavía no"
              description="La responsabilidad está distribuida o no está definida."
            >
              <Radio value="no" colorScheme="purple" size="lg" />
            </OptionCard>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
