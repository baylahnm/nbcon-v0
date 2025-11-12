import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const subscribeAlertSchema = z.object({
  email: z.string().email(),
  department: z.string().optional(),
  locationType: z.string().optional(),
  jobType: z.string().optional(),
});

/**
 * Job alerts API endpoint
 * POST: Subscribe to job alerts
 * PUT: Unsubscribe from job alerts
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
      const body = subscribeAlertSchema.parse(req.body);
      const { email, department, locationType, jobType } = body;

      // Check if alert already exists
      let query = supabase
        .from("careers_job_alerts")
        .select("*")
        .eq("email", email)
        .eq("is_active", true);

      if (department) query = query.eq("department", department);
      if (locationType) query = query.eq("location_type", locationType);
      if (jobType) query = query.eq("job_type", jobType);

      const { data: existing } = await query.single();

      if (existing) {
        return res.status(400).json({ error: "Alert already exists" });
      }

      // Create alert
      const { error: insertError } = await supabase
        .from("careers_job_alerts")
        .insert({
          email,
          department: department || null,
          location_type: locationType || null,
          job_type: jobType || null,
          is_active: true,
        });

      if (insertError) {
        throw insertError;
      }

      return res.status(201).json({ message: "Successfully subscribed to job alerts" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/careers/alerts:", error);
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
        .from("careers_job_alerts")
        .update({ is_active: false })
        .eq("email", email);

      if (updateError) {
        throw updateError;
      }

      return res.status(200).json({ message: "Successfully unsubscribed from job alerts" });
    } catch (error) {
      console.error("Error in PUT /api/careers/alerts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

