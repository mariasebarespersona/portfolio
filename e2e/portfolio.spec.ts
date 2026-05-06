import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays the bento grid", async ({ page }) => {
    await expect(page).toHaveTitle(/MarIA/);
    await expect(page.getByText("MarIA")).toBeVisible();
    await expect(
      page.getByText("AI Engineer & Data Scientist", { exact: true })
    ).toBeVisible();
  });

  test("displays the intro card with bio", async ({ page }) => {
    await expect(page.getByText("Available for work")).toBeVisible();
    await expect(
      page.getByText("Agentic AI", { exact: true })
    ).toBeVisible();
    await expect(page.getByText("Ex-IBM Engineer")).toBeVisible();
  });

  test("displays location and languages", async ({ page }) => {
    await expect(page.getByText("London, UK")).toBeVisible();
    await expect(page.getByText("English, Spanish & French")).toBeVisible();
  });

  test("displays project cards", async ({ page }) => {
    await expect(page.getByText("RoomieScore")).toBeVisible();
    await expect(page.getByText("Neuro Ad Analyzer")).toBeVisible();
  });

  test("RoomieScore shows hackathon badge", async ({ page }) => {
    await expect(page.getByText("1st Place")).toBeVisible();
  });

  test("displays tech stack", async ({ page }) => {
    await expect(page.getByText("Tech Stack")).toBeVisible();
    await expect(page.getByText("Agentic AI (LangGraph/DSPy)")).toBeVisible();
    await expect(page.getByText("RAG & Vector DBs")).toBeVisible();
    await expect(page.getByText("AWS & Cloud Architecture")).toBeVisible();
    await expect(page.getByText("Python & FastAPI")).toBeVisible();
    await expect(page.getByText("React & Next.js")).toBeVisible();
  });

  test("displays contact section", async ({ page }) => {
    await expect(page.getByText("Let's work together")).toBeVisible();
    await expect(
      page.getByText("I'm currently open to new opportunities.")
    ).toBeVisible();
  });

  test("project links have correct hrefs", async ({ page }) => {
    const roomieLink = page.getByRole("link", { name: "Open app" }).first();
    await expect(roomieLink).toHaveAttribute("href", /roomiescore/);
    await expect(roomieLink).toHaveAttribute("target", "_blank");
  });

  test("LinkedIn link points to correct profile", async ({ page }) => {
    const linkedinLink = page.getByRole("link", { name: /LinkedIn/ });
    await expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/maria-sebares9"
    );
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  test("Resume link navigates to /resume", async ({ page }) => {
    const resumeLink = page.getByRole("link", { name: /Resume/ });
    await expect(resumeLink).toHaveAttribute("href", "/resume");
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

  test("displays skills section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Skills/i })
    ).toBeVisible();
  });

  test("has a back link to home", async ({ page }) => {
    const backLink = page.getByRole("link", { name: /Back to Portfolio/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/");
  });

  test("has a download PDF button", async ({ page }) => {
    const downloadBtn = page.getByRole("button", { name: /Download PDF/i });
    await expect(downloadBtn).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("can navigate from home to resume and back", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Resume/ }).click();
    await expect(page).toHaveURL("/resume");
    await expect(page.getByText("Professional Summary")).toBeVisible();

    await page.getByRole("link", { name: /Back to Portfolio/i }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByText("MarIA")).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("renders correctly on mobile viewport", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only test");
    await page.goto("/");
    await expect(page.getByText("MarIA")).toBeVisible();
    await expect(page.getByText("RoomieScore")).toBeVisible();
  });
});
