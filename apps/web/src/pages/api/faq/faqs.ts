import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createFAQSchema = z.object({
  question: z.string().min(5).max(500),
  answer: z.string().min(10),
  categoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
  relatedDocs: z.array(z.string()).default([]),
  relatedFAQs: z.array(z.string().uuid()).default([]),
  isPopular: z.boolean().default(false),
  isNew: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

/**
 * FAQs API endpoint
 * GET: List FAQs with filters
 * POST: Create a new FAQ (admin only)
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
        categorySlug,
        popular,
        new: isNew,
        sortBy = "recent",
        limit = 100,
        offset = 0,
      } = req.query;

      let query = supabase
        .from("faqs")
        .select(
          `
          *,
          category:faq_categories(id, slug, name, icon)
        `,
          { count: "exact" }
        );

      // Category filter
      if (categoryId && typeof categoryId === "string") {
        query = query.eq("category_id", categoryId);
      } else if (categorySlug && typeof categorySlug === "string") {
        // Join with categories table to filter by slug
        const { data: category } = await supabase
          .from("faq_categories")
          .select("id")
          .eq("slug", categorySlug)
          .single();

        if (category) {
          query = query.eq("category_id", category.id);
        }
      }

      // Popular filter
      if (popular === "true") {
        query = query.eq("is_popular", true);
      }

      // New filter
      if (isNew === "true") {
        query = query.eq("is_new", true);
      }

      // Sort
      switch (sortBy) {
        case "popular":
          query = query.order("is_popular", { ascending: false }).order("views", { ascending: false });
          break;
        case "helpful":
          query = query.order("helpful_count", { ascending: false });
          break;
        case "views":
          query = query.order("views", { ascending: false });
          break;
        case "recent":
        default:
          query = query.order("sort_order", { ascending: true }).order("created_at", { ascending: false });
          break;
      }

      // Pagination
      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching FAQs:", error);
        return res.status(500).json({ error: "Failed to fetch FAQs" });
      }

      // Transform data to match TypeScript types
      const faqs = (data || []).map((faq: any) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category
          ? {
              id: faq.category.id,
              slug: faq.category.slug,
              name: faq.category.name,
              icon: faq.category.icon,
            }
          : null,
        tags: faq.tags || [],
        helpfulCount: faq.helpful_count || 0,
        notHelpfulCount: faq.not_helpful_count || 0,
        views: faq.views || 0,
        relatedDocs: faq.related_docs || [],
        relatedFAQs: faq.related_faqs || [],
        isPopular: faq.is_popular || false,
        isNew: faq.is_new || false,
        sortOrder: faq.sort_order || 0,
        createdAt: faq.created_at,
        updatedAt: faq.updated_at,
      }));

      return res.status(200).json({
        faqs,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/faq/faqs:", error);
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

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        return res.status(403).json({ error: "Admin access required" });
      }

      const body = createFAQSchema.parse(req.body);
      const {
        question,
        answer,
        categoryId,
        tags,
        relatedDocs,
        relatedFAQs,
        isPopular,
        isNew,
        sortOrder,
      } = body;

      // Create FAQ
      const { data: faq, error: faqError } = await supabase
        .from("faqs")
        .insert({
          question,
          answer,
          category_id: categoryId || null,
          tags,
          related_docs: relatedDocs,
          related_faqs: relatedFAQs,
          is_popular: isPopular,
          is_new: isNew,
          sort_order: sortOrder,
        })
        .select(
          `
          *,
          category:faq_categories(id, slug, name, icon)
        `
        )
        .single();

      if (faqError) {
        console.error("Error creating FAQ:", faqError);
        return res.status(500).json({ error: "Failed to create FAQ" });
      }

      // Transform response
      const transformedFAQ = {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category
          ? {
              id: faq.category.id,
              slug: faq.category.slug,
              name: faq.category.name,
              icon: faq.category.icon,
            }
          : null,
        tags: faq.tags || [],
        helpfulCount: faq.helpful_count || 0,
        notHelpfulCount: faq.not_helpful_count || 0,
        views: faq.views || 0,
        relatedDocs: faq.related_docs || [],
        relatedFAQs: faq.related_faqs || [],
        isPopular: faq.is_popular || false,
        isNew: faq.is_new || false,
        sortOrder: faq.sort_order || 0,
        createdAt: faq.created_at,
        updatedAt: faq.updated_at,
      };

      return res.status(201).json({ faq: transformedFAQ });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/faq/faqs:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

