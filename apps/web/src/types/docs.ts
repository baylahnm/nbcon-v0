/**
 * Docs Types
 * Centralized type definitions for documentation data structures
 * Single Source of Truth for docs data
 */

export interface DocsFeedback {
  id: string;
  pageSlug: string;
  userId?: string;
  helpful: boolean;
  comment?: string;
  createdAt: string;
}

export interface DocPage {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  version?: string;
  lastUpdated?: string;
}

export interface DocsFeedbackStats {
  pageSlug: string;
  helpfulCount: number;
  notHelpfulCount: number;
  totalCount: number;
}

