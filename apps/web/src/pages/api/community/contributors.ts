import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Community contributors API endpoint
 * GET: List contributors sorted by total contributions
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
      const { limit = 50, offset = 0 } = req.query;

      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);

      const { data, error, count } = await supabase
        .from("community_contributors")
        .select("*", { count: "exact" })
        .order("total_contributions", { ascending: false })
        .range(offsetNum, offsetNum + limitNum - 1);

      if (error) {
        console.error("Error fetching contributors:", error);
        return res.status(500).json({ error: "Failed to fetch contributors" });
      }

      // Transform data to match TypeScript types
      const contributors = (data || []).map((contributor: any) => ({
        id: contributor.id,
        userId: contributor.user_id,
        name: contributor.name,
        avatar: contributor.avatar,
        github: contributor.github,
        bio: contributor.bio,
        contributions: contributor.contributions || [],
        totalContributions: contributor.total_contributions || 0,
        badges: contributor.badges || [],
        createdAt: contributor.created_at,
        updatedAt: contributor.updated_at,
      }));

      return res.status(200).json({
        contributors,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/community/contributors:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

