import { useState } from "react";
import { RouteWrapper } from "../../components/portal/shared/RouteWrapper";
import { useSubscriptionTier } from "../../hooks/useSubscriptionTier";
import { createCheckoutSession } from "./checkout";
import { CreditCard, Check, X, ExternalLink } from "lucide-react";
import { supabase } from "@nbcon/config";
import { Button } from "../../components/ui/button";

const plans = [
  {
    name: "Free",
    tier: "free" as const,
    price: "$0",
    features: ["Dashboard", "Basic Projects", "Community Support"],
    priceId: "price_free",
  },
  {
    name: "Basic",
    tier: "basic" as const,
    price: "$29",
    features: ["Everything in Free", "Unlimited Projects", "Email Support"],
    priceId: "price_basic",
  },
  {
    name: "Pro",
    tier: "pro" as const,
    price: "$99",
    features: [
      "Everything in Basic",
      "AI Co-Pilot",
      "Team Collaboration",
      "Advanced Reports",
      "Priority Support",
    ],
    priceId: "price_pro",
  },
  {
    name: "Enterprise",
    tier: "enterprise" as const,
    price: "Custom",
    features: [
      "Everything in Pro",
      "Custom Integrations",
      "Dedicated Support",
      "SLA Guarantee",
    ],
    priceId: "price_enterprise",
  },
];

export default function BillingPage() {
  const { tier: currentTier, isLoading } = useSubscriptionTier();
  const [loading, setLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    try {
      setLoading(priceId);
      const url = await createCheckoutSession(priceId);
      window.location.href = url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(`Error: ${error.message}`);
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

    } catch (error: any) {
      console.error("Portal error:", error);
      alert(`Error: ${error.message}`);
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
              <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
              <p className="text-muted-foreground">
                Current Plan: <span className="font-semibold capitalize">{currentTier}</span>
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
                  "Loading..."
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Manage Subscription
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.tier === currentTier;
            const isUpgrade =
              ["free", "basic", "pro", "enterprise"].indexOf(plan.tier) >
              ["free", "basic", "pro", "enterprise"].indexOf(currentTier);

            return (
              <div
                key={plan.tier}
                className={`border rounded-lg p-6 ${
                  isCurrent
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {isCurrent && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
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
                <button
                  onClick={() => handleUpgrade(plan.priceId)}
                  disabled={isCurrent || loading !== null}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    isCurrent
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {loading === plan.priceId
                    ? "Loading..."
                    : isCurrent
                    ? "Current Plan"
                    : isUpgrade
                    ? "Upgrade"
                    : "Select Plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </RouteWrapper>
  );
}


