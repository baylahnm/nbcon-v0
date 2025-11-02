import { ReactNode } from "react";
import { useFeatureGate } from "../../../hooks/useFeatureGate";
import { SubscriptionTier } from "../../../config/menuConfig";
import { CreditCard } from "lucide-react";

interface FeatureGateProps {
  children: ReactNode;
  requiredTier: SubscriptionTier;
  fallback?: ReactNode;
}

export function FeatureGate({
  children,
  requiredTier,
  fallback,
}: FeatureGateProps) {
  const hasAccess = useFeatureGate(requiredTier);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Upgrade Required</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This feature requires a {requiredTier} subscription or higher.
      </p>
      <a
        href="/billing"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Upgrade Now
      </a>
    </div>
  );
}

