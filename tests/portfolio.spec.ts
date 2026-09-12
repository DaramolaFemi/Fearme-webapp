import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
  });
}
test("project filters and mobile keyboard menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Websites" }).click();
  await expect(page.locator("article")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: /Bouldwood/ })).toBeVisible();
  await page.getByRole("button", { name: "All work" }).click();
  await expect(page.locator("article")).toHaveCount(5);
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await expect(page.getByRole("navigation")).toBeHidden();
});
test("contact handles success and failure without sending messages", async ({
  page,
}) => {
  await page.goto("/");
  let fail = false;
  await page.route("https://formspree.io/**", (route) =>
    route.fulfill({
      status: fail ? 500 : 200,
      contentType: "application/json",
      body: "{}",
    }),
  );
  async function fill() {
    await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
    await page
      .getByLabel("Email address", { exact: true })
      .fill("test@example.com");
    await page
      .getByLabel("A little about your project")
      .fill("A test project enquiry for validation.");
    await page.getByRole("button", { name: "Send a note" }).click();
  }
  await fill();
  await expect(page.getByRole("status")).toContainText(
    "Message sent to Daramola Femi.",
  );
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("");
  await expect(page.getByRole("status")).toContainText(
    "Thank you. I’ve received your note and will get back to you soon.",
  );
  await expect(page.getByRole("status")).toHaveAttribute("aria-live", "polite");
  await expect(page.getByRole("status")).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Message sent", exact: true }),
  ).toBeDisabled();
  await expect(page.getByLabel("Email address", { exact: true })).toHaveValue(
    "",
  );
  await expect(page.getByLabel("A little about your project")).toHaveValue("");
  fail = true;
  await fill();
  await expect(page.getByRole("alert")).toHaveText(
    "Your message could not be sent. Please try again or email me directly.",
  );
  await expect(
    page.getByText("Message sent to Daramola Femi.", { exact: true }),
  ).toHaveCount(0);
  await expect(page.getByLabel("Email address", { exact: true })).toHaveValue(
    "test@example.com",
  );
  await expect(page.getByLabel("A little about your project")).toHaveValue(
    "A test project enquiry for validation.",
  );
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Test Visitor",
  );
});

test("production security headers and assets", async ({ page }) => {
  const failures: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(message.text());
  });
  const response = await page.goto("/");
  expect(response?.headers()["content-security-policy"]).toContain(
    "script-src 'self'",
  );
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((image) => image.complete && image.naturalWidth > 0),
      ),
  ).toBe(true);
  expect(failures).toEqual([]);
});

for (const width of [390, 1440]) {
  test(`dark theme contrast and saved preference at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/");
    const toggle = page.getByRole("switch", { name: "Dark mode" });
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    await page.screenshot({
      path: `test-results/portfolio-dark-${width}.png`,
      fullPage: true,
    });
    await toggle.focus();
    await page.keyboard.press("Space");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
}
test("system theme and storage-unavailable fallback", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage disabled");
      },
    });
  });
  await page.goto("/");
  const toggle = page.getByRole("switch", { name: "Dark mode" });
  await expect(toggle).toHaveAttribute("aria-checked", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-checked", "false");
});
test("featured Bouldwood and unhosted Cedius have correct destinations", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator("article").first().getByRole("heading", { level: 3 }),
  ).toContainText("Bouldwood");
  await expect(
    page.getByRole("link", { name: "Visit Bouldwood (opens in a new tab)" }),
  ).toHaveAttribute("href", "https://bouldwood-showroom.vercel.app/");
  await expect(
    page.getByRole("link", { name: "Request a walkthrough of Cedius" }),
  ).toHaveAttribute("href", "#contact");
  await expect(page.locator(".cedius")).toContainText("not yet hosted");
  await expect(page.getByText("LexDesigns")).toHaveCount(0);
});

test("resume is the PDF and every internal link resolves", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const resumes = page.locator("a[download]");
  await expect(resumes).toHaveCount(2);
  for (const link of await resumes.all()) {
    await expect(link).toHaveAttribute("href", "/Images/CV.pdf");
    await expect(link).toHaveAttribute("download", "Daramola-Femi-CV.pdf");
  }
  const pdf = await request.get("/Images/CV.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!))) {
    await expect(page.locator(href)).toHaveCount(1);
  }
  expect(await page.locator("body").innerText()).not.toMatch(
    /[—–✳]|[\u{1F300}-\u{1FAFF}]/u,
  );
});

test("touch layouts hide arrows and fields keep readable sizing on focus", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  for (const arrow of await page.locator(".direction-arrow").all())
    await expect(arrow).toBeHidden();
  for (const field of await page
    .locator('input:not([name="_gotcha"]), textarea')
    .all()) {
    expect(
      await field.evaluate((element) =>
        parseFloat(getComputedStyle(element).fontSize),
      ),
    ).toBeGreaterThanOrEqual(16);
    await field.focus();
    await expect(field).toBeFocused();
    expect(await page.evaluate(() => window.visualViewport?.scale ?? 1)).toBe(
      1,
    );
  }
  await expect(page.locator(".contact-grid")).toHaveCSS("transform", "none");
  await expect(page.locator(".weather img")).toHaveAttribute(
    "src",
    "/Images/harmattan-desktop.png",
  );
  await context.close();
});
test("desktop actions use text and reduced motion stays static", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".direction-arrow")).toHaveCount(0);
  await expect(page.locator(".project-cta-label").first()).toBeVisible();
  expect(
    await page
      .locator(".project-open")
      .first()
      .evaluate((el) => el.getBoundingClientRect().width),
  ).toBeGreaterThan(90);
  expect(
    await page
      .locator(".project-cta-label")
      .first()
      .evaluate((el) => el.getBoundingClientRect().height),
  ).toBeLessThan(24);
  await expect(page.locator(".reading-progress")).toBeHidden();
  await expect(page.locator("h1")).toBeVisible();
});

test("navigation is quiet and each project has exactly one CTA", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("#navigation .direction-arrow")).toHaveCount(0);
  await expect(page.locator(".footer .direction-arrow")).toHaveCount(0);
  for (const project of await page.locator("article.project").all()) {
    await expect(project.locator("a")).toHaveCount(1);
    await expect(project.locator("a")).toHaveClass("project-open");
  }
  await expect(page.locator(".weather img")).toHaveAttribute(
    "src",
    "/Images/harmattan-desktop.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  for (const project of await page.locator("article.project").all()) {
    await project.scrollIntoViewIfNeeded();
    await expect(project.locator("a.project-open")).toBeVisible();
    await expect(project.locator(".project-cta-label")).toBeVisible();
    await expect(project.locator(".direction-arrow")).toBeHidden();
  }
  const footer = page.locator(".footer-copyright");
  await footer.scrollIntoViewIfNeeded();
  expect(
    await footer.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(15);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("documentation and poetry extend the editorial portfolio", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation");
  for (const section of [
    "Work",
    "Documentation",
    "Poetry",
    "About",
    "Contact",
  ]) {
    await expect(
      navigation.getByRole("link", { name: section, exact: true }),
    ).toHaveAttribute("href", `#${section.toLowerCase()}`);
  }

  await expect(page.locator("#documentation")).toContainText(
    "Cedius Developer Documentation",
  );
  await expect(page.locator("#documentation li")).toHaveCount(3);
  await expect(page.locator("#documentation a")).toHaveCount(3);

  const numberedKickers = await page
    .locator(".section-kicker > span:first-child")
    .allTextContents();
  expect(numberedKickers).toEqual([
    "01 / Selected work",
    "02 / Documentation",
    "03 / The person behind the work",
    "04 / Selected poetry",
    "05 / A conversation",
  ]);
});

for (const width of [320, 390, 1440]) {
  test(`poem reading, themes, and direct refresh at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
    await page.goto("/poetry/the-boy-who-writes");
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "The Boy Who Writes",
    );
    await expect(page).toHaveTitle("The Boy Who Writes — Daramola Femi");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "The Boy Who Writes, a poem by Daramola Femi.",
    );
    await expect(page.locator("main")).toContainText(
      "I buried a boy beneath my keyboard",
    );
    await expect(page.locator("main")).toContainText("Daramola Femi, 2026");
    await expect(
      page.getByRole("link", { name: "First published on GitHub, 2026." }),
    ).toHaveAttribute("href", "https://github.com/DaramolaFemi/Poetry");
    await expect(
      page.getByRole("link", { name: "Back to selected poetry" }),
    ).toHaveAttribute("href", "/#poetry");
    await expect(page.getByRole("link", { name: /Previous poem/ })).toHaveCount(
      0,
    );
    expect(await page.locator(".poem-body p").first().textContent()).toBe(
      "I buried a boy beneath my keyboard,\nbut every night he returns smelling of moonlight.",
    );
    for (const theme of ["light", "dark"]) {
      if (theme === "dark") await page.getByRole("switch").click();
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.getByRole("link", { name: "Next poem" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bones and Flowers",
    );
    await page.goto("/poetry/a-graveyard-for-lovers");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "A Graveyard for Lovers",
    );
    await expect(page.locator(".poem-body")).toContainText("Anike.");
    await expect(page.locator(".poem-body")).toContainText("Anike mi.");
    await expect(page.locator(".poem-body p").last()).toHaveText(
      "I will wait for you\nwhere time is buried\nand silence snores.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("poem metadata, final navigation, and missing poem", async ({ page }) => {
  await page.goto("/poetry/he-took-the-one-i-wed");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "He Took the One I Wed",
  );
  await expect(page.locator(".poem-meta")).toContainText("Dirge");
  await expect(page.locator("main")).toContainText(
    "First published in WSA Magazine, November 2020.",
  );
  await page.goto("/poetry/a-minutes-silence");
  await expect(page.getByRole("link", { name: /Next poem/ })).toHaveCount(0);
  await page.goto("/poetry/missing");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Poem not found",
  );
  await page.getByRole("link", { name: "Back to selected poetry" }).click();
  await expect(page).toHaveTitle(
    "Daramola Femi: Software Engineer & Technical Writer",
  );
  await expect(page.locator("#poetry")).toBeVisible();
});

test("seven published poems link to reading pages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#poetry li")).toHaveCount(7);
  await expect(page.locator("#poetry a")).toHaveCount(7);
  await expect(page.locator("#poetry h3")).toHaveText([
    "The Boy Who Writes",
    "Bones and Flowers",
    "Dreams",
    "He Took the One I Wed",
    "Good Mo(u)rning.",
    "A Graveyard for Lovers",
    "A Minute's Silence",
  ]);
  for (const link of await page.locator("#poetry a").all()) {
    await expect(link).toHaveAttribute("href", /^\/poetry\//);
    await expect(link).not.toHaveAttribute("target", "_blank");
  }
});

for (const width of [390, 1440]) {
  test(`return links land at poetry at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const name of ["Selected poetry", "Back to selected poetry"]) {
      await page.goto("/poetry/the-boy-who-writes");
      await page.getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(/\/#poetry$/);
      await page.evaluate(() => document.fonts.ready);
      await expect
        .poll(() =>
          page
            .locator("#poetry")
            .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
        )
        .toBeGreaterThanOrEqual(0);
      await expect
        .poll(() =>
          page
            .locator("#poetry")
            .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
        )
        .toBeLessThanOrEqual(100);
      await expect(page.locator("#poetry h2")).toBeInViewport();
      const link = page.locator("#poetry a").first();
      await expect(link).toContainText("Read poem");
      expect(
        await link.evaluate((el) => el.getBoundingClientRect().height),
      ).toBeGreaterThanOrEqual(44);
      await expect(page.locator(".direction-arrow")).toHaveCount(0);
    }
  });
}

test("a failed page download offers recovery", async ({ page }) => {
  await page.route("**/assets/App-*.js", (route) => route.abort());
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "This page could not load." }),
  ).toBeVisible();
  await page.unroute("**/assets/App-*.js");
  await page.getByRole("button", { name: "Reload page" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Code with intent.",
  );
});
