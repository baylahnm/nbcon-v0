import { Template } from "@/pages/templates/types/templates";

export type MechanicalCategory = 'hvac' | 'piping' | 'mechanical-systems';
export type MechanicalSubcategory = 
  | 'load-calculations'
  | 'ductwork-design'
  | 'equipment-selection'
  | 'energy-analysis'
  | 'pipe-sizing-calculations'
  | 'hydraulic-analysis'
  | 'pid-templates'
  | 'pipe-routing-layouts'
  | 'pump-selection'
  | 'fan-sizing'
  | 'equipment-schedules'
  | 'system-diagrams';

export interface MechanicalTemplate extends Template {
  category: 'mechanical';
  mechanicalCategory: MechanicalCategory;
  subcategory: MechanicalSubcategory;
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
      agentId: 'mechanical';
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
    calculationTypes?: string[];
    systemTypes?: string[];
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

export interface MechanicalTemplateFilters {
  search: string;
  category: MechanicalCategory | 'all';
  subcategory: MechanicalSubcategory | 'all';
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

