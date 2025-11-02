import { useState, useEffect } from "react";
import { supabase } from "@nbcon/config";
import { SubscriptionTier } from "../config/menuConfig";

export interface PortalAccess {
  tier: SubscriptionTier;
  isAdmin: boolean;
  isLoading: boolean;
  userId: string | null;
}

export function usePortalAccess(): PortalAccess {
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccess() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setIsLoading(false);
          return;
        }

        setUserId(session.user.id);

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("subscription_tier, is_admin")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setIsLoading(false);
          return;
        }

        setTier((profile?.subscription_tier as SubscriptionTier) || "free");
        setIsAdmin(profile?.is_admin || false);

        // Subscribe to real-time updates
        const channel = supabase
          .channel(`profile:${session.user.id}`)
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "profiles",
              filter: `id=eq.${session.user.id}`,
            },
            (payload) => {
              const newProfile = payload.new as {
                subscription_tier: SubscriptionTier;
                is_admin: boolean;
              };
              setTier(newProfile.subscription_tier || "free");
              setIsAdmin(newProfile.is_admin || false);
            }
          )
          .subscribe();

        setIsLoading(false);

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error("Error in usePortalAccess:", error);
        setIsLoading(false);
      }
    }

    fetchAccess();
  }, []);

  return { tier, isAdmin, isLoading, userId };
}

