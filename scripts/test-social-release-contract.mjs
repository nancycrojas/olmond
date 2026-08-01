import assert from "node:assert/strict";

import {
  assertDailyBudget,
  assertTransition,
  buildDeliveryManifest,
  dedupeDeliveries,
  DESTINATIONS,
  manifestHash,
} from "./social-release-contract.mjs";

const source = "https://example.com/verified-source";
const approvedManifestSha256 = manifestHash({ revision: 2, editorial: "approved" });
const topics = ["singularidad", "seguridad", "modelos_abiertos"];
const allDeliveries = topics.flatMap((topic, index) => buildDeliveryManifest({
  contentId: `social_20260801_${topic}`,
  revision: 2,
  approvedManifestSha256,
  publishAt: `2026-08-01T${["21:30", "22:30", "23:30"][index]}:00.000Z`,
  assets: {
    meta_carousel_urls: [1, 2, 3, 4].map((slide) => `https://www.olmondconsulting.com/social/meta/${topic}-${slide}.png`),
    linkedin_photorealistic_image_url: `https://www.olmondconsulting.com/social/linkedin/${topic}.png`,
  },
  copy: {
    instagram: `Información verificada sobre ${topic}. Fuente al final.`,
    facebook: `Información verificada sobre ${topic}. Fuente al final.`,
    linkedin: `Una explicación accesible y prudente sobre ${topic}. Fuente: ${source}`,
    x: `Qué cambia con ${topic}, sin exageraciones. ${source}`,
  },
}));

assert.equal(allDeliveries.length, 15);
for (const topic of topics) {
  const release = allDeliveries.filter((delivery) => delivery.content_id.endsWith(topic));
  assert.deepEqual(release.map((delivery) => delivery.destination), DESTINATIONS);
  assert.equal(release.filter((delivery) => delivery.destination.startsWith("linkedin")).every((delivery) => delivery.media_type === "single_photorealistic_image" && delivery.media_urls.length === 1), true);
  assert.equal(release.filter((delivery) => ["instagram", "facebook"].includes(delivery.destination)).every((delivery) => delivery.media_type === "carousel_4x5" && delivery.media_urls.length === 4), true);
  assert.equal(release.find((delivery) => delivery.destination === "x").media_urls.length, 0);
}

assertTransition("DRAFT", "QA_PASSED");
assertTransition("PENDING_REVIEW", "REJECTED");
assertTransition("APPROVED", "QUEUED");
assert.throws(() => assertTransition("REJECTED", "APPROVED"), /INVALID_STATE_TRANSITION/);
assert.throws(() => assertTransition("PENDING_REVIEW", "PUBLISHED"), /INVALID_STATE_TRANSITION/);

const replay = [...allDeliveries, allDeliveries[0]];
assert.equal(dedupeDeliveries(replay).length, 15);
assert.equal(dedupeDeliveries(allDeliveries, new Set([allDeliveries[0].delivery_id])).length, 14);

assert.throws(() => buildDeliveryManifest({
  contentId: "bad-linkedin",
  revision: 1,
  approvedManifestSha256,
  publishAt: "2026-08-01T21:30:00.000Z",
  assets: { meta_carousel_urls: ["https://example.com/1.png", "https://example.com/2.png"], linkedin_photorealistic_image_url: "https://example.com/1.png" },
  copy: { instagram: "Texto", facebook: "Texto", linkedin: "Texto", x: `Texto ${source}` },
}), /INVALID_LINKEDIN_IMAGE/);

assertDailyBudget(
  { topics: 3, ai_calls: 6, ai_tokens: 60_000, n8n_executions: 20 },
  { max_topics: 3, max_ai_calls: 6, max_ai_tokens: 60_000, max_n8n_executions: 20 },
);
assert.throws(() => assertDailyBudget(
  { topics: 3, ai_calls: 7, ai_tokens: 60_000, n8n_executions: 20 },
  { max_topics: 3, max_ai_calls: 6, max_ai_tokens: 60_000, max_n8n_executions: 20 },
), /DAILY_BUDGET_EXCEEDED:ai_calls/);

console.log("Contrato de lanzamiento validado: 3 temas, 15 destinos, estados, deduplicación y presupuesto.");
