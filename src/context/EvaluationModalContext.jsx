/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";

import { ImpactSprintEvaluationModal } from "../components/impact-sprint-evaluation/ImpactSprintEvaluationModal.jsx";

const EvaluationModalContext = createContext(null);

export function EvaluationModalProvider({ children }) {
  const modal = useDisclosure();

  return (
    <EvaluationModalContext.Provider
      value={{
        openEvaluation: modal.onOpen,
        closeEvaluation: modal.onClose,
      }}
    >
      {children}

      <ImpactSprintEvaluationModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      />
    </EvaluationModalContext.Provider>
  );
}

export function useEvaluationModal() {
  const context = useContext(EvaluationModalContext);

  if (!context) {
    throw new Error(
      "useEvaluationModal debe utilizarse dentro de EvaluationModalProvider",
    );
  }

  return context;
}
