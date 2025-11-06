import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useFeatureGate } from "../../../hooks/useFeatureGate";
import { SubscriptionTier } from "../../../config/menuConfig";

interface RouteWrapperProps {
  children: ReactNode;
  featureTier: SubscriptionTier;
  redirectTo?: string;
}

export function RouteWrapper({
  children,
  featureTier,
  redirectTo = "/billing",
}: RouteWrapperProps) {
  const allowed = useFeatureGate(featureTier);
  const router = useRouter();

  useEffect(() => {
    if (!allowed) {
      router.push(redirectTo);
    }
  }, [allowed, redirectTo, router]);

  if (!allowed) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}

