import { useState, useMemo } from "react";
import { Layers } from "lucide-react";
import { GeotechnicalTemplate, GeotechnicalTemplateFilters } from "../types/geotechnical-templates";

// Mock data - Replace with actual API call
const mockGeotechnicalTemplates: GeotechnicalTemplate[] = [
  {
    id: "geotechnical-1",
    name: "Soil Classification Template",
    description: "Comprehensive soil classification workflow with USCS and AASHTO classification systems",
    category: "geotechnical",
    geotechnicalCategory: "soil-analysis",
    subcategory: "soil-classification",
    tags: ["Soil Analysis", "Classification", "USCS", "AASHTO"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/soil-classification",
    author: "Geotechnical Team",
    updatedAt: "2 days ago",
    createdAt: "2025-01-19",
    usageCount: 178,
    views: 623,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Soil+Classification",
    agentId: "geotechnical",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-27"),
    rating: 4.9,
    reviews: 34,
    screenshots: [],
    useCases: ["Site investigation", "Soil testing", "Foundation design"],
    technicalSpecs: {
      units: "SI/Metric",
      standards: ["ASTM D2487", "AASHTO M145"],
      analysisTypes: ["USCS", "AASHTO"],
      soilTypes: ["Cohesive", "Non-cohesive", "Organic"]
    }
  },
  {
    id: "geotechnical-2",
    name: "Bearing Capacity Calculator",
    description: "Calculate bearing capacity for shallow foundations using Terzaghi and Meyerhof methods",
    category: "geotechnical",
    geotechnicalCategory: "soil-analysis",
    subcategory: "bearing-capacity-calculations",
    tags: ["Soil Analysis", "Bearing Capacity", "Foundation", "Calculations"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/bearing-capacity",
    author: "Geotechnical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-17",
    usageCount: 156,
    views: 512,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Bearing+Capacity",
    agentId: "geotechnical",
    version: "1.8.0",
    lastUpdated: new Date("2025-01-26"),
    rating: 4.8,
    reviews: 28
  },
  {
    id: "geotechnical-3",
    name: "Settlement Analysis Template",
    description: "Foundation settlement analysis with consolidation and immediate settlement calculations",
    category: "geotechnical",
    geotechnicalCategory: "soil-analysis",
    subcategory: "settlement-analysis",
    tags: ["Soil Analysis", "Settlement", "Consolidation", "Analysis"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/settlement-analysis",
    author: "Geotechnical Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-15",
    usageCount: 134,
    views: 445,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Settlement+Analysis",
    agentId: "geotechnical",
    version: "1.6.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.7,
    reviews: 22
  },
  {
    id: "geotechnical-4",
    name: "Laboratory Test Forms",
    description: "Standardized laboratory test forms for soil testing and analysis",
    category: "geotechnical",
    geotechnicalCategory: "soil-analysis",
    subcategory: "laboratory-test-forms",
    tags: ["Soil Analysis", "Laboratory", "Testing", "Forms"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/lab-test-forms",
    author: "Geotechnical Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-13",
    usageCount: 112,
    views: 367,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Lab+Test+Forms",
    agentId: "geotechnical",
    version: "1.4.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.6,
    reviews: 18
  },
  {
    id: "geotechnical-5",
    name: "Shallow Foundation Design",
    description: "Complete shallow foundation design template with bearing capacity and settlement checks",
    category: "geotechnical",
    geotechnicalCategory: "foundation-design",
    subcategory: "shallow-foundation-design",
    tags: ["Foundation Design", "Shallow Foundation", "Design", "Bearing Capacity"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/shallow-foundation",
    author: "Geotechnical Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-10",
    usageCount: 189,
    views: 678,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Shallow+Foundation",
    agentId: "geotechnical",
    version: "2.1.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.9,
    reviews: 36
  },
  {
    id: "geotechnical-6",
    name: "Deep Foundation Template",
    description: "Deep foundation design template for piles and drilled shafts with load capacity analysis",
    category: "geotechnical",
    geotechnicalCategory: "foundation-design",
    subcategory: "deep-foundation-templates",
    tags: ["Foundation Design", "Deep Foundation", "Piles", "Drilled Shafts"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/deep-foundation",
    author: "Geotechnical Team",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-08",
    usageCount: 167,
    views: 589,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Deep+Foundation",
    agentId: "geotechnical",
    version: "1.9.0",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.8,
    reviews: 29
  },
  {
    id: "geotechnical-7",
    name: "Retaining Wall Design",
    description: "Retaining wall design template with stability analysis and reinforcement calculations",
    category: "geotechnical",
    geotechnicalCategory: "foundation-design",
    subcategory: "retaining-wall-design",
    tags: ["Foundation Design", "Retaining Wall", "Stability", "Design"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/retaining-wall",
    author: "Geotechnical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 145,
    views: 501,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Retaining+Wall",
    agentId: "geotechnical",
    version: "1.7.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.7,
    reviews: 24
  },
  {
    id: "geotechnical-8",
    name: "Foundation Design Report",
    description: "Comprehensive foundation design report template with calculations and recommendations",
    category: "geotechnical",
    geotechnicalCategory: "foundation-design",
    subcategory: "foundation-reports",
    tags: ["Foundation Design", "Report", "Documentation", "Design"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/foundation-report",
    author: "Geotechnical Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-11",
    usageCount: 123,
    views: 412,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Foundation+Report",
    agentId: "geotechnical",
    version: "1.5.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.6,
    reviews: 19
  },
  {
    id: "geotechnical-9",
    name: "Slope Stability Analysis",
    description: "Slope stability analysis template using limit equilibrium methods (Bishop, Fellenius)",
    category: "geotechnical",
    geotechnicalCategory: "slope-stability",
    subcategory: "slope-analysis-templates",
    tags: ["Slope Stability", "Analysis", "Stability", "Slopes"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/slope-stability",
    author: "Geotechnical Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 178,
    views: 612,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Slope+Stability",
    agentId: "geotechnical",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.9,
    reviews: 31
  },
  {
    id: "geotechnical-10",
    name: "Landslide Assessment Template",
    description: "Landslide risk assessment template with hazard mapping and mitigation strategies",
    category: "geotechnical",
    geotechnicalCategory: "slope-stability",
    subcategory: "landslide-assessment",
    tags: ["Slope Stability", "Landslide", "Risk Assessment", "Hazard"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/landslide-assessment",
    author: "Geotechnical Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 134,
    views: 456,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Landslide+Assessment",
    agentId: "geotechnical",
    version: "1.8.1",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.7,
    reviews: 23
  },
  {
    id: "geotechnical-11",
    name: "Erosion Control Design",
    description: "Erosion control design template with slope protection and drainage solutions",
    category: "geotechnical",
    geotechnicalCategory: "slope-stability",
    subcategory: "erosion-control",
    tags: ["Slope Stability", "Erosion Control", "Drainage", "Protection"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/erosion-control",
    author: "Geotechnical Team",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-05",
    usageCount: 112,
    views: 378,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Erosion+Control",
    agentId: "geotechnical",
    version: "1.4.0",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.5,
    reviews: 16
  },
  {
    id: "geotechnical-12",
    name: "Stability Analysis Report",
    description: "Comprehensive slope stability analysis report template with calculations and recommendations",
    category: "geotechnical",
    geotechnicalCategory: "slope-stability",
    subcategory: "stability-reports",
    tags: ["Slope Stability", "Report", "Analysis", "Documentation"],
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates/stability-report",
    author: "Geotechnical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 98,
    views: 312,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Stability+Report",
    agentId: "geotechnical",
    version: "1.3.1",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 17
  }
];

export function useGeotechnicalTemplates() {
  const [filters, setFilters] = useState<GeotechnicalTemplateFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    sort: "popular"
  });

  const filteredTemplates = useMemo(() => {
    let filtered = [...mockGeotechnicalTemplates];

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
      filtered = filtered.filter((template) => template.geotechnicalCategory === filters.category);
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

  const updateFilter = <K extends keyof GeotechnicalTemplateFilters>(
    key: K,
    value: GeotechnicalTemplateFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockGeotechnicalTemplates.map((t) => t.geotechnicalCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockGeotechnicalTemplates.map((t) => t.subcategory)));
    }
    return Array.from(
      new Set(
        mockGeotechnicalTemplates
          .filter((t) => t.geotechnicalCategory === filters.category)
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
    totalCount: mockGeotechnicalTemplates.length,
    filteredCount: filteredTemplates.length
  };
}

