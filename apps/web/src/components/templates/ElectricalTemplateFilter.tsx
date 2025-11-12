"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { ElectricalTemplateFilters, ElectricalCategory, ElectricalSubcategory } from "@/pages/templates/electrical-templates/types/electrical-templates";

interface ElectricalTemplateFilterProps {
  filters: ElectricalTemplateFilters;
  categories: ElectricalCategory[];
  subcategories: ElectricalSubcategory[];
  onFilterChange: <K extends keyof ElectricalTemplateFilters>(
    key: K,
    value: ElectricalTemplateFilters[K]
  ) => void;
}

export function ElectricalTemplateFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: ElectricalTemplateFilterProps) {
  const categoryLabels: Record<ElectricalCategory | "all", string> = {
    all: "All Categories",
    "load-schedules": "Load Schedules",
    "panel-design": "Panel Design",
    "wiring-plans": "Wiring Plans",
  };

  const subcategoryLabels: Record<ElectricalSubcategory | "all", string> = {
    all: "All Subcategories",
    "load-calculations": "Load Calculations",
    "panel-schedules": "Panel Schedules",
    "circuit-breaker-sizing": "Circuit Breaker Sizing",
    "panel-layout-plans": "Panel Layout Plans",
    "one-line-diagrams": "One-Line Diagrams",
    "equipment-schedules": "Equipment Schedules",
    "conduit-routing": "Conduit Routing",
    "cable-tray-layouts": "Cable Tray Layouts",
    "lighting-plans": "Lighting Plans",
    "power-distribution": "Power Distribution",
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
          onValueChange={(value) => onFilterChange("category", value as ElectricalCategory | "all")}
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
          onValueChange={(value) => onFilterChange("subcategory", value as ElectricalSubcategory | "all")}
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
          onValueChange={(value) => onFilterChange("sort", value as ElectricalTemplateFilters["sort"])}
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

