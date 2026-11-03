import assert from "node:assert/strict";
import { test } from "node:test";

import { observeReveals } from "../src/lib/revealMotion.js";

function fixture({ motion = true, supported = true } = {}) {
  const targets = [{ dataset: {} }, { dataset: {} }];
  const listeners = new Set();
  const preference = {
    matches: motion,
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
  };
  const observed = new Set();
  let notify;
  let created = 0;
  class Observer {
    constructor(callback) { notify = callback; created++; }
    observe(target) { observed.add(target); }
    unobserve(target) { observed.delete(target); }
    disconnect() { observed.clear(); }
  }
  const root = {
    ownerDocument: { defaultView: {
      IntersectionObserver: supported ? Observer : undefined,
      matchMedia: () => preference,
    } },
    querySelectorAll: () => targets,
  };
  return {
    root, targets, observed, listeners,
    get created() { return created; },
    enter: (target, isIntersecting = true) => notify([{ target, isIntersecting }]),
    reduce: () => {
      preference.matches = false;
      for (const listener of listeners) listener();
    },
  };
}

test("server rendering and unsupported browsers keep content untouched", () => {
  assert.doesNotThrow(() => observeReveals(null)());
  const state = fixture({ supported: false });
  observeReveals(state.root)();
  assert.equal(state.created, 0);
  assert.deepEqual(state.targets.map(t => t.dataset), [{}, {}]);
});

test("reduced motion creates no observer or animation state", () => {
  const state = fixture({ motion: false });
  observeReveals(state.root)();
  assert.equal(state.created, 0);
  assert.equal(state.listeners.size, 0);
  assert.deepEqual(state.targets.map(t => t.dataset), [{}, {}]);
});

test("reveals only intersecting content once and cleans up on unmount/remount", () => {
  const state = fixture();
  const cleanup = observeReveals(state.root);
  state.enter(state.targets[0], false);
  assert.equal(state.targets[0].dataset.revealed, undefined);
  state.enter(state.targets[0]);
  assert.equal(state.targets[0].dataset.revealed, "true");
  assert.deepEqual([...state.observed], [state.targets[1]]);
  cleanup();
  assert.equal(state.observed.size, 0);
  assert.equal(state.listeners.size, 0);
  const cleanupAgain = observeReveals(state.root);
  assert.deepEqual([...state.observed], [state.targets[1]]);
  cleanupAgain();
});

test("changing motion preference stops pending reveals, including queued callbacks", () => {
  const state = fixture();
  const cleanup = observeReveals(state.root);
  state.enter(state.targets[0]);
  state.reduce();
  assert.equal(state.observed.size, 0);
  state.enter(state.targets[1]);
  assert.deepEqual(state.targets.map(t => t.dataset.revealed), ["static", "static"]);
  cleanup();
  assert.equal(state.listeners.size, 0);
});
