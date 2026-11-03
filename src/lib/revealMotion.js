/** Progressive enhancement: content is visible before JS and without motion support. */
export function observeReveals(root) {
  const view = root?.ownerDocument?.defaultView;
  if (!view?.IntersectionObserver || !view.matchMedia) return () => {};

  const preference = view.matchMedia("(prefers-reduced-motion: no-preference)");
  if (!preference.matches) return () => {};

  const targets = [...root.querySelectorAll("[data-reveal]")];
  const portrait = targets.find((target) => target.dataset.reveal === "portrait");
  const scaleProperty = "--olmond-portrait-scale";
  let frame = null;
  let active = true;

  const updatePortrait = () => {
    frame = null;
    if (!active || !preference.matches || !portrait?.dataset.revealed) return;
    const { top, height } = portrait.getBoundingClientRect();
    const position = (top + height / 2) / view.innerHeight;
    const progress = Math.max(0, 1 - Math.abs(position - 0.5) / 0.45);
    const eased = progress * progress * (3 - 2 * progress);
    portrait.style.setProperty(scaleProperty, (1 + 0.1 * eased).toFixed(4));
  };

  const schedulePortrait = () => {
    if (!active || !preference.matches || !portrait?.dataset.revealed || frame !== null) return;
    frame = view.requestAnimationFrame(updatePortrait);
  };

  const observer = new view.IntersectionObserver((entries) => {
    if (!active || !preference.matches) return;
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        target.dataset.revealed = "true";
        if (target === portrait) schedulePortrait();
      } else {
        delete target.dataset.revealed;
        if (target === portrait) portrait.style.removeProperty(scaleProperty);
      }
    }
  });

  for (const target of targets) observer.observe(target);
  if (portrait) {
    view.addEventListener("scroll", schedulePortrait, { passive: true });
    view.addEventListener("resize", schedulePortrait);
  }

  const stop = () => {
    if (!active) return;
    active = false;
    observer.disconnect();
    if (frame !== null) view.cancelAnimationFrame(frame);
    if (portrait) {
      view.removeEventListener("scroll", schedulePortrait);
      view.removeEventListener("resize", schedulePortrait);
      portrait.style.removeProperty(scaleProperty);
    }
    for (const target of targets) delete target.dataset.revealed;
  };

  const handlePreferenceChange = () => {
    if (!preference.matches) stop();
  };
  preference.addEventListener?.("change", handlePreferenceChange);

  return () => {
    stop();
    preference.removeEventListener?.("change", handlePreferenceChange);
  };
}
