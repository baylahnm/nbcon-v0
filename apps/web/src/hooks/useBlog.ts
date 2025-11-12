/**
 * Blog Hook
 * Reusable hook for fetching and filtering blog data
 */

import { useState, useEffect } from "react";
import type { BlogPost, BlogCategory, BlogTag, BlogFilters, BlogStats } from "@/types/blog";

interface UseBlogOptions {
  filters?: Partial<BlogFilters>;
  limit?: number;
  offset?: number;
}

interface UseBlogReturn {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  featuredPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  stats: BlogStats | null;
  refetch: () => Promise<void>;
}

export function useBlog(options: UseBlogOptions = {}): UseBlogReturn {
  const { filters = {}, limit = 50, offset = 0 } = options;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<BlogStats | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams();
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.tagIds && filters.tagIds.length > 0) {
        filters.tagIds.forEach((id) => params.append("tagIds", id));
      }
      if (filters.authorId) params.append("authorId", filters.authorId);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.published !== undefined) params.append("published", String(filters.published));
      params.append("limit", String(limit));
      params.append("offset", String(offset));

      // Fetch posts
      const postsRes = await fetch(`/api/blog/posts?${params.toString()}`);
      if (!postsRes.ok) throw new Error("Failed to fetch posts");
      const postsData = await postsRes.json();

      // Fetch categories
      const categoriesRes = await fetch("/api/blog/categories");
      if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
      const categoriesData = await categoriesRes.json();

      // Fetch tags
      const tagsRes = await fetch("/api/blog/tags");
      if (!tagsRes.ok) throw new Error("Failed to fetch tags");
      const tagsData = await tagsRes.json();

      // Fetch stats
      const statsRes = await fetch("/api/blog/stats");
      if (!statsRes.ok) throw new Error("Failed to fetch stats");
      const statsData = await statsRes.json();

      // Apply client-side search filter if provided
      let filteredPosts = postsData.posts || [];
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(
          (post: BlogPost) =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.excerpt?.toLowerCase().includes(query)
        );
      }

      setPosts(filteredPosts);
      setCategories(categoriesData.categories || []);
      setTags(tagsData.tags || []);
      setStats(statsData.stats || null);

      // Find featured post
      const featured = filteredPosts.find((post: BlogPost) => post.featured);
      setFeaturedPost(featured || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching blog data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.categoryId, filters.tagIds?.join(","), filters.authorId, filters.sortBy, limit, offset]);

  return {
    posts,
    categories,
    tags,
    featuredPost,
    loading,
    error,
    stats,
    refetch: fetchData,
  };
}

/**
 * Hook for fetching a single blog post by slug
 */
export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/blog/posts/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Post not found");
          } else {
            throw new Error("Failed to fetch post");
          }
          return;
        }

        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
}

