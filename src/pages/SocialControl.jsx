import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_TIMES = ["18:30", "19:30", "20:30"];

function localDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map(({ type, value: part }) => [type, part]));
  return `${value.year}-${value.month}-${value.day}`;
}

function emptyTopic(index) {
  return {
    requested_topic: "",
    editorial_instructions: "",
    source_urls: "",
    publish_date: localDate(),
    publish_time: DEFAULT_TIMES[index] ?? "20:30",
  };
}

function uuid() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function SocialControl() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [mode, setMode] = useState("manual");
  const [topics, setTopics] = useState([emptyTopic(0)]);
  const [nonce, setNonce] = useState(uuid);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const valid = useMemo(() => (
    token.length >= 32 &&
    topics.every((topic) => topic.requested_topic.trim().length >= 8) &&
    (mode === "urgent" || topics.every((topic) => topic.publish_date && topic.publish_time))
  ), [mode, token, topics]);

  function updateTopic(index, field, value) {
    setTopics((current) => current.map((topic, topicIndex) => (
      topicIndex === index ? { ...topic, [field]: value } : topic
    )));
  }

  function addTopic() {
    setTopics((current) => current.length < 3 ? [...current, emptyTopic(current.length)] : current);
  }

  function removeTopic(index) {
    setTopics((current) => current.length > 1 ? current.filter((_, topicIndex) => topicIndex !== index) : current);
  }

  async function submit(event) {
    event.preventDefault();
    if (!valid) return;
    setSending(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        token,
        mode,
        client_request_nonce: nonce,
        topics: topics.map((topic, index) => ({
          requested_topic: topic.requested_topic,
          editorial_instructions: topic.editorial_instructions,
          source_urls: topic.source_urls.split("\n").map((value) => value.trim()).filter(Boolean),
          slot_key: `s${index + 1}`,
          scheduled_at: mode === "urgent"
            ? ""
            : `${topic.publish_date}T${topic.publish_time}:00-03:00`,
        })),
      };
      const response = await fetch("/api/social/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.message || "No pudimos registrar la solicitud.");
      setMessage(result.message || "Solicitud editorial registrada. Va a pasar por fuentes, redacción, QA y revisión humana antes de publicar.");
      setNonce(uuid());
      setTopics([emptyTopic(0)]);
    } catch (reason) {
      setError(reason.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <Box minH="100vh" bg="#08080B" color="#F7FAFC" py={{ base: 10, md: 16 }}>
      <Container maxW="6xl">
        <Stack spacing={8}>
          <Box>
            <Text color="#EC4899" fontWeight="700" letterSpacing="0.18em" fontSize="sm">CONTROL EDITORIAL OLMOND</Text>
            <Heading mt={3} fontFamily="Raleway" fontSize={{ base: "3xl", md: "5xl" }}>Solicitar contenidos</Heading>
            <Text mt={3} color="#CBD5E0" maxW="3xl">
              Podés proponer entre uno y tres temas. El sistema no publica este formulario: primero investiga, redacta, verifica las fuentes y envía una revisión exacta por correo.
            </Text>
          </Box>

          {error && <Alert status="error" borderRadius="xl"><AlertIcon />{error}</Alert>}
          {message && <Alert status="success" borderRadius="xl"><AlertIcon />{message}</Alert>}

          <Box as="form" onSubmit={submit}>
            <Stack spacing={6}>
              <FormControl maxW="420px">
                <FormLabel>Tipo de solicitud</FormLabel>
                <Select value={mode} onChange={(event) => setMode(event.target.value)} bg="#11131A" borderColor="#343847">
                  <option value="manual">Planificada</option>
                  <option value="urgent">Urgente · noticia en menos de 24 horas</option>
                </Select>
                <Text mt={2} color="#A0AEC0" fontSize="sm">
                  Una urgencia ocupa el próximo espacio seguro; nunca saltea QA ni revisión humana.
                </Text>
              </FormControl>

              {topics.map((topic, index) => (
                <Box key={index} bg="#11131A" border="1px solid #272A36" borderRadius="2xl" p={{ base: 5, md: 7 }}>
                  <Stack spacing={5}>
                    <Stack direction={{ base: "column", sm: "row" }} justify="space-between" align={{ sm: "center" }}>
                      <Heading fontFamily="Raleway" fontSize="xl">Tema {index + 1}</Heading>
                      {topics.length > 1 && <Button size="sm" variant="ghost" color="#FEB2B2" onClick={() => removeTopic(index)}>Quitar tema</Button>}
                    </Stack>
                    <FormControl isRequired>
                      <FormLabel>Tema o enfoque</FormLabel>
                      <Textarea minH="110px" value={topic.requested_topic} onChange={(event) => updateTopic(index, "requested_topic", event.target.value)} placeholder="Ej.: Qué cambió esta semana en la seguridad de los agentes de IA" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Indicaciones editoriales</FormLabel>
                      <Textarea minH="120px" value={topic.editorial_instructions} onChange={(event) => updateTopic(index, "editorial_instructions", event.target.value)} placeholder="Datos que conviene incluir, afirmaciones a evitar, contexto o enfoque deseado." />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Fuentes sugeridas · una URL HTTPS por línea</FormLabel>
                      <Textarea minH="100px" value={topic.source_urls} onChange={(event) => updateTopic(index, "source_urls", event.target.value)} placeholder="https://..." />
                    </FormControl>
                    {mode === "manual" && (
                      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                        <FormControl isRequired><FormLabel>Fecha</FormLabel><Input type="date" value={topic.publish_date} onChange={(event) => updateTopic(index, "publish_date", event.target.value)} /></FormControl>
                        <FormControl isRequired><FormLabel>Hora de publicación</FormLabel><Input type="time" value={topic.publish_time} onChange={(event) => updateTopic(index, "publish_time", event.target.value)} /></FormControl>
                      </Grid>
                    )}
                  </Stack>
                </Box>
              ))}

              <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                <Button isDisabled={topics.length >= 3} onClick={addTopic} variant="outline" borderColor="#CBD5E0" color="white" _hover={{ bg: "#1B1E2A" }}>Agregar otro tema</Button>
                <Button type="submit" isLoading={sending} isDisabled={!valid} bg="#EC4899" color="white" _hover={{ bg: "#D93487" }}>Enviar a la mesa editorial</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
