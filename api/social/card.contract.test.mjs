import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import test from "node:test";

import { decodePayload, renderSvg } from "./card.js";

function payload(value) {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

test("keeps the clean editorial layout as the default", () => {
  const slide = decodePayload(payload({
    headline: "Una portada editorial",
    body: "Información verificada y explicada con claridad.",
    index: 1,
    total: 8,
    kind: "cover",
  }));

  assert.equal(slide.visualMode, "editorial_cards");
  assert.equal(slide.backgroundUrl, "");
});

test("accepts only Olmond-hosted PNG backgrounds", () => {
  assert.throws(
    () => decodePayload(payload({
      headline: "Una portada editorial",
      body: "Información verificada y explicada con claridad.",
      visual_mode: "photo_cover",
      background_url: "https://example.com/image.png",
    })),
    /background_url_invalid/,
  );
});

test("embeds a darkened photo only on a photo-led cover", async (context) => {
  const originalFetch = globalThis.fetch;
  context.after(() => {
    globalThis.fetch = originalFetch;
  });
  globalThis.fetch = async () => new Response(
    new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
    { status: 200, headers: { "content-type": "image/png" } },
  );

  const slide = decodePayload(payload({
    headline: "Una portada con escena editorial",
    body: "La imagen aporta contexto sin competir con la lectura.",
    index: 1,
    total: 8,
    kind: "cover",
    visual_mode: "photo_cover",
    background_url: "https://www.olmondconsulting.com/social/linkedin/example.png",
    background_focus: "right",
  }));
  const svg = await renderSvg(slide);

  assert.match(svg, /data:image\/png;base64,/);
  assert.match(svg, /preserveAspectRatio="xMaxYMid slice"/);
  assert.match(svg, /fill="url\(#photoOverlay\)"/);
});

test("never places the photo on an inner slide", async () => {
  const slide = decodePayload(payload({
    headline: "Una placa interna",
    body: "La lectura conserva un fondo limpio.",
    index: 2,
    total: 8,
    kind: "content",
    visual_mode: "photo_cover",
    background_url: "https://www.olmondconsulting.com/social/linkedin/example.png",
  }));
  const svg = await renderSvg(slide);

  assert.doesNotMatch(svg, /data:image\/png;base64,/);
  assert.doesNotMatch(svg, /fill="url\(#photoOverlay\)"/);
});

test("uses larger mobile-readable typography in layout version 5", async () => {
  const slide = decodePayload(payload({
    headline: "Una portada legible en el teléfono",
    body: "Menos texto por placa permite una lectura cómoda sin ampliar la imagen.",
    index: 1,
    total: 8,
    kind: "cover",
    layout_version: 5,
  }));
  const svg = await renderSvg(slide);

  assert.equal(slide.layoutVersion, 5);
  assert.match(svg, /\.headline \{ font-size: 72px;/);
  assert.match(svg, /\.body \{ font-size: 40px;/);
  assert.match(svg, /x="190" y="150"/);
});

test("accepts a human-edited plate up to 220 characters without shrinking typography", async () => {
  const slide = decodePayload(payload({
    headline: "Una portada editorial",
    body: "x".repeat(220),
    index: 1,
    total: 8,
    kind: "cover",
    layout_version: 5,
  }));
  const svg = await renderSvg(slide);

  assert.equal(slide.body.length, 220);
  assert.match(svg, /\.body \{ font-size: 40px;/);
});

test("keeps long human-edited copy complete when vertical space is available", async () => {
  const body = "La iniciativa fue difundida públicamente y recibió cobertura periodística. Sin embargo, el alcance institucional de las adhesiones todavía depende de evidencia adicional que pueda verificarse de manera independiente.";
  const slide = decodePayload(payload({
    headline: "Cierre informativo",
    body,
    bullets: [],
    index: 8,
    total: 8,
    kind: "closing",
    layout_version: 5,
  }));
  const svg = await renderSvg(slide);

  assert.doesNotMatch(svg, /â€¦|\u2026|\.\.\./u);
  assert.match(svg, /manera independiente\./u);
});

test("rejects text density above the human-edit ceiling in layout version 5", () => {
  assert.throws(
    () => decodePayload(payload({
      headline: "Una portada editorial",
      body: "x".repeat(221),
      index: 1,
      total: 8,
      kind: "cover",
      layout_version: 5,
    })),
    /body_too_long/,
  );
});

test("keeps version 4 payloads backward compatible", async () => {
  const slide = decodePayload(payload({
    headline: "Una portada editorial",
    body: "x".repeat(180),
    index: 1,
    total: 8,
    kind: "cover",
  }));
  const svg = await renderSvg(slide);

  assert.equal(slide.layoutVersion, 4);
  assert.match(svg, /\.body \{ font-size: 31px;/);
});
