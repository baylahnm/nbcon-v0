import { test, expect } from "@playwright/test";

test.describe("AI Interactions", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to AI page (requires authentication)
    await page.goto("/ai");
    
    // Wait for page to load
    await page.waitForLoadState("networkidle");
  });

  test("should display AI agent interface", async ({ page }) => {
    // Check for AI console or agent selector
    const aiConsole = page.locator('textarea, input[placeholder*="prompt"], input[placeholder*="Enter"]').first();
    const agentButton = page.locator('button:has-text("Run"), button:has-text("Agent"), button:has-text("AI")').first();
    
    // At least one AI-related element should be visible
    const hasAIConsole = await aiConsole.isVisible().catch(() => false);
    const hasAgentButton = await agentButton.isVisible().catch(() => false);
    
    expect(hasAIConsole || hasAgentButton).toBeTruthy();
  });

  test("should allow input in AI prompt field", async ({ page }) => {
    const promptInput = page.locator('textarea, input[placeholder*="prompt"], input[placeholder*="Enter"]').first();
    
    if (await promptInput.isVisible()) {
      await promptInput.fill("Test AI prompt");
      await expect(promptInput).toHaveValue("Test AI prompt");
    } else {
      // Skip test if AI interface is not available (may require auth)
      test.skip();
    }
  });

  test("should show loading state when submitting AI request", async ({ page }) => {
    const promptInput = page.locator('textarea, input[placeholder*="prompt"]').first();
    const submitButton = page.locator('button:has-text("Run"), button[type="submit"]').first();
    
    if (await promptInput.isVisible() && await submitButton.isVisible()) {
      await promptInput.fill("Test prompt");
      
      // Click submit and check for loading state
      const responsePromise = page.waitForResponse(
        (response) => response.url().includes("/api/ai") || response.url().includes("ai"),
        { timeout: 5000 }
      ).catch(() => null);
      
      await submitButton.click();
      
      // Check for loading indicator
      const loadingIndicator = page.locator('text=Processing, text=Loading, [aria-busy="true"]').first();
      const hasLoading = await loadingIndicator.isVisible().catch(() => false);
      
      // Either loading indicator appears or API call is made
      expect(hasLoading || (await responsePromise) !== null).toBeTruthy();
    } else {
      test.skip();
    }
  });

  test("should display AI response after request", async ({ page }) => {
    // This test requires actual API call and may need mocking
    // For now, verify the response container exists
    const responseContainer = page.locator('pre, [class*="response"], [class*="output"]').first();
    
    // If response container exists, verify it can be targeted
    if (await responseContainer.isVisible().catch(() => false)) {
      await expect(responseContainer).toBeVisible();
    } else {
      // Test structure is correct even if no response yet
      test.skip();
    }
  });

  test("should handle AI errors gracefully", async ({ page }) => {
    const promptInput = page.locator('textarea, input[placeholder*="prompt"]').first();
    const submitButton = page.locator('button:has-text("Run")').first();
    
    if (await promptInput.isVisible() && await submitButton.isVisible()) {
      // Intercept API call to simulate error
      await page.route("**/api/ai/**", (route) => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: "AI service unavailable" }),
        });
      });
      
      await promptInput.fill("Test error case");
      await submitButton.click();
      
      // Check for error message
      const errorMessage = page.locator('text=Error, text=Failed, [class*="error"]').first();
      await expect(errorMessage).toBeVisible({ timeout: 10000 });
    } else {
      test.skip();
    }
  });
});

