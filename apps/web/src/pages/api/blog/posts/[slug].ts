import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Single blog post API endpoint
 * GET: Get a post by slug
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
      const { slug } = req.query;

      if (!slug || typeof slug !== "string") {
        return res.status(400).json({ error: "Slug is required" });
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          `
          *,
          author:blog_authors(*),
          category:blog_categories(*),
          tags:blog_post_tags(
            tag:blog_tags(*)
          )
        `
        )
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Increment view count
      await supabase
        .from("blog_posts")
        .update({ views: (data.views || 0) + 1 })
        .eq("id", data.id);

      // Transform data to match TypeScript types
      const post = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        content: data.content,
        excerpt: data.excerpt,
        authorId: data.author_id,
        author: data.author
          ? {
              id: data.author.id,
              userId: data.author.user_id,
              name: data.author.name,
              email: data.author.email,
              avatarUrl: data.author.avatar_url,
              bio: data.author.bio,
              website: data.author.website,
              socialLinks: data.author.social_links || {},
              createdAt: data.author.created_at,
              updatedAt: data.author.updated_at,
            }
          : undefined,
        categoryId: data.category_id,
        category: data.category
          ? {
              id: data.category.id,
              slug: data.category.slug,
              name: data.category.name,
              description: data.category.description,
              color: data.category.color,
              sortOrder: data.category.sort_order,
              postCount: data.category.post_count,
              createdAt: data.category.created_at,
              updatedAt: data.category.updated_at,
            }
          : undefined,
        tags: data.tags?.map((pt: any) => ({
          id: pt.tag.id,
          slug: pt.tag.slug,
          name: pt.tag.name,
          usageCount: pt.tag.usage_count,
          createdAt: pt.tag.created_at,
        })),
        featuredImage: data.featured_image,
        readingTime: data.reading_time || 0,
        views: (data.views || 0) + 1,
        published: data.published,
        featured: data.featured,
        publishedAt: data.published_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return res.status(200).json({ post });
    } catch (error) {
      console.error("Error in GET /api/blog/posts/[slug]:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

