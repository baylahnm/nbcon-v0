/**
 * Community Types
 * Centralized type definitions for community data structures
 * Single Source of Truth for community data
 */

export interface CommunityProject {
  id: string;
  name: string;
  description: string;
  image?: string;
  url: string;
  authorId?: string;
  author?: {
    name: string;
    avatar?: string;
    github?: string;
  };
  technologies: string[];
  category: string;
  tags: string[];
  featured: boolean;
  approved: boolean;
  views: number;
  votes: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  locationType: "virtual" | "onsite" | "hybrid";
  type: "meetup" | "webinar" | "conference" | "workshop" | "hackathon";
  registrationUrl?: string;
  organizerId?: string;
  organizerName?: string;
  image?: string;
  maxAttendees?: number;
  currentAttendees: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface ContributorContribution {
  type: "code" | "docs" | "community" | "events";
  count: number;
}

export interface CommunityContributor {
  id: string;
  userId?: string;
  name: string;
  avatar?: string;
  github?: string;
  bio?: string;
  contributions: ContributorContribution[];
  totalContributions: number;
  badges: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommunityResource {
  id: string;
  name: string;
  description: string;
  type: "template" | "guide" | "tool" | "starter-kit" | "docs";
  downloadUrl: string;
  authorId?: string;
  authorName?: string;
  downloadCount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  version?: string;
  fileSize?: number;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityStats {
  totalMembers: number;
  activeProjects: number;
  contributors: number;
  eventsHosted: number;
  resourcesShared: number;
  githubStars?: number;
}

export interface CommunityFilters {
  searchQuery: string;
  category?: string;
  tags?: string[];
  type?: string;
  sortBy: "recent" | "popular" | "featured" | "trending";
}

