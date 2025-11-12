import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Blog tags API endpoint
 * GET: List all tags (optionally sorted by usage)
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
      const { sortBy = "usage" } = req.query;

      let query = supabase.from("blog_tags").select("*");

      // Sort by usage count or name
      if (sortBy === "usage") {
        query = query.order("usage_count", { ascending: false });
      } else {
        query = query.order("name", { ascending: true });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({ error: "Failed to fetch tags" });
      }

      // Transform data
      const tags = (data || []).map((tag: any) => ({
        id: tag.id,
        slug: tag.slug,
        name: tag.name,
        usageCount: tag.usage_count,
        createdAt: tag.created_at,
      }));

      return res.status(200).json({ tags });
    } catch (error) {
      console.error("Error in GET /api/blog/tags:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

