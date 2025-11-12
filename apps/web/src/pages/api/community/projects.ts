import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  url: z.string().url(),
  image: z.string().url().optional(),
  authorName: z.string().min(1),
  authorAvatar: z.string().url().optional(),
  authorGithub: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

/**
 * Community projects API endpoint
 * GET: List projects with filters
 * POST: Create a new project (authenticated users only)
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
        category,
        featured,
        approved = "true",
        sortBy = "recent",
        limit = 50,
        offset = 0,
      } = req.query;

      let query = supabase
        .from("community_projects")
        .select("*", { count: "exact" });

      // Approved filter
      if (approved === "true") {
        query = query.eq("approved", true);
      }

      // Featured filter
      if (featured === "true") {
        query = query.eq("featured", true);
      }

      // Category filter
      if (category && typeof category === "string") {
        query = query.eq("category", category);
      }

      // Sort
      switch (sortBy) {
        case "popular":
          query = query.order("votes", { ascending: false }).order("views", { ascending: false });
          break;
        case "featured":
          query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });
          break;
        case "trending":
          // Simplified: recent projects with high votes
          query = query.order("votes", { ascending: false }).order("created_at", { ascending: false });
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
        console.error("Error fetching projects:", error);
        return res.status(500).json({ error: "Failed to fetch projects" });
      }

      // Transform data to match TypeScript types
      const projects = (data || []).map((project: any) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        image: project.image,
        url: project.url,
        authorId: project.author_id,
        author: project.author_id
          ? undefined
          : {
              name: project.author_name || "Anonymous",
              avatar: project.author_avatar,
              github: project.author_github,
            },
        technologies: project.technologies || [],
        category: project.category,
        tags: project.tags || [],
        featured: project.featured,
        approved: project.approved,
        views: project.views || 0,
        votes: project.votes || 0,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
      }));

      return res.status(200).json({
        projects,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/community/projects:", error);
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

      const body = createProjectSchema.parse(req.body);
      const {
        name,
        description,
        url,
        image,
        authorName,
        authorAvatar,
        authorGithub,
        technologies,
        category,
        tags,
      } = body;

      // Create project
      const { data: project, error: projectError } = await supabase
        .from("community_projects")
        .insert({
          name,
          description,
          url,
          image,
          author_id: user.id,
          author_name: authorName,
          author_avatar: authorAvatar,
          author_github: authorGithub,
          technologies,
          category,
          tags,
          approved: false, // Requires approval
        })
        .select()
        .single();

      if (projectError) {
        console.error("Error creating project:", projectError);
        return res.status(500).json({ error: "Failed to create project" });
      }

      return res.status(201).json({ project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/community/projects:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

