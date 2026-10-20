import {
  Alert,
  AlertIcon,
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Progress,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { LuMailCheck } from "react-icons/lu";

import { FORM_FIELDS } from "../../lib/constants.js";
import {
  createDiagnosisSubmission,
  getDiagnosisErrors,
  submitDiagnosis,
} from "../../lib/diagnosis-submission.js";
import { CTA } from "../ui/CTA.jsx";
import { SectionLabel } from "../ui/SectionShell.jsx";

const MotionBox = motion(Box);

const REQUIRED_LABELS = FORM_FIELDS.filter((f) => f.required).map(
  (f) => f.label,
);

export function FormularioScorecard() {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("idle");
  const [touchedSubmit, setTouchedSubmit] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const submission = useRef(null);
  const sending = useRef(false);
  const errors = getDiagnosisErrors(values);

  const answeredRequired = useMemo(
    () =>
      REQUIRED_LABELS.filter((label) => (values[label] ?? "").trim() !== "")
        .length,
    [values],
  );
  const progress = Math.round(
    (answeredRequired / REQUIRED_LABELS.length) * 100,
  );
  const missing = REQUIRED_LABELS.filter(
    (label) => (values[label] ?? "").trim() === "",
  );

  const setField = (label) => (e) =>
    setValues((v) => ({ ...v, [label]: e.target.value }));

  const handleSubmit = async () => {
    if (sending.current || status === "pending") return;
    setTouchedSubmit(true);
    if (Object.keys(errors).length > 0) return;
    try {
      submission.current = createDiagnosisSubmission(values, {
        marketingConsent,
      });
    } catch {
      setStatus("error");
      return;
    }
    sending.current = true;
    setStatus("sending");
    try {
      const result = await submitDiagnosis(submission.current);
      setStatus(result.status);
    } finally {
      sending.current = false;
    }
  };

  if (status === "success") {
    return (
      <Box as="section" id="diagnostico" bg="white" py={{ base: 16, md: 24 }}>
        <MotionBox
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          maxW="2xl"
          mx="auto"
          px={6}
          textAlign="center"
        >
          <Box
            as={LuMailCheck}
            boxSize={14}
            color="brand.500"
            mx="auto"
            mb={6}
          />
          <Heading as="h2" size="lg" fontWeight="800" mb={4}>
            Guardamos tus respuestas y enviamos tu diagnóstico
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            El servicio de correo confirmó el envío. Revisá tu bandeja de
            entrada y también las pestañas Promociones o Spam.
          </Text>
          <Text fontSize="lg" fontWeight="600">
            ¿Querés saber cuál es la tuya? Respondé el correo del resultado con
            la palabra{" "}
            <Box as="span" color="brand.accent">
              CALL
            </Box>{" "}
            y coordinamos 20 minutos gratuitos.
          </Text>
        </MotionBox>
      </Box>
    );
  }

  return (
    <Box as="section" id="diagnostico" bg="white" py={{ base: 16, md: 24 }}>
      <Box maxW="2xl" mx="auto" px={6}>
        <SectionLabel>El diagnóstico</SectionLabel>
        <Heading as="h2" size="xl" fontWeight="800" mb={3}>
          Respondé y recibí tu resultado
        </Heading>
        <Text color="gray.600" mb={8}>
          12 preguntas, 3 minutos. El resultado llega a tu correo apenas
          terminás.
        </Text>

        <Box position="sticky" top={0} zIndex={10} bg="white" py={3} mb={6}>
          <Progress
            value={progress}
            size="sm"
            borderRadius="full"
            sx={{
              "& > div": {
                bgImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              },
            }}
            bg="gray.100"
          />
          <Text fontSize="sm" color="gray.500" mt={2}>
            {progress === 100
              ? "Todo listo para enviar"
              : `${progress}% completado`}
          </Text>
        </Box>

        <Stack spacing={6}>
          {FORM_FIELDS.map((field) => {
            const isInvalid = touchedSubmit && Boolean(errors[field.label]);
            return (
              <FormControl
                key={field.label}
                isRequired={field.required}
                isInvalid={isInvalid}
                isDisabled={status === "sending" || status === "pending"}
              >
                <FormLabel fontWeight="600">{field.label}</FormLabel>
                {field.type === "select" ? (
                  <Select
                    placeholder="Elegí una opción"
                    size="lg"
                    value={values[field.label] ?? ""}
                    onChange={setField(field.label)}
                    focusBorderColor="brand.500"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type={field.type}
                    size="lg"
                    placeholder={field.placeholder}
                    value={values[field.label] ?? ""}
                    onChange={setField(field.label)}
                    focusBorderColor="brand.500"
                  />
                )}
                {isInvalid ? (
                  <FormErrorMessage>{errors[field.label]}</FormErrorMessage>
                ) : null}
              </FormControl>
            );
          })}

          {touchedSubmit && missing.length > 0 ? (
            <Alert status="warning" borderRadius="xl">
              <AlertIcon />
              Te faltan {missing.length} respuestas obligatorias para poder
              enviar.
            </Alert>
          ) : null}

          {status === "error" ? (
            <Alert status="error" borderRadius="xl">
              <AlertIcon />
              No pudimos preparar el envío. Tus respuestas siguen cargadas.
            </Alert>
          ) : null}

          {status === "pending" ? (
            <Alert status="warning" borderRadius="xl">
              <AlertIcon />
              <Box>
                No pudimos confirmar el guardado y el envío del correo. Para
                evitar duplicados, no vuelvas a enviarlo. Contactanos e indicá
                esta referencia: {submission.current?.submission_id}.
              </Box>
            </Alert>
          ) : null}

          <Checkbox
            isChecked={marketingConsent}
            isDisabled={status === "sending" || status === "pending"}
            onChange={(event) => setMarketingConsent(event.target.checked)}
          >
            Quiero recibir contenido y propuestas comerciales de Olmond. Puedo
            darme de baja cuando quiera.
          </Checkbox>

          <CTA
            onClick={handleSubmit}
            isLoading={status === "sending"}
            isDisabled={status === "pending"}
            loadingText="Enviando..."
          >
            Ver mi diagnóstico
          </CTA>
          <Text fontSize="sm" color="gray.500">
            Guardamos tus respuestas para preparar tu diagnóstico y atender tu
            consulta. El envío del resultado no requiere aceptar comunicaciones
            comerciales.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
