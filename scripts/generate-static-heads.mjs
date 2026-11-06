import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderPage } from "../.prerender/entry-prerender.js";

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
    path: "/",
    title: "Daramola Femi | Software Engineer, Technical Writer & Poet",
    description:
      "Daramola Femi is a software engineer, technical writer, and poet based in Nigeria. Explore his software projects, documentation, and poetry.",
  },
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
      "A live client website for Immortal Craft in Las Vegas: design, Next.js development, UX writing, and SQUIRE booking by Daramola Femi.",
  },
  ...[
    {
      slug: "the-boy-who-writes",
      title: "The Boy Who Writes",
      year: 2026,
      description:
        "The Boy Who Writes, a poem by Daramola Femi about a young writer caught between poetry, code, survival, memory, and the life he might have lived.",
    },
    {
      slug: "love-letters-to-grief",
      title: "Love Letters to Grief",
      year: 2026,
      description:
        "Love Letters to Grief, a five-part poem by Daramola Femi about separation, handwritten promises, bargaining with loss, and learning to let the gone remain gone.",
    },
    {
      slug: "bones-and-flowers",
      title: "Bones and Flowers",
      year: 2026,
      description:
        "Bones and Flowers, a poem by Daramola Femi about love surviving burial, memory held in the body, and tenderness blooming from death and decay.",
    },
    {
      slug: "dreams",
      title: "Dreams",
      year: 2023,
      description:
        "Dreams, a short poem by Daramola Femi about a child, an unrealised future, and the devastating distance between hope and survival.",
    },
    {
      slug: "he-took-the-one-i-wed",
      title: "He Took the One I Wed",
      year: 2019,
      description:
        "He Took the One I Wed, a dirge by Daramola Femi confronting Death after the loss of a beloved wife, first published in Writers Space Africa.",
    },
    {
      slug: "good-mourning",
      title: "Good Mo(u)rning.",
      year: 2023,
      description:
        "Good Mo(u)rning, a short poem by Daramola Femi in which morning arrives violently and the natural world becomes an unsettling scene of grief.",
    },
    {
      slug: "a-graveyard-for-lovers",
      title: "A Graveyard for Lovers",
      year: 2026,
      description:
        "A Graveyard for Lovers, a poem by Daramola Femi about devotion, mortality, memory, and a love imagined beyond burial and the limits of time.",
    },
    {
      slug: "a-minutes-silence",
      title: "A Minute's Silence",
      year: 2024,
      description:
        "A Minute's Silence, a poem by Daramola Femi remembering lost love, victims of violence, the dead, the disappeared, and the grief carried by the living.",
    },
  ].map(({ slug, title, year, description }) => ({
    path: `/poetry/${slug}`,
    title: `${title} — Daramola Femi`,
    description,
    year,
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
  if (page.path === "/") {
    graph["@graph"].push({
      "@type": "ProfilePage",
      "@id": `${url}#profile`,
      url,
      name: page.title,
      description: page.description,
      mainEntity: author,
      isPartOf: { "@id": "https://fearme.xyz/#website" },
      inLanguage: "en",
    });
  } else if (isPublications) {
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
  } else if (page.path.startsWith("/poetry/")) {
    graph["@graph"].push({
      "@type": "CreativeWork",
      "@id": `${url}#poem`,
      url,
      name: page.title.replace(/ — Daramola Femi$/, ""),
      description: page.description,
      author,
      genre: "Poetry",
      inLanguage: "en",
      dateCreated: String(page.year),
      isPartOf: { "@id": "https://fearme.xyz/#website" },
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
  } else if (page.path === "/work/immortal-craft") {
    graph["@graph"].push({
      "@type": "Article",
      "@id": `${url}#case-study`,
      url,
      headline: "Immortal Craft website case study",
      description: page.description,
      author,
      about: {
        "@type": "WebSite",
        name: "Immortal Craft Barber Lounge",
        url: "https://www.immortalcraftbarbers.com/",
      },
      isPartOf: { "@id": "https://fearme.xyz/#website" },
      inLanguage: "en",
    });
  }
  html = html.replace(
    graphMatch[0],
    `<script type="application/ld+json">${JSON.stringify(graph).replaceAll("<", "\\u003c")}</script>`,
  );

  // Replace the root contents only; preserve the existing SEO and security setup.
  const rootStart = html.indexOf('<div id="root">');
  const rootEnd = html.indexOf("<noscript", rootStart);
  if (rootStart < 0 || rootEnd < 0)
    throw new Error("Missing application root template");
  html =
    html.slice(0, rootStart) +
    `<div id="root">${renderPage(page.path)}</div>\n    ` +
    html.slice(rootEnd);
  html = html.replace(/<noscript[\s\S]*?<\/noscript\s*>/, "");
  // Lazy route styles must also be present before JavaScript executes.
  const stylePrefix =
    page.path === "/"
      ? "App-"
      : page.path === "/work/immortal-craft"
        ? "ImmortalCraftCaseStudy-"
        : null;
  if (stylePrefix) {
    const stylesheet = (await readdir(new URL("assets/", dist))).find(
      (file) => file.startsWith(stylePrefix) && file.endsWith(".css"),
    );
    if (!stylesheet) throw new Error(`Missing route stylesheet: ${page.path}`);
    html = html.replace(
      "</head>",
      `<link rel="stylesheet" href="/assets/${stylesheet}" /></head>`,
    );
  }

  const destination = join(dist.pathname, page.path, "index.html");
  await mkdir(join(dist.pathname, page.path), { recursive: true });
  await writeFile(destination, html);
}

console.log(`Generated ${routes.length} route-specific HTML heads.`);
