import { test, expect } from "@playwright/test";

const visualSelector = ".project.neon .project-visual";

test("desktop preview loads on intent, supports focus, and preserves geometry", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const visual = page.locator(visualSelector);
  const video = visual.locator("video");
  await expect(page.locator("video")).toHaveCount(1);
  await expect(video).not.toHaveAttribute("src");
  await visual.scrollIntoViewIfNeeded();
  await expect
    .poll(() => visual.locator("img").evaluate((img) => img.naturalWidth))
    .toBeGreaterThan(0);
  await page.waitForTimeout(1000);
  await expect(video).not.toHaveAttribute("src");
  const geometry = () =>
    visual.evaluate((el) => ({
      width: el.offsetWidth,
      height: el.offsetHeight,
      top: el.offsetTop,
      left: el.offsetLeft,
    }));
  const before = await geometry();
  await visual.hover();
  await expect(video).toHaveClass(/is-playing/);
  await expect
    .poll(() => video.evaluate((el) => el.currentTime))
    .toBeGreaterThan(0);
  expect(await geometry()).toEqual(before);
  expect(
    await video.evaluate((el) => ({
      muted: el.muted,
      controls: el.controls,
      inline: el.playsInline,
      loop: el.loop,
    })),
  ).toEqual({ muted: true, controls: false, inline: true, loop: true });
  await expect(video).toHaveAttribute("poster", /zer0-lane-redesign/);
  await page.mouse.move(0, 0);
  await expect(video).not.toHaveClass(/is-playing/);
  expect(await video.evaluate((el) => el.paused)).toBe(true);
  const link = visual.locator("a");
  await link.focus();
  await expect(video).toHaveClass(/is-playing/);
  await expect(link).toHaveAttribute(
    "href",
    "https://neo-game-omega.vercel.app/",
  );
  await expect(link).toHaveAttribute("target", "_blank");
  await page.keyboard.press("Tab");
  await expect(video).not.toHaveClass(/is-playing/);
});

for (const width of [390, 768]) {
  test(`touch preview plays only in view at ${width}px`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto("/");
    const visual = page.locator(visualSelector);
    const video = visual.locator("video");
    await expect(video).not.toHaveAttribute("src");
    await visual.scrollIntoViewIfNeeded();
    await expect(video).toHaveClass(/is-playing/);
    const box = await visual.boundingBox();
    expect(box!.width / box!.height).toBeCloseTo(width === 390 ? 1.3 : 1.5, 2);
    const fitting = await visual.evaluate((el) =>
      [el.querySelector("img")!, el.querySelector("video")!].map((media) => ({
        fit: getComputedStyle(media).objectFit,
        position: getComputedStyle(media).objectPosition,
      })),
    );
    expect(fitting[0]).toEqual(fitting[1]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(video).not.toHaveClass(/is-playing/);
    expect(await video.evaluate((el) => el.paused)).toBe(true);
    await context.close();
  });
}

for (const preference of ["reduced motion", "save data"]) {
  test(`${preference} keeps the poster without requesting video`, async ({
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
    const visual = page.locator(visualSelector);
    await visual.scrollIntoViewIfNeeded();
    await visual.hover();
    await visual.locator("a").focus();
    await page.waitForTimeout(500);
    await expect(visual.locator("video")).not.toHaveAttribute("src");
    await expect(visual.locator("video")).not.toHaveClass(/is-playing/);
    await expect(visual.locator("img")).toBeVisible();
    expect(requests).toEqual([]);
  });
}

test("rejected playback retains the poster without a retry loop", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      return Promise.reject(
        new DOMException("Playback blocked", "NotAllowedError"),
      );
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const visual = page.locator(visualSelector);
  await visual.hover();
  await page.waitForTimeout(500);
  await expect(visual.locator("video")).not.toHaveClass(/is-playing/);
  await expect(visual.locator("img")).toBeVisible();
  expect(errors).toEqual([]);
});
