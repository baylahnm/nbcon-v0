import { Template } from "@/pages/templates/types/templates";

export type CivilCategory = 'site-design' | 'material-estimation' | 'infrastructure';
export type CivilSubcategory = 
  | 'site-layout-plans'
  | 'grading-designs'
  | 'drainage-systems'
  | 'road-design'
  | 'parking-lot-layouts'
  | 'concrete-calculations'
  | 'steel-quantity'
  | 'earthwork-calculations'
  | 'material-cost-analysis'
  | 'quantity-takeoff'
  | 'bridge-design'
  | 'highway-design'
  | 'utility-design'
  | 'structural-analysis'
  | 'retaining-wall-designs';

export interface CivilTemplate extends Template {
  category: 'civil';
  civilCategory: CivilCategory;
  subcategory: CivilSubcategory;
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
      agentId: 'civil';
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
    calculationTypes?: string[];
    units?: string;
    standards?: string[];
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

export interface CivilTemplateFilters {
  search: string;
  category: CivilCategory | 'all';
  subcategory: CivilSubcategory | 'all';
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

