/**
 * FAQ Hook
 * Reusable hook for fetching and filtering FAQ data
 */

import { useState, useEffect } from "react";
import type { FAQ, FAQCategory, FAQFilters } from "@/types/faq";

interface UseFAQOptions {
  filters?: Partial<FAQFilters>;
  limit?: number;
  offset?: number;
}

interface UseFAQReturn {
  faqs: FAQ[];
  categories: FAQCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFAQ(options: UseFAQOptions = {}): UseFAQReturn {
  const { filters = {}, limit = 100, offset = 0 } = options;
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams();
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.categorySlug) params.append("categorySlug", filters.categorySlug);
      if (filters.popular) params.append("popular", "true");
      if (filters.new) params.append("new", "true");
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      params.append("limit", String(limit));
      params.append("offset", String(offset));

      // Fetch FAQs and categories in parallel
      const [faqsRes, categoriesRes] = await Promise.all([
        fetch(`/api/faq/faqs?${params.toString()}`),
        fetch("/api/faq/categories"),
      ]);

      if (!faqsRes.ok) throw new Error("Failed to fetch FAQs");
      if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

      const faqsData = await faqsRes.json();
      const categoriesData = await categoriesRes.json();

      // Apply client-side search filter if provided
      let filteredFaqs = faqsData.faqs || [];
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredFaqs = filteredFaqs.filter(
          (faq: FAQ) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query) ||
            faq.tags.some((tag) => tag.toLowerCase().includes(query)) ||
            faq.category?.name.toLowerCase().includes(query)
        );
      }

      // Apply tag filter if provided
      if (filters.tags && filters.tags.length > 0) {
        filteredFaqs = filteredFaqs.filter((faq: FAQ) =>
          filters.tags!.some((tag) => faq.tags.includes(tag))
        );
      }

      setFaqs(filteredFaqs);
      setCategories(categoriesData.categories || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching FAQ data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filters.categoryId,
    filters.categorySlug,
    filters.popular,
    filters.new,
    filters.sortBy,
    limit,
    offset,
  ]);

  return {
    faqs,
    categories,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook for fetching a single FAQ by ID
 */
export function useSingleFAQ(id: string) {
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/faq/faqs/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("FAQ not found");
          } else {
            throw new Error("Failed to fetch FAQ");
          }
          return;
        }

        const data = await res.json();
        setFaq(data.faq);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching FAQ:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFAQ();
    }
  }, [id]);

  return { faq, loading, error };
}

