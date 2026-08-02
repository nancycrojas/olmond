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
  Image,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const empty = {
  review_id: "",
  title: "",
  revision: 0,
  status: "",
  approval_status: "",
  manifest_sha256: "",
  linkedin_copy: "",
  instagram_copy: "",
  facebook_copy: "",
  x_copy: "",
  slides: [],
};
const CARD_RENDER_VERSION = "5";

function editableFingerprint(content) {
  return JSON.stringify({
    title: String(content.title ?? "").trim(),
    linkedin_copy: String(content.linkedin_copy ?? "").trim(),
    instagram_copy: String(content.instagram_copy ?? "").trim(),
    facebook_copy: String(content.facebook_copy ?? "").trim(),
    x_copy: String(content.x_copy ?? "").trim(),
    linkedin_image_url: String(content.linkedin_image_url ?? "").trim(),
    linkedin_image_alt: String(content.linkedin_image_alt ?? "").trim(),
    slides: Array.isArray(content.slides)
      ? content.slides.map(
          ({
            eyebrow = "",
            headline = "",
            body = "",
            bullets = [],
            alt_text = "",
            visual_mode = "editorial_cards",
            background_url = "",
            background_focus = "center",
          }) => ({
          eyebrow: String(eyebrow).trim(),
          headline: String(headline).trim(),
          body: String(body).trim(),
          bullets: Array.isArray(bullets) ? bullets.map((value) => String(value).trim()) : [],
          alt_text: String(alt_text).trim(),
          visual_mode: visual_mode === "photo_cover" ? "photo_cover" : "editorial_cards",
          background_url: String(background_url).trim(),
          background_focus: ["left", "center", "right"].includes(background_focus)
            ? background_focus
            : "center",
        }),
        )
      : [],
  });
}

function versionedPreviewUrl(value) {
  if (!value) return "";
  const url = new URL(value, window.location.origin);
  url.searchParams.set("v", CARD_RENDER_VERSION);
  return url.toString();
}

function withLinkedInAsset(content) {
  return content;
}

export function SocialReview() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const intent = params.get("action") === "approve" ? "approve" : "edit";
  const [draft, setDraft] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [loadedFingerprint, setLoadedFingerprint] = useState("");
  const [terminal, setTerminal] = useState(false);

  function applyServerContent(content) {
    const next = withLinkedInAsset({ ...empty, ...content });
    setDraft(next);
    setLoadedFingerprint(editableFingerprint(next));
  }

  useEffect(() => {
    let alive = true;
    fetch(`/api/social/review?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error(result.message || "No pudimos abrir la revisión.");
        if (alive) applyServerContent(result.content);
      })
      .catch((reason) => alive && setError(reason.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [token]);

  const xCount = useMemo(() => [...String(draft.x_copy ?? "")].length, [draft.x_copy]);
  const hasUnsavedChanges = useMemo(
    () => Boolean(loadedFingerprint) && editableFingerprint(draft) !== loadedFingerprint,
    [draft, loadedFingerprint],
  );
  const isApproved = String(draft.approval_status ?? "").toUpperCase() === "HUMAN_APPROVED"
    || String(draft.status ?? "").toUpperCase() === "APPROVED";
  const isRejected = String(draft.approval_status ?? "").toUpperCase() === "HUMAN_REJECTED"
    || String(draft.status ?? "").toUpperCase() === "REJECTED";

  function update(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateSlide(index, field, value) {
    setDraft((current) => ({
      ...current,
      slides: current.slides.map((slide, slideIndex) => (
        slideIndex === index ? { ...slide, [field]: value } : slide
      )),
    }));
  }

  async function submit(action) {
    if (action === "approve" && hasUnsavedChanges) {
      setError("Hay cambios sin guardar. Guardalos, revisá la nueva vista previa y recién entonces aprobá.");
      return;
    }
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/social/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          action,
          content: action === "save" ? draft : undefined,
          rejection_reason: action === "reject" ? rejectionReason : "",
          expected_revision: Number(draft.revision),
          expected_manifest_sha256: String(draft.manifest_sha256 ?? ""),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.message || "No pudimos guardar la revisión.");
      setMessage(result.message || (
        action === "approve" ? "Contenido aprobado y programado."
          : action === "reject" ? "Contenido rechazado y motivo registrado."
            : "Cambios guardados. La pieza todavía no está aprobada. Revisá las nuevas vistas previas y completá el paso 2."
      ));
      if (result.content) applyServerContent(result.content);
      if (action === "approve" || action === "reject") setTerminal(true);
      if (action === "save") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (reason) {
      setError(reason.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Box minH="100vh" bg="#08080B" color="white" display="grid" placeItems="center"><Spinner size="xl" color="#EC4899" /></Box>;

  return (
    <Box minH="100vh" bg="#08080B" color="#F7FAFC" py={{ base: 10, md: 16 }}>
      <Container maxW="7xl">
        <Stack spacing={8}>
          <Box>
            <Text color="#EC4899" fontWeight="700" letterSpacing="0.18em" fontSize="sm">MESA EDITORIAL OLMOND</Text>
            <Heading mt={3} fontFamily="Raleway" fontSize={{ base: "3xl", md: "5xl" }}>Revisión del contenido diario</Heading>
            <Text mt={3} color="#CBD5E0" maxW="3xl">Editá el texto o aprobá la pieza. Ninguna red recibe el contenido hasta que confirmes.</Text>
          </Box>

          {intent === "approve" && <Alert status="info" bg="#151827" color="white" borderRadius="xl"><AlertIcon />Revisá la vista previa y confirmá con “Aprobar y programar”.</Alert>}
          <Alert
            status={hasUnsavedChanges || (!isApproved && !isRejected) ? "warning" : isApproved ? "success" : "error"}
            bg="#151827"
            color="white"
            borderRadius="xl"
          >
            <AlertIcon />
            {hasUnsavedChanges
              ? "Paso 1 pendiente: hay cambios sin guardar. Guardarlos genera una nueva revisión y nuevas vistas previas. Todavía no publica."
              : isApproved
                ? `Aprobada y programada · revisión ${draft.revision || "—"} · versión ${String(draft.manifest_sha256 || "").slice(0, 12)}`
                : isRejected
                  ? `Rechazada · revisión ${draft.revision || "—"}`
                  : `Paso 2 pendiente: la revisión ${draft.revision || "—"} está guardada, pero NO aprobada. Revisá las vistas previas y elegí “Aprobar y programar”.`}
          </Alert>
          {error && <Alert status="error" borderRadius="xl"><AlertIcon />{error}</Alert>}
          {message && <Alert status={isApproved ? "success" : "warning"} borderRadius="xl"><AlertIcon />{message}</Alert>}

          {draft.linkedin_image_url && (
            <Box bg="#11131A" border="1px solid #272A36" borderRadius="2xl" overflow="hidden">
              <Box p={{ base: 5, md: 6 }}>
                <Text color="#EC4899" fontWeight="700" letterSpacing="0.14em" fontSize="xs">IMAGEN PRINCIPAL DE LINKEDIN</Text>
                <Heading mt={2} fontFamily="Raleway" fontSize={{ base: "xl", md: "2xl" }}>Fotografía editorial para perfil y empresa</Heading>
                <Text mt={2} color="#CBD5E0">Esta imagen se publicará en LinkedIn; las ocho placas se mantienen como carrusel para Instagram y Facebook.</Text>
              </Box>
              <Image src={draft.linkedin_image_url} alt={draft.linkedin_image_alt} w="100%" maxH="760px" objectFit="cover" objectPosition="center" />
            </Box>
          )}

          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={5}>
            {draft.slides.map((slide, index) => (
              <Box key={`${slide.index}-${index}`} bg="#11131A" border="1px solid #272A36" borderRadius="2xl" overflow="hidden">
                <Image src={versionedPreviewUrl(slide.preview_url)} alt={slide.alt_text || `Placa ${index + 1}`} w="100%" loading="lazy" />
                <Stack p={5} spacing={4}>
                  <FormControl><FormLabel color="#CBD5E0">Antetítulo</FormLabel><Textarea value={slide.eyebrow || ""} onChange={(event) => updateSlide(index, "eyebrow", event.target.value)} /></FormControl>
                  <FormControl><FormLabel color="#CBD5E0">Título</FormLabel><Textarea value={slide.headline || ""} onChange={(event) => updateSlide(index, "headline", event.target.value)} minH="110px" /></FormControl>
                  <FormControl><FormLabel color="#CBD5E0">Desarrollo</FormLabel><Textarea value={slide.body || ""} onChange={(event) => updateSlide(index, "body", event.target.value)} minH="120px" /></FormControl>
                </Stack>
              </Box>
            ))}
          </Grid>

          <Stack spacing={5} bg="#11131A" border="1px solid #272A36" borderRadius="2xl" p={{ base: 5, md: 8 }}>
            <FormControl><FormLabel>Título editorial</FormLabel><Textarea minH="100px" value={draft.title} onChange={(event) => update("title", event.target.value)} /></FormControl>
            <FormControl><FormLabel>LinkedIn · perfil y empresa</FormLabel><Textarea minH="260px" value={draft.linkedin_copy} onChange={(event) => update("linkedin_copy", event.target.value)} /></FormControl>
            <FormControl><FormLabel>Instagram</FormLabel><Textarea minH="220px" value={draft.instagram_copy} onChange={(event) => update("instagram_copy", event.target.value)} /></FormControl>
            <FormControl><FormLabel>Facebook</FormLabel><Textarea minH="220px" value={draft.facebook_copy} onChange={(event) => update("facebook_copy", event.target.value)} /></FormControl>
            <FormControl isInvalid={xCount > 280}><FormLabel>X · {xCount}/280</FormLabel><Textarea value={draft.x_copy} onChange={(event) => update("x_copy", event.target.value)} /></FormControl>
            <FormControl>
              <FormLabel>Motivo de rechazo / instrucciones de mejora</FormLabel>
              <Textarea
                minH="120px"
                placeholder="Ej.: El enfoque repite ideas recientes. Rehacer con una noticia de las últimas 72 horas, más datos, contexto y fuentes primarias; menos recomendaciones."
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
              />
              <Text mt={2} color="#A0AEC0" fontSize="sm">Si rechazás, este motivo queda registrado para entrenamiento editorial y mejora continua.</Text>
            </FormControl>
          </Stack>

          <Stack direction={{ base: "column", sm: "row" }} spacing={4} position="sticky" bottom="16px" bg="rgba(8,8,11,.92)" backdropFilter="blur(12px)" borderRadius="2xl" p={4} border="1px solid #272A36">
            <Button isLoading={saving} isDisabled={terminal || !hasUnsavedChanges} onClick={() => submit("save")} variant="outline" borderColor="#CBD5E0" color="white" _hover={{ bg: "#1B1E2A" }}>Paso 1: guardar y regenerar vistas</Button>
            <Button isLoading={saving} isDisabled={terminal || rejectionReason.trim().length < 8} onClick={() => submit("reject")} variant="outline" borderColor="#F56565" color="#FEB2B2" _hover={{ bg: "#2A171A" }}>Rechazar con motivo</Button>
            <Button
              isLoading={saving}
              isDisabled={terminal || isApproved || isRejected || hasUnsavedChanges || xCount > 280 || !draft.manifest_sha256}
              onClick={() => submit("approve")}
              bg="#EC4899"
              color="white"
              boxShadow={!hasUnsavedChanges && !isApproved && !isRejected ? "0 0 0 3px rgba(236,72,153,.28)" : "none"}
              _hover={{ bg: "#D93487" }}
            >
              Paso 2: aprobar y programar
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
