"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { 
  Navigation, 
  Map, 
  Building2, 
  Zap, 
  Cog, 
  Layers, 
  Leaf, 
  DollarSign,
  Clock,
  Star,
  Sparkles,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TemplateSection } from "@/components/templates/TemplateSection";
import { useTemplateSections } from "./hooks/useTemplateSections";
import { Template, TemplateCategory } from "./types/templates";

// Helper function to format agent ID to shorter badge name
const formatAgentBadgeName = (agentId: string): string => {
  // Handle acronyms (GIS should stay uppercase)
  const acronyms: Record<string, string> = {
    gis: "GIS"
  };
  
  // Use acronym if exists, otherwise capitalize first letter
  const displayName = acronyms[agentId.toLowerCase()] || 
    (agentId.charAt(0).toUpperCase() + agentId.slice(1));
  
  return `${displayName} AI`;
};

const templateCategories: TemplateCategory[] = [
  {
    id: "survey",
    name: "Survey Templates",
    description: "GNSS, LiDAR, photogrammetry, and field survey workflows powered by Survey AI agent",
    href: "/templates/survey-templates",
    icon: Navigation,
    agentId: "survey",
    color: "text-blue-600"
  },
  {
    id: "gis",
    name: "GIS Layouts",
    description: "Mapping dashboards, base maps, and spatial analysis layouts powered by GIS AI agent",
    href: "/templates/gis-layouts",
    icon: Map,
    agentId: "gis",
    color: "text-green-600"
  },
  {
    id: "civil",
    name: "Civil Templates",
    description: "Site design, grading, material estimation, and infrastructure workflows powered by Civil AI agent",
    href: "/templates/civil-templates",
    icon: Building2,
    agentId: "civil",
    color: "text-blue-600"
  },
  {
    id: "electrical",
    name: "Electrical Templates",
    description: "Load schedules, panel design, and wiring plans powered by Electrical AI agent",
    href: "/templates/electrical-templates",
    icon: Zap,
    agentId: "electrical",
    color: "text-yellow-600"
  },
  {
    id: "mechanical",
    name: "Mechanical Templates",
    description: "HVAC calculations, piping analysis, and mechanical system designs powered by Mechanical AI agent",
    href: "/templates/mechanical-templates",
    icon: Cog,
    agentId: "mechanical",
    color: "text-purple-600"
  },
  {
    id: "geotechnical",
    name: "Geotechnical Templates",
    description: "Soil analysis, foundation design, and slope stability workflows powered by Geotechnical AI agent",
    href: "/templates/geotechnical-templates",
    icon: Layers,
    agentId: "geotechnical",
    color: "text-amber-600"
  },
  {
    id: "environmental",
    name: "Environmental Templates",
    description: "Environmental impact assessments, compliance, and remediation planning powered by Environmental AI agent",
    href: "/templates/environmental-templates",
    icon: Leaf,
    agentId: "environmental",
    color: "text-emerald-600"
  },
  {
    id: "finance",
    name: "Finance Templates",
    description: "Financial workflows, cost estimation, and budget management templates powered by Finance AI agent",
    href: "/templates/finance-templates",
    icon: DollarSign,
    agentId: "finance",
    color: "text-green-600"
  }
];

// Mock data - Replace with actual API call
const allTemplates: Template[] = [
  {
    id: "1",
    name: "GNSS Static Survey Template",
    description: "Complete workflow for static GNSS surveys with network adjustment",
    category: "survey",
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates",
    author: "Survey Team",
    updatedAt: "2 hours ago",
    usageCount: 124,
    featured: true
  },
  {
    id: "2",
    name: "Interactive Web Map Dashboard",
    description: "Real-time mapping dashboard with multiple layer support",
    category: "gis",
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts",
    author: "GIS Team",
    updatedAt: "5 hours ago",
    usageCount: 89,
    featured: true
  },
  {
    id: "3",
    name: "Site Grading Design Template",
    description: "Automated grading calculations and material estimation",
    category: "civil",
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates",
    author: "Civil Engineering",
    updatedAt: "1 day ago",
    usageCount: 156
  },
  {
    id: "4",
    name: "Electrical Load Schedule Calculator",
    description: "Automated load calculations for panel design",
    category: "electrical",
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates",
    author: "Electrical Team",
    updatedAt: "1 day ago",
    usageCount: 98
  },
  {
    id: "5",
    name: "HVAC Load Calculation Template",
    description: "Complete HVAC system design with energy analysis",
    category: "mechanical",
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates",
    author: "Mechanical Team",
    updatedAt: "2 days ago",
    usageCount: 67
  },
  {
    id: "6",
    name: "Foundation Design Analysis",
    description: "Soil analysis and foundation design calculations",
    category: "geotechnical",
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates",
    author: "Geotechnical Team",
    updatedAt: "2 days ago",
    usageCount: 112
  },
  {
    id: "7",
    name: "Environmental Impact Assessment",
    description: "Comprehensive EIA workflow with compliance tracking",
    category: "environmental",
    categoryName: "Environmental Templates",
    categoryIcon: Leaf,
    categoryColor: "text-emerald-600",
    href: "/templates/environmental-templates",
    author: "Environmental Team",
    updatedAt: "3 days ago",
    usageCount: 45
  },
  {
    id: "8",
    name: "Project Cost Estimation Sheet",
    description: "Budget planning and cost tracking template",
    category: "finance",
    categoryName: "Finance Templates",
    categoryIcon: DollarSign,
    categoryColor: "text-green-600",
    href: "/templates/finance-templates",
    author: "Community",
    updatedAt: "3 days ago",
    usageCount: 203
  },
  // Additional templates for more variety
  {
    id: "9",
    name: "RTK Survey Workflow",
    description: "Real-time kinematic GNSS survey template",
    category: "survey",
    categoryName: "Survey Templates",
    categoryIcon: Navigation,
    categoryColor: "text-blue-600",
    href: "/templates/survey-templates",
    author: "Survey Team",
    updatedAt: "4 hours ago",
    usageCount: 78
  },
  {
    id: "10",
    name: "Base Map Configuration",
    description: "Topographic base map setup template",
    category: "gis",
    categoryName: "GIS Layouts",
    categoryIcon: Map,
    categoryColor: "text-green-600",
    href: "/templates/gis-layouts",
    author: "GIS Team",
    updatedAt: "6 hours ago",
    usageCount: 92
  },
  {
    id: "11",
    name: "Material Quantity Takeoff",
    description: "Automated material estimation template",
    category: "civil",
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates",
    author: "Civil Engineering",
    updatedAt: "1 day ago",
    usageCount: 134
  },
  {
    id: "12",
    name: "Panel Schedule Template",
    description: "Electrical panel scheduling workflow",
    category: "electrical",
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates",
    author: "Electrical Team",
    updatedAt: "1 day ago",
    usageCount: 87
  }
];

export default function TemplatesPage() {
  const { featured, recent, newest, popular } = useTemplateSections(allTemplates);

  return (
    <>
      <Head>
        <title>Templates | nbcon.ai</title>
        <meta name="description" content="Explore AI-powered templates for Surveying, GIS, Civil Engineering, Electrical, Mechanical, Geotechnical, Environmental, and Finance workflows" />
      </Head>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Engineering Templates</h1>
          <p className="text-muted-foreground mb-4 max-w-3xl text-lg">
            Explore ready-to-use project blueprints powered by AI agents. Each template category is integrated with specialized AI agents to help you create workflows faster.
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Community members can create and share templates for their workflows. Templates are workflow-agnostic and designed to work seamlessly with our AI agent system.
          </p>
        </div>

        {/* Featured Templates Section */}
        <TemplateSection
          title="Featured"
          description="Curated templates from top creators"
          icon={Star}
          templates={featured}
          viewAllLink="/templates?filter=featured"
          className="mb-16"
        />

        {/* Recent Templates Section */}
        <TemplateSection
          title="Recent Templates"
          description="Latest templates from all categories"
          icon={Clock}
          templates={recent}
          viewAllLink="/templates?filter=recent"
          className="mb-16"
        />

        {/* Newest Templates Section */}
        <TemplateSection
          title="Newest"
          description="Most recently added templates"
          icon={Sparkles}
          templates={newest}
          viewAllLink="/templates?filter=newest"
          className="mb-16"
        />

        {/* Popular Templates Section */}
        <TemplateSection
          title="Popular"
          description="Most viewed and used templates"
          icon={TrendingUp}
          templates={popular}
          viewAllLink="/templates?filter=popular"
          className="mb-16"
        />

        {/* Template Categories Section */}
        <section id="categories">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Browse by Category</h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              Explore templates organized by engineering discipline. Each category is powered by specialized AI agents.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templateCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group relative rounded-xl border border-border bg-surface p-6 hover:bg-surface-hover hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Badge - Top Right */}
                  {category.agentId && (
                    <Badge 
                      variant="outline" 
                      className="absolute top-4 right-4 text-xs font-medium border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                    >
                      {formatAgentBadgeName(category.agentId)}
                    </Badge>
                  )}

                  {/* Icon with Background */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors pr-16">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {category.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="mt-4 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Explore templates</span>
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
