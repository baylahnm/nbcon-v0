import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createJobSchema = z.object({
  title: z.string().min(3).max(200),
  department: z.string().min(1),
  locationType: z.enum(["remote", "onsite", "hybrid"]),
  locationCity: z.string().optional(),
  locationCountry: z.string().optional(),
  jobType: z.enum(["full-time", "part-time", "contract", "internship"]),
  level: z.enum(["entry", "mid", "senior", "lead", "executive"]),
  description: z.string().min(10),
  responsibilities: z.array(z.string()).default([]),
  requirementsMustHave: z.array(z.string()).default([]),
  requirementsNiceToHave: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  salaryCurrency: z.string().default("SAR"),
  closingDate: z.string().date().optional(),
  applicationUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

/**
 * Careers jobs API endpoint
 * GET: List job postings with filters
 * POST: Create a new job posting (admin only)
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
      const {
        department,
        locationType,
        jobType,
        level,
        status = "open",
        featured,
        sortBy = "recent",
        limit = 50,
        offset = 0,
      } = req.query;

      let query = supabase.from("careers_job_postings").select("*", { count: "exact" });

      // Status filter
      if (status && typeof status === "string") {
        query = query.eq("status", status);
      }

      // Featured filter
      if (featured === "true") {
        query = query.eq("featured", true);
      }

      // Department filter
      if (department && typeof department === "string") {
        query = query.eq("department", department);
      }

      // Location type filter
      if (locationType && typeof locationType === "string") {
        query = query.eq("location_type", locationType);
      }

      // Job type filter
      if (jobType && typeof jobType === "string") {
        query = query.eq("job_type", jobType);
      }

      // Level filter
      if (level && typeof level === "string") {
        query = query.eq("level", level);
      }

      // Sort
      switch (sortBy) {
        case "department":
          query = query.order("department", { ascending: true }).order("posted_date", { ascending: false });
          break;
        case "relevance":
          query = query.order("featured", { ascending: false }).order("posted_date", { ascending: false });
          break;
        case "recent":
        default:
          query = query.order("posted_date", { ascending: false });
          break;
      }

      // Pagination
      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ error: "Failed to fetch jobs" });
      }

      // Transform data to match TypeScript types
      const jobs = (data || []).map((job: any) => ({
        id: job.id,
        title: job.title,
        department: job.department,
        location: {
          type: job.location_type,
          city: job.location_city,
          country: job.location_country,
        },
        type: job.job_type,
        level: job.level,
        description: job.description,
        responsibilities: job.responsibilities || [],
        requirements: {
          mustHave: job.requirements_must_have || [],
          niceToHave: job.requirements_nice_to_have || [],
        },
        benefits: job.benefits || [],
        salary:
          job.salary_min || job.salary_max
            ? {
                min: job.salary_min,
                max: job.salary_max,
                currency: job.salary_currency || "SAR",
              }
            : undefined,
        postedDate: job.posted_date,
        closingDate: job.closing_date,
        applicationUrl: job.application_url,
        views: job.views || 0,
        applicationsCount: job.applications_count || 0,
        status: job.status,
        featured: job.featured,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      }));

      return res.status(200).json({
        jobs,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/careers/jobs:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      // Get authenticated user
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

      if (authError || !user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        return res.status(403).json({ error: "Admin access required" });
      }

      const body = createJobSchema.parse(req.body);
      const {
        title,
        department,
        locationType,
        locationCity,
        locationCountry,
        jobType,
        level,
        description,
        responsibilities,
        requirementsMustHave,
        requirementsNiceToHave,
        benefits,
        salaryMin,
        salaryMax,
        salaryCurrency,
        closingDate,
        applicationUrl,
        featured,
      } = body;

      // Create job posting
      const { data: job, error: jobError } = await supabase
        .from("careers_job_postings")
        .insert({
          title,
          department,
          location_type: locationType,
          location_city: locationCity,
          location_country: locationCountry,
          job_type: jobType,
          level,
          description,
          responsibilities,
          requirements_must_have: requirementsMustHave,
          requirements_nice_to_have: requirementsNiceToHave,
          benefits,
          salary_min: salaryMin,
          salary_max: salaryMax,
          salary_currency: salaryCurrency,
          closing_date: closingDate,
          application_url: applicationUrl,
          featured,
          status: "open",
        })
        .select()
        .single();

      if (jobError) {
        console.error("Error creating job:", jobError);
        return res.status(500).json({ error: "Failed to create job posting" });
      }

      return res.status(201).json({ job });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/careers/jobs:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

