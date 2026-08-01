import assert from "node:assert/strict";

import { runSocialCanary } from "./social-canary-simulator.mjs";
import {
  approvedContentHash,
  assertAssetPreflight,
  assertDailyBudget,
  assertTransition,
  buildDeliveryManifest,
  dedupeDeliveries,
  DESTINATION_ACCOUNTS,
  DESTINATIONS,
  selectApprovedReserve,
} from "./social-release-contract.mjs";

const source = "https://example.com/verified-source";
const topics = ["singularidad", "seguridad", "modelos_abiertos"];
const sha = (character) => character.repeat(64);

function releaseFixture(topic, index, revision = 2) {
  const contentId = `social_20260801_${topic}`;
  const copy = {
    instagram: `Información verificada sobre ${topic}. Fuente al final.`,
    facebook: `Información verificada sobre ${topic}. Fuente al final.`,
    linkedin: `Una explicación accesible y prudente sobre ${topic}. Fuente: ${source}`,
    x: `Qué cambia con ${topic}, sin exageraciones. ${source}`,
  };
  const assets = {
    meta_carousel: Array.from({ length: 8 }, (_, slide) => ({
      url: `https://www.olmondconsulting.com/social/meta/${topic}-${slide + 1}.png`,
      width: 1080,
      height: 1350,
      safe_zone_pass: true,
      asset_sha256: sha(String((slide + index) % 10)),
    })),
    linkedin_photorealistic_image: {
      url: `https://www.olmondconsulting.com/social/linkedin/${topic}.png`,
      width: 1200,
      height: 627,
      kind: "photorealistic",
      asset_sha256: sha(String((index + 8) % 10)),
    },
  };
  const sourceUrls = [source];
  const approvedManifestSha256 = approvedContentHash({ contentId, revision, copy, assets, sourceUrls });
  return buildDeliveryManifest({
    contentId,
    revision,
    approvedManifestSha256,
    publishAt: `2026-08-01T${["21:30", "22:30", "23:30"][index]}:00.000Z`,
    assets,
    copy,
    sourceUrls,
  });
}

const allDeliveries = topics.flatMap((topic, index) => releaseFixture(topic, index));
assert.equal(allDeliveries.length, 15);
for (const topic of topics) {
  const release = allDeliveries.filter((delivery) => delivery.content_id.endsWith(topic));
  assert.deepEqual(release.map((delivery) => delivery.destination), DESTINATIONS);
  assert.equal(release.every((delivery) => delivery.account_key === DESTINATION_ACCOUNTS[delivery.destination]), true);
  assert.equal(release.filter((delivery) => delivery.destination.startsWith("linkedin")).every((delivery) => delivery.media_type === "single_photorealistic_image" && delivery.media_urls.length === 1), true);
  assert.equal(release.filter((delivery) => ["instagram", "facebook"].includes(delivery.destination)).every((delivery) => delivery.media_type === "carousel_4x5" && delivery.media_urls.length === 8), true);
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

const badAssets = {
  meta_carousel: Array.from({ length: 8 }, (_, slide) => ({
    url: `https://www.olmondconsulting.com/social/meta/bad-${slide}.png`, width: 1080, height: 1350,
    safe_zone_pass: slide !== 3, asset_sha256: sha("a"),
  })),
  linkedin_photorealistic_image: {
    url: "https://www.olmondconsulting.com/social/linkedin/bad.png", width: 1200, height: 627,
    kind: "photorealistic", asset_sha256: sha("b"),
  },
};
assert.throws(() => assertAssetPreflight(badAssets), /META_PREFLIGHT_FAILED/);

const changedCopy = { instagram: "Cambio posterior", facebook: "Cambio posterior", linkedin: "Cambio", x: `Cambio ${source}` };
const validAssets = {
  meta_carousel: Array.from({ length: 8 }, (_, slide) => ({
    url: `https://www.olmondconsulting.com/social/meta/hash-${slide}.png`, width: 1080, height: 1350,
    safe_zone_pass: true, asset_sha256: sha("c"),
  })),
  linkedin_photorealistic_image: {
    url: "https://www.olmondconsulting.com/social/linkedin/hash.png", width: 1200, height: 627,
    kind: "photorealistic", asset_sha256: sha("d"),
  },
};
assert.throws(() => buildDeliveryManifest({
  contentId: "immutable", revision: 1, approvedManifestSha256: sha("e"), publishAt: "2026-08-01T21:30:00.000Z",
  assets: validAssets, copy: changedCopy, sourceUrls: [source],
}), /APPROVED_MANIFEST_MISMATCH/);

const scenarios = {
  [allDeliveries[0].delivery_id]: ["retryable_failure", "success"],
  [allDeliveries[1].delivery_id]: ["timeout_after_commit"],
};
const canary = runSocialCanary({ deliveries: allDeliveries, scenarios, maxAttempts: 3 });
assert.equal(canary.published, 15);
assert.equal(canary.failed, 0);
assert.equal(canary.submissions, 16);
assert.equal(canary.duplicate_remote_posts, 0);
assert.equal(canary.ledger.find((row) => row.delivery_id === allDeliveries[1].delivery_id).attempts, 1);

const reserve = {
  reserve_id: "reserve_evergreen_01",
  state: "APPROVED",
  human_approved: true,
  valid_from: "2026-07-01T00:00:00.000Z",
  expires_at: "2026-09-01T00:00:00.000Z",
  deliveries: releaseFixture("reserva", 0, 1),
};
assert.equal(selectApprovedReserve({ reserves: [reserve], at: "2026-08-01T12:00:00.000Z" }).reserve_id, reserve.reserve_id);
assert.equal(selectApprovedReserve({ reserves: [{ ...reserve, human_approved: false }], at: "2026-08-01T12:00:00.000Z" }), null);
assert.equal(selectApprovedReserve({ reserves: [reserve], at: "2026-08-01T12:00:00.000Z", usedReserveIds: new Set([reserve.reserve_id]) }), null);

assertDailyBudget(
  { topics: 3, ai_calls: 6, ai_tokens: 60_000, n8n_executions: 20 },
  { max_topics: 3, max_ai_calls: 6, max_ai_tokens: 60_000, max_n8n_executions: 20 },
);
assert.throws(() => assertDailyBudget(
  { topics: 3, ai_calls: 7, ai_tokens: 60_000, n8n_executions: 20 },
  { max_topics: 3, max_ai_calls: 6, max_ai_tokens: 60_000, max_n8n_executions: 20 },
), /DAILY_BUDGET_EXCEEDED:ai_calls/);

console.log("Contrato validado: 3 temas, 15 destinos, revisión inmutable, activos, cuentas, fallos, reserva y presupuesto.");
