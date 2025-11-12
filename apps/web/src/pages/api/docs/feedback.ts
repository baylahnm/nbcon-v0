import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createFeedbackSchema = z.object({
  pageSlug: z.string().min(1),
  helpful: z.boolean(),
  comment: z.string().optional(),
});

/**
 * Docs feedback API endpoint
 * POST: Submit feedback for a documentation page
 * GET: Get feedback stats for a page (optional)
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

      const body = createFeedbackSchema.parse(req.body);
      const { pageSlug, helpful, comment } = body;

      // Create feedback
      const { data: feedback, error: feedbackError } = await supabase
        .from("docs_feedback")
        .insert({
          page_slug: pageSlug,
          user_id: userId || null,
          helpful,
          comment: comment || null,
        })
        .select()
        .single();

      if (feedbackError) {
        console.error("Error creating feedback:", feedbackError);
        return res.status(500).json({ error: "Failed to submit feedback" });
      }

      return res.status(201).json({ feedback });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/docs/feedback:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const { slug } = req.query;

      if (!slug || typeof slug !== "string") {
        return res.status(400).json({ error: "Page slug is required" });
      }

      // Get feedback stats for the page
      const { data: feedbacks, error } = await supabase
        .from("docs_feedback")
        .select("helpful")
        .eq("page_slug", slug);

      if (error) {
        console.error("Error fetching feedback stats:", error);
        return res.status(500).json({ error: "Failed to fetch feedback stats" });
      }

      const helpfulCount = feedbacks?.filter((f) => f.helpful === true).length || 0;
      const notHelpfulCount = feedbacks?.filter((f) => f.helpful === false).length || 0;

      return res.status(200).json({
        pageSlug: slug,
        helpfulCount,
        notHelpfulCount,
        totalCount: feedbacks?.length || 0,
      });
    } catch (error) {
      console.error("Error in GET /api/docs/feedback:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

