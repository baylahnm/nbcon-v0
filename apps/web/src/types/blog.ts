/**
 * Blog Types
 * Centralized type definitions for blog data structures
 * Single source of truth for blog data
 */

export interface BlogAuthor {
  id: string;
  userId?: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  color: string;
  sortOrder: number;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogTag {
  id: string;
  slug: string;
  name: string;
  usageCount: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // MDX content
  excerpt?: string;
  authorId: string;
  author?: BlogAuthor;
  categoryId?: string;
  category?: BlogCategory;
  tags?: BlogTag[];
  featuredImage?: string;
  readingTime: number; // in minutes
  views: number;
  published: boolean;
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFilters {
  searchQuery: string;
  categoryId?: string;
  tagIds?: string[];
  authorId?: string;
  sortBy: "recent" | "popular" | "featured" | "trending";
  published?: boolean;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  totalAuthors: number;
  publishedPosts: number;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  frequency: "weekly" | "monthly";
  subscribedAt: string;
  unsubscribedAt?: string;
  isActive: boolean;
}

