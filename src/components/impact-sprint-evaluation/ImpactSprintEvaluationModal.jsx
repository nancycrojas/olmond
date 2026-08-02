/* eslint-disable react/prop-types */
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import { EvaluationFooter } from "./EvaluationFooter.jsx";
import { EvaluationHeader } from "./EvaluationHeader.jsx";
import { EvaluationProgress } from "./EvaluationProgress.jsx";
import { FitResult } from "./results/FitResult.jsx";
import { NoFitResult } from "./results/NoFitResult.jsx";
import { DataAvailabilityStep } from "./steps/DataAvailabilityStep.jsx";
import { FrequencyStep } from "./steps/FrequencyStep.jsx";
import { ProcessStep } from "./steps/ProcessStep.jsx";
import { ResponsibilityStep } from "./steps/ResponsibilityStep.jsx";
import { VolumeStep } from "./steps/VolumeStep.jsx";
import { useImpactSprintEvaluation } from "./useImpactSprintEvaluation.js";

const stepComponents = [
  ProcessStep,
  FrequencyStep,
  ResponsibilityStep,
  DataAvailabilityStep,
  VolumeStep,
];

export function ImpactSprintEvaluationModal({ isOpen, onClose }) {
  const evaluation = useImpactSprintEvaluation({ onClose });

  const CurrentStep = stepComponents[evaluation.step];

  return (
    <Modal
      isOpen={isOpen}
      onClose={evaluation.handleClose}
      size="full"
      isCentered
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="rgba(7, 9, 16, 0.78)" backdropFilter="blur(8px)" />

      <ModalContent
        my={{ base: 0, md: 8 }}
        maxW={{ base: "100%", md: "960px" }}
        minH={{ base: "100dvh", md: "auto" }}
        maxH={{ base: "100dvh", md: "calc(100vh - 64px)" }}
        overflow="hidden"
        borderRadius={{ base: 0, md: "28px" }}
        bg="white"
      >
        <EvaluationHeader onClose={evaluation.handleClose} />

        <ModalBody p={0} overflowY="auto">
          <EvaluationProgress
            step={evaluation.step}
            showResult={evaluation.showResult}
          />

          <Box px={{ base: 6, md: 10 }} py={{ base: 8, md: 10 }}>
            {evaluation.showResult ? (
              evaluation.fitsImpactSprint ? (
                <FitResult
                  conditions={evaluation.conditions}
                  onReview={evaluation.handleReview}
                  onClose={evaluation.handleClose}
                />
              ) : (
                <NoFitResult
                  conditions={evaluation.conditions}
                  onReview={evaluation.handleReview}
                  onClose={evaluation.handleClose}
                />
              )
            ) : (
              <CurrentStep
                answers={evaluation.answers}
                updateAnswer={evaluation.updateAnswer}
              />
            )}
          </Box>
        </ModalBody>

        {!evaluation.showResult && (
          <EvaluationFooter
            step={evaluation.step}
            canContinue={evaluation.canContinue}
            onBack={evaluation.handleBack}
            onNext={evaluation.handleNext}
          />
        )}
      </ModalContent>
    </Modal>
  );
}
