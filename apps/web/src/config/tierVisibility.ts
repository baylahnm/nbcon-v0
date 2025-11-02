import { SubscriptionTier } from "./menuConfig";

export const tierHierarchy: SubscriptionTier[] = [
  "free",
  "basic",
  "pro",
  "enterprise",
];

export function hasTierAccess(
  userTier: SubscriptionTier,
  requiredTier: SubscriptionTier
): boolean {
  const userIndex = tierHierarchy.indexOf(userTier);
  const requiredIndex = tierHierarchy.indexOf(requiredTier);
  return userIndex >= requiredIndex;
}

export function getTierFeatures(tier: SubscriptionTier): string[] {
  const features: Record<SubscriptionTier, string[]> = {
    free: ["Dashboard", "Basic Projects", "Billing", "Settings", "Help"],
    basic: ["Dashboard", "Projects", "Billing", "Settings", "Help"],
    pro: [
      "Dashboard",
      "Projects",
      "AI Co-Pilot",
      "Team",
      "Reports",
      "Billing",
      "Settings",
      "Help",
    ],
    enterprise: [
      "Dashboard",
      "Projects",
      "AI Co-Pilot",
      "Team",
      "Reports",
      "Billing",
      "Settings",
      "Help",
      "Custom Integrations",
      "Priority Support",
    ],
  };
  return features[tier] || features.free;
}

