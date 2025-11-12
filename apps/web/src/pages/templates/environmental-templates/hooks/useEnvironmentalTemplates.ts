import { useState, useMemo } from "react";
import { Leaf } from "lucide-react";
import { EnvironmentalTemplate, EnvironmentalTemplateFilters } from "../types/environmental-templates";

// Mock data - Replace with actual API call
const mockEnvironmentalTemplates: EnvironmentalTemplate[] = [
  {
    id: "environmental-1",
    name: "Environmental Impact Study Template",
    description: "Comprehensive environmental impact assessment template with risk analysis and mitigation strategies",
    category: "environmental",
    environmentalCategory: "impact-assessment",
    subcategory: "impact-studies",
    tags: ["Impact Assessment", "EIA", "Risk Analysis", "Mitigation"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/impact-study",
    author: "Environmental Team",
    updatedAt: "1 day ago",
    createdAt: "2025-01-20",
    usageCount: 145,
    views: 412,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/00C040/FFFFFF?text=Impact+Study",
    agentId: "environmental",
    version: "2.1.0",
    lastUpdated: new Date("2025-01-28"),
    rating: 4.8,
    reviews: 24,
    screenshots: [],
    useCases: ["Project planning", "Regulatory compliance", "Risk assessment"],
    technicalSpecs: {
      regulations: ["NEPA", "CEQA"],
      standards: ["ISO 14001"],
      assessmentTypes: ["Air Quality", "Water Quality", "Biodiversity"],
      complianceFrameworks: ["Federal", "State", "Local"]
    }
  },
  {
    id: "environmental-2",
    name: "Risk Assessment Template",
    description: "Environmental risk assessment workflow with hazard identification and impact evaluation",
    category: "environmental",
    environmentalCategory: "impact-assessment",
    subcategory: "risk-assessments",
    tags: ["Impact Assessment", "Risk", "Hazard", "Evaluation"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/risk-assessment",
    author: "Environmental Team",
    updatedAt: "2 days ago",
    createdAt: "2025-01-18",
    usageCount: 112,
    views: 345,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/00C040/FFFFFF?text=Risk+Assessment",
    agentId: "environmental",
    version: "1.8.0",
    lastUpdated: new Date("2025-01-26"),
    rating: 4.7,
    reviews: 19
  },
  {
    id: "environmental-3",
    name: "Mitigation Plan Template",
    description: "Environmental mitigation strategies and action plans for impact reduction",
    category: "environmental",
    environmentalCategory: "impact-assessment",
    subcategory: "mitigation-plans",
    tags: ["Impact Assessment", "Mitigation", "Action Plan", "Strategies"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/mitigation-plan",
    author: "Environmental Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-15",
    usageCount: 98,
    views: 278,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/00C040/FFFFFF?text=Mitigation",
    agentId: "environmental",
    version: "1.5.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 15
  },
  {
    id: "environmental-4",
    name: "Environmental Monitoring Form",
    description: "Standardized environmental monitoring forms for ongoing compliance tracking",
    category: "environmental",
    environmentalCategory: "impact-assessment",
    subcategory: "monitoring-forms",
    tags: ["Impact Assessment", "Monitoring", "Forms", "Tracking"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/monitoring-form",
    author: "Environmental Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-12",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/00C040/FFFFFF?text=Monitoring",
    agentId: "environmental",
    version: "1.4.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.5,
    reviews: 13
  },
  {
    id: "environmental-5",
    name: "Regulatory Compliance Checklist",
    description: "Comprehensive compliance checklist for environmental regulations and permits",
    category: "environmental",
    environmentalCategory: "compliance",
    subcategory: "compliance-checklists",
    tags: ["Compliance", "Regulations", "Checklist", "Permits"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/compliance-checklist",
    author: "Environmental Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 178,
    views: 523,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Compliance",
    agentId: "environmental",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.9,
    reviews: 32
  },
  {
    id: "environmental-6",
    name: "Permit Application Template",
    description: "Environmental permit application forms with required documentation checklist",
    category: "environmental",
    environmentalCategory: "compliance",
    subcategory: "permit-applications",
    tags: ["Compliance", "Permits", "Application", "Documentation"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/permit-application",
    author: "Environmental Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 123,
    views: 367,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Permit",
    agentId: "environmental",
    version: "1.7.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.7,
    reviews: 20
  },
  {
    id: "environmental-7",
    name: "Environmental Reporting Template",
    description: "Standardized environmental reporting templates for regulatory submissions",
    category: "environmental",
    environmentalCategory: "compliance",
    subcategory: "reporting-templates",
    tags: ["Compliance", "Reporting", "Regulatory", "Submissions"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/reporting-template",
    author: "Environmental Team",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-05",
    usageCount: 156,
    views: 456,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Reporting",
    agentId: "environmental",
    version: "1.6.2",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.6,
    reviews: 18
  },
  {
    id: "environmental-8",
    name: "Environmental Audit Form",
    description: "Comprehensive environmental audit forms for compliance verification",
    category: "environmental",
    environmentalCategory: "compliance",
    subcategory: "audit-forms",
    tags: ["Compliance", "Audit", "Verification", "Forms"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/audit-form",
    author: "Environmental Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 89,
    views: 234,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Audit",
    agentId: "environmental",
    version: "1.3.1",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.5,
    reviews: 12
  },
  {
    id: "environmental-9",
    name: "Remediation Action Plan",
    description: "Comprehensive remediation action plans for contaminated site cleanup",
    category: "environmental",
    environmentalCategory: "remediation-planning",
    subcategory: "remediation-action-plans",
    tags: ["Remediation", "Action Plan", "Cleanup", "Contamination"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/remediation-plan",
    author: "Environmental Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-11",
    usageCount: 167,
    views: 489,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Remediation",
    agentId: "environmental",
    version: "1.9.0",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.8,
    reviews: 26
  },
  {
    id: "environmental-10",
    name: "Contamination Assessment Template",
    description: "Site contamination assessment workflow with sampling and analysis protocols",
    category: "environmental",
    environmentalCategory: "remediation-planning",
    subcategory: "contamination-assessment",
    tags: ["Remediation", "Contamination", "Assessment", "Sampling"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/contamination-assessment",
    author: "Environmental Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Contamination",
    agentId: "environmental",
    version: "1.5.1",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.7,
    reviews: 21
  },
  {
    id: "environmental-11",
    name: "Cleanup Workflow Template",
    description: "Step-by-step cleanup workflow templates for environmental remediation projects",
    category: "environmental",
    environmentalCategory: "remediation-planning",
    subcategory: "cleanup-workflows",
    tags: ["Remediation", "Cleanup", "Workflow", "Projects"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/cleanup-workflow",
    author: "Environmental Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 98,
    views: 267,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Cleanup",
    agentId: "environmental",
    version: "1.4.2",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.6,
    reviews: 16
  },
  {
    id: "environmental-12",
    name: "Remediation Progress Tracker",
    description: "Progress tracking templates for monitoring remediation project milestones",
    category: "environmental",
    environmentalCategory: "remediation-planning",
    subcategory: "progress-tracking",
    tags: ["Remediation", "Progress", "Tracking", "Milestones"],
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates/progress-tracker",
    author: "Environmental Team",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-05",
    usageCount: 112,
    views: 312,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Progress",
    agentId: "environmental",
    version: "1.2.0",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.5,
    reviews: 14
  }
];

export function useEnvironmentalTemplates() {
  const [filters, setFilters] = useState<EnvironmentalTemplateFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    sort: "popular"
  });

  const filteredTemplates = useMemo(() => {
    let filtered = [...mockEnvironmentalTemplates];

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
      filtered = filtered.filter((template) => template.environmentalCategory === filters.category);
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

  const updateFilter = <K extends keyof EnvironmentalTemplateFilters>(
    key: K,
    value: EnvironmentalTemplateFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockEnvironmentalTemplates.map((t) => t.environmentalCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockEnvironmentalTemplates.map((t) => t.subcategory)));
    }
    return Array.from(
      new Set(
        mockEnvironmentalTemplates
          .filter((t) => t.environmentalCategory === filters.category)
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
    totalCount: mockEnvironmentalTemplates.length,
    filteredCount: filteredTemplates.length
  };
}

