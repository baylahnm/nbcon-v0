import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Blog stats API endpoint
 * GET: Get blog statistics
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
      // Get counts
      const [postsResult, categoriesResult, tagsResult, authorsResult, publishedResult] =
        await Promise.all([
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("blog_categories").select("id", { count: "exact", head: true }),
          supabase.from("blog_tags").select("id", { count: "exact", head: true }),
          supabase.from("blog_authors").select("id", { count: "exact", head: true }),
          supabase
            .from("blog_posts")
            .select("id", { count: "exact", head: true })
            .eq("published", true),
        ]);

      const stats = {
        totalPosts: postsResult.count || 0,
        totalCategories: categoriesResult.count || 0,
        totalTags: tagsResult.count || 0,
        totalAuthors: authorsResult.count || 0,
        publishedPosts: publishedResult.count || 0,
      };

      return res.status(200).json({ stats });
    } catch (error) {
      console.error("Error in GET /api/blog/stats:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

