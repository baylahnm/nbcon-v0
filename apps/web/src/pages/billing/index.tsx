import { useState } from "react";
import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";
import { useSubscriptionTier } from "../../hooks/useSubscriptionTier";
import { useI18n } from "../../hooks/useI18n";
import { createCheckoutSession } from "./checkout";
import { Check, ExternalLink } from "lucide-react";
import { supabase } from "@nbcon/config";
import { Button } from "../../components/ui/button";
import { PLANS } from "../../config/plans";

export default function BillingPage() {
  const { tier: currentTier, isLoading } = useSubscriptionTier();
  const { t } = useI18n();
  const [loading, setLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    try {
      setLoading(priceId);
      const url = await createCheckoutSession(priceId);
      window.location.href = url;
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Error: ${errorMessage}`);
      setLoading(null);
    }
  };

  const handleOpenPortal = async () => {
    try {
      setPortalLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert("Please sign in to manage your subscription");
        return;
      }

      const { data, error: portalError } = await supabase.functions.invoke('stripe-portal', {
        body: {},
      });

      if (portalError) {
        throw new Error(portalError.message);
      }

      if (!data?.url) {
        throw new Error('No portal URL returned');
      }

      window.location.href = data.url;

    } catch (error: unknown) {
      console.error("Portal error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Error: ${errorMessage}`);
    } finally {
      setPortalLoading(false);
    }
  };

  if (isLoading) {
    return (
      <RouteWrapper featureTier="free">
        <div className="p-6">
          <div className="animate-pulse">Loading...</div>
        </div>
      </RouteWrapper>
    );
  }

  return (
    <RouteWrapper featureTier="free">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t("billing.title")}</h1>
              <p className="text-muted-foreground">
                {t("billing.currentPlan")}: <span className="font-semibold capitalize">{currentTier}</span>
              </p>
            </div>
            {currentTier !== "free" && (
              <Button
                onClick={handleOpenPortal}
                disabled={portalLoading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {portalLoading ? (
                  t("common.loading")
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    {t("billing.manageSubscription")}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => {
            const isCurrent = plan.key === currentTier;
            const tierOrder = ["free", "basic", "pro", "enterprise"] as const;
            const isUpgrade =
              tierOrder.indexOf(plan.key) > tierOrder.indexOf(currentTier as typeof tierOrder[number]);

            return (
              <div
                key={plan.key}
                className={`border rounded-lg p-6 ${
                  isCurrent
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{plan.label}</h3>
                  {isCurrent && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      {t("billing.currentPlanBadge")}
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">
                    {plan.sar === null ? "Custom" : plan.sar.toString()}
                  </span>
                  {plan.currency && plan.sar !== null && (
                    <span className="text-muted-foreground ml-1">{plan.currency}</span>
                  )}
                  {plan.sar !== null && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.isEnterprise ? (
                  <a
                    href="/enterprise"
                    className="w-full py-2 px-4 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 text-center inline-block"
                  >
                    Contact Sales
                  </a>
                ) : (
                  <button
                    onClick={() => plan.priceId && handleUpgrade(plan.priceId)}
                    disabled={isCurrent || loading !== null || !plan.priceId}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                      isCurrent
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {loading === plan.priceId
                      ? t("common.loading")
                      : isCurrent
                      ? t("billing.currentPlan")
                      : isUpgrade
                      ? t("billing.upgrade")
                      : t("billing.selectPlan")}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </RouteWrapper>
  );
}


