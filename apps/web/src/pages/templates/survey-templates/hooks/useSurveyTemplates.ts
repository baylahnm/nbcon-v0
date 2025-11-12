import { useState, useMemo } from "react";
import { Navigation } from "lucide-react";
import { SurveyTemplate, SurveyTemplateFilters } from "../types/survey-templates";

// Mock data - Replace with actual API call
const mockSurveyTemplates: SurveyTemplate[] = [
  {
    id: "survey-1",
    name: "Static GNSS Survey Template",
    description: "Complete workflow for static GNSS surveys with network adjustment and baseline processing",
    category: "survey",
    surveyCategory: "gnss",
    subcategory: "static-gnss",
    tags: ["GNSS", "Static", "Network Adjustment", "Control Points"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/static-gnss",
    author: "Survey Team",
    updatedAt: "2 hours ago",
    createdAt: "2025-01-15",
    usageCount: 124,
    views: 456,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Static+GNSS",
    agentId: "survey",
    version: "1.2.0",
    lastUpdated: new Date("2025-01-28"),
    rating: 4.8,
    reviews: 23,
    screenshots: [],
    useCases: ["Control network establishment", "High-precision surveys", "Geodetic measurements"],
    technicalSpecs: {
      coordinateSystem: "WGS84",
      datum: "WGS84",
      units: "meters",
      precision: "mm-level"
    }
  },
  {
    id: "survey-2",
    name: "RTK/RTN Survey Workflow",
    description: "Real-time kinematic survey template for rapid data collection with RTK/RTN corrections",
    category: "survey",
    surveyCategory: "gnss",
    subcategory: "rtk-rtn",
    tags: ["GNSS", "RTK", "RTN", "Real-time"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/rtk-rtn",
    author: "Survey Team",
    updatedAt: "1 day ago",
    createdAt: "2025-01-20",
    usageCount: 89,
    views: 234,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=RTK+RTN",
    agentId: "survey",
    version: "1.0.5",
    lastUpdated: new Date("2025-01-27"),
    rating: 4.6,
    reviews: 15
  },
  {
    id: "survey-3",
    name: "LiDAR Point Cloud Processing",
    description: "Complete workflow for processing and classifying LiDAR point cloud data",
    category: "survey",
    surveyCategory: "lidar",
    subcategory: "point-cloud-processing",
    tags: ["LiDAR", "Point Cloud", "Processing", "Classification"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/lidar-processing",
    author: "Survey Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-10",
    usageCount: 156,
    views: 567,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=LiDAR+Processing",
    agentId: "survey",
    version: "2.1.0",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.9,
    reviews: 34
  },
  {
    id: "survey-4",
    name: "DTM/DSM Generation Template",
    description: "Generate Digital Terrain Models and Digital Surface Models from point cloud data",
    category: "survey",
    surveyCategory: "lidar",
    subcategory: "dtm-dsm",
    tags: ["LiDAR", "DTM", "DSM", "Terrain"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/dtm-dsm",
    author: "Survey Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-05",
    usageCount: 98,
    views: 345,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=DTM+DSM",
    agentId: "survey",
    version: "1.5.2",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.7,
    reviews: 18
  },
  {
    id: "survey-5",
    name: "Aerial Triangulation Workflow",
    description: "Photogrammetric aerial triangulation template for bundle adjustment and orientation",
    category: "survey",
    surveyCategory: "photogrammetry",
    subcategory: "aerial-triangulation",
    tags: ["Photogrammetry", "Aerial", "Triangulation", "Bundle Adjustment"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/aerial-triangulation",
    author: "Survey Team",
    updatedAt: "1 week ago",
    createdAt: "2024-12-20",
    usageCount: 67,
    views: 189,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Aerial+Triangulation",
    agentId: "survey",
    version: "1.3.1",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.5,
    reviews: 12
  },
  {
    id: "survey-6",
    name: "Orthomosaic Generation Template",
    description: "Create high-resolution orthomosaics from aerial imagery with georeferencing",
    category: "survey",
    surveyCategory: "photogrammetry",
    subcategory: "orthomosaic",
    tags: ["Photogrammetry", "Orthomosaic", "Aerial Imagery"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/orthomosaic",
    author: "Survey Team",
    updatedAt: "2 weeks ago",
    createdAt: "2024-12-15",
    usageCount: 112,
    views: 412,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Orthomosaic",
    agentId: "survey",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.6,
    reviews: 21
  },
  {
    id: "survey-7",
    name: "Field Notes Template",
    description: "Standardized field notes template for survey observations and measurements",
    category: "survey",
    surveyCategory: "field-forms",
    subcategory: "field-notes",
    tags: ["Field Forms", "Notes", "Observations"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/field-notes",
    author: "Survey Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 203,
    views: 678,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Field+Notes",
    agentId: "survey",
    version: "1.1.0",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.8,
    reviews: 45
  },
  {
    id: "survey-8",
    name: "Instrument Setup Form",
    description: "Checklist and form for survey instrument setup and calibration",
    category: "survey",
    surveyCategory: "field-forms",
    subcategory: "instrument-setup",
    tags: ["Field Forms", "Setup", "Calibration"],
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates/instrument-setup",
    author: "Survey Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 145,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Instrument+Setup",
    agentId: "survey",
    version: "1.0.3",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.7,
    reviews: 19
  }
];

export function useSurveyTemplates() {
  const [filters, setFilters] = useState<SurveyTemplateFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    sort: "popular"
  });

  const filteredTemplates = useMemo(() => {
    let filtered = [...mockSurveyTemplates];

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
      filtered = filtered.filter((template) => template.surveyCategory === filters.category);
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

  const updateFilter = <K extends keyof SurveyTemplateFilters>(
    key: K,
    value: SurveyTemplateFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockSurveyTemplates.map((t) => t.surveyCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockSurveyTemplates.map((t) => t.subcategory)));
    }
    return Array.from(
      new Set(
        mockSurveyTemplates
          .filter((t) => t.surveyCategory === filters.category)
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
    totalCount: mockSurveyTemplates.length,
    filteredCount: filteredTemplates.length
  };
}

