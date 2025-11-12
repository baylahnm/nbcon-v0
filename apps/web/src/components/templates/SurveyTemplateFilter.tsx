"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { SurveyTemplateFilters, SurveyCategory, SurveySubcategory } from "@/pages/templates/survey-templates/types/survey-templates";

interface SurveyTemplateFilterProps {
  filters: SurveyTemplateFilters;
  categories: SurveyCategory[];
  subcategories: SurveySubcategory[];
  onFilterChange: <K extends keyof SurveyTemplateFilters>(
    key: K,
    value: SurveyTemplateFilters[K]
  ) => void;
}

export function SurveyTemplateFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: SurveyTemplateFilterProps) {
  const categoryLabels: Record<SurveyCategory | "all", string> = {
    all: "All Categories",
    gnss: "GNSS",
    lidar: "LiDAR",
    photogrammetry: "Photogrammetry",
    "field-forms": "Field Forms",
  };

  const subcategoryLabels: Record<SurveySubcategory | "all", string> = {
    all: "All Subcategories",
    "static-gnss": "Static GNSS",
    "rtk-rtn": "RTK/RTN",
    "network-adjustment": "Network Adjustment",
    "control-points": "Control Points",
    "point-cloud-processing": "Point Cloud Processing",
    classification: "Classification",
    "dtm-dsm": "DTM/DSM",
    "feature-extraction": "Feature Extraction",
    "contour-generation": "Contour Generation",
    "aerial-triangulation": "Aerial Triangulation",
    orthomosaic: "Orthomosaic",
    "3d-model": "3D Model",
    "volume-calculations": "Volume Calculations",
    "stereo-compilation": "Stereo Compilation",
    "field-notes": "Field Notes",
    "instrument-setup": "Instrument Setup",
    "quality-control": "Quality Control",
    "data-collection": "Data Collection",
    "observation-recording": "Observation Recording",
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
          onValueChange={(value) => onFilterChange("category", value as SurveyCategory | "all")}
        >
          <SelectTrigger className="w-[180px]">
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
          onValueChange={(value) => onFilterChange("subcategory", value as SurveySubcategory | "all")}
        >
          <SelectTrigger className="w-[200px]">
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
          onValueChange={(value) => onFilterChange("sort", value as SurveyTemplateFilters["sort"])}
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

