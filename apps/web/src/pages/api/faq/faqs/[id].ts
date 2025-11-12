import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Single FAQ API endpoint
 * GET: Get a FAQ by ID and increment view count
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
        return res.status(400).json({ error: "FAQ ID is required" });
      }

      const { data, error } = await supabase
        .from("faqs")
        .select(
          `
          *,
          category:faq_categories(id, slug, name, icon)
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "FAQ not found" });
      }

      // Increment view count
      await supabase
        .from("faqs")
        .update({ views: (data.views || 0) + 1 })
        .eq("id", id);

      // Transform data to match TypeScript types
      const faq = {
        id: data.id,
        question: data.question,
        answer: data.answer,
        category: data.category
          ? {
              id: data.category.id,
              slug: data.category.slug,
              name: data.category.name,
              icon: data.category.icon,
            }
          : null,
        tags: data.tags || [],
        helpfulCount: data.helpful_count || 0,
        notHelpfulCount: data.not_helpful_count || 0,
        views: (data.views || 0) + 1,
        relatedDocs: data.related_docs || [],
        relatedFAQs: data.related_faqs || [],
        isPopular: data.is_popular || false,
        isNew: data.is_new || false,
        sortOrder: data.sort_order || 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return res.status(200).json({ faq });
    } catch (error) {
      console.error("Error in GET /api/faq/faqs/[id]:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

