"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { FinanceTemplateFilters, FinanceCategory, FinanceSubcategory } from "@/pages/templates/finance-templates/types/finance-templates";

interface FinanceTemplateFilterProps {
  filters: FinanceTemplateFilters;
  categories: FinanceCategory[];
  subcategories: FinanceSubcategory[];
  onFilterChange: <K extends keyof FinanceTemplateFilters>(
    key: K,
    value: FinanceTemplateFilters[K]
  ) => void;
}

export function FinanceTemplateFilter({
  filters,
  categories,
  subcategories,
  onFilterChange,
}: FinanceTemplateFilterProps) {
  const categoryLabels: Record<FinanceCategory | "all", string> = {
    all: "All Categories",
    "cost-estimation": "Cost Estimation",
    "budget-management": "Budget Management",
    "financial-analysis": "Financial Analysis",
  };

  const subcategoryLabels: Record<FinanceSubcategory | "all", string> = {
    all: "All Subcategories",
    "project-cost-breakdowns": "Project Cost Breakdowns",
    "budget-templates": "Budget Templates",
    "cost-tracking-forms": "Cost Tracking Forms",
    "financial-reports": "Financial Reports",
    "budget-planning": "Budget Planning",
    "expense-tracking": "Expense Tracking",
    "financial-dashboards": "Financial Dashboards",
    "reporting-workflows": "Reporting Workflows",
    "roi-calculations": "ROI Calculations",
    "cash-flow-analysis": "Cash Flow Analysis",
    "financial-projections": "Financial Projections",
    "investment-analysis": "Investment Analysis",
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
          onValueChange={(value) => onFilterChange("category", value as FinanceCategory | "all")}
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
          onValueChange={(value) => onFilterChange("subcategory", value as FinanceSubcategory | "all")}
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
          onValueChange={(value) => onFilterChange("sort", value as FinanceTemplateFilters["sort"])}
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

