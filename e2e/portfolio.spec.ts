import { test, expect } from "@playwright/test";

/**
 * The window-canvas homepage is gone, so the tests that poked at
 * [data-testid="window-*"] went with it. What survives is the route level,
 * which is concept independent, plus three regressions that encode bugs this
 * redesign actually shipped and fixed.
 */

test.describe("home", () => {
  test("greets, and offers the two ways in", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Hi, this is María")).toBeVisible();
    await expect(page.getByRole("button", { name: "Projects", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Email Mar/i })).toBeVisible();
  });

  test("projects panel opens and lists the work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Projects", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("heading", { name: /What I am building/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("about opens from her face, not from a key", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /About Mar/i }).click();
    await expect(page.getByRole("heading", { name: /Neuroscience, then AI/i })).toBeVisible();
  });

  /* Regression: the old homepage was a fixed 1340px stage, so it was clipped
     between lg and 1340px and invisible below lg. */
  test("never scrolls sideways, at any width", async ({ page }) => {
    for (const width of [375, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForTimeout(600);
      const overflow = await page.evaluate(
        (want) => document.documentElement.scrollWidth - want,
        width
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
    }
  });

  /* Regression: the old canvas gated every affordance behind
     `motionOK && !touch`, so nothing worked on a phone. */
  test("every way in works on touch", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.getByRole("button", { name: "Projects", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});

test.describe("project pages", () => {
  for (const slug of ["tumai", "roomiescore", "neuro-ad-analyzer", "neuropop", "redae-capital", "angel-match"]) {
    test(`${slug} renders and links back`, async ({ page }) => {
      await page.goto(`/work/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.getByRole("link", { name: /back to portfolio/i }).first().click();
      await expect(page).toHaveURL(/\/$/);
    });
  }

  test("unknown project returns 404", async ({ page }) => {
    const res = await page.goto("/work/not-a-real-project");
    expect(res?.status()).toBe(404);
  });
});

test.describe("resume", () => {
  test("renders with employment history and a print button", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByText(/employment history/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /download|print|pdf/i })).toBeVisible();
  });
});

/* The design rules the copy has to keep, checked mechanically rather than
   remembered: no em or en dashes, and the middot is never a default separator. */
test.describe("copy", () => {
  for (const path of ["/", "/work/tumai", "/resume"]) {
    test(`${path} has no long dashes and no middot pile-up`, async ({ page }) => {
      await page.goto(path);
      const text = await page.evaluate(() => document.body.innerText);
      expect(text, "long dash found").not.toMatch(/[—–]/);
      const busy = text.split("\n").filter((l) => (l.match(/·/g) || []).length > 1);
      expect(busy, `lines with more than one middot: ${busy.join(" | ")}`).toHaveLength(0);
    });
  }
});
