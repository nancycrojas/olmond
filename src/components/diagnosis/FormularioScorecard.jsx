import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { LuMailCheck } from "react-icons/lu";

import { FORM_FIELDS, N8N_WEBHOOK_URL } from "../../lib/constants.js";
import { CTA } from "../ui/CTA.jsx";
import { SectionLabel } from "../ui/SectionShell.jsx";

const MotionBox = motion(Box);

const REQUIRED_LABELS = FORM_FIELDS.filter((f) => f.required).map(
  (f) => f.label,
);

export function FormularioScorecard() {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [touchedSubmit, setTouchedSubmit] = useState(false);

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
    setTouchedSubmit(true);
    if (missing.length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("Error enviando diagnóstico:", err);
      setStatus("error");
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
            Respuestas recibidas para preparar su diagnóstico
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Revise también las carpetas Promociones o Spam. El envío puede
            demorar unos minutos. Si no recibe el resultado, puede contactar
            a Olmond en hola@olmondconsulting.com.
          </Text>
          <Text fontSize="lg" fontWeight="600">
            Para conversar sobre sus prioridades, responda el correo del resultado con
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
          Responda y reciba su resultado
        </Heading>
        <Text color="gray.600" mb={8}>
          12 preguntas, aproximadamente 3 minutos. Recibirá el resultado por correo.
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
            const isInvalid =
              touchedSubmit &&
              field.required &&
              (values[field.label] ?? "") === "";
            return (
              <FormControl
                key={field.label}
                isRequired={field.required}
                isInvalid={isInvalid}
              >
                <FormLabel fontWeight="600">{field.displayLabel ?? field.label}</FormLabel>
                {field.type === "select" ? (
                  <Select
                    placeholder="Seleccione una opción"
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
              </FormControl>
            );
          })}

          {touchedSubmit && missing.length > 0 ? (
            <Alert status="warning" borderRadius="xl">
              <AlertIcon />
              Faltan {missing.length} respuestas obligatorias para poder
              enviar.
            </Alert>
          ) : null}

          {status === "error" ? (
            <Alert status="error" borderRadius="xl">
              <AlertIcon />
              No pudimos enviar sus respuestas. Revise su conexión e intente de
              nuevo. Sus respuestas siguen cargadas.
            </Alert>
          ) : null}

          <CTA
            onClick={handleSubmit}
            isLoading={status === "sending"}
            loadingText="Enviando..."
          >
            Ver mi diagnóstico
          </CTA>
          <Text fontSize="sm" color="gray.500">
            Sus datos se usan para enviarle el resultado y contenido
            relacionado. Sin spam, desuscripción con un clic.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
