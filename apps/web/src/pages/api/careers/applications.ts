import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createApplicationSchema = z.object({
  jobPostingId: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  resumeUrl: z.string().url().optional(),
  coverLetter: z.string().optional(),
  portfolioUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  additionalQuestions: z.record(z.any()).optional(),
});

/**
 * Careers applications API endpoint
 * GET: List applications (user's own or admin)
 * POST: Create a new application
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
      // Get authenticated user
      const authHeader = req.headers.authorization;
      let userId: string | undefined;

      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        userId = user?.id;
      }

      let query = supabase.from("careers_applications").select("*");

      // Users can only see their own applications (unless admin)
      if (userId) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", userId)
          .single();

        if (!profile?.is_admin) {
          query = query.eq("user_id", userId);
        }
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        return res.status(500).json({ error: "Failed to fetch applications" });
      }

      return res.status(200).json({ applications: data || [] });
    } catch (error) {
      console.error("Error in GET /api/careers/applications:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      // Get authenticated user (optional)
      const authHeader = req.headers.authorization;
      let userId: string | undefined;

      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        userId = user?.id;
      }

      const body = createApplicationSchema.parse(req.body);
      const {
        jobPostingId,
        firstName,
        lastName,
        email,
        phone,
        resumeUrl,
        coverLetter,
        portfolioUrl,
        githubUrl,
        linkedinUrl,
        additionalQuestions,
      } = body;

      // Verify job posting exists and is open
      const { data: job } = await supabase
        .from("careers_job_postings")
        .select("id, status")
        .eq("id", jobPostingId)
        .single();

      if (!job || job.status !== "open") {
        return res.status(400).json({ error: "Job posting is not open for applications" });
      }

      // Create application
      const { data: application, error: appError } = await supabase
        .from("careers_applications")
        .insert({
          job_posting_id: jobPostingId,
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          resume_url: resumeUrl,
          cover_letter: coverLetter,
          portfolio_url: portfolioUrl,
          github_url: githubUrl,
          linkedin_url: linkedinUrl,
          additional_questions: additionalQuestions || {},
          status: "pending",
        })
        .select()
        .single();

      if (appError) {
        console.error("Error creating application:", appError);
        return res.status(500).json({ error: "Failed to submit application" });
      }

      return res.status(201).json({ application });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/careers/applications:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

