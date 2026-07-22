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

const empty = { linkedin_copy: "", instagram_copy: "", facebook_copy: "", x_copy: "", slides: [] };
const CARD_RENDER_VERSION = "2";
const LINKEDIN_ASSETS = Object.freeze({
  social_20260722_17634: {
    url: "/social/linkedin/social_20260722_17634-hero-v1.png",
    alt: "Equipo de una PyME revisando resultados operativos de un piloto de inteligencia artificial.",
  },
});

function versionedPreviewUrl(value) {
  if (!value) return "";
  const url = new URL(value, window.location.origin);
  url.searchParams.set("v", CARD_RENDER_VERSION);
  return url.toString();
}

function withLinkedInAsset(content) {
  const asset = LINKEDIN_ASSETS[content?.review_id];
  if (!asset) return content;
  return {
    ...content,
    linkedin_image_url: new URL(asset.url, window.location.origin).toString(),
    linkedin_image_alt: asset.alt,
  };
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

  useEffect(() => {
    let alive = true;
    fetch(`/api/social/review?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error(result.message || "No pudimos abrir la revisión.");
        if (alive) setDraft(withLinkedInAsset(result.content));
      })
      .catch((reason) => alive && setError(reason.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [token]);

  const xCount = useMemo(() => [...String(draft.x_copy ?? "")].length, [draft.x_copy]);

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
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/social/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action, content: draft }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.message || "No pudimos guardar la revisión.");
      setMessage(result.message || (action === "approve" ? "Contenido aprobado y programado." : "Cambios guardados."));
      if (result.content) setDraft(withLinkedInAsset(result.content));
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
          {error && <Alert status="error" borderRadius="xl"><AlertIcon />{error}</Alert>}
          {message && <Alert status="success" borderRadius="xl"><AlertIcon />{message}</Alert>}

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
            <FormControl><FormLabel>LinkedIn · perfil y empresa</FormLabel><Textarea minH="260px" value={draft.linkedin_copy} onChange={(event) => update("linkedin_copy", event.target.value)} /></FormControl>
            <FormControl><FormLabel>Instagram</FormLabel><Textarea minH="220px" value={draft.instagram_copy} onChange={(event) => update("instagram_copy", event.target.value)} /></FormControl>
            <FormControl><FormLabel>Facebook</FormLabel><Textarea minH="220px" value={draft.facebook_copy} onChange={(event) => update("facebook_copy", event.target.value)} /></FormControl>
            <FormControl isInvalid={xCount > 280}><FormLabel>X · {xCount}/280</FormLabel><Textarea value={draft.x_copy} onChange={(event) => update("x_copy", event.target.value)} /></FormControl>
          </Stack>

          <Stack direction={{ base: "column", sm: "row" }} spacing={4} position="sticky" bottom="16px" bg="rgba(8,8,11,.92)" backdropFilter="blur(12px)" borderRadius="2xl" p={4} border="1px solid #272A36">
            <Button isLoading={saving} onClick={() => submit("save")} variant="outline" borderColor="#CBD5E0" color="white" _hover={{ bg: "#1B1E2A" }}>Guardar cambios</Button>
            <Button isLoading={saving} isDisabled={xCount > 280 || Boolean(message)} onClick={() => submit("approve")} bg="#EC4899" color="white" _hover={{ bg: "#D93487" }}>Aprobar y programar</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
