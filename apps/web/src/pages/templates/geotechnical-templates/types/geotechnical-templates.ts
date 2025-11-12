import { Template } from "@/pages/templates/types/templates";

export type GeotechnicalCategory = 'soil-analysis' | 'foundation-design' | 'slope-stability';
export type GeotechnicalSubcategory = 
  | 'soil-classification'
  | 'bearing-capacity-calculations'
  | 'settlement-analysis'
  | 'laboratory-test-forms'
  | 'shallow-foundation-design'
  | 'deep-foundation-templates'
  | 'retaining-wall-design'
  | 'foundation-reports'
  | 'slope-analysis-templates'
  | 'landslide-assessment'
  | 'erosion-control'
  | 'stability-reports';

export interface GeotechnicalTemplate extends Template {
  category: 'geotechnical';
  geotechnicalCategory: GeotechnicalCategory;
  subcategory: GeotechnicalSubcategory;
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
      agentId: 'geotechnical';
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
    units?: string;
    standards?: string[];
    analysisTypes?: string[];
    soilTypes?: string[];
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

export interface GeotechnicalTemplateFilters {
  search: string;
  category: GeotechnicalCategory | 'all';
  subcategory: GeotechnicalSubcategory | 'all';
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

