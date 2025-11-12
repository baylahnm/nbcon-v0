import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createFeedbackSchema = z.object({
  faqId: z.string().uuid(),
  helpful: z.boolean(),
  comment: z.string().optional(),
});

/**
 * FAQ feedback API endpoint
 * POST: Submit feedback for a FAQ
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
      const { faqId, helpful, comment } = body;

      // Verify FAQ exists
      const { data: faq } = await supabase
        .from("faqs")
        .select("id")
        .eq("id", faqId)
        .single();

      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }

      // Create feedback
      const { data: feedback, error: feedbackError } = await supabase
        .from("faq_feedback")
        .insert({
          faq_id: faqId,
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

      console.error("Error in POST /api/faq/feedback:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

