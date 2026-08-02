import { useMemo, useState } from "react";

import { INITIAL_ANSWERS, TOTAL_STEPS } from "./evaluationConfig.js";

export function useImpactSprintEvaluation({ onClose }) {
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);

  const responsibleIdentified = answers.responsible === "yes";

  const dataAccessible =
    answers.dataAvailability === "yes" ||
    answers.dataAvailability === "partial";

  const volumeSufficient =
    Number(answers.monthlyCases || 0) >= 50 ||
    Number(answers.monthlyHours || 0) >= 20;

  const fitsImpactSprint =
    responsibleIdentified && dataAccessible && volumeSufficient;

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return answers.process.trim().length >= 5;

      case 1:
        return Number(answers.frequency) > 0;

      case 2:
        return Boolean(answers.responsible);

      case 3:
        return Boolean(answers.dataAvailability);

      case 4:
        return (
          Number(answers.monthlyCases || 0) > 0 ||
          Number(answers.monthlyHours || 0) > 0
        );

      default:
        return false;
    }
  }, [answers, step]);

  const updateAnswer = (field, value) => {
    setAnswers((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (!canContinue) return;

    if (step === TOTAL_STEPS - 1) {
      setShowResult(true);
      return;
    }

    setStep((current) => current + 1);
  };

  const handleBack = () => {
    setStep((current) => Math.max(0, current - 1));
  };

  const handleReview = () => {
    setShowResult(false);
    setStep(0);
  };

  const resetEvaluation = () => {
    setStep(0);
    setShowResult(false);
    setAnswers(INITIAL_ANSWERS);
  };

  const handleClose = () => {
    onClose();

    window.setTimeout(() => {
      resetEvaluation();
    }, 250);
  };

  return {
    step,
    answers,
    showResult,
    canContinue,
    fitsImpactSprint,

    conditions: {
      responsibleIdentified,
      dataAccessible,
      volumeSufficient,
    },

    updateAnswer,
    handleNext,
    handleBack,
    handleReview,
    handleClose,
  };
}
