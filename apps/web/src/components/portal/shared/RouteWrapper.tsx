import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useFeatureGate } from "../../../hooks/useFeatureGate";
import { SubscriptionTier } from "../../../config/menuConfig";
import { usePortalAccess } from "../../../hooks/usePortalAccess";

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
  const { isLoading: authLoading } = usePortalAccess();
  const allowed = useFeatureGate(featureTier);
  const router = useRouter();

  useEffect(() => {
    // Don't redirect if auth is still loading or if user has access
    if (authLoading || allowed) {
      return;
    }

    // Only redirect if user doesn't have access and auth is confirmed
    if (!allowed) {
      router.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowed, redirectTo, authLoading]);

  // Show loading state while checking auth
  if (authLoading) {
    return null; // or a loading spinner
  }

  // Don't render children if user doesn't have access (will redirect)
  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}

