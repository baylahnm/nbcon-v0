"use client";

import React, { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CivilTemplateFilter } from "@/components/templates/CivilTemplateFilter";
import { CivilTemplateGrid } from "@/components/templates/CivilTemplateGrid";
import { CrossCategorySuggestions } from "@/components/templates/CrossCategorySuggestions";
import { useCivilTemplates } from "./hooks/useCivilTemplates";
import { CivilTemplate } from "./types/civil-templates";
import { Template } from "@/pages/templates/types/templates";
import { Navigation, Map, Zap, Cog, Layers, Leaf, DollarSign } from "lucide-react";

// Mock cross-category templates
const crossCategoryTemplates: Template[] = [
  {
    id: "survey-1",
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
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Survey+1",
    agentId: "survey"
  },
  {
    id: "gis-1",
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
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/008000/FFFFFF?text=GIS+1",
    agentId: "gis"
  },
  {
    id: "electrical-1",
    name: "Electrical Load Schedule Calculator",
    description: "Automated load calculations for panel design",
    category: "electrical",
    categoryName: "Electrical Templates",
    categoryIcon: Zap,
    categoryColor: "text-yellow-600",
    href: "/templates/electrical-templates",
    author: "Electrical Team",
    updatedAt: "1 day ago",
    usageCount: 98,
    previewImage: "https://via.placeholder.com/300x250/FFFF00/000000?text=Electrical+1",
    agentId: "electrical"
  },
  {
    id: "geotechnical-1",
    name: "Foundation Design Analysis",
    description: "Soil analysis and foundation design calculations",
    category: "geotechnical",
    categoryName: "Geotechnical Templates",
    categoryIcon: Layers,
    categoryColor: "text-amber-600",
    href: "/templates/geotechnical-templates",
    author: "Geotechnical Team",
    updatedAt: "2 days ago",
    usageCount: 112,
    previewImage: "https://via.placeholder.com/300x250/FFA500/FFFFFF?text=Geotechnical+1",
    agentId: "geotechnical"
  }
];

export default function CivilTemplates() {
  const { templates, filters, updateFilter, categories, subcategories, filteredCount } = useCivilTemplates();
  const [previewTemplate, setPreviewTemplate] = useState<CivilTemplate | null>(null);

  const handlePreview = (template: CivilTemplate) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template: CivilTemplate) => {
    // TODO: Implement template usage logic
    console.log("Using template:", template.id);
  };

  return (
    <>
      <Head>
        <title>Civil Templates | nbcon.ai</title>
        <meta
          name="description"
          content="Site design, grading, material estimation, and infrastructure workflows powered by Civil AI agent"
        />
      </Head>

      {/* Hero Section */}
      <SimpleHeroSection
        headline="Civil Templates"
        description="Site design, grading, material estimation, and infrastructure workflows powered by Civil AI agent"
        cta={{
          primary: {
            text: "Browse Templates",
            onClick: () => {
              document.getElementById("templates-section")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          secondary: {
            text: "View Documentation",
            href: "/docs",
          },
        }}
        backgroundVariant="minimal"
      />

      {/* Main Content */}
      <main id="templates-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Filters */}
        <CivilTemplateFilter
          filters={filters}
          categories={categories}
          subcategories={subcategories}
          onFilterChange={updateFilter}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredCount}</span> template
            {filteredCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Template Grid */}
        <CivilTemplateGrid templates={templates} onPreview={handlePreview} />

        {/* Cross-Category Suggestions */}
        <CrossCategorySuggestions templates={crossCategoryTemplates} />
      </main>

      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {previewTemplate && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{previewTemplate.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {previewTemplate.description}
                    </DialogDescription>
                  </div>
                  {previewTemplate.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Preview Image */}
                {previewTemplate.previewImage && (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={previewTemplate.previewImage}
                      alt={previewTemplate.name}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{previewTemplate.civilCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="font-medium">{previewTemplate.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Usage Count</p>
                    <p className="font-medium">{previewTemplate.usageCount}</p>
                  </div>
                  {previewTemplate.rating && (
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-medium">{previewTemplate.rating.toFixed(1)}</p>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {previewTemplate.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {previewTemplate.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                {previewTemplate.useCases && previewTemplate.useCases.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Use Cases</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {previewTemplate.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technical Specs */}
                {previewTemplate.technicalSpecs && (
                  <div>
                    <p className="text-sm font-medium mb-2">Technical Specifications</p>
                    <div className="space-y-2 text-sm">
                      {previewTemplate.technicalSpecs.calculationTypes && (
                        <div>
                          <span className="text-muted-foreground">Calculation Types: </span>
                          <span className="font-medium">
                            {previewTemplate.technicalSpecs.calculationTypes.join(", ")}
                          </span>
                        </div>
                      )}
                      {previewTemplate.technicalSpecs.units && (
                        <div>
                          <span className="text-muted-foreground">Units: </span>
                          <span className="font-medium">{previewTemplate.technicalSpecs.units}</span>
                        </div>
                      )}
                      {previewTemplate.technicalSpecs.standards && (
                        <div>
                          <span className="text-muted-foreground">Standards: </span>
                          <span className="font-medium">
                            {previewTemplate.technicalSpecs.standards.join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button onClick={() => handleUseTemplate(previewTemplate)} className="flex-1">
                    Use Template
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={previewTemplate.href}>View Details</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
