import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Blog categories API endpoint
 * GET: List all categories
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
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ error: "Failed to fetch categories" });
      }

      // Transform data
      const categories = (data || []).map((cat: any) => ({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        color: cat.color,
        sortOrder: cat.sort_order,
        postCount: cat.post_count,
        createdAt: cat.created_at,
        updatedAt: cat.updated_at,
      }));

      return res.status(200).json({ categories });
    } catch (error) {
      console.error("Error in GET /api/blog/categories:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

