import assert from "node:assert/strict";
import test from "node:test";

import { normalizeRequest, normalizeSourceUrls, tokenOf, webhookUrl } from "./control.js";

test("normalizes one to three planned topics without losing editorial instructions", () => {
  const result = normalizeRequest({
    mode: "manual",
    client_request_nonce: "56d133fd-36d5-4e20-a96d-98f49765b514",
    topics: [{
      requested_topic: "La IA está alterando la división cotidiana del trabajo",
      editorial_instructions: "Informar con lenguaje accesible y fuentes primarias.",
      slot_key: "s1",
      scheduled_at: "2026-08-01T18:30:00-03:00",
      source_urls: ["https://example.com/source"],
    }],
  });

  assert.equal(result.mode, "manual");
  assert.equal(result.request_version, 1);
  assert.equal(result.topics[0].slot_key, "s1");
  assert.equal(result.topics[0].scheduled_at, "2026-08-01T21:30:00.000Z");
  assert.match(result.request_sha256, /^[a-f0-9]{64}$/);
});

test("urgent topics receive isolated slot keys and no stale schedule", () => {
  const result = normalizeRequest({
    mode: "urgent",
    client_request_nonce: "56d133fd-36d5-4e20-a96d-98f49765b514",
    topics: [{ requested_topic: "Una noticia relevante verificada en las últimas horas" }],
  });

  assert.equal(result.topics[0].slot_key, "urgent_56d133fd-36d_1");
  assert.equal(result.topics[0].scheduled_at, "");
  assert.equal(result.topics[0].priority, 100);
});

test("rejects unsafe sources, invalid tokens and untrusted webhook destinations", () => {
  assert.throws(() => normalizeSourceUrls(["http://example.com"]), /source_url_invalid/);
  assert.equal(tokenOf("short"), "");
  const previous = globalThis.process.env.N8N_SOCIAL_CONTROL_WEBHOOK_URL;
  globalThis.process.env.N8N_SOCIAL_CONTROL_WEBHOOK_URL = "https://example.com/webhook/steal";
  assert.throws(() => webhookUrl(), /invalid_webhook/);
  if (previous === undefined) delete globalThis.process.env.N8N_SOCIAL_CONTROL_WEBHOOK_URL;
  else globalThis.process.env.N8N_SOCIAL_CONTROL_WEBHOOK_URL = previous;
});

test("rejects more than three topics", () => {
  assert.throws(() => normalizeRequest({
    mode: "manual",
    client_request_nonce: "56d133fd-36d5-4e20-a96d-98f49765b514",
    topics: Array.from({ length: 4 }, (_, index) => ({
      requested_topic: `Tema editorial número ${index + 1}`,
      slot_key: "s1",
      scheduled_at: "2026-08-01T18:30:00-03:00",
    })),
  }), /topics_invalid/);
});
