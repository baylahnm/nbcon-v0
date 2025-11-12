"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { EnvironmentalTemplateFilters, EnvironmentalCategory, EnvironmentalSubcategory } from "@/pages/templates/environmental-templates/types/environmental-templates";

interface EnvironmentalTemplateFilterProps {
  filters: EnvironmentalTemplateFilters;
  categories: EnvironmentalCategory[];
  subcategories: EnvironmentalSubcategory[];
  onFilterChange: <K extends keyof EnvironmentalTemplateFilters>(
    key: K,
    value: EnvironmentalTemplateFilters[K]
  ) => void;
}

export function EnvironmentalTemplateFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: EnvironmentalTemplateFilterProps) {
  const categoryLabels: Record<EnvironmentalCategory | "all", string> = {
    all: "All Categories",
    "impact-assessment": "Impact Assessment",
    compliance: "Compliance",
    "remediation-planning": "Remediation Planning",
  };

  const subcategoryLabels: Record<EnvironmentalSubcategory | "all", string> = {
    all: "All Subcategories",
    "impact-studies": "Impact Studies",
    "risk-assessments": "Risk Assessments",
    "mitigation-plans": "Mitigation Plans",
    "monitoring-forms": "Monitoring Forms",
    "compliance-checklists": "Compliance Checklists",
    "permit-applications": "Permit Applications",
    "reporting-templates": "Reporting Templates",
    "audit-forms": "Audit Forms",
    "remediation-action-plans": "Remediation Action Plans",
    "contamination-assessment": "Contamination Assessment",
    "cleanup-workflows": "Cleanup Workflows",
    "progress-tracking": "Progress Tracking",
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
          onValueChange={(value) => onFilterChange("category", value as EnvironmentalCategory | "all")}
        >
          <SelectTrigger className="w-[220px]">
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
          onValueChange={(value) => onFilterChange("subcategory", value as EnvironmentalSubcategory | "all")}
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
          onValueChange={(value) => onFilterChange("sort", value as EnvironmentalTemplateFilters["sort"])}
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

