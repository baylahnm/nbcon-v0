import { Template } from "@/pages/templates/types/templates";

export type SurveyCategory = 'gnss' | 'lidar' | 'photogrammetry' | 'field-forms';
export type SurveySubcategory = 
  | 'static-gnss' 
  | 'rtk-rtn' 
  | 'network-adjustment' 
  | 'control-points'
  | 'point-cloud-processing'
  | 'classification'
  | 'dtm-dsm'
  | 'feature-extraction'
  | 'contour-generation'
  | 'aerial-triangulation'
  | 'orthomosaic'
  | '3d-model'
  | 'volume-calculations'
  | 'stereo-compilation'
  | 'field-notes'
  | 'instrument-setup'
  | 'quality-control'
  | 'data-collection'
  | 'observation-recording';

export interface SurveyTemplate extends Template {
  category: 'survey';
  surveyCategory: SurveyCategory;
  subcategory: SurveySubcategory;
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
    coordinateSystem?: string;
    datum?: string;
    units?: string;
    precision?: string;
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

export interface SurveyTemplateFilters {
  search: string;
  category: SurveyCategory | 'all';
  subcategory: SurveySubcategory | 'all';
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

