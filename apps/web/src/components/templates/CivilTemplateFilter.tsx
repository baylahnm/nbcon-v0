"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { CivilTemplateFilters, CivilCategory, CivilSubcategory } from "@/pages/templates/civil-templates/types/civil-templates";

interface CivilTemplateFilterProps {
  filters: CivilTemplateFilters;
  categories: CivilCategory[];
  subcategories: CivilSubcategory[];
  onFilterChange: <K extends keyof CivilTemplateFilters>(
    key: K,
    value: CivilTemplateFilters[K]
  ) => void;
}

export function CivilTemplateFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: CivilTemplateFilterProps) {
  const categoryLabels: Record<CivilCategory | "all", string> = {
    all: "All Categories",
    "site-design": "Site Design",
    "material-estimation": "Material Estimation",
    infrastructure: "Infrastructure",
  };

  const subcategoryLabels: Record<CivilSubcategory | "all", string> = {
    all: "All Subcategories",
    "site-layout-plans": "Site Layout Plans",
    "grading-designs": "Grading Designs",
    "drainage-systems": "Drainage Systems",
    "road-design": "Road Design",
    "parking-lot-layouts": "Parking Lot Layouts",
    "concrete-calculations": "Concrete Calculations",
    "steel-quantity": "Steel Quantity",
    "earthwork-calculations": "Earthwork Calculations",
    "material-cost-analysis": "Material Cost Analysis",
    "quantity-takeoff": "Quantity Takeoff",
    "bridge-design": "Bridge Design",
    "highway-design": "Highway Design",
    "utility-design": "Utility Design",
    "structural-analysis": "Structural Analysis",
    "retaining-wall-designs": "Retaining Wall Designs",
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
          onValueChange={(value) => onFilterChange("category", value as CivilCategory | "all")}
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
          onValueChange={(value) => onFilterChange("subcategory", value as CivilSubcategory | "all")}
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

        {/* Sort Filter */}
        <Select
          value={filters.sort}
          onValueChange={(value) => onFilterChange("sort", value as CivilTemplateFilters["sort"])}
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

