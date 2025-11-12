"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { GISLayoutFilters, GISCategory, GISSubcategory, MapProvider } from "@/pages/templates/gis-layouts/types/gis-layouts";

interface GISLayoutFilterProps {
  filters: GISLayoutFilters;
  categories: GISCategory[];
  subcategories: GISSubcategory[];
  onFilterChange: <K extends keyof GISLayoutFilters>(
    key: K,
    value: GISLayoutFilters[K]
  ) => void;
}

export function GISLayoutFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: GISLayoutFilterProps) {
  const categoryLabels: Record<GISCategory | "all", string> = {
    all: "All Categories",
    dashboards: "Mapping Dashboards",
    "base-maps": "Base Map Setups",
    analysis: "Spatial Analysis",
    "data-collection": "Data Collection",
  };

  const subcategoryLabels: Record<GISSubcategory | "all", string> = {
    all: "All Subcategories",
    "interactive-web-maps": "Interactive Web Maps",
    "data-visualization": "Data Visualization",
    "real-time-monitoring": "Real-time Monitoring",
    "multi-layer-config": "Multi-layer Config",
    "custom-widgets": "Custom Widgets",
    "topographic-base": "Topographic Base",
    "satellite-imagery": "Satellite Imagery",
    "street-map": "Street Map",
    "custom-coordinate": "Custom Coordinate",
    "projection-templates": "Projection Templates",
    "buffer-analysis": "Buffer Analysis",
    "overlay-analysis": "Overlay Analysis",
    "network-analysis": "Network Analysis",
    "terrain-analysis": "Terrain Analysis",
    "proximity-analysis": "Proximity Analysis",
    "field-data-collection": "Field Data Collection",
    "mobile-gis-forms": "Mobile GIS Forms",
    "attribute-entry": "Attribute Entry",
    "gps-data-collection": "GPS Data Collection",
    "survey-integration": "Survey Integration",
  };

  const mapProviderLabels: Record<MapProvider, string> = {
    all: "All Providers",
    openstreetmap: "OpenStreetMap",
    google: "Google Maps",
    mapbox: "Mapbox",
    esri: "Esri",
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search layouts..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Filters:</span>
        </div>

        {/* Category Filter */}
        <Select
          value={filters.category}
          onValueChange={(value) => onFilterChange("category", value as GISCategory | "all")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryLabels[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subcategory Filter */}
        <Select
          value={filters.subcategory}
          onValueChange={(value) => onFilterChange("subcategory", value as GISSubcategory | "all")}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Subcategory" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subcategories</SelectItem>
            {subcategories.map((subcat) => (
              <SelectItem key={subcat} value={subcat}>
                {subcategoryLabels[subcat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Map Provider Filter */}
        <Select
          value={filters.mapProvider}
          onValueChange={(value) => onFilterChange("mapProvider", value as MapProvider)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Map Provider" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(mapProviderLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select
          value={filters.sort}
          onValueChange={(value) => onFilterChange("sort", value as GISLayoutFilters["sort"])}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

