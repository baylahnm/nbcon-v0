import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Careers benefits API endpoint
 * GET: List all benefits
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
      const { category } = req.query;

      let query = supabase
        .from("careers_benefits")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("title", { ascending: true });

      // Category filter
      if (category && typeof category === "string") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching benefits:", error);
        return res.status(500).json({ error: "Failed to fetch benefits" });
      }

      // Transform data to match TypeScript types
      const benefits = (data || []).map((benefit: any) => ({
        id: benefit.id,
        title: benefit.title,
        description: benefit.description,
        icon: benefit.icon,
        category: benefit.category,
        sortOrder: benefit.sort_order,
        createdAt: benefit.created_at,
        updatedAt: benefit.updated_at,
      }));

      return res.status(200).json({ benefits });
    } catch (error) {
      console.error("Error in GET /api/careers/benefits:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

