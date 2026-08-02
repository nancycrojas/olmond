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
