/** Progressive enhancement: content is visible before JS and without motion support. */
export function observeReveals(root) {
  const view = root?.ownerDocument?.defaultView;
  if (!view?.IntersectionObserver || !view.matchMedia) return () => {};

  const preference = view.matchMedia("(prefers-reduced-motion: no-preference)");
  if (!preference.matches) return () => {};

  const targets = [...root.querySelectorAll("[data-reveal]")];
  const observer = new view.IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting || !preference.matches) continue;
      if (!target.dataset.revealed) target.dataset.revealed = "true";
      observer.unobserve(target);
    }
  }, { threshold: 0.12 });

  for (const target of targets) {
    if (!target.dataset.revealed) observer.observe(target);
  }

  // Stop immediately if the OS preference changes; do not replay completed reveals.
  const handlePreferenceChange = () => {
    if (preference.matches) return;
    observer.disconnect();
    for (const target of targets) target.dataset.revealed = "static";
  };
  preference.addEventListener?.("change", handlePreferenceChange);

  return () => {
    observer.disconnect();
    preference.removeEventListener?.("change", handlePreferenceChange);
  };
}
