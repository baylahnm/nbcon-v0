import { useEffect } from "react";
import { supabase } from "@nbcon/config";
import { track } from "@nbcon/enterprise-sdk";

export function useUpgradeFlow(userId: string) {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel("billing_updates");

    channel.on(
      "broadcast",
      { event: "tier_change" },
      (payload: { payload: { newTier: string; oldTier: string } }) => {
        const { newTier, oldTier } = payload.payload;
        console.log("Tier updated:", newTier);
        
        track("tier_upgraded", {
          userId,
          oldTier,
          newTier,
          timestamp: Date.now(),
        });
      }
    );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
}

