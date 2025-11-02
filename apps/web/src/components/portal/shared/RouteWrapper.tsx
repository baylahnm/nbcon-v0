import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
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

  if (!allowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

