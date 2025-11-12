/**
 * useForum Hook
 * Reusable hook for forum data fetching and filtering
 * Uses Supabase via API endpoints
 */

import { useMemo, useState, useEffect } from "react";
import type {
  ForumThread,
  ForumCategory,
  ForumTag,
  ForumFilters,
  ForumStats,
} from "@/types/forum";

interface UseForumOptions {
  initialFilters?: Partial<ForumFilters>;
}

/**
 * Hook for managing forum data and filters
 * @returns Forum data, filters, and utility functions
 */
export function useForum(options: UseForumOptions = {}) {
  const [filters, setFilters] = useState<ForumFilters>({
    searchQuery: "",
    categoryId: undefined,
    tagIds: undefined,
    sortBy: "recent",
    ...options.initialFilters,
  });

  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from Supabase via API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/forum/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err instanceof Error ? err.message : "Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  // Fetch threads from Supabase via API
  useEffect(() => {
    async function fetchThreads() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.categoryId) params.append("categoryId", filters.categoryId);
        params.append("sortBy", filters.sortBy);
        
        const res = await fetch(`/api/forum/threads?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch threads");
        const data = await res.json();
        setThreads(data.threads || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching threads:", err);
        setError(err instanceof Error ? err.message : "Failed to load threads");
      } finally {
        setLoading(false);
      }
    }
    fetchThreads();
  }, [filters.categoryId, filters.sortBy]);

  // Filter threads based on current filters (client-side filtering for search and tags)
  const filteredThreads = useMemo(() => {
    let filtered = [...threads];

    // Category filter
    if (filters.categoryId) {
      filtered = filtered.filter((thread) => thread.categoryId === filters.categoryId);
    }

    // Tag filter
    if (filters.tagIds && filters.tagIds.length > 0) {
      filtered = filtered.filter((thread) => {
        if (!thread.tags) return false;
        return filters.tagIds!.some((tagId) =>
          thread.tags!.some((tag) => tag.id === tagId)
        );
      });
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (thread) =>
          thread.title.toLowerCase().includes(query) ||
          thread.content.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "popular":
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case "unanswered":
        filtered.sort((a, b) => a.replyCount - b.replyCount);
        break;
      case "trending":
        filtered.sort((a, b) => {
          const aScore = a.votes * 2 + a.replyCount + a.views / 10;
          const bScore = b.votes * 2 + b.replyCount + b.views / 10;
          return bScore - aScore;
        });
        break;
      case "recent":
      default:
        filtered.sort((a, b) => {
          return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
        });
        break;
    }

    return filtered;
  }, [threads, filters]);

  // Calculate stats
  const stats: ForumStats = useMemo(() => {
    return {
      totalThreads: threads.length,
      totalPosts: threads.reduce((sum, thread) => sum + thread.replyCount, 0),
      totalUsers: 0, // Will be calculated from unique authors
      activeToday: 0, // Will be calculated from recent activity
    };
  }, [threads]);

  // Update filters
  const updateFilters = (newFilters: Partial<ForumFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      categoryId: undefined,
      tagIds: undefined,
      sortBy: "recent",
    });
  };

  // Get category by slug
  const getCategoryBySlug = (slug: string): ForumCategory | undefined => {
    return categories.find((cat) => cat.slug === slug);
  };

  return {
    categories,
    threads,
    filteredThreads,
    filters,
    stats,
    loading,
    error,
    updateFilters,
    resetFilters,
    getCategoryBySlug,
  };
}

