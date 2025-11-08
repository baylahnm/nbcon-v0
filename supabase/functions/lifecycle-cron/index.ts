import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@^2.39.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async () => {
  try {
    // Reset daily credits at midnight UTC
    const { error: resetError } = await supabase.rpc('reset_daily_credits');
    if (resetError) {
      console.error('Error resetting daily credits:', resetError);
    } else {
      console.log('Daily credits reset completed');
    }

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
    
    // Churn analysis: Track cancellations and downgrades
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const churnData = {
      total_users: profiles.length,
      active_subscriptions: 0,
      cancelled_this_month: 0,
      downgraded_this_month: 0,
      new_users_this_month: 0,
    };

    for (const profile of profiles) {
      // Count active subscriptions (non-free tiers)
      if (profile.subscription_tier && profile.subscription_tier !== "free") {
        churnData.active_subscriptions++;
      }
      
      // Count new users this month
      const createdDate = new Date(profile.created_at);
      if (createdDate >= thirtyDaysAgo) {
        churnData.new_users_this_month++;
      }
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
          
          churnData.downgraded_this_month++;
        }
      }
    }
    
    // Fetch billing events for churn analysis
    const { data: billingEvents } = await supabase
      .from("billing_events")
      .select("stripe_event, created_at")
      .gte("created_at", thirtyDaysAgo.toISOString());
    
    if (billingEvents) {
      churnData.cancelled_this_month = billingEvents.filter(
        (e) => e.stripe_event === "customer.subscription.deleted"
      ).length;
    }
    
    // Store monthly churn report
    await supabase.from("audit_logs").insert({
      user_id: null, // System-level report
      action: "monthly_churn_report",
      metadata: {
        ...churnData,
        retention_rate: churnData.total_users > 0
          ? ((churnData.total_users - churnData.cancelled_this_month - churnData.downgraded_this_month) / churnData.total_users * 100).toFixed(2)
          : "0.00",
        month: new Date().toISOString().slice(0, 7), // YYYY-MM format
      },
    });

    return new Response(
      JSON.stringify({
        message: "Lifecycle check complete",
        credits_reset: resetError ? "failed" : "completed",
        profiles_checked: profiles.length,
        downgraded: downgradedCount,
        churn_report: churnData,
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

