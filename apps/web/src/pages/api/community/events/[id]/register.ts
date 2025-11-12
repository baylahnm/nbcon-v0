import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1),
});

/**
 * Event registration API endpoint
 * POST: Register for an event
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
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Event ID is required" });
      }

      // Get authenticated user (optional)
      let userId: string | undefined;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        userId = user?.id;
      }

      const body = registerSchema.parse(req.body);
      const { email, name } = body;

      // Check if event exists
      const { data: event, error: eventError } = await supabase
        .from("community_events")
        .select("*")
        .eq("id", id)
        .single();

      if (eventError || !event) {
        return res.status(404).json({ error: "Event not found" });
      }

      // Check if already registered
      const { data: existing } = await supabase
        .from("community_event_registrations")
        .select("*")
        .eq("event_id", id)
        .or(
          userId
            ? `user_id.eq.${userId},email.eq.${email || ""}`
            : `email.eq.${email || ""}`
        )
        .single();

      if (existing) {
        return res.status(400).json({ error: "Already registered for this event" });
      }

      // Create registration
      const { data: registration, error: regError } = await supabase
        .from("community_event_registrations")
        .insert({
          event_id: id,
          user_id: userId,
          email: email || undefined,
          name,
          status: "registered",
        })
        .select()
        .single();

      if (regError) {
        console.error("Error creating registration:", regError);
        return res.status(500).json({ error: "Failed to register for event" });
      }

      return res.status(201).json({ registration });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/community/events/[id]/register:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

