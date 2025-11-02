import { describe, it, expect } from "vitest";

describe("Sample Test", () => {
  it("should pass basic sanity check", () => {
    expect(2 + 2).toBe(4);
  });

  it("should validate tier hierarchy", () => {
    const tiers = ["free", "basic", "pro", "enterprise"];
    expect(tiers.indexOf("pro")).toBeGreaterThan(tiers.indexOf("free"));
  });
});

