import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url);
const source = await readFile(new URL("index.html", dist), "utf8");

const publications = JSON.parse(
  await readFile(
    new URL("../src/data/publications.json", import.meta.url),
    "utf8",
  ),
);

const routes = [
  {
    path: "/publications",
    title: "Publications | Daramola Femi",
    description:
      "Poetry publication credits for Daramola Femi, also published as Femi Daramola and Daramola O. Femi, in The Dark Sire, Writers Space Africa, and Delicacies.",
  },
  {
    path: "/work/immortal-craft",
    title: "Immortal Craft Case Study — Daramola Femi",
    description:
      "Immortal Craft: a barbershop website redesign case study by Daramola Femi.",
  },
  ...[
    ["the-boy-who-writes", "The Boy Who Writes"],
    ["love-letters-to-grief", "Love Letters to Grief"],
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
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function replaceRequired(document, pattern, replacement) {
  if (!pattern.test(document))
    throw new Error(`Missing expected SEO template tag: ${pattern}`);
  return document.replace(pattern, replacement);
}

for (const page of routes) {
  const url = `https://fearme.xyz${page.path}`;
  let html = source;
  html = replaceRequired(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`,
  );
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
    const pattern = new RegExp(
      `<meta[^>]+property="${key}"[^>]+content="[^"]*"[^>]*>`,
    );
    html = replaceRequired(
      html,
      pattern,
      `<meta property="${key}" content="${escapeHtml(value)}" />`,
    );
  }
  for (const [key, value] of [
    ["twitter:title", page.title],
    ["twitter:description", page.description],
  ]) {
    const pattern = new RegExp(
      `<meta[^>]+name="${key}"[^>]+content="[^"]*"[^>]*>`,
    );
    html = replaceRequired(
      html,
      pattern,
      `<meta name="${key}" content="${escapeHtml(value)}" />`,
    );
  }
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
  );

  // Reuse the same author identity across the portfolio and each authored work.
  const graphMatch = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  if (!graphMatch) throw new Error("Missing identity structured data");
  const graph = JSON.parse(graphMatch[1]);
  const author = { "@id": "https://fearme.xyz/#person" };
  const isPublications = page.path === "/publications";
  const credits = publications.map((entry) => ({
    "@type": "CreativeWork",
    "@id": `https://fearme.xyz/publications#${entry.id}`,
    name: entry.title,
    // Delicacies is a collection with multiple contributors, not a solo book.
    [entry.kind === "Contributing poet" ? "contributor" : "author"]: author,
    url: entry.poemPath ? `https://fearme.xyz${entry.poemPath}` : entry.url,
    isPartOf:
      entry.kind === "Poem"
        ? { "@type": "CreativeWork", name: entry.publication }
        : undefined,
  }));
  if (isPublications) {
    const stylesheet = (await readdir(new URL("assets/", dist))).find((file) =>
      /^PublicationsPage-.*\.css$/.test(file),
    );
    if (!stylesheet) throw new Error("Missing publications stylesheet");
    html = html.replace(
      "</head>",
      `<link rel="stylesheet" href="/assets/${stylesheet}" /></head>`,
    );
    graph["@graph"].push({
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: page.title,
      description: page.description,
      about: author,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: credits.map((credit, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: credit,
        })),
      },
    });
    // Include the publication record in the initial HTML, even before React runs.
    const entries = publications
      .map(
        (entry) =>
          `<li id="${entry.id}"><article><p class="publications-kind">${escapeHtml(entry.kind)}</p><h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.publication)} · ${escapeHtml(entry.edition)}</p><p class="publications-byline">Published as ${escapeHtml(entry.byline)}</p><div class="publications-links"><a href="${escapeHtml(entry.url)}">${escapeHtml(entry.sourceLabel)}</a>${entry.editionUrl ? `<a href="${escapeHtml(entry.editionUrl)}">View issue listing</a>` : ""}${entry.poemPath ? `<a href="${entry.poemPath}">Read the poem in my archive</a>` : ""}</div></article></li>`,
      )
      .join("");
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><main id="main" class="publications-page" lang="en"><a href="/#poetry">Back to poetry</a><h1>Publications</h1><p class="publications-intro">I’m Daramola Femi, a software engineer, technical writer, and poet based in Nigeria. My poetry has also been published under the names Femi Daramola and Daramola O. Femi. These credits bring that work together in one place.</p><ol class="publications-list">${entries}</ol><a href="/">Explore my software and writing</a></main></div>`,
    );
  } else if (page.path.startsWith("/poetry/")) {
    graph["@graph"].push({
      "@type": "CreativeWork",
      "@id": `${url}#poem`,
      url,
      name: page.title.replace(/ — Daramola Femi$/, ""),
      author,
      ...(page.path === "/poetry/he-took-the-one-i-wed"
        ? {
            isPartOf: {
              "@type": "PublicationIssue",
              name: "Writers Space Africa, November 2020",
              url: publications.find((entry) => entry.id === "wsa").url,
            },
          }
        : {}),
    });
  }
  html = html.replace(
    graphMatch[0],
    `<script type="application/ld+json">${JSON.stringify(graph).replaceAll("<", "\\u003c")}</script>`,
  );

  const destination = join(dist.pathname, page.path, "index.html");
  await mkdir(join(dist.pathname, page.path), { recursive: true });
  await writeFile(destination, html);
}

console.log(`Generated ${routes.length} route-specific HTML heads.`);
