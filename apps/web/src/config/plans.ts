/**
 * Canonical Plans Configuration
 * 
 * This is the single source of truth for subscription plans, pricing, and entitlements.
 * All UI components and hooks MUST read from this file.
 * 
 * Last Updated: 2025-01-28
 * Currency: SAR (Saudi Riyal)
 */

export interface Plan {
  key: "free" | "basic" | "pro" | "enterprise";
  label: string;
  sar: number | null; // null = Custom
  currency: "SAR";
  priceId: string | null; // Stripe price ID when applicable
  entitlements: { projects: number; aiDaily: number };
  features: string[];
  isEnterprise?: boolean;
}

export const PLANS: Plan[] = [
  {
    key: "free",
    label: "Free",
    sar: 0,
    currency: "SAR",
    priceId: null,
    entitlements: { projects: 1, aiDaily: 50 },
    features: ["Dashboard", "Basic Projects", "Community Support"],
  },
  {
    key: "basic",
    label: "Basic",
    sar: 49,
    currency: "SAR",
    priceId: "price_basic_sar",
    entitlements: { projects: 3, aiDaily: 500 },
    features: ["Everything in Free", "Unlimited Projects", "Email Support"],
  },
  {
    key: "pro",
    label: "Pro",
    sar: 149,
    currency: "SAR",
    priceId: "price_pro_sar",
    entitlements: { projects: -1, aiDaily: 2000 }, // -1 = Unlimited
    features: [
      "Everything in Basic",
      "AI Co-Pilot",
      "Team Collaboration",
      "Advanced Reports",
      "Priority Support",
    ],
  },
  {
    key: "enterprise",
    label: "Enterprise",
    sar: null,
    currency: "SAR",
    priceId: null,
    isEnterprise: true,
    entitlements: { projects: -1, aiDaily: 999_999 }, // -1 = Unlimited
    features: [
      "Everything in Pro",
      "Custom Integrations",
      "Dedicated Support",
      "SLA Guarantee",
    ],
  },
];

export const TIER_LIMITS: Record<Plan["key"], number> = {
  free: 50,
  basic: 500,
  pro: 2000,
  enterprise: 999_999,
};

// Helper function to get plan by key
export function getPlanByKey(key: Plan["key"]): Plan | undefined {
  return PLANS.find((plan) => plan.key === key);
}

// Helper function to get plan by tier (for backward compatibility)
export function getPlanByTier(tier: string): Plan | undefined {
  return PLANS.find((plan) => plan.key === tier);
}

