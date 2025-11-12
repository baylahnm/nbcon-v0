/**
 * FAQ Types
 * Centralized type definitions for FAQ data structures
 * Single Source of Truth for FAQ data
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: {
    id: string;
    slug: string;
    name: string;
    icon?: string;
  } | null;
  tags: string[];
  helpfulCount: number;
  notHelpfulCount: number;
  views: number;
  relatedDocs: string[];
  relatedFAQs: string[];
  isPopular: boolean;
  isNew: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface FAQCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  faqCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FAQFeedback {
  id: string;
  faqId: string;
  userId?: string;
  helpful: boolean;
  comment?: string;
  createdAt: string;
}

export interface FAQFilters {
  searchQuery: string;
  categoryId?: string;
  categorySlug?: string;
  tags?: string[];
  popular?: boolean;
  new?: boolean;
  sortBy: "recent" | "popular" | "helpful" | "views";
}

