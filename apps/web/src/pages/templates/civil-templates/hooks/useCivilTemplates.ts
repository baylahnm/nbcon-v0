import { useState, useMemo } from "react";
import { Building2 } from "lucide-react";
import { CivilTemplate, CivilTemplateFilters } from "../types/civil-templates";

// Mock data - Replace with actual API call
const mockCivilTemplates: CivilTemplate[] = [
  {
    id: "civil-1",
    name: "Site Grading Design Template",
    description: "Automated grading calculations and material estimation for site development projects",
    category: "civil",
    civilCategory: "site-design",
    subcategory: "grading-designs",
    tags: ["Site Design", "Grading", "Earthwork", "Calculations"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/site-grading",
    author: "Civil Engineering",
    updatedAt: "1 day ago",
    createdAt: "2025-01-20",
    usageCount: 156,
    views: 456,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Site+Grading",
    agentId: "civil",
    version: "2.1.0",
    lastUpdated: new Date("2025-01-28"),
    rating: 4.8,
    reviews: 23,
    screenshots: [],
    useCases: ["Site development", "Grading plans", "Earthwork calculations"],
    technicalSpecs: {
      calculationTypes: ["Cut/Fill", "Volume", "Slope"],
      units: "meters",
      standards: ["AASHTO", "Local"]
    }
  },
  {
    id: "civil-2",
    name: "Drainage System Design",
    description: "Complete drainage system design template with stormwater calculations",
    category: "civil",
    civilCategory: "site-design",
    subcategory: "drainage-systems",
    tags: ["Site Design", "Drainage", "Stormwater", "Hydrology"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/drainage-system",
    author: "Civil Engineering",
    updatedAt: "2 days ago",
    createdAt: "2025-01-18",
    usageCount: 98,
    views: 234,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Drainage",
    agentId: "civil",
    version: "1.5.2",
    lastUpdated: new Date("2025-01-26"),
    rating: 4.6,
    reviews: 15
  },
  {
    id: "civil-3",
    name: "Road Design Template",
    description: "Comprehensive road design workflow with alignment, profile, and cross-section templates",
    category: "civil",
    civilCategory: "site-design",
    subcategory: "road-design",
    tags: ["Site Design", "Road", "Alignment", "Profile"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/road-design",
    author: "Civil Engineering",
    updatedAt: "3 days ago",
    createdAt: "2025-01-15",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Road+Design",
    agentId: "civil",
    version: "1.8.0",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.7,
    reviews: 19
  },
  {
    id: "civil-4",
    name: "Concrete Quantity Calculator",
    description: "Automated concrete volume and quantity calculations for various structural elements",
    category: "civil",
    civilCategory: "material-estimation",
    subcategory: "concrete-calculations",
    tags: ["Material Estimation", "Concrete", "Quantity", "Calculations"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/concrete-calculator",
    author: "Civil Engineering",
    updatedAt: "4 days ago",
    createdAt: "2025-01-12",
    usageCount: 203,
    views: 567,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Concrete",
    agentId: "civil",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.9,
    reviews: 34
  },
  {
    id: "civil-5",
    name: "Steel Quantity Estimation",
    description: "Complete steel reinforcement quantity takeoff and estimation template",
    category: "civil",
    civilCategory: "material-estimation",
    subcategory: "steel-quantity",
    tags: ["Material Estimation", "Steel", "Reinforcement", "Takeoff"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/steel-quantity",
    author: "Civil Engineering",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 145,
    views: 412,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Steel",
    agentId: "civil",
    version: "1.6.2",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.7,
    reviews: 21
  },
  {
    id: "civil-6",
    name: "Earthwork Calculations",
    description: "Comprehensive earthwork volume calculations with cut/fill analysis",
    category: "civil",
    civilCategory: "material-estimation",
    subcategory: "earthwork-calculations",
    tags: ["Material Estimation", "Earthwork", "Cut/Fill", "Volume"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/earthwork",
    author: "Civil Engineering",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 178,
    views: 523,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Earthwork",
    agentId: "civil",
    version: "1.9.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.8,
    reviews: 28
  },
  {
    id: "civil-7",
    name: "Bridge Design Workflow",
    description: "Complete bridge design template with structural analysis and load calculations",
    category: "civil",
    civilCategory: "infrastructure",
    subcategory: "bridge-design",
    tags: ["Infrastructure", "Bridge", "Structural", "Design"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/bridge-design",
    author: "Civil Engineering",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-05",
    usageCount: 67,
    views: 189,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Bridge",
    agentId: "civil",
    version: "1.3.1",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.5,
    reviews: 12
  },
  {
    id: "civil-8",
    name: "Highway Design Template",
    description: "Highway alignment, profile, and cross-section design workflow template",
    category: "civil",
    civilCategory: "infrastructure",
    subcategory: "highway-design",
    tags: ["Infrastructure", "Highway", "Alignment", "Design"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/highway-design",
    author: "Civil Engineering",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 112,
    views: 345,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Highway",
    agentId: "civil",
    version: "1.7.0",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 17
  },
  {
    id: "civil-9",
    name: "Retaining Wall Design",
    description: "Retaining wall design template with stability analysis and material calculations",
    category: "civil",
    civilCategory: "infrastructure",
    subcategory: "retaining-wall-designs",
    tags: ["Infrastructure", "Retaining Wall", "Stability", "Design"],
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates/retaining-wall",
    author: "Civil Engineering",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 89,
    views: 267,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Retaining+Wall",
    agentId: "civil",
    version: "1.4.2",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.6,
    reviews: 14
  }
];

export function useCivilTemplates() {
  const [filters, setFilters] = useState<CivilTemplateFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    sort: "popular"
  });

  const filteredTemplates = useMemo(() => {
    let filtered = [...mockCivilTemplates];

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
      filtered = filtered.filter((template) => template.civilCategory === filters.category);
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

  const updateFilter = <K extends keyof CivilTemplateFilters>(
    key: K,
    value: CivilTemplateFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockCivilTemplates.map((t) => t.civilCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockCivilTemplates.map((t) => t.subcategory)));
    }
    return Array.from(
      new Set(
        mockCivilTemplates
          .filter((t) => t.civilCategory === filters.category)
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
    totalCount: mockCivilTemplates.length,
    filteredCount: filteredTemplates.length
  };
}

