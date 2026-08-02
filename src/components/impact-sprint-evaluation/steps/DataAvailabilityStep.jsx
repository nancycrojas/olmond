/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { OptionCard, QuestionHeader } from "../EvaluationUI.jsx";

export function DataAvailabilityStep({ answers, updateAnswer }) {
  return (
    <Stack spacing={8}>
      <QuestionHeader
        eyebrow="Los datos"
        title="¿Los datos del proceso están disponibles?"
        description="Pueden estar en una planilla, correo o sistema. Lo importante es que sean accesibles."
      />

      <FormControl isRequired>
        <FormLabel fontSize="md" fontWeight="700" color="#202330">
          Seleccione una opción
        </FormLabel>

        <RadioGroup
          value={answers.dataAvailability}
          onChange={(value) => updateAnswer("dataAvailability", value)}
        >
          <Stack spacing={3}>
            <OptionCard
              value="yes"
              selectedValue={answers.dataAvailability}
              title="Sí, están disponibles"
              description="Podemos acceder a registros o casos anteriores."
            >
              <Radio value="yes" colorScheme="purple" size="lg" />
            </OptionCard>

            <OptionCard
              value="partial"
              selectedValue={answers.dataAvailability}
              title="Parcialmente"
              description="Están dispersos, pero pueden reunirse."
            >
              <Radio value="partial" colorScheme="purple" size="lg" />
            </OptionCard>

            <OptionCard
              value="no"
              selectedValue={answers.dataAvailability}
              title="No están disponibles"
              description="No hay registros suficientes para construir una línea de base."
            >
              <Radio value="no" colorScheme="purple" size="lg" />
            </OptionCard>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
