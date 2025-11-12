import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email(),
  frequency: z.enum(["weekly", "monthly"]).default("weekly"),
});

/**
 * Newsletter subscription API endpoint
 * POST: Subscribe to newsletter
 * PUT: Unsubscribe from newsletter
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: "Database not configured" });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  if (req.method === "POST") {
    try {
      const body = subscribeSchema.parse(req.body);
      const { email, frequency } = body;

      // Check if already subscribed
      const { data: existing } = await supabase
        .from("blog_newsletter_subscriptions")
        .select("*")
        .eq("email", email)
        .single();

      if (existing) {
        if (existing.is_active) {
          return res.status(400).json({ error: "Email already subscribed" });
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from("blog_newsletter_subscriptions")
            .update({
              is_active: true,
              frequency,
              subscribed_at: new Date().toISOString(),
              unsubscribed_at: null,
            })
            .eq("email", email);

          if (updateError) {
            throw updateError;
          }

          return res.status(200).json({ message: "Subscription reactivated" });
        }
      }

      // Create new subscription
      const { error: insertError } = await supabase
        .from("blog_newsletter_subscriptions")
        .insert({
          email,
          frequency,
          is_active: true,
        });

      if (insertError) {
        throw insertError;
      }

      return res.status(201).json({ message: "Successfully subscribed" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/blog/newsletter/subscribe:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { email } = req.body;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Email is required" });
      }

      const { error: updateError } = await supabase
        .from("blog_newsletter_subscriptions")
        .update({
          is_active: false,
          unsubscribed_at: new Date().toISOString(),
        })
        .eq("email", email);

      if (updateError) {
        throw updateError;
      }

      return res.status(200).json({ message: "Successfully unsubscribed" });
    } catch (error) {
      console.error("Error in PUT /api/blog/newsletter/subscribe:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

