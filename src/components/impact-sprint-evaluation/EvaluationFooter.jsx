/* eslint-disable react/prop-types */
import { Button, ModalFooter } from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

import { BRAND_GRADIENT } from "../../lib/constants.js";
import { TOTAL_STEPS } from "./evaluationConfig.js";

export function EvaluationFooter({ step, canContinue, onBack, onNext }) {
  const isFirstStep = step === 0;
  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <ModalFooter
      flexShrink={0}
      px={{
        base: 6,
        md: 10,
      }}
      py={6}
      gap={4}
      justifyContent="space-between"
      borderTop="1px solid"
      borderColor="#DCE3EA"
      bg="white"
    >
      <Button
        type="button"
        leftIcon={<LuArrowLeft />}
        variant="outline"
        h={{
          base: "52px",
          md: "58px",
        }}
        px={{
          base: 5,
          md: 8,
        }}
        borderRadius="full"
        borderColor="#CBD5E0"
        color="#343746"
        fontWeight="700"
        isDisabled={isFirstStep}
        onClick={onBack}
        transition="all 0.2s ease"
        _hover={{
          bg: "gray.50",
          borderColor: "gray.400",
          transform: "translateY(-1px)",
        }}
        _disabled={{
          opacity: 0.35,
          cursor: "not-allowed",
          transform: "none",
        }}
      >
        Atrás
      </Button>

      <Button
        type="button"
        rightIcon={<LuArrowRight />}
        h={{
          base: "52px",
          md: "58px",
        }}
        minW={{
          base: "160px",
          md: "205px",
        }}
        px={{
          base: 5,
          md: 8,
        }}
        borderRadius="full"
        bgImage={BRAND_GRADIENT}
        color="white"
        fontWeight="700"
        isDisabled={!canContinue}
        onClick={onNext}
        transition="all 0.2s ease"
        _hover={{
          opacity: 0.92,
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        _active={{
          opacity: 0.86,
          transform: "translateY(0)",
        }}
        _disabled={{
          opacity: 0.4,
          cursor: "not-allowed",
          transform: "none",
          boxShadow: "none",
        }}
      >
        {isLastStep ? "Ver resultado" : "Continuar"}
      </Button>
    </ModalFooter>
  );
}
