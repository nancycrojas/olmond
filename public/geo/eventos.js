/* No carga analítica ni envía datos por sí solo. Integrar solo con el consentimiento/configuración de analítica existentes. */
document.addEventListener('click', function (event) {
  const link = event.target instanceof Element ? event.target.closest('a[data-geo-event]') : null;
  if (!link) return;
  const detail = {event: link.dataset.geoEvent, page_path: location.pathname};
  window.dispatchEvent(new CustomEvent('olmond:geo', {detail}));
});
