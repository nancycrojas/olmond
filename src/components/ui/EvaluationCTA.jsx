/* eslint-disable react/prop-types */
import { useEvaluationModal } from "../../context/EvaluationModalContext.jsx";
import { CTA } from "./CTA.jsx";

export function EvaluationCTA({
  children = "Evaluar un proceso",
  onClick,
  ...props
}) {
  const { openEvaluation } = useEvaluationModal();

  const handleClick = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      openEvaluation();
    }
  };

  return (
    <CTA type="button" onClick={handleClick} {...props}>
      {children}
    </CTA>
  );
}
