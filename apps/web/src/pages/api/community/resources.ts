import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createResourceSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  type: z.enum(["template", "guide", "tool", "starter-kit", "docs"]),
  downloadUrl: z.string().url(),
  authorName: z.string().min(1),
  tags: z.array(z.string()).default([]),
  version: z.string().optional(),
  fileSize: z.number().int().positive().optional(),
});

/**
 * Community resources API endpoint
 * GET: List resources with filters
 * POST: Create a new resource (authenticated users only)
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
      const {
        type,
        approved = "true",
        sortBy = "recent",
        limit = 50,
        offset = 0,
      } = req.query;

      let query = supabase.from("community_resources").select("*", { count: "exact" });

      // Approved filter
      if (approved === "true") {
        query = query.eq("approved", true);
      }

      // Type filter
      if (type && typeof type === "string") {
        query = query.eq("type", type);
      }

      // Sort
      switch (sortBy) {
        case "popular":
          query = query.order("download_count", { ascending: false });
          break;
        case "rating":
          query = query.order("rating", { ascending: false }).order("rating_count", { ascending: false });
          break;
        case "recent":
        default:
          query = query.order("created_at", { ascending: false });
          break;
      }

      // Pagination
      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching resources:", error);
        return res.status(500).json({ error: "Failed to fetch resources" });
      }

      // Transform data to match TypeScript types
      const resources = (data || []).map((resource: any) => ({
        id: resource.id,
        name: resource.name,
        description: resource.description,
        type: resource.type,
        downloadUrl: resource.download_url,
        authorId: resource.author_id,
        authorName: resource.author_name,
        downloadCount: resource.download_count || 0,
        rating: parseFloat(resource.rating) || 0,
        ratingCount: resource.rating_count || 0,
        tags: resource.tags || [],
        version: resource.version,
        fileSize: resource.file_size,
        approved: resource.approved,
        createdAt: resource.created_at,
        updatedAt: resource.updated_at,
      }));

      return res.status(200).json({
        resources,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/community/resources:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      // Get authenticated user
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

      if (authError || !user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const body = createResourceSchema.parse(req.body);
      const { name, description, type, downloadUrl, authorName, tags, version, fileSize } = body;

      // Create resource
      const { data: resource, error: resourceError } = await supabase
        .from("community_resources")
        .insert({
          name,
          description,
          type,
          download_url: downloadUrl,
          author_id: user.id,
          author_name: authorName,
          tags,
          version,
          file_size: fileSize,
          approved: false, // Requires approval
        })
        .select()
        .single();

      if (resourceError) {
        console.error("Error creating resource:", resourceError);
        return res.status(500).json({ error: "Failed to create resource" });
      }

      return res.status(201).json({ resource });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/community/resources:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

