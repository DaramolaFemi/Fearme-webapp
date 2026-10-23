import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const origin = "https://fearme.xyz";
const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length >= 11, "All public pages must be represented");
for (const url of urls) {
  const path = new URL(url).pathname.replace(/\/$/, "");
  const html = await readFile(new URL(`../dist${path}/index.html`, import.meta.url), "utf8");
  assert.ok(/<main\b[^>]*id="[^"]+"/.test(html), `${path}: main content missing`);
  assert.ok(!html.includes('<div id="root"></div>'), `${path}: empty shell`);
  assert.ok(!html.includes("Please enable JavaScript"), `${path}: JavaScript requirement remains`);
  assert.ok(html.includes(`href="${origin}${path || "/"}"`), `${path}: canonical missing`);
  const root = html.slice(html.indexOf('<div id="root">'));
  assert.ok(!/opacity:0[;"]/.test(root), `${path}: invisible prerendered content`);
  if (path.startsWith("/poetry/")) {
    assert.ok(root.includes('class="poem-body"'), `${path}: poem missing`);
    assert.ok(root.includes("Back to selected poetry"), `${path}: return link missing`);
  }
}
const poem = await readFile(new URL("../dist/poetry/love-letters-to-grief/index.html", import.meta.url), "utf8");
for (const section of ["I.", "II.", "III.", "IV.", "V."]) assert.ok(poem.includes(`<p>${section}</p>`));
assert.ok(poem.includes("Isn’t that what friends do?"), "Final stanza missing");
assert.ok(poem.includes("love-letters-to-grief.avif"), "Letter artwork missing");
assert.ok(poem.includes('href="/poetry/the-boy-who-writes"'), "Previous poem missing");
assert.ok(poem.includes('href="/poetry/bones-and-flowers"'), "Next poem missing");
console.log(`Verified initial HTML, canonicals, and readable content for ${urls.length} public pages.`);
