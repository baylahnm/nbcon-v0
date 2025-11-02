import { SubscriptionTier } from "../config/menuConfig";
import { hasTierAccess } from "../config/tierVisibility";
import { usePortalAccess } from "./usePortalAccess";

export function useFeatureGate(requiredTier: SubscriptionTier): boolean {
  const { tier } = usePortalAccess();
  return hasTierAccess(tier, requiredTier);
}

