import assert from "node:assert/strict";
import { test } from "node:test";

import { observeReveals } from "../src/lib/revealMotion.js";

function fixture({ motion = true, supported = true, portrait = false } = {}) {
  const targets = [{ dataset: {} }, { dataset: {} }];
  const styles = new Map();
  let top = 900;
  if (portrait) {
    targets[0].dataset.reveal = "portrait";
    targets[0].getBoundingClientRect = () => ({ top, height: 200 });
    targets[0].style = {
      setProperty: (name, value) => styles.set(name, value),
      removeProperty: (name) => styles.delete(name),
    };
  }
  const events = new Map();
  const frames = new Map();
  let frameId = 0;
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
    disconnect() { observed.clear(); }
  }
  const root = {
    ownerDocument: { defaultView: {
      IntersectionObserver: supported ? Observer : undefined,
      matchMedia: () => preference,
      innerHeight: 1000,
      addEventListener: (name, listener) => events.set(name, listener),
      removeEventListener: (name) => events.delete(name),
      requestAnimationFrame: (callback) => { frames.set(++frameId, callback); return frameId; },
      cancelAnimationFrame: (id) => frames.delete(id),
    } },
    querySelectorAll: () => targets,
  };
  return {
    root, targets, observed, listeners, frames, events,
    get scale() { return styles.get("--olmond-portrait-scale"); },
    scroll: (nextTop) => { top = nextTop; events.get("scroll")?.(); },
    flush: () => {
      const callbacks = [...frames.values()];
      frames.clear();
      for (const callback of callbacks) callback();
    },
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

test("replays a reveal after leaving and returning to the viewport", () => {
  const state = fixture();
  const cleanup = observeReveals(state.root);
  state.enter(state.targets[0], false);
  assert.equal(state.targets[0].dataset.revealed, undefined);
  state.enter(state.targets[0]);
  assert.equal(state.targets[0].dataset.revealed, "true");
  state.enter(state.targets[0], false);
  assert.equal(state.targets[0].dataset.revealed, undefined);
  state.enter(state.targets[0]);
  assert.equal(state.targets[0].dataset.revealed, "true");
  cleanup();
  assert.equal(state.observed.size, 0);
  assert.equal(state.listeners.size, 0);
  const cleanupAgain = observeReveals(state.root);
  assert.deepEqual([...state.observed], state.targets);
  cleanupAgain();
});

test("changing motion preference stops pending reveals, including queued callbacks", () => {
  const state = fixture();
  const cleanup = observeReveals(state.root);
  state.enter(state.targets[0]);
  state.reduce();
  assert.equal(state.observed.size, 0);
  state.enter(state.targets[1]);
  assert.deepEqual(state.targets.map(t => t.dataset.revealed), [undefined, undefined]);
  cleanup();
  assert.equal(state.listeners.size, 0);
});

test("portrait follows viewport position in both directions and stops for reduced motion", () => {
  const state = fixture({ portrait: true });
  const cleanup = observeReveals(state.root);
  const portrait = state.targets[0];
  state.enter(portrait);
  state.scroll(650);
  assert.equal(state.frames.size, 1);
  state.flush();
  const intermediate = Number(state.scale);
  assert.ok(intermediate > 1 && intermediate < 1.1);
  state.scroll(400);
  state.flush();
  assert.equal(Number(state.scale), 1.1);
  state.scroll(650);
  state.flush();
  assert.equal(Number(state.scale), intermediate);
  state.enter(portrait, false);
  assert.equal(state.scale, undefined);
  state.enter(portrait);
  state.flush();
  assert.equal(Number(state.scale), intermediate);
  state.scroll(400);
  state.reduce();
  assert.equal(state.frames.size, 0);
  assert.equal(state.events.size, 0);
  assert.equal(state.scale, undefined);
  cleanup();
});
