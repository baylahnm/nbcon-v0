"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { MechanicalTemplateFilters, MechanicalCategory, MechanicalSubcategory } from "@/pages/templates/mechanical-templates/types/mechanical-templates";

interface MechanicalTemplateFilterProps {
  filters: MechanicalTemplateFilters;
  categories: MechanicalCategory[];
  subcategories: MechanicalSubcategory[];
  onFilterChange: <K extends keyof MechanicalTemplateFilters>(
    key: K,
    value: MechanicalTemplateFilters[K]
  ) => void;
}

export function MechanicalTemplateFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: MechanicalTemplateFilterProps) {
  const categoryLabels: Record<MechanicalCategory | "all", string> = {
    all: "All Categories",
    hvac: "HVAC",
    piping: "Piping",
    "mechanical-systems": "Mechanical Systems",
  };

  const subcategoryLabels: Record<MechanicalSubcategory | "all", string> = {
    all: "All Subcategories",
    "load-calculations": "Load Calculations",
    "ductwork-design": "Ductwork Design",
    "equipment-selection": "Equipment Selection",
    "energy-analysis": "Energy Analysis",
    "pipe-sizing-calculations": "Pipe Sizing Calculations",
    "hydraulic-analysis": "Hydraulic Analysis",
    "pid-templates": "P&ID Templates",
    "pipe-routing-layouts": "Pipe Routing Layouts",
    "pump-selection": "Pump Selection",
    "fan-sizing": "Fan Sizing",
    "equipment-schedules": "Equipment Schedules",
    "system-diagrams": "System Diagrams",
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
          onValueChange={(value) => onFilterChange("category", value as MechanicalCategory | "all")}
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
          onValueChange={(value) => onFilterChange("subcategory", value as MechanicalSubcategory | "all")}
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
          onValueChange={(value) => onFilterChange("sort", value as MechanicalTemplateFilters["sort"])}
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

