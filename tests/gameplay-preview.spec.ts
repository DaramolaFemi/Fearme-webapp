import { test, expect } from "@playwright/test";

const fluxVisual = ".project.flux-form .project-visual";

test("Flux preview autoplays only when its featured card is in view", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const visual = page.locator(fluxVisual);
  const video = visual.locator("video");
  await expect(page.locator("video")).toHaveCount(1);
  await expect(video).not.toHaveAttribute("src");
  await visual.scrollIntoViewIfNeeded();
  await expect(video).toHaveClass(/is-playing/);
  await expect(video).toHaveAttribute("src", "/Video/flux-form-feature-loop.mp4");
  await expect(video).toHaveAttribute("poster", /flux-form-feature-poster/);
  expect(
    await video.evaluate((el) => ({
      muted: el.muted,
      controls: el.controls,
      inline: el.playsInline,
      loop: el.loop,
    })),
  ).toEqual({ muted: true, controls: false, inline: true, loop: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(video).not.toHaveClass(/is-playing/);
});

test("Project Lab keeps Zer0 Lane preview intent-driven on desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: /Open the Project Lab/ }).click();
  const visual = page.locator(".project.neon .project-visual");
  const video = visual.locator("video");
  await visual.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(video).not.toHaveAttribute("src");
  await visual.hover();
  await expect(video).toHaveClass(/is-playing/);
  await expect(video).toHaveAttribute("src", "/Video/zer0-lane-gameplay.mp4");
  await page.mouse.move(0, 0);
  await expect(video).not.toHaveClass(/is-playing/);
});

for (const width of [390, 768]) {
  test(`Flux preview plays in view on touch at ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto("/");
    const visual = page.locator(fluxVisual);
    const video = visual.locator("video");
    await expect(video).not.toHaveAttribute("src");
    await visual.scrollIntoViewIfNeeded();
    await expect(video).toHaveClass(/is-playing/);
    const box = await visual.boundingBox();
    expect(box!.width / box!.height).toBeGreaterThan(1.4);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(video).not.toHaveClass(/is-playing/);
    await context.close();
  });
}

for (const preference of ["reduced motion", "save data"]) {
  test(`${preference} keeps Flux on its poster without requesting video`, async ({
    page,
  }) => {
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".mp4")) requests.push(request.url());
    });
    if (preference === "reduced motion")
      await page.emulateMedia({ reducedMotion: "reduce" });
    else
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: Object.assign(new EventTarget(), { saveData: true }),
        }),
      );
    await page.goto("/");
    const visual = page.locator(fluxVisual);
    await visual.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(visual.locator("video")).not.toHaveAttribute("src");
    await expect(visual.locator("img")).toBeVisible();
    expect(requests).toEqual([]);
  });
}
