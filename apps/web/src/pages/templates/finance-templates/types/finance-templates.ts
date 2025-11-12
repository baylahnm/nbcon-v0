import { Template } from "@/pages/templates/types/templates";

export type FinanceCategory = 'cost-estimation' | 'budget-management' | 'financial-analysis';
export type FinanceSubcategory = 
  | 'project-cost-breakdowns'
  | 'budget-templates'
  | 'cost-tracking-forms'
  | 'financial-reports'
  | 'budget-planning'
  | 'expense-tracking'
  | 'financial-dashboards'
  | 'reporting-workflows'
  | 'roi-calculations'
  | 'cash-flow-analysis'
  | 'financial-projections'
  | 'investment-analysis';

export interface FinanceTemplate extends Template {
  category: 'finance';
  financeCategory: FinanceCategory;
  subcategory: FinanceSubcategory;
  tags: string[];
  screenshots?: string[];
  version: string;
  lastUpdated: Date;
  rating?: number;
  reviews?: number;
  isCommunityTemplate: true;
  contributor?: {
    id: string;
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  requirements?: {
    tier: 'free' | 'basic' | 'pro' | 'enterprise';
    dependencies?: string[];
  };
  configuration?: {
    parameters: TemplateParameter[];
    defaultValues: Record<string, any>;
  };
  files?: {
    name: string;
    type: string;
    url: string;
    size: number;
  }[];
  documentation?: string;
  relatedTemplates?: string[];
  useCases?: string[];
  technicalSpecs?: {
    currency?: string;
    calculationTypes?: string[];
    reportFormats?: string[];
  };
}

export interface TemplateParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  label: string;
  description?: string;
  required?: boolean;
  defaultValue?: any;
  options?: { value: string; label: string }[];
}

export interface FinanceTemplateFilters {
  search: string;
  category: FinanceCategory | 'all';
  subcategory: FinanceSubcategory | 'all';
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

