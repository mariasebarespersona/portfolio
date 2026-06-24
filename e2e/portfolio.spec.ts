import { test, expect } from "@playwright/test";

// The home canvas renders both a desktop (scattered) and a mobile (stacked)
// layout in the DOM, toggled by CSS. ":visible" targets whichever the current
// viewport actually shows, so these specs pass on desktop AND mobile projects.

// The canvas has continuous idle drift; reduced motion holds windows still so
// click actionability is reliable (and exercises the reduced-motion path).
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("Homepage canvas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with name and tagline", async ({ page }) => {
    await expect(page).toHaveTitle(/MarIA/);
    await expect(
      page.getByRole("heading", { name: "María Sebares" })
    ).toBeVisible();
    await expect(
      page.getByText("AI Engineer · Founder of Tumai")
    ).toBeVisible();
  });

  test("shows the intro window", async ({ page }) => {
    const intro = page.locator('[data-testid="window-intro"]:visible');
    await expect(intro).toBeVisible();
    await expect(intro.getByText("Open for client projects")).toBeVisible();
    await expect(intro.getByText("Agentic AI")).toBeVisible();
  });

  test("shows all project windows", async ({ page }) => {
    for (const id of ["tumai", "roomiescore", "neuro", "redae-capital", "neuropop"]) {
      await expect(
        page.locator(`[data-testid="window-${id}"]:visible`)
      ).toBeVisible();
    }
  });

  test("clicking a project window opens its detail page and back returns", async ({
    page,
  }) => {
    await page.locator('[data-testid="window-tumai"]:visible').click();
    await expect(page).toHaveURL("/work/tumai");
    await expect(page.getByRole("heading", { name: "Tumai" })).toBeVisible();

    await page.getByRole("link", { name: /Back to portfolio/i }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("contact CTA is present", async ({ page }) => {
    await expect(page.getByText("Let's work together")).toBeVisible();
  });

  test("top-bar links: LinkedIn and Resume", async ({ page }) => {
    await expect(page.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/maria-sebares9"
    );
    await expect(
      page.getByRole("link", { name: /Resume/i })
    ).toHaveAttribute("href", "/resume");
  });
});

test.describe("Project detail pages", () => {
  test("renders a project with summary, external link and back nav", async ({
    page,
  }) => {
    await page.goto("/work/roomiescore");
    await expect(
      page.getByRole("heading", { name: "RoomieScore" })
    ).toBeVisible();

    const openApp = page.getByRole("link", { name: /Open app/i });
    await expect(openApp).toHaveAttribute("href", /roomiescore/);
    await expect(openApp).toHaveAttribute("target", "_blank");

    await page.getByRole("link", { name: /Back to portfolio/i }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("unknown project returns 404", async ({ page }) => {
    const res = await page.goto("/work/does-not-exist");
    expect(res?.status()).toBe(404);
  });
});

test.describe("Resume Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  test("loads the resume page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "María Sebares" })
    ).toBeVisible();
    await expect(page.getByText("Professional Summary")).toBeVisible();
  });

  test("displays employment history", async ({ page }) => {
    await expect(page.getByText("IBM | London, UK")).toBeVisible();
  });

  test("has a back link to home", async ({ page }) => {
    const backLink = page.getByRole("link", { name: /Back to Portfolio/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/");
  });

  test("has a download PDF button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Download PDF/i })
    ).toBeVisible();
  });
});
