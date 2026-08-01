import crypto from "node:crypto";

export const DESTINATIONS = [
  "instagram",
  "facebook",
  "linkedin_personal",
  "linkedin_company",
  "x",
];

export const DESTINATION_ACCOUNTS = Object.freeze({
  instagram: "olmond_instagram",
  facebook: "olmond_facebook",
  linkedin_personal: "patricio_linkedin",
  linkedin_company: "olmond_linkedin",
  x: "patricio_x",
});

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

const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const isOlmondAsset = (value, folder) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && ["olmondconsulting.com", "www.olmondconsulting.com"].includes(url.hostname)
      && url.pathname.startsWith(`/social/${folder}/`)
      && url.pathname.endsWith(".png");
  } catch {
    return false;
  }
};

const assertSha256 = (value, error) => {
  if (!/^[a-f0-9]{64}$/.test(value || "")) throw new Error(error);
};

export function approvedContentHash({ contentId, revision, copy, assets, sourceUrls }) {
  return manifestHash({ content_id: contentId, revision, copy, assets, source_urls: sourceUrls });
}

export function assertAssetPreflight(assets) {
  const metaSlides = assets?.meta_carousel;
  const linkedin = assets?.linkedin_photorealistic_image;
  if (!Array.isArray(metaSlides) || metaSlides.length !== 8) throw new Error("INVALID_META_CAROUSEL_COUNT");
  for (const slide of metaSlides) {
    if (!isOlmondAsset(slide?.url, "meta")) throw new Error("INVALID_META_CAROUSEL_URL");
    if (slide.width !== 1080 || slide.height !== 1350 || slide.safe_zone_pass !== true) throw new Error("META_PREFLIGHT_FAILED");
    assertSha256(slide.asset_sha256, "INVALID_META_ASSET_HASH");
  }
  if (!isOlmondAsset(linkedin?.url, "linkedin")) throw new Error("INVALID_LINKEDIN_IMAGE_URL");
  if (linkedin.kind !== "photorealistic" || linkedin.width < 1200 || linkedin.height < 627) throw new Error("LINKEDIN_PREFLIGHT_FAILED");
  assertSha256(linkedin.asset_sha256, "INVALID_LINKEDIN_ASSET_HASH");
  if (metaSlides.some((slide) => slide.url === linkedin.url)) throw new Error("INVALID_LINKEDIN_IMAGE");
  return true;
}

export function assertTransition(from, to) {
  if (!RELEASE_TRANSITIONS[from]?.includes(to)) throw new Error(`INVALID_STATE_TRANSITION:${from}->${to}`);
  return true;
}

export function buildDeliveryManifest({ contentId, revision, approvedManifestSha256, publishAt, assets, copy, sourceUrls }) {
  if (!contentId || !Number.isInteger(revision) || revision < 1) throw new Error("INVALID_RELEASE_IDENTITY");
  assertSha256(approvedManifestSha256, "INVALID_APPROVED_MANIFEST");
  if (!Number.isFinite(Date.parse(publishAt))) throw new Error("INVALID_PUBLISH_AT");
  assertAssetPreflight(assets);
  if (!Array.isArray(sourceUrls) || sourceUrls.length < 1 || !sourceUrls.every(isHttpsUrl)) throw new Error("VERIFIED_SOURCE_REQUIRED");
  if (!copy?.instagram || !copy?.facebook || !copy?.linkedin || !copy?.x) throw new Error("MISSING_PLATFORM_COPY");
  if (copy.instagram !== copy.facebook) throw new Error("META_COPY_MISMATCH");
  if (copy.x.length > 280) throw new Error("X_COPY_TOO_LONG");
  if (!/https:\/\//.test(copy.x)) throw new Error("X_SOURCE_LINK_REQUIRED");

  const expectedApprovalHash = approvedContentHash({ contentId, revision, copy, assets, sourceUrls });
  if (expectedApprovalHash !== approvedManifestSha256) throw new Error("APPROVED_MANIFEST_MISMATCH");

  const metaCarousel = assets.meta_carousel.map((slide) => slide.url);
  const linkedinImage = assets.linkedin_photorealistic_image.url;

  const common = {
    content_id: contentId,
    revision,
    approved_manifest_sha256: approvedManifestSha256,
    publish_at: publishAt,
    source_urls: [...sourceUrls],
  };
  const deliveries = [
    { ...common, destination: "instagram", copy: copy.instagram, media_type: "carousel_4x5", media_urls: metaCarousel },
    { ...common, destination: "facebook", copy: copy.facebook, media_type: "carousel_4x5", media_urls: metaCarousel },
    { ...common, destination: "linkedin_personal", copy: copy.linkedin, media_type: "single_photorealistic_image", media_urls: [linkedinImage] },
    { ...common, destination: "linkedin_company", copy: copy.linkedin, media_type: "single_photorealistic_image", media_urls: [linkedinImage] },
    { ...common, destination: "x", copy: copy.x, media_type: "none", media_urls: [] },
  ];
  return deliveries.map((delivery) => ({
    ...delivery,
    account_key: DESTINATION_ACCOUNTS[delivery.destination],
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

export function selectApprovedReserve({ reserves, at, usedReserveIds = new Set() }) {
  const now = Date.parse(at);
  if (!Number.isFinite(now)) throw new Error("INVALID_RESERVE_TIME");
  const eligible = reserves.filter((reserve) => {
    const deliveries = reserve.deliveries || [];
    const destinations = new Set(deliveries.map((delivery) => delivery.destination));
    const manifestHashes = new Set(deliveries.map((delivery) => delivery.approved_manifest_sha256));
    return reserve.state === "APPROVED"
      && reserve.human_approved === true
      && !usedReserveIds.has(reserve.reserve_id)
      && Date.parse(reserve.valid_from) <= now
      && now < Date.parse(reserve.expires_at)
      && deliveries.length === DESTINATIONS.length
      && manifestHashes.size === 1
      && deliveries.every((delivery) => delivery.account_key === DESTINATION_ACCOUNTS[delivery.destination])
      && DESTINATIONS.every((destination) => destinations.has(destination));
  });
  eligible.sort((a, b) => Date.parse(a.expires_at) - Date.parse(b.expires_at));
  return eligible[0] || null;
}
