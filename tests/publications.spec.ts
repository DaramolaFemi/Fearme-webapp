import { readFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const personId = "https://fearme.xyz/#person";

test("publication evidence and author identities are available without JavaScript", async ({
  browser,
  request,
}) => {
  const config = JSON.parse(
    await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  );
  expect(
    config.rewrites.find(
      (rule: { source: string }) => rule.source === "/publications",
    ).destination,
  ).toBe("/publications/index.html");
  const response = await request.get("/publications/index.html");
  expect(response.status()).toBe(200);
  const html = await response.text();
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1],
  );
  const person = schema["@graph"].find(
    (item: { "@type": string }) => item["@type"] === "Person",
  );
  expect(person["@id"]).toBe(personId);
  expect(person.alternateName).toEqual(["Femi Daramola", "Daramola O. Femi"]);
  expect(person.sameAs).toContain("https://github.com/DaramolaFemi");
  const collection = schema["@graph"].find(
    (item: { "@type": string }) => item["@type"] === "CollectionPage",
  );
  const entries = collection.mainEntity.itemListElement;
  expect(entries).toHaveLength(3);
  expect(entries[0].item.author["@id"]).toBe(personId);
  expect(entries[2].item.contributor["@id"]).toBe(personId);
  expect(entries[2].item.author).toBeUndefined();

  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(response.url());
  await expect(
    page.getByRole("heading", { name: "Publications", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main article")).toHaveCount(3);
  await expect(
    page.getByRole("link", { name: "Read the magazine (PDF)" }),
  ).toHaveAttribute("href", /wsa-november-2020-edition\.pdf#page=30$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://fearme.xyz/publications",
  );
  await context.close();
});

for (const width of [320, 390, 1440]) {
  test(`publications navigation, accessibility, and theme at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.getByRole("link", { name: "Publications & credits" }).click();
    await expect(page).toHaveURL(/\/publications$/);
    await expect(page).toHaveTitle("Publications | Daramola Femi");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "index, follow, max-image-preview:large",
    );
    await expect(page.locator("main article")).toHaveCount(3);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.getByRole("switch", { name: "Dark mode" }).click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Publications", exact: true }),
    ).toBeVisible();
    await page.screenshot({
      path: `test-results/publications-${width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("link", { name: "Read the poem in my archive" })
      .click();
    await expect(page).toHaveTitle("He Took the One I Wed — Daramola Femi");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("published poem metadata connects to the same author and the magazine", async ({
  request,
}) => {
  const response = await request.get(
    "/poetry/he-took-the-one-i-wed/index.html",
  );
  const html = await response.text();
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1],
  );
  const poem = schema["@graph"].find(
    (item: { "@type": string }) => item["@type"] === "CreativeWork",
  );
  expect(poem.author["@id"]).toBe(personId);
  expect(poem.isPartOf.name).toBe("Writers Space Africa, November 2020");
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "https://fearme.xyz/publications",
  );
});
