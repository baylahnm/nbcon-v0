import { useState, useMemo } from "react";
import { Map } from "lucide-react";
import { GISLayout, GISLayoutFilters } from "../types/gis-layouts";

// Mock data - Replace with actual API call
const mockGISLayouts: GISLayout[] = [
  {
    id: "gis-1",
    name: "Interactive Web Map Dashboard",
    description: "Real-time mapping dashboard with multiple layer support and custom widgets",
    category: "gis",
    gisCategory: "dashboards",
    subcategory: "interactive-web-maps",
    tags: ["Dashboard", "Interactive", "Web Maps", "Multi-layer"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/interactive-dashboard",
    author: "GIS Team",
    updatedAt: "5 hours ago",
    createdAt: "2025-01-20",
    usageCount: 89,
    views: 234,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Interactive+Dashboard",
    agentId: "gis",
    version: "2.1.0",
    lastUpdated: new Date("2025-01-28"),
    rating: 4.7,
    reviews: 18,
    screenshots: [],
    useCases: ["Real-time monitoring", "Data visualization", "Multi-layer analysis"],
    technicalSpecs: {
      coordinateSystem: "WGS84",
      projection: "Web Mercator",
      units: "meters"
    },
    requirements: {
      tier: "basic",
      mapProvider: "mapbox"
    }
  },
  {
    id: "gis-2",
    name: "Data Visualization Dashboard",
    description: "Advanced data visualization dashboard with charts and spatial analysis tools",
    category: "gis",
    gisCategory: "dashboards",
    subcategory: "data-visualization",
    tags: ["Dashboard", "Visualization", "Charts", "Analysis"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/data-visualization",
    author: "GIS Team",
    updatedAt: "1 day ago",
    createdAt: "2025-01-18",
    usageCount: 67,
    views: 189,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Data+Viz",
    agentId: "gis",
    version: "1.5.2",
    lastUpdated: new Date("2025-01-27"),
    rating: 4.6,
    reviews: 12
  },
  {
    id: "gis-3",
    name: "Topographic Base Map Setup",
    description: "Configure topographic base maps with elevation contours and terrain features",
    category: "gis",
    gisCategory: "base-maps",
    subcategory: "topographic-base",
    tags: ["Base Map", "Topographic", "Elevation", "Terrain"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/topographic-base",
    author: "GIS Team",
    updatedAt: "2 days ago",
    createdAt: "2025-01-15",
    usageCount: 112,
    views: 345,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Topographic",
    agentId: "gis",
    version: "1.8.0",
    lastUpdated: new Date("2025-01-26"),
    rating: 4.8,
    reviews: 24
  },
  {
    id: "gis-4",
    name: "Satellite Imagery Layout",
    description: "High-resolution satellite imagery base map with multiple zoom levels",
    category: "gis",
    gisCategory: "base-maps",
    subcategory: "satellite-imagery",
    tags: ["Base Map", "Satellite", "Imagery", "High Resolution"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/satellite-imagery",
    author: "GIS Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 98,
    views: 278,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Satellite",
    agentId: "gis",
    version: "1.3.1",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.5,
    reviews: 15
  },
  {
    id: "gis-5",
    name: "Buffer Analysis Template",
    description: "Spatial buffer analysis workflow for proximity and impact assessment",
    category: "gis",
    gisCategory: "analysis",
    subcategory: "buffer-analysis",
    tags: ["Analysis", "Buffer", "Proximity", "Impact Assessment"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/buffer-analysis",
    author: "GIS Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-10",
    usageCount: 145,
    views: 412,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Buffer+Analysis",
    agentId: "gis",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.7,
    reviews: 21
  },
  {
    id: "gis-6",
    name: "Overlay Analysis Workflow",
    description: "Multi-layer overlay analysis template for spatial intersection and union operations",
    category: "gis",
    gisCategory: "analysis",
    subcategory: "overlay-analysis",
    tags: ["Analysis", "Overlay", "Intersection", "Union"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/overlay-analysis",
    author: "GIS Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-08",
    usageCount: 78,
    views: 234,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Overlay",
    agentId: "gis",
    version: "1.6.2",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.6,
    reviews: 14
  },
  {
    id: "gis-7",
    name: "Field Data Collection App",
    description: "Mobile-friendly field data collection form with GPS integration",
    category: "gis",
    gisCategory: "data-collection",
    subcategory: "field-data-collection",
    tags: ["Data Collection", "Mobile", "GPS", "Field Forms"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/field-collection",
    author: "GIS Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-05",
    usageCount: 203,
    views: 678,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Field+Collection",
    agentId: "gis",
    version: "1.9.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.8,
    reviews: 45
  },
  {
    id: "gis-8",
    name: "Mobile GIS Forms",
    description: "Responsive mobile GIS forms for attribute data entry and validation",
    category: "gis",
    gisCategory: "data-collection",
    subcategory: "mobile-gis-forms",
    tags: ["Data Collection", "Mobile", "Forms", "Attributes"],
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts/mobile-forms",
    author: "GIS Team",
    updatedAt: "2 weeks ago",
    createdAt: "2024-12-28",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Mobile+Forms",
    agentId: "gis",
    version: "1.4.1",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.5,
    reviews: 17
  }
];

export function useGISLayouts() {
  const [filters, setFilters] = useState<GISLayoutFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    mapProvider: "all",
    sort: "popular"
  });

  const filteredLayouts = useMemo(() => {
    let filtered = [...mockGISLayouts];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (layout) =>
          layout.name.toLowerCase().includes(searchLower) ||
          layout.description.toLowerCase().includes(searchLower) ||
          layout.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((layout) => layout.gisCategory === filters.category);
    }

    // Subcategory filter
    if (filters.subcategory !== "all") {
      filtered = filtered.filter((layout) => layout.subcategory === filters.subcategory);
    }

    // Map provider filter
    if (filters.mapProvider !== "all") {
      filtered = filtered.filter(
        (layout) => layout.requirements?.mapProvider === filters.mapProvider
      );
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

  const updateFilter = <K extends keyof GISLayoutFilters>(
    key: K,
    value: GISLayoutFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockGISLayouts.map((l) => l.gisCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockGISLayouts.map((l) => l.subcategory)));
    }
    return Array.from(
      new Set(
        mockGISLayouts
          .filter((l) => l.gisCategory === filters.category)
          .map((l) => l.subcategory)
      )
    );
  }, [filters.category]);

  return {
    layouts: filteredLayouts,
    filters,
    updateFilter,
    categories,
    subcategories,
    totalCount: mockGISLayouts.length,
    filteredCount: filteredLayouts.length
  };
}

