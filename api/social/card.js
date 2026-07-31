import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import { Resvg } from "@resvg/resvg-js";

const WIDTH = 1080;
const HEIGHT = 1350;
const MAX_PAYLOAD_LENGTH = 5000;
const MAX_TEXT_LENGTH = 420;

const COLORS = Object.freeze({
  background: "#08080B",
  raised: "#11131A",
  white: "#F7FAFC",
  muted: "#CBD5E0",
  magenta: "#EC4899",
  purple: "#667EEA",
  violet: "#764BA2",
});

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function decodePayload(value) {
  if (!value || value.length > MAX_PAYLOAD_LENGTH || !/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error("payload_invalid");
  }
  const decoded = JSON.parse(globalThis.Buffer.from(value, "base64url").toString("utf8"));
  const allowed = new Set(["eyebrow", "headline", "body", "bullets", "index", "total", "kind"]);
  if (!decoded || typeof decoded !== "object" || Object.keys(decoded).some((key) => !allowed.has(key))) {
    throw new Error("schema_invalid");
  }
  const strings = [decoded.eyebrow, decoded.headline, decoded.body, ...(decoded.bullets ?? [])];
  if (strings.some((entry) => String(entry ?? "").length > MAX_TEXT_LENGTH)) {
    throw new Error("text_too_long");
  }
  const bullets = Array.isArray(decoded.bullets)
    ? decoded.bullets.map((entry) => String(entry ?? "").trim()).filter(Boolean).slice(0, 4)
    : [];
  const slide = {
    eyebrow: String(decoded.eyebrow ?? "OLMOND · INTELIGENCIA APLICADA").trim().slice(0, 90),
    headline: String(decoded.headline ?? "").trim(),
    body: String(decoded.body ?? "").trim(),
    bullets,
    index: Math.max(1, Math.min(9, Number(decoded.index) || 1)),
    total: Math.max(1, Math.min(9, Number(decoded.total) || 8)),
    kind: ["cover", "content", "cta"].includes(decoded.kind) ? decoded.kind : "content",
  };
  if (!slide.headline || (!slide.body && !slide.bullets.length && slide.kind !== "cta")) {
    throw new Error("content_missing");
  }
  return slide;
}

function wrapText(text, maxChars, maxLines) {
  const words = String(text ?? "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars || !line) {
      line = candidate;
      continue;
    }
    lines.push(line);
    line = word;
    if (lines.length === maxLines - 1) break;
  }
  if (line && lines.length < maxLines) lines.push(line);
  const consumed = lines.join(" ").length;
  if (consumed < String(text ?? "").replace(/\s+/g, " ").trim().length && lines.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[.,;:!?\s]+$/u, "")}…`;
  }
  return lines;
}

function tspans(lines, x, y, lineHeight, className) {
  return lines.map((line, index) => (
    `<tspan x="${x}" y="${y + index * lineHeight}" class="${className}">${escapeXml(line)}</tspan>`
  )).join("");
}

async function renderSvg(slide) {
  const isCover = slide.kind === "cover" || slide.index === 1;
  const isCta = slide.kind === "cta" || slide.index === slide.total;
  const contentCenter = WIDTH / 2;
  const safeLeft = 180;
  const safeRight = WIDTH - safeLeft;
  const headlineLines = wrapText(slide.headline, isCover ? 22 : 27, isCover ? 4 : 3);
  const bodyLines = wrapText(slide.body, 38, 5);
  const headlineSize = isCover ? 62 : 54;
  const headlineLineHeight = isCover ? 74 : 66;
  const headlineY = isCover ? 380 : 330;
  const bodyY = headlineY + headlineLines.length * headlineLineHeight + 66;
  const bulletY = bodyY;
  const bulletMarkup = slide.bullets.map((bullet, index) => {
    const lines = wrapText(bullet, 34, 2);
    const y = bulletY + index * 96;
    return `<circle cx="222" cy="${y - 10}" r="7" fill="${COLORS.magenta}"/>`
      + `<text>${tspans(lines, 254, y, 38, "bullet")}</text>`;
  }).join("");
  const footer = `${String(slide.index).padStart(2, "0")} / ${String(slide.total).padStart(2, "0")}`;
  const accent = isCta ? COLORS.magenta : COLORS.purple;
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${COLORS.background}"/>
        <stop offset="0.62" stop-color="${COLORS.background}"/>
        <stop offset="1" stop-color="${COLORS.raised}"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${COLORS.magenta}"/>
        <stop offset="1" stop-color="${COLORS.purple}"/>
      </linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="72"/></filter>
      <style>
        text { font-family: 'Open Sans', sans-serif; }
        .eyebrow { font-size: 22px; font-weight: 700; letter-spacing: 4px; fill: ${COLORS.magenta}; }
        .headline { font-size: ${headlineSize}px; font-weight: 700; fill: ${COLORS.white}; }
        .body { font-size: 31px; font-weight: 400; fill: ${COLORS.muted}; }
        .bullet { font-size: 29px; font-weight: 400; fill: ${COLORS.white}; }
        .footer { font-size: 19px; font-weight: 700; letter-spacing: 3px; fill: ${COLORS.muted}; }
      </style>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
    <circle cx="930" cy="210" r="250" fill="${accent}" opacity="0.14" filter="url(#blur)"/>
    <circle cx="130" cy="1190" r="190" fill="${COLORS.violet}" opacity="0.10" filter="url(#blur)"/>
    <rect x="${safeLeft}" y="150" width="${safeRight - safeLeft}" height="4" rx="2" fill="url(#accent)"/>
    <text x="${contentCenter}" y="235" text-anchor="middle" class="eyebrow">${escapeXml(slide.eyebrow.toUpperCase())}</text>
    <text text-anchor="middle">${tspans(headlineLines, contentCenter, headlineY, headlineLineHeight, "headline")}</text>
    ${slide.bullets.length ? bulletMarkup : `<text text-anchor="middle">${tspans(bodyLines, contentCenter, bodyY, 45, "body")}</text>`}
    ${isCta ? `<rect x="360" y="1110" width="360" height="6" rx="3" fill="${COLORS.magenta}"/>` : ""}
    <text x="${safeLeft}" y="1235" class="footer">OLMOND CONSULTING</text>
    <text x="${safeRight}" y="1235" text-anchor="end" class="footer">${footer}</text>
  </svg>`;
}

export default async function handler(request, response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Content-Security-Policy", "default-src 'none'");
  if (!["GET", "HEAD"].includes(request.method)) {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).end();
  }
  try {
    const payload = String(request.query?.p ?? "");
    const digest = crypto.createHash("sha256").update(payload).digest("hex").slice(0, 20);
    if (String(request.query?.h ?? "") !== digest) throw new Error("hash_invalid");
    const slide = decodePayload(payload);
    response.setHeader("Content-Type", "image/png");
    response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    response.setHeader("ETag", `"${digest}"`);
    if (request.method === "HEAD") {
      return response.status(200).end();
    }
    const svg = await renderSvg(slide);
    const png = new Resvg(svg, {
      fitTo: { mode: "original" },
      font: {
        fontFiles: [
          fileURLToPath(new URL("./fonts/OpenSans-Regular.ttf", import.meta.url)),
          fileURLToPath(new URL("./fonts/OpenSans-Bold.ttf", import.meta.url)),
        ],
        loadSystemFonts: false,
        defaultFontFamily: "Open Sans",
      },
    }).render().asPng();
    return response.status(200).send(png);
  } catch {
    response.setHeader("Cache-Control", "no-store");
    return response.status(400).json({ success: false, message: "No se pudo generar la placa." });
  }
}

export { decodePayload, escapeXml, wrapText };
