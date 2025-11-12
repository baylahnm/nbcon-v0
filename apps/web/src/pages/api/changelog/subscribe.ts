import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  frequency: z.enum(["weekly", "monthly", "immediate"]).optional().default("weekly"),
});

/**
 * Email subscription endpoint for changelog updates
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

  try {
    const body = subscribeSchema.parse(req.body);
    const { email, frequency } = body;

    // Check if email already exists
    const { data: existing } = await supabase
      .from("changelog_email_subscriptions")
      .select("id, verified, unsubscribed")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      // If unsubscribed, resubscribe
      if (existing.unsubscribed) {
        const { error: updateError } = await supabase
          .from("changelog_email_subscriptions")
          .update({
            unsubscribed: false,
            unsubscribed_at: null,
            frequency,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateError) {
          console.error("Update error:", updateError);
          return res.status(500).json({ error: "Failed to resubscribe" });
        }

        return res.status(200).json({
          success: true,
          message: "Successfully resubscribed to changelog updates",
          verified: existing.verified,
        });
      }

      // Already subscribed
      return res.status(200).json({
        success: true,
        message: "You're already subscribed to changelog updates",
        verified: existing.verified,
      });
    }

    // Generate verification token
    const { data: tokenData, error: tokenError } = await supabase.rpc("generate_verification_token");

    if (tokenError) {
      // Fallback: generate token in Node.js
      const verificationToken = require("crypto").randomBytes(32).toString("hex");
      
      // Insert new subscription
      const { data, error } = await supabase
        .from("changelog_email_subscriptions")
        .insert({
          email: email.toLowerCase(),
          frequency,
          verification_token: verificationToken,
          verified: false,
        })
        .select()
        .single();

      if (error) {
        console.error("Insert error:", error);
        return res.status(500).json({ error: "Failed to subscribe" });
      }

      // TODO: Send verification email
      // For now, we'll mark as verified automatically in development
      // In production, implement email verification flow

      return res.status(200).json({
        success: true,
        message: "Successfully subscribed to changelog updates",
        verified: false,
      });
    }

    const verificationToken = tokenData || require("crypto").randomBytes(32).toString("hex");

    const { data, error } = await supabase
      .from("changelog_email_subscriptions")
      .insert({
        email: email.toLowerCase(),
        frequency,
        verification_token: verificationToken,
        verified: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return res.status(500).json({ error: "Failed to subscribe" });
    }

    // TODO: Send verification email with verification link
    // For now, return success (in production, implement email verification)

    return res.status(200).json({
      success: true,
      message: "Successfully subscribed to changelog updates. Please check your email to verify your subscription.",
      verified: false,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid request",
        details: error.errors,
      });
    }

    console.error("Subscription error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

