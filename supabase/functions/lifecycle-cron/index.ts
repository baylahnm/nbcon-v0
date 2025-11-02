import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@^2.39.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async () => {
  try {
    // Fetch all profiles with subscription tiers
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, subscription_tier, updated_at, created_at");

    if (error) {
      console.error("Error fetching profiles:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!profiles) {
      return new Response(
        JSON.stringify({ message: "No profiles found" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const now = Date.now();
    const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000; // 90 days
    let downgradedCount = 0;

    for (const profile of profiles) {
      const lastActivity = new Date(profile.updated_at || profile.created_at).getTime();
      const daysSinceActivity = (now - lastActivity) / (24 * 60 * 60 * 1000);

      // Downgrade inactive users after 90 days (if not already free)
      if (
        daysSinceActivity > 90 &&
        profile.subscription_tier !== "free" &&
        profile.subscription_tier !== null
      ) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ subscription_tier: "free" })
          .eq("id", profile.id);

        if (updateError) {
          console.error(`Error downgrading user ${profile.id}:`, updateError);
        } else {
          downgradedCount++;

          // Log the lifecycle action
          await supabase.from("audit_logs").insert({
            user_id: profile.id,
            action: "lifecycle_downgrade_inactive",
            metadata: {
              old_tier: profile.subscription_tier,
              new_tier: "free",
              days_inactive: Math.floor(daysSinceActivity),
            },
          });
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: "Lifecycle check complete",
        profiles_checked: profiles.length,
        downgraded: downgradedCount,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Lifecycle cron error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

