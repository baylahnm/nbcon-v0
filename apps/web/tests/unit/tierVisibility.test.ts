import { describe, it, expect } from "vitest";
import { hasTierAccess, tierHierarchy } from "../../src/config/tierVisibility";

describe("Tier Visibility", () => {
  it("should allow higher tier access to lower tier features", () => {
    expect(hasTierAccess("pro", "free")).toBe(true);
    expect(hasTierAccess("pro", "basic")).toBe(true);
    expect(hasTierAccess("enterprise", "pro")).toBe(true);
  });

  it("should deny lower tier access to higher tier features", () => {
    expect(hasTierAccess("free", "pro")).toBe(false);
    expect(hasTierAccess("basic", "enterprise")).toBe(false);
  });

  it("should allow same tier access", () => {
    expect(hasTierAccess("pro", "pro")).toBe(true);
    expect(hasTierAccess("free", "free")).toBe(true);
  });

  it("should have correct hierarchy order", () => {
    expect(tierHierarchy).toEqual(["free", "basic", "pro", "enterprise"]);
  });
});

