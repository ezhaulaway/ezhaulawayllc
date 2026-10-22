// Regenerates public/sitemap.xml from src/content/live-pages.ts: bun scripts/build-sitemap.ts
import { writeFileSync } from "node:fs";
import { liveUrlPaths } from "../src/content/live-pages";
const BASE = "https://www.ezhaulawayllc.com";
const body = liveUrlPaths().map((p) => `  <url><loc>${BASE}${p}</loc></url>`).join("\n");
writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(liveUrlPaths().length, "URLs");
