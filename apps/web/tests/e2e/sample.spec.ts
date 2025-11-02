import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/NBCON/i);
  });

  test("should display navigation", async ({ page }) => {
    await page.goto("/");
    // Add assertions based on your actual UI
  });
});

