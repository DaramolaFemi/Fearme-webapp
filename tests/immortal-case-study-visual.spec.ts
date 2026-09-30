import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 1440]) {
  test(`Immortal Craft case study visual QA at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/immortal-craft");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Before / original homepage")).toBeVisible();
    await expect(page.getByText("After / final hero experience")).toBeVisible();
    expect(
      await page.locator(".case-study").evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--case-red").trim(),
      ),
    ).toBe("var(--accent)");
    await expect(page.locator(".case-after-snapshot")).toBeVisible();
    await expect(page.locator(".case-diagnosis-list article > span")).toHaveCount(0);

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);

    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

    if (width === 390) {
      await expect(page.locator(".case-header")).not.toHaveCSS("position", "sticky");
      expect(
        await page.locator(".case-cinema").evaluate((el) => el.getBoundingClientRect().height),
      ).toBeLessThan(300);
      expect(
        await page.locator(".case-site-hero > strong").evaluate((el) => {
          const rect = el.getBoundingClientRect();
          const frame = el.closest(".case-cinema")!.getBoundingClientRect();
          return rect.right <= frame.right && rect.left >= frame.left;
        }),
      ).toBe(true);
      expect(
        await page.locator(".case-compare-after img").evaluate((el) => el.getBoundingClientRect().height),
      ).toBeLessThanOrEqual(260);
    }

    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }

    await page.screenshot({
      path: `test-results/immortal-case-study-${width}.png`,
      fullPage: true,
    });
  });
}
