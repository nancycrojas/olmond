import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import academyHead from "../../scripts/geo-source/academy-head.html?raw";
import diagnosisHead from "../../scripts/geo-source/diagnostico-head.html?raw";
import homeHead from "../../scripts/geo-source/head.html?raw";
import workshopHead from "../../scripts/geo-source/workshop-head.html?raw";

export function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.head.querySelectorAll('title, meta[name="description"], link[rel="canonical"], meta[property^="og:"], script[type="application/ld+json"]').forEach((node) => node.remove());
    const heads = { "/": homeHead, "/diagnostico": diagnosisHead, "/academy": academyHead, "/propuesta-de-workshop": workshopHead };
    const head = heads[pathname.replace(/\/$/, "") || "/"] || "<title>Olmond Consulting</title>";
    const parsed = new DOMParser().parseFromString(head, "text/html");
    for (const node of parsed.head.children) document.head.appendChild(node.cloneNode(true));
  }, [pathname]);
  return null;
}
