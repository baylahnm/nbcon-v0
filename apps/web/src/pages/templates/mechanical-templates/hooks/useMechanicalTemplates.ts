import { useState, useMemo } from "react";
import { Cog } from "lucide-react";
import { MechanicalTemplate, MechanicalTemplateFilters } from "../types/mechanical-templates";

// Mock data - Replace with actual API call
const mockMechanicalTemplates: MechanicalTemplate[] = [
  {
    id: "mechanical-1",
    name: "HVAC Load Calculation Template",
    description: "Complete HVAC system design with energy analysis and load calculations",
    category: "mechanical",
    mechanicalCategory: "hvac",
    subcategory: "load-calculations",
    tags: ["HVAC", "Load Calculation", "Energy Analysis", "Design"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/hvac-load",
    author: "Mechanical Team",
    updatedAt: "2 days ago",
    createdAt: "2025-01-19",
    usageCount: 167,
    views: 489,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=HVAC+Load",
    agentId: "mechanical",
    version: "2.1.0",
    lastUpdated: new Date("2025-01-27"),
    rating: 4.8,
    reviews: 26,
    screenshots: [],
    useCases: ["Building design", "Energy analysis", "Equipment sizing"],
    technicalSpecs: {
      units: "SI/Metric",
      standards: ["ASHRAE", "IEC"],
      calculationTypes: ["Cooling Load", "Heating Load", "Ventilation"],
      systemTypes: ["Split System", "Central Air", "Heat Pump"]
    }
  },
  {
    id: "mechanical-2",
    name: "Ductwork Design Template",
    description: "HVAC ductwork design template with sizing calculations and layout planning",
    category: "mechanical",
    mechanicalCategory: "hvac",
    subcategory: "ductwork-design",
    tags: ["HVAC", "Ductwork", "Design", "Sizing"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/ductwork-design",
    author: "Mechanical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-17",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Ductwork",
    agentId: "mechanical",
    version: "1.8.0",
    lastUpdated: new Date("2025-01-26"),
    rating: 4.7,
    reviews: 19
  },
  {
    id: "mechanical-3",
    name: "HVAC Equipment Selection",
    description: "HVAC equipment selection template with performance specifications and sizing",
    category: "mechanical",
    mechanicalCategory: "hvac",
    subcategory: "equipment-selection",
    tags: ["HVAC", "Equipment", "Selection", "Specifications"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/equipment-selection",
    author: "Mechanical Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-15",
    usageCount: 112,
    views: 345,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Equipment",
    agentId: "mechanical",
    version: "1.5.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 15
  },
  {
    id: "mechanical-4",
    name: "Energy Analysis Template",
    description: "HVAC energy analysis template with efficiency calculations and cost estimation",
    category: "mechanical",
    mechanicalCategory: "hvac",
    subcategory: "energy-analysis",
    tags: ["HVAC", "Energy", "Analysis", "Efficiency"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/energy-analysis",
    author: "Mechanical Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-13",
    usageCount: 98,
    views: 267,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Energy+Analysis",
    agentId: "mechanical",
    version: "1.4.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.5,
    reviews: 12
  },
  {
    id: "mechanical-5",
    name: "Pipe Sizing Calculator",
    description: "Comprehensive pipe sizing calculations with flow rate and pressure drop analysis",
    category: "mechanical",
    mechanicalCategory: "piping",
    subcategory: "pipe-sizing-calculations",
    tags: ["Piping", "Pipe Sizing", "Flow Rate", "Pressure Drop"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/pipe-sizing",
    author: "Mechanical Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-10",
    usageCount: 189,
    views: 567,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Pipe+Sizing",
    agentId: "mechanical",
    version: "2.0.0",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.9,
    reviews: 32
  },
  {
    id: "mechanical-6",
    name: "Hydraulic Analysis Template",
    description: "Hydraulic analysis template for piping systems with pressure and flow calculations",
    category: "mechanical",
    mechanicalCategory: "piping",
    subcategory: "hydraulic-analysis",
    tags: ["Piping", "Hydraulic", "Analysis", "Pressure"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/hydraulic-analysis",
    author: "Mechanical Team",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-08",
    usageCount: 145,
    views: 423,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Hydraulic",
    agentId: "mechanical",
    version: "1.7.0",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.7,
    reviews: 21
  },
  {
    id: "mechanical-7",
    name: "P&ID Template",
    description: "Piping and Instrumentation Diagram template with standard symbols and layouts",
    category: "mechanical",
    mechanicalCategory: "piping",
    subcategory: "pid-templates",
    tags: ["Piping", "P&ID", "Diagram", "Instruments"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/pid-template",
    author: "Mechanical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 178,
    views: 523,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=P%26ID",
    agentId: "mechanical",
    version: "1.6.2",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.8,
    reviews: 28
  },
  {
    id: "mechanical-8",
    name: "Pipe Routing Layout",
    description: "Pipe routing layout template with 3D coordination and clash detection",
    category: "mechanical",
    mechanicalCategory: "piping",
    subcategory: "pipe-routing-layouts",
    tags: ["Piping", "Routing", "Layout", "3D"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/pipe-routing",
    author: "Mechanical Team",
    updatedAt: "4 days ago",
    createdAt: "2025-01-11",
    usageCount: 123,
    views: 367,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Pipe+Routing",
    agentId: "mechanical",
    version: "1.5.1",
    lastUpdated: new Date("2025-01-24"),
    rating: 4.6,
    reviews: 17
  },
  {
    id: "mechanical-9",
    name: "Pump Selection Template",
    description: "Pump selection template with performance curves and system matching",
    category: "mechanical",
    mechanicalCategory: "mechanical-systems",
    subcategory: "pump-selection",
    tags: ["Mechanical Systems", "Pump", "Selection", "Performance"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/pump-selection",
    author: "Mechanical Team",
    updatedAt: "5 days ago",
    createdAt: "2025-01-10",
    usageCount: 156,
    views: 456,
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Pump+Selection",
    agentId: "mechanical",
    version: "1.9.0",
    lastUpdated: new Date("2025-01-23"),
    rating: 4.8,
    reviews: 24
  },
  {
    id: "mechanical-10",
    name: "Fan Sizing Calculator",
    description: "Fan sizing and selection template with airflow and pressure calculations",
    category: "mechanical",
    mechanicalCategory: "mechanical-systems",
    subcategory: "fan-sizing",
    tags: ["Mechanical Systems", "Fan", "Sizing", "Airflow"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/fan-sizing",
    author: "Mechanical Team",
    updatedAt: "1 week ago",
    createdAt: "2025-01-08",
    usageCount: 134,
    views: 389,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Fan+Sizing",
    agentId: "mechanical",
    version: "1.4.2",
    lastUpdated: new Date("2025-01-21"),
    rating: 4.7,
    reviews: 19
  },
  {
    id: "mechanical-11",
    name: "Equipment Schedule Template",
    description: "Comprehensive equipment schedule template with specifications and ratings",
    category: "mechanical",
    mechanicalCategory: "mechanical-systems",
    subcategory: "equipment-schedules",
    tags: ["Mechanical Systems", "Equipment", "Schedule", "Specifications"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/equipment-schedule",
    author: "Mechanical Team",
    updatedAt: "2 weeks ago",
    createdAt: "2025-01-05",
    usageCount: 112,
    views: 312,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=Equipment+Schedule",
    agentId: "mechanical",
    version: "1.3.0",
    lastUpdated: new Date("2025-01-14"),
    rating: 4.5,
    reviews: 14
  },
  {
    id: "mechanical-12",
    name: "Mechanical System Diagram",
    description: "Mechanical system diagram template with component layouts and connections",
    category: "mechanical",
    mechanicalCategory: "mechanical-systems",
    subcategory: "system-diagrams",
    tags: ["Mechanical Systems", "Diagram", "System", "Layout"],
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates/system-diagram",
    author: "Mechanical Team",
    updatedAt: "3 days ago",
    createdAt: "2025-01-12",
    usageCount: 98,
    views: 278,
    featured: false,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=System+Diagram",
    agentId: "mechanical",
    version: "1.2.1",
    lastUpdated: new Date("2025-01-25"),
    rating: 4.6,
    reviews: 16
  }
];

export function useMechanicalTemplates() {
  const [filters, setFilters] = useState<MechanicalTemplateFilters>({
    search: "",
    category: "all",
    subcategory: "all",
    sort: "popular"
  });

  const filteredTemplates = useMemo(() => {
    let filtered = [...mockMechanicalTemplates];

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
      filtered = filtered.filter((template) => template.mechanicalCategory === filters.category);
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

  const updateFilter = <K extends keyof MechanicalTemplateFilters>(
    key: K,
    value: MechanicalTemplateFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories = useMemo(() => {
    const cats = new Set(mockMechanicalTemplates.map((t) => t.mechanicalCategory));
    return Array.from(cats);
  }, []);

  const subcategories = useMemo(() => {
    if (filters.category === "all") {
      return Array.from(new Set(mockMechanicalTemplates.map((t) => t.subcategory)));
    }
    return Array.from(
      new Set(
        mockMechanicalTemplates
          .filter((t) => t.mechanicalCategory === filters.category)
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
    totalCount: mockMechanicalTemplates.length,
    filteredCount: filteredTemplates.length
  };
}

