import crypto from "node:crypto";

export const DESTINATIONS = [
  "instagram",
  "facebook",
  "linkedin_personal",
  "linkedin_company",
  "x",
];

export const RELEASE_TRANSITIONS = Object.freeze({
  DRAFT: ["QA_PASSED", "SUPERSEDED"],
  QA_PASSED: ["PENDING_REVIEW", "SUPERSEDED"],
  PENDING_REVIEW: ["SAVED", "REJECTED", "APPROVED", "SUPERSEDED"],
  SAVED: ["PENDING_REVIEW", "REJECTED", "APPROVED", "SUPERSEDED"],
  APPROVED: ["QUEUED", "SUPERSEDED"],
  QUEUED: ["PUBLISHING", "SUPERSEDED"],
  PUBLISHING: ["PUBLISHED", "RETRYABLE_FAILURE", "FAILED_FINAL"],
  RETRYABLE_FAILURE: ["QUEUED", "FAILED_FINAL"],
  REJECTED: [],
  SUPERSEDED: [],
  PUBLISHED: [],
  FAILED_FINAL: [],
});

const stableJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
};

export const manifestHash = (value) => crypto.createHash("sha256").update(stableJson(value)).digest("hex");

export function assertTransition(from, to) {
  if (!RELEASE_TRANSITIONS[from]?.includes(to)) throw new Error(`INVALID_STATE_TRANSITION:${from}->${to}`);
  return true;
}

export function buildDeliveryManifest({ contentId, revision, approvedManifestSha256, publishAt, assets, copy }) {
  if (!contentId || !Number.isInteger(revision) || revision < 1) throw new Error("INVALID_RELEASE_IDENTITY");
  if (!/^[a-f0-9]{64}$/.test(approvedManifestSha256)) throw new Error("INVALID_APPROVED_MANIFEST");
  if (!Number.isFinite(Date.parse(publishAt))) throw new Error("INVALID_PUBLISH_AT");

  const metaCarousel = assets?.meta_carousel_urls;
  const linkedinImage = assets?.linkedin_photorealistic_image_url;
  if (!Array.isArray(metaCarousel) || metaCarousel.length < 2 || metaCarousel.length > 10) throw new Error("INVALID_META_CAROUSEL");
  if (!metaCarousel.every((url) => /^https:\/\//.test(url))) throw new Error("INVALID_META_CAROUSEL_URL");
  if (!/^https:\/\//.test(linkedinImage || "") || metaCarousel.includes(linkedinImage)) throw new Error("INVALID_LINKEDIN_IMAGE");
  if (!copy?.instagram || !copy?.facebook || !copy?.linkedin || !copy?.x) throw new Error("MISSING_PLATFORM_COPY");
  if (copy.instagram !== copy.facebook) throw new Error("META_COPY_MISMATCH");
  if (copy.x.length > 280) throw new Error("X_COPY_TOO_LONG");
  if (!/https:\/\//.test(copy.x)) throw new Error("X_SOURCE_LINK_REQUIRED");

  const common = { content_id: contentId, revision, approved_manifest_sha256: approvedManifestSha256, publish_at: publishAt };
  const deliveries = [
    { ...common, destination: "instagram", copy: copy.instagram, media_type: "carousel_4x5", media_urls: metaCarousel },
    { ...common, destination: "facebook", copy: copy.facebook, media_type: "carousel_4x5", media_urls: metaCarousel },
    { ...common, destination: "linkedin_personal", copy: copy.linkedin, media_type: "single_photorealistic_image", media_urls: [linkedinImage] },
    { ...common, destination: "linkedin_company", copy: copy.linkedin, media_type: "single_photorealistic_image", media_urls: [linkedinImage] },
    { ...common, destination: "x", copy: copy.x, media_type: "none", media_urls: [] },
  ];
  return deliveries.map((delivery) => ({
    ...delivery,
    delivery_id: manifestHash({ contentId, revision, destination: delivery.destination, publishAt }).slice(0, 32),
  }));
}

export function dedupeDeliveries(deliveries, publishedDeliveryIds = new Set()) {
  const seen = new Set(publishedDeliveryIds);
  return deliveries.filter((delivery) => {
    if (seen.has(delivery.delivery_id)) return false;
    seen.add(delivery.delivery_id);
    return true;
  });
}

export function assertDailyBudget(usage, budget) {
  const checks = [
    ["topics", usage.topics, budget.max_topics],
    ["ai_calls", usage.ai_calls, budget.max_ai_calls],
    ["ai_tokens", usage.ai_tokens, budget.max_ai_tokens],
    ["n8n_executions", usage.n8n_executions, budget.max_n8n_executions],
  ];
  for (const [name, value, limit] of checks) {
    if (!Number.isFinite(value) || !Number.isFinite(limit) || value > limit) throw new Error(`DAILY_BUDGET_EXCEEDED:${name}`);
  }
  return true;
}
