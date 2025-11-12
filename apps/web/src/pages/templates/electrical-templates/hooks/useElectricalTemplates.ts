import { useState, useMemo } from "react";
import { Zap } from "lucide-react";
import { ElectricalTemplate, ElectricalTemplateFilters } from "../types/electrical-templates";

// Mock data - Replace with actual API call
const mockElectricalTemplates: ElectricalTemplate[] = [
  {
    id: "electrical-1",
    name: "Electrical Load Schedule Calculator",
    description: "Automated load calculations for panel design with circuit breaker sizing",
    category: "electrical",
    electricalCategory: "load-schedules",
    subcategory: "load-calculations",
    tags: ["Load Schedule", "Calculations", "Panel Design", "Circuit Breaker"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/load-calculator",
    author: "Electrical Team",
    updatedAt: "1 day ago",
    createdAt: "2025-01-20",
    usageCount: 156,
    views: 456,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/FFFF00/000000?text=Load+Calculator",
    agentId: "electrical",
    version: "2.1.0",
    lastUpdated: new Date("2025-01-28"),
    rating: 4.8,
    reviews: 23,
    screenshots: [],
    useCases: ["Panel design", "Load analysis", "Circuit breaker sizing"],
    technicalSpecs: {
      voltage: "120/240V",
      phase: "Single/Three",
      standards: ["NEC", "IEC"],
      calculationTypes: ["Demand Load", "Connected Load"]
    }
  },
  {
    id: "electrical-2",
    name: "Panel Schedule Template",
    description: "Complete panel schedule template with circuit assignments and load distribution",
    category: "electrical",
    electricalCategory: "load-schedules",
    subcategory: "panel-schedules",
    tags: ["Load Schedule", "Panel", "Schedule", "Circuits"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/panel-schedule",
    author: "Electrical Team",
    updatedAt: "2 days ago",
    createdAt: "2025-01-18",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFFF00/000000?text=Panel+Schedule",
    agentId: "electrical",
    version: "1.8.0",
    lastUpdated: new Date("2025-01-26"),
    rating: 4.7,
    reviews: 19
  },
  {
    id: "electrical-3",
    name: "Circuit Breaker Sizing Calculator",
    description: "Automated circuit breaker sizing based on load calculations and code requirements",
    category: "electrical",
    electricalCategory: "load-schedules",
    subcategory: "circuit-breaker-sizing",
    tags: ["Load Schedule", "Circuit Breaker", "Sizing", "NEC"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/circuit-breaker-sizing",
    author: "Electrical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-15",
    usageCount: 98,
    views: 267,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/FFFF00/000000?text=Breaker+Sizing",
    agentId: "electrical",
    version: "1.5.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 14
  },
  {
    id: "electrical-4",
    name: "Panel Layout Plan Template",
    description: "Electrical panel layout plans with component placement and wiring diagrams",
    category: "electrical",
    electricalCategory: "panel-design",
    subcategory: "panel-layout-plans",
    tags: ["Panel Design", "Layout", "Components", "Wiring"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/panel-layout",
    author: "Electrical Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-12",
    usageCount: 112,
    views: 345,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Panel+Layout",
    agentId: "electrical",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.9,
    reviews: 28
  },
  {
    id: "electrical-5",
    name: "One-Line Diagram Template",
    description: "Single-line electrical diagrams for power distribution systems",
    category: "electrical",
    electricalCategory: "panel-design",
    subcategory: "one-line-diagrams",
    tags: ["Panel Design", "One-Line", "Diagram", "Power Distribution"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/one-line-diagram",
    author: "Electrical Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 89,
    views: 234,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=One-Line",
    agentId: "electrical",
    version: "1.6.2",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.5,
    reviews: 12
  },
  {
    id: "electrical-6",
    name: "Equipment Schedule Template",
    description: "Comprehensive equipment schedule with specifications and ratings",
    category: "electrical",
    electricalCategory: "panel-design",
    subcategory: "equipment-schedules",
    tags: ["Panel Design", "Equipment", "Schedule", "Specifications"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/equipment-schedule",
    author: "Electrical Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 67,
    views: 189,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Equipment",
    agentId: "electrical",
    version: "1.3.1",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.6,
    reviews: 15
  },
  {
    id: "electrical-7",
    name: "Conduit Routing Plan",
    description: "Electrical conduit routing plans with sizing and installation details",
    category: "electrical",
    electricalCategory: "wiring-plans",
    subcategory: "conduit-routing",
    tags: ["Wiring Plans", "Conduit", "Routing", "Installation"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/conduit-routing",
    author: "Electrical Team",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-05",
    usageCount: 145,
    views: 412,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Conduit",
    agentId: "electrical",
    version: "1.9.0",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.7,
    reviews: 21
  },
  {
    id: "electrical-8",
    name: "Cable Tray Layout Template",
    description: "Cable tray routing and layout plans for commercial installations",
    category: "electrical",
    electricalCategory: "wiring-plans",
    subcategory: "cable-tray-layouts",
    tags: ["Wiring Plans", "Cable Tray", "Layout", "Commercial"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/cable-tray",
    author: "Electrical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 98,
    views: 278,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Cable+Tray",
    agentId: "electrical",
    version: "1.4.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 16
  },
  {
    id: "electrical-9",
    name: "Lighting Plan Template",
    description: "Complete lighting layout plans with fixture schedules and circuit assignments",
    category: "electrical",
    electricalCategory: "wiring-plans",
    subcategory: "lighting-plans",
    tags: ["Wiring Plans", "Lighting", "Fixtures", "Circuits"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/lighting-plan",
    author: "Electrical Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 178,
    views: 523,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Lighting",
    agentId: "electrical",
    version: "1.7.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.8,
    reviews: 28
  },
  {
    id: "electrical-10",
    name: "Power Distribution Plan",
    description: "Power distribution system layout with feeder routing and panel locations",
    category: "electrical",
    electricalCategory: "wiring-plans",
    subcategory: "power-distribution",
    tags: ["Wiring Plans", "Power Distribution", "Feeders", "Panels"],
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates/power-distribution",
    author: "Electrical Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-11",
    usageCount: 123,
    views: 367,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Power+Dist",
    agentId: "electrical",
    version: "1.5.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.7,
    reviews: 20
  }
];

export function useElectricalTemplates() {
  const [filters, setFilters] = useState<ElectricalTemplateFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    sort: "popular"
  });

  const filteredTemplates = useMemo(() => {
    let filtered = [...mockElectricalTemplates];

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
      filtered = filtered.filter((template) => template.electricalCategory === filters.category);
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

  const updateFilter = <K extends keyof ElectricalTemplateFilters>(
    key: K,
    value: ElectricalTemplateFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockElectricalTemplates.map((t) => t.electricalCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockElectricalTemplates.map((t) => t.subcategory)));
    }
    return Array.from(
      new Set(
        mockElectricalTemplates
          .filter((t) => t.electricalCategory === filters.category)
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
    totalCount: mockElectricalTemplates.length,
    filteredCount: filteredTemplates.length
  };
}

