/**
 * Forum Types
 * Centralized type definitions for forum data structures
 * Single source of truth for forum data
 */

export interface ForumUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  reputation?: number;
  bio?: string;
}

export interface ForumCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  sortOrder: number;
  threadCount: number;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumTag {
  id: string;
  name: string;
  color?: string;
  usageCount: number;
  createdAt: string;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: ForumUser;
  categoryId?: string;
  category?: ForumCategory;
  tags?: ForumTag[];
  views: number;
  votes: number;
  replyCount: number;
  isPinned: boolean;
  isLocked: boolean;
  isSolved: boolean;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ForumPost {
  id: string;
  threadId: string;
  thread?: ForumThread;
  content: string;
  authorId: string;
  author?: ForumUser;
  votes: number;
  isBestAnswer: boolean;
  parentPostId?: string;
  parentPost?: ForumPost;
  createdAt: string;
  updatedAt: string;
}

export interface ForumVote {
  id: string;
  userId: string;
  threadId?: string;
  postId?: string;
  voteType: "up" | "down";
  createdAt: string;
}

export interface ForumFilters {
  searchQuery: string;
  categoryId?: string;
  tagIds?: string[];
  sortBy: "recent" | "popular" | "unanswered" | "trending";
}

export interface ForumStats {
  totalThreads: number;
  totalPosts: number;
  totalUsers: number;
  activeToday: number;
}

