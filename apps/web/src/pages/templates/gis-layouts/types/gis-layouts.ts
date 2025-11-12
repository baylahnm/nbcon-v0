import { Template } from "@/pages/templates/types/templates";

export type GISCategory = 'dashboards' | 'base-maps' | 'analysis' | 'data-collection';
export type GISSubcategory = 
  | 'interactive-web-maps'
  | 'data-visualization'
  | 'real-time-monitoring'
  | 'multi-layer-config'
  | 'custom-widgets'
  | 'topographic-base'
  | 'satellite-imagery'
  | 'street-map'
  | 'custom-coordinate'
  | 'projection-templates'
  | 'buffer-analysis'
  | 'overlay-analysis'
  | 'network-analysis'
  | 'terrain-analysis'
  | 'proximity-analysis'
  | 'field-data-collection'
  | 'mobile-gis-forms'
  | 'attribute-entry'
  | 'gps-data-collection'
  | 'survey-integration';

export type MapProvider = 'openstreetmap' | 'google' | 'mapbox' | 'esri' | 'all';

export interface GISLayout extends Template {
  category: 'gis';
  gisCategory: GISCategory;
  subcategory: GISSubcategory;
  tags: string[];
  screenshots?: string[];
  version: string;
  lastUpdated: Date;
  rating?: number;
  reviews?: number;
  requirements?: {
    tier: 'free' | 'basic' | 'pro' | 'enterprise';
    dependencies?: string[];
    mapProvider?: MapProvider;
  };
  configuration?: {
    mapProvider?: string;
    coordinateSystem?: string;
    defaultLayers?: string[];
    widgets?: string[];
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
  relatedLayouts?: string[];
  useCases?: string[];
  technicalSpecs?: {
    coordinateSystem?: string;
    projection?: string;
    units?: string;
    extent?: {
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
    };
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

export interface GISLayoutFilters {
  search: string;
  category: GISCategory | 'all';
  subcategory: GISSubcategory | 'all';
  mapProvider: MapProvider;
  sort: 'popular' | 'recent' | 'rating' | 'alphabetical';
}

