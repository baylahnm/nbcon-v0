import { LucideIcon } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'survey' | 'gis' | 'civil' | 'electrical' | 'mechanical' | 'geotechnical' | 'environmental' | 'finance';
  categoryName: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
  href: string;
  author: string;
  updatedAt: string;
  createdAt?: string;
  usageCount: number;
  views?: number;
  featured?: boolean;
  previewImage?: string;
  agentId?: string | null;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  agentId: string | null;
  color: string;
}

export interface TemplateSection {
  id: 'featured' | 'recent' | 'newest' | 'popular';
  title: string;
  description: string;
  icon?: LucideIcon;
  templates: Template[];
  viewAllLink: string;
}

