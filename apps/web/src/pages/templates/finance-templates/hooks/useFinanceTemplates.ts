import { useState, useMemo } from "react";
import { DollarSign } from "lucide-react";
import { FinanceTemplate, FinanceTemplateFilters } from "../types/finance-templates";

// Mock data - Replace with actual API call
const mockFinanceTemplates: FinanceTemplate[] = [
  {
    id: "finance-1",
    name: "Project Cost Breakdown Template",
    description: "Comprehensive project cost breakdown template with material, labor, and overhead calculations",
    category: "finance",
    financeCategory: "cost-estimation",
    subcategory: "project-cost-breakdowns",
    tags: ["Cost Estimation", "Project Cost", "Breakdown", "Budget"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/cost-breakdown",
    author: "Community Contributor",
    updatedAt: "1 day ago",
    createdAt: "2025-01-20",
    usageCount: 203,
    views: 678,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Cost+Breakdown",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-1",
      name: "John Smith",
      verified: true
    },
    version: "2.1.0",
    lastUpdated: new Date("2025-01-28"),
    rating: 4.8,
    reviews: 34,
    screenshots: [],
    useCases: ["Project planning", "Budget estimation", "Cost tracking"],
    technicalSpecs: {
      currency: "SAR",
      calculationTypes: ["Material Cost", "Labor Cost", "Overhead"],
      reportFormats: ["PDF", "Excel"]
    }
  },
  {
    id: "finance-2",
    name: "Budget Planning Template",
    description: "Complete budget planning template with expense categories and forecasting",
    category: "finance",
    financeCategory: "cost-estimation",
    subcategory: "budget-templates",
    tags: ["Cost Estimation", "Budget", "Planning", "Forecasting"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/budget-planning",
    author: "Community Contributor",
    updatedAt: "2 days ago",
    createdAt: "2025-01-18",
    usageCount: 178,
    views: 523,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Budget+Planning",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-2",
      name: "Sarah Johnson",
      verified: true
    },
    version: "1.8.0",
    lastUpdated: new Date("2025-01-26"),
    rating: 4.7,
    reviews: 22
  },
  {
    id: "finance-3",
    name: "Cost Tracking Form",
    description: "Daily cost tracking form for project expenses and budget monitoring",
    category: "finance",
    financeCategory: "cost-estimation",
    subcategory: "cost-tracking-forms",
    tags: ["Cost Estimation", "Tracking", "Expenses", "Monitoring"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/cost-tracking",
    author: "Community Contributor",
    updatedAt: "3 days ago",
    createdAt: "2025-01-15",
    usageCount: 145,
    views: 412,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Cost+Tracking",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-3",
      name: "Mike Chen",
      verified: false
    },
    version: "1.5.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 18
  },
  {
    id: "finance-4",
    name: "Financial Report Template",
    description: "Standardized financial reporting template for project financial summaries",
    category: "finance",
    financeCategory: "cost-estimation",
    subcategory: "financial-reports",
    tags: ["Cost Estimation", "Reports", "Financial", "Summary"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/financial-report",
    author: "Community Contributor",
    updatedAt: "4 days ago",
    createdAt: "2025-01-12",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Financial+Report",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-4",
      name: "Emily Davis",
      verified: true
    },
    version: "1.4.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.5,
    reviews: 15
  },
  {
    id: "finance-5",
    name: "Budget Planning Dashboard",
    description: "Interactive budget planning dashboard with expense tracking and forecasting",
    category: "finance",
    financeCategory: "budget-management",
    subcategory: "budget-planning",
    tags: ["Budget Management", "Planning", "Dashboard", "Forecasting"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/budget-dashboard",
    author: "Community Contributor",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 189,
    views: 567,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Budget+Dashboard",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-5",
      name: "David Wilson",
      verified: true
    },
    version: "2.0.0",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.9,
    reviews: 28
  },
  {
    id: "finance-6",
    name: "Expense Tracking Template",
    description: "Comprehensive expense tracking template with category management and reporting",
    category: "finance",
    financeCategory: "budget-management",
    subcategory: "expense-tracking",
    tags: ["Budget Management", "Expenses", "Tracking", "Categories"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/expense-tracking",
    author: "Community Contributor",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 167,
    views: 489,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Expense+Tracking",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-6",
      name: "Lisa Anderson",
      verified: false
    },
    version: "1.7.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.7,
    reviews: 21
  },
  {
    id: "finance-7",
    name: "Financial Dashboard Template",
    description: "Real-time financial dashboard with KPIs and budget vs actual analysis",
    category: "finance",
    financeCategory: "budget-management",
    subcategory: "financial-dashboards",
    tags: ["Budget Management", "Dashboard", "KPIs", "Analysis"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/financial-dashboard",
    author: "Community Contributor",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-05",
    usageCount: 156,
    views: 456,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Financial+Dashboard",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-7",
      name: "Robert Taylor",
      verified: true
    },
    version: "1.6.2",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.6,
    reviews: 17
  },
  {
    id: "finance-8",
    name: "ROI Calculation Template",
    description: "Return on investment calculation template with multiple analysis methods",
    category: "finance",
    financeCategory: "financial-analysis",
    subcategory: "roi-calculations",
    tags: ["Financial Analysis", "ROI", "Investment", "Returns"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/roi-calculation",
    author: "Community Contributor",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 198,
    views: 612,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=ROI+Calculation",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-8",
      name: "Jennifer Martinez",
      verified: true
    },
    version: "1.9.0",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.8,
    reviews: 26
  },
  {
    id: "finance-9",
    name: "Cash Flow Analysis Template",
    description: "Comprehensive cash flow analysis template with forecasting and projections",
    category: "finance",
    financeCategory: "financial-analysis",
    subcategory: "cash-flow-analysis",
    tags: ["Financial Analysis", "Cash Flow", "Forecasting", "Projections"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/cash-flow",
    author: "Community Contributor",
    updatedAt: "4 days ago",
    createdAt: "2025-01-11",
    usageCount: 145,
    views: 423,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Cash+Flow",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-9",
      name: "Michael Brown",
      verified: false
    },
    version: "1.5.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.7,
    reviews: 19
  },
  {
    id: "finance-10",
    name: "Financial Projections Template",
    description: "Multi-year financial projections template with scenario analysis",
    category: "finance",
    financeCategory: "financial-analysis",
    subcategory: "financial-projections",
    tags: ["Financial Analysis", "Projections", "Forecasting", "Scenarios"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/financial-projections",
    author: "Community Contributor",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 123,
    views: 367,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Projections",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-10",
      name: "Amanda White",
      verified: true
    },
    version: "1.4.2",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.6,
    reviews: 16
  },
  {
    id: "finance-11",
    name: "Investment Analysis Template",
    description: "Investment analysis template with NPV, IRR, and payback period calculations",
    category: "finance",
    financeCategory: "financial-analysis",
    subcategory: "investment-analysis",
    tags: ["Financial Analysis", "Investment", "NPV", "IRR"],
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates/investment-analysis",
    author: "Community Contributor",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 112,
    views: 312,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Investment",
    agentId: null,
    isCommunityTemplate: true,
    contributor: {
      id: "user-11",
      name: "Christopher Lee",
      verified: true
    },
    version: "1.3.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.5,
    reviews: 14
  }
];

export function useFinanceTemplates() {
  const [filters, setFilters] = useState<FinanceTemplateFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    sort: "popular"
  });

  const filteredTemplates = useMemo(() => {
    let filtered = [...mockFinanceTemplates];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchLower) ||
          template.description.toLowerCase().includes(searchLower) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((template) => template.financeCategory === filters.category);
    }

    // Subcategory filter
    if (filters.subcategory !== "all") {
      filtered = filtered.filter((template) => template.subcategory === filters.subcategory);
    }

    // Sort
    switch (filters.sort) {
      case "popular":
        filtered.sort((a, b) => b.usageCount - a.usageCount);
        break;
      case "recent":
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [filters]);

  const updateFilter = <K extends keyof FinanceTemplateFilters>(
    key: K,
    value: FinanceTemplateFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockFinanceTemplates.map((t) => t.financeCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockFinanceTemplates.map((t) => t.subcategory)));
    }
    return Array.from(
      new Set(
        mockFinanceTemplates
          .filter((t) => t.financeCategory === filters.category)
          .map((t) => t.subcategory)
      )
    );
  }, [filters.category]);

  return {
    templates: filteredTemplates,
    filters,
    updateFilter,
    categories,
    subcategories,
    totalCount: mockFinanceTemplates.length,
    filteredCount: filteredTemplates.length
  };
}

