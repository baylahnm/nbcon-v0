/**
 * Careers Types
 * Centralized type definitions for careers data structures
 * Single Source of Truth for careers data
 */

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: {
    type: "remote" | "onsite" | "hybrid";
    city?: string;
    country?: string;
  };
  type: "full-time" | "part-time" | "contract" | "internship";
  level: "entry" | "mid" | "senior" | "lead" | "executive";
  description: string;
  responsibilities: string[];
  requirements: {
    mustHave: string[];
    niceToHave: string[];
  };
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  closingDate?: string;
  applicationUrl?: string;
  views: number;
  applicationsCount: number;
  status: "open" | "closed" | "filled" | "cancelled";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category:
    | "compensation"
    | "health"
    | "work-life"
    | "development"
    | "office"
    | "additional";
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  twitter?: string;
}

export interface JobApplication {
  id: string;
  jobPostingId: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  additionalQuestions?: Record<string, any>;
  status: "pending" | "reviewing" | "interviewing" | "offer" | "rejected" | "withdrawn";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobAlert {
  id: string;
  email: string;
  department?: string;
  locationType?: string;
  jobType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CareersFilters {
  searchQuery: string;
  department?: string;
  locationType?: string;
  jobType?: string;
  level?: string;
  sortBy: "recent" | "department" | "relevance";
}

