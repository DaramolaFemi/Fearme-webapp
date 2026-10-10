import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url);
const source = await readFile(new URL("index.html", dist), "utf8");

const routes = [
  {
    path: "/work/immortal-craft",
    title: "Immortal Craft Case Study — Daramola Femi",
    description: "Immortal Craft: a barbershop website redesign case study by Daramola Femi.",
  },
  ...[
    ["the-boy-who-writes", "The Boy Who Writes"],
    ["bones-and-flowers", "Bones and Flowers"],
    ["dreams", "Dreams"],
    ["he-took-the-one-i-wed", "He Took the One I Wed"],
    ["good-mourning", "Good Mo(u)rning."],
    ["a-graveyard-for-lovers", "A Graveyard for Lovers"],
    ["a-minutes-silence", "A Minute's Silence"],
  ].map(([slug, title]) => ({
    path: `/poetry/${slug}`,
    title: `${title} — Daramola Femi`,
    description: `${title}, a poem by Daramola Femi.`,
  })),
];

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function replaceRequired(document, pattern, replacement) {
  if (!pattern.test(document)) throw new Error(`Missing expected SEO template tag: ${pattern}`);
  return document.replace(pattern, replacement);
}

for (const page of routes) {
  const url = `https://fearme.xyz${page.path}`;
  let html = source;
  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceRequired(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );
  for (const [key, value] of [
    ["og:title", page.title],
    ["og:description", page.description],
    ["og:url", url],
  ]) {
    const pattern = new RegExp(`<meta[^>]+property="${key}"[^>]+content="[^"]*"[^>]*>`);
    html = replaceRequired(html, pattern, `<meta property="${key}" content="${escapeHtml(value)}" />`);
  }
  for (const [key, value] of [
    ["twitter:title", page.title],
    ["twitter:description", page.description],
  ]) {
    const pattern = new RegExp(`<meta[^>]+name="${key}"[^>]+content="[^"]*"[^>]*>`);
    html = replaceRequired(html, pattern, `<meta name="${key}" content="${escapeHtml(value)}" />`);
  }
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
  );

  const destination = join(dist.pathname, page.path, "index.html");
  await mkdir(join(dist.pathname, page.path), { recursive: true });
  await writeFile(destination, html);
}

console.log(`Generated ${routes.length} route-specific HTML heads.`);
