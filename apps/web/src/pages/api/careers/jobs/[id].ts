import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Single job posting API endpoint
 * GET: Get a job posting by ID
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

  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Job ID is required" });
      }

      const { data, error } = await supabase
        .from("careers_job_postings")
        .select("*")
        .eq("id", id)
        .eq("status", "open")
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "Job posting not found" });
      }

      // Increment view count
      await supabase
        .from("careers_job_postings")
        .update({ views: (data.views || 0) + 1 })
        .eq("id", id);

      // Transform data to match TypeScript types
      const job = {
        id: data.id,
        title: data.title,
        department: data.department,
        location: {
          type: data.location_type,
          city: data.location_city,
          country: data.location_country,
        },
        type: data.job_type,
        level: data.level,
        description: data.description,
        responsibilities: data.responsibilities || [],
        requirements: {
          mustHave: data.requirements_must_have || [],
          niceToHave: data.requirements_nice_to_have || [],
        },
        benefits: data.benefits || [],
        salary:
          data.salary_min || data.salary_max
            ? {
                min: data.salary_min,
                max: data.salary_max,
                currency: data.salary_currency || "SAR",
              }
            : undefined,
        postedDate: data.posted_date,
        closingDate: data.closing_date,
        applicationUrl: data.application_url,
        views: (data.views || 0) + 1,
        applicationsCount: data.applications_count || 0,
        status: data.status,
        featured: data.featured,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return res.status(200).json({ job });
    } catch (error) {
      console.error("Error in GET /api/careers/jobs/[id]:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

