/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react";

import { BRAND_GRADIENT } from "../../lib/constants.js";
import { TOTAL_STEPS } from "./evaluationConfig.js";

export function EvaluationProgress({ step, showResult }) {
  const currentStep = Math.min(step + 1, TOTAL_STEPS);

  const progress = showResult
    ? 100
    : Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <Box
      flexShrink={0}
      px={{
        base: 6,
        md: 10,
      }}
      pt={{
        base: 6,
        md: 7,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap={4}
        fontSize={{
          base: "xs",
          md: "sm",
        }}
        fontWeight="700"
        color="gray.500"
      >
        <Text>
          {showResult
            ? "Evaluación completa"
            : `Pregunta ${currentStep} de ${TOTAL_STEPS}`}
        </Text>

        <Text flexShrink={0}>{progress}%</Text>
      </Flex>

      <Box mt={4} h="6px" overflow="hidden" bg="#E9EEF4" borderRadius="full">
        <Box
          w={`${progress}%`}
          h="full"
          bgImage={BRAND_GRADIENT}
          bgSize="100% 100%"
          borderRadius="full"
          transition="width 0.3s ease"
        />
      </Box>
    </Box>
  );
}
