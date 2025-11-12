import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Community stats API endpoint
 * GET: Get community statistics
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
      const [
        projectsResult,
        eventsResult,
        contributorsResult,
        resourcesResult,
        membersResult,
      ] = await Promise.all([
        supabase
          .from("community_projects")
          .select("id", { count: "exact", head: true })
          .eq("approved", true),
        supabase.from("community_events").select("id", { count: "exact", head: true }),
        supabase.from("community_contributors").select("id", { count: "exact", head: true }),
        supabase
          .from("community_resources")
          .select("id", { count: "exact", head: true })
          .eq("approved", true),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);

      const stats = {
        totalMembers: membersResult.count || 0,
        activeProjects: projectsResult.count || 0,
        contributors: contributorsResult.count || 0,
        eventsHosted: eventsResult.count || 0,
        resourcesShared: resourcesResult.count || 0,
        githubStars: undefined, // Would need GitHub API integration
      };

      return res.status(200).json({ stats });
    } catch (error) {
      console.error("Error in GET /api/community/stats:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

