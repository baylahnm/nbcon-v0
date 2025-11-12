import { Template } from "@/pages/templates/types/templates";

export type ElectricalCategory = 'load-schedules' | 'panel-design' | 'wiring-plans';
export type ElectricalSubcategory = 
  | 'load-calculations'
  | 'panel-schedules'
  | 'circuit-breaker-sizing'
  | 'panel-layout-plans'
  | 'one-line-diagrams'
  | 'equipment-schedules'
  | 'conduit-routing'
  | 'cable-tray-layouts'
  | 'lighting-plans'
  | 'power-distribution';

export interface ElectricalTemplate extends Template {
  category: 'electrical';
  electricalCategory: ElectricalCategory;
  subcategory: ElectricalSubcategory;
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
      agentId: 'electrical';
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
    voltage?: string;
    phase?: string;
    standards?: string[];
    calculationTypes?: string[];
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

export interface ElectricalTemplateFilters {
  search: string;
  category: ElectricalCategory | 'all';
  subcategory: ElectricalSubcategory | 'all';
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

