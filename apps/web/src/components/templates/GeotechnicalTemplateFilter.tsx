"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { GeotechnicalTemplateFilters, GeotechnicalCategory, GeotechnicalSubcategory } from "@/pages/templates/geotechnical-templates/types/geotechnical-templates";

interface GeotechnicalTemplateFilterProps {
  filters: GeotechnicalTemplateFilters;
  categories: GeotechnicalCategory[];
  subcategories: GeotechnicalSubcategory[];
  onFilterChange: <K extends keyof GeotechnicalTemplateFilters>(
    key: K,
    value: GeotechnicalTemplateFilters[K]
  ) => void;
}

export function GeotechnicalTemplateFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: GeotechnicalTemplateFilterProps) {
  const categoryLabels: Record<GeotechnicalCategory | "all", string> = {
    all: "All Categories",
    "soil-analysis": "Soil Analysis",
    "foundation-design": "Foundation Design",
    "slope-stability": "Slope Stability",
  };

  const subcategoryLabels: Record<GeotechnicalSubcategory | "all", string> = {
    all: "All Subcategories",
    "soil-classification": "Soil Classification",
    "bearing-capacity-calculations": "Bearing Capacity Calculations",
    "settlement-analysis": "Settlement Analysis",
    "laboratory-test-forms": "Laboratory Test Forms",
    "shallow-foundation-design": "Shallow Foundation Design",
    "deep-foundation-templates": "Deep Foundation Templates",
    "retaining-wall-design": "Retaining Wall Design",
    "foundation-reports": "Foundation Reports",
    "slope-analysis-templates": "Slope Analysis Templates",
    "landslide-assessment": "Landslide Assessment",
    "erosion-control": "Erosion Control",
    "stability-reports": "Stability Reports",
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search templates..."
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
          onValueChange={(value) => onFilterChange("category", value as GeotechnicalCategory | "all")}
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
          onValueChange={(value) => onFilterChange("subcategory", value as GeotechnicalSubcategory | "all")}
        >
          <SelectTrigger className="w-[240px]">
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

        {/* Sort Filter */}
        <Select
          value={filters.sort}
          onValueChange={(value) => onFilterChange("sort", value as GeotechnicalTemplateFilters["sort"])}
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

