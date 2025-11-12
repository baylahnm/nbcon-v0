import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createPostSchema = z.object({
  slug: z.string().min(3).max(200),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(500),
  content: z.string().min(50),
  excerpt: z.string().max(300).optional(),
  authorId: z.string().uuid(),
  categoryId: z.string().uuid().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
  featuredImage: z.string().url().optional(),
  readingTime: z.number().int().positive().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().optional(),
});

/**
 * Blog posts API endpoint
 * GET: List posts with filters
 * POST: Create a new post (authenticated authors only)
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
        categoryId,
        tagIds,
        authorId,
        sortBy = "recent",
        published = "true",
        featured,
        limit = 50,
        offset = 0,
      } = req.query;

      let query = supabase
        .from("blog_posts")
        .select(
          `
          *,
          author:blog_authors(*),
          category:blog_categories(*),
          tags:blog_post_tags(
            tag:blog_tags(*)
          )
        `,
          { count: "exact" }
        );

      // Published filter
      if (published === "true") {
        query = query.eq("published", true);
      } else if (published === "false") {
        query = query.eq("published", false);
      }

      // Featured filter
      if (featured === "true") {
        query = query.eq("featured", true);
      }

      // Category filter
      if (categoryId && typeof categoryId === "string") {
        query = query.eq("category_id", categoryId);
      }

      // Author filter
      if (authorId && typeof authorId === "string") {
        query = query.eq("author_id", authorId);
      }

      // Tag filter - fetch post IDs that have the specified tags
      let tagFilteredPostIds: string[] | null = null;
      if (tagIds) {
        const tagArray = Array.isArray(tagIds) ? tagIds : [tagIds];
        if (tagArray.length > 0) {
          const { data: postTags } = await supabase
            .from("blog_post_tags")
            .select("post_id")
            .in("tag_id", tagArray);
          
          if (postTags && postTags.length > 0) {
            tagFilteredPostIds = [...new Set(postTags.map((pt) => pt.post_id))];
            query = query.in("id", tagFilteredPostIds);
          } else {
            // No posts found with these tags, return empty result
            return res.status(200).json({
              posts: [],
              total: 0,
              limit: limitNum,
              offset: offsetNum,
            });
          }
        }
      }

      // Sort
      switch (sortBy) {
        case "popular":
          query = query.order("views", { ascending: false });
          break;
        case "featured":
          query = query.order("featured", { ascending: false }).order("published_at", { ascending: false });
          break;
        case "trending":
          // Simplified: recent posts with high views
          query = query.order("views", { ascending: false }).order("published_at", { ascending: false });
          break;
        case "recent":
        default:
          query = query.order("published_at", { ascending: false });
          break;
      }

      // Pagination
      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Failed to fetch posts" });
      }

      // Transform data to match TypeScript types
      const posts = (data || []).map((post: any) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description,
        content: post.content,
        excerpt: post.excerpt,
        authorId: post.author_id,
        author: post.author
          ? {
              id: post.author.id,
              userId: post.author.user_id,
              name: post.author.name,
              email: post.author.email,
              avatarUrl: post.author.avatar_url,
              bio: post.author.bio,
              website: post.author.website,
              socialLinks: post.author.social_links || {},
              createdAt: post.author.created_at,
              updatedAt: post.author.updated_at,
            }
          : undefined,
        categoryId: post.category_id,
        category: post.category
          ? {
              id: post.category.id,
              slug: post.category.slug,
              name: post.category.name,
              description: post.category.description,
              color: post.category.color,
              sortOrder: post.category.sort_order,
              postCount: post.category.post_count,
              createdAt: post.category.created_at,
              updatedAt: post.category.updated_at,
            }
          : undefined,
        tags: post.tags?.map((pt: any) => ({
          id: pt.tag.id,
          slug: pt.tag.slug,
          name: pt.tag.name,
          usageCount: pt.tag.usage_count,
          createdAt: pt.tag.created_at,
        })),
        featuredImage: post.featured_image,
        readingTime: post.reading_time || 0,
        views: post.views || 0,
        published: post.published,
        featured: post.featured,
        publishedAt: post.published_at,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      }));

      return res.status(200).json({
        posts,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/blog/posts:", error);
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

      // Check if user is an author
      const { data: author } = await supabase
        .from("blog_authors")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!author) {
        return res.status(403).json({ error: "User is not an author" });
      }

      const body = createPostSchema.parse(req.body);
      const {
        slug,
        title,
        description,
        content,
        excerpt,
        categoryId,
        tagIds,
        featuredImage,
        readingTime,
        published,
        featured,
        publishedAt,
      } = body;

      // Create post
      const { data: post, error: postError } = await supabase
        .from("blog_posts")
        .insert({
          slug,
          title,
          description,
          content,
          excerpt,
          author_id: author.id,
          category_id: categoryId,
          featured_image: featuredImage,
          reading_time: readingTime,
          published,
          featured,
          published_at: publishedAt || (published ? new Date().toISOString() : null),
        })
        .select()
        .single();

      if (postError) {
        console.error("Error creating post:", postError);
        return res.status(500).json({ error: "Failed to create post" });
      }

      // Add tags if provided
      if (tagIds && tagIds.length > 0) {
        const tagInserts = tagIds.map((tagId) => ({
          post_id: post.id,
          tag_id: tagId,
        }));

        const { error: tagError } = await supabase
          .from("blog_post_tags")
          .insert(tagInserts);

        if (tagError) {
          console.error("Error adding tags:", tagError);
          // Don't fail the request if tags fail
        }
      }

      return res.status(201).json({ post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/blog/posts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

