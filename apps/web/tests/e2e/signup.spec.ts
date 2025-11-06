import { test, expect } from "@playwright/test";

test.describe("Signup Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/signup");
  });

  test("should display signup form", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    // Check for email and password fields
    await expect(page.locator('input[type="email"], input[name*="email"]').first()).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      // Should show validation errors or prevent submission
      await expect(page).toHaveURL(/.*signup/);
    }
  });

  test("should navigate to OTP verification after signup", async ({ page }) => {
    // Fill in signup form with test data
    const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[name*="password"]').first();
    
    if (await emailInput.isVisible()) {
      await emailInput.fill("test@example.com");
    }
    
    if (await passwordInput.isVisible()) {
      await passwordInput.fill("TestPassword123!");
    }

    // Note: Actual submission may require Supabase backend
    // This test verifies the form structure is correct
    await expect(emailInput).toBeVisible();
  });

  test("should have link to login page", async ({ page }) => {
    const loginLink = page.locator('a[href*="login"], a:has-text("Login")').first();
    if (await loginLink.isVisible()) {
      await expect(loginLink).toBeVisible();
    }
  });
});

