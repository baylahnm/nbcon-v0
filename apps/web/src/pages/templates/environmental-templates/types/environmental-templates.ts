import { Template } from "@/pages/templates/types/templates";

export type EnvironmentalCategory = 'impact-assessment' | 'compliance' | 'remediation-planning';
export type EnvironmentalSubcategory = 
  | 'impact-studies'
  | 'risk-assessments'
  | 'mitigation-plans'
  | 'monitoring-forms'
  | 'compliance-checklists'
  | 'permit-applications'
  | 'reporting-templates'
  | 'audit-forms'
  | 'remediation-action-plans'
  | 'contamination-assessment'
  | 'cleanup-workflows'
  | 'progress-tracking';

export interface EnvironmentalTemplate extends Template {
  category: 'environmental';
  environmentalCategory: EnvironmentalCategory;
  subcategory: EnvironmentalSubcategory;
  tags: string[];
  screenshots?: string[];
  version: string;
  lastUpdated: Date;
  rating?: number;
  reviews?: number;
  requirements?: {
    tier: 'free' | 'basic' | 'pro' | 'enterprise';
    dependencies?: string[];
  };
  configuration?: {
    parameters: TemplateParameter[];
    defaultValues: Record<string, any>;
    agentIntegration?: {
      agentId: 'environmental';
      enabled: boolean;
      useCases?: string[];
    };
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
    regulations?: string[];
    standards?: string[];
    assessmentTypes?: string[];
    complianceFrameworks?: string[];
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

export interface EnvironmentalTemplateFilters {
  search: string;
  category: EnvironmentalCategory | 'all';
  subcategory: EnvironmentalSubcategory | 'all';
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

