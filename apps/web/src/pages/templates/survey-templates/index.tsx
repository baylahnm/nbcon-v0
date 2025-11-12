"use client";

import React, { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SurveyTemplateFilter } from "@/components/templates/SurveyTemplateFilter";
import { SurveyTemplateGrid } from "@/components/templates/SurveyTemplateGrid";
import { CrossCategorySuggestions } from "@/components/templates/CrossCategorySuggestions";
import { useSurveyTemplates } from "./hooks/useSurveyTemplates";
import { SurveyTemplate } from "./types/survey-templates";
import { Template } from "@/pages/templates/types/templates";
import { Navigation, Map, Building2, Zap, Cog, Layers, Leaf, DollarSign } from "lucide-react";

// Mock cross-category templates
const crossCategoryTemplates: Template[] = [
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
    id: "civil-1",
    name: "Site Grading Design Template",
    description: "Automated grading calculations and material estimation",
    category: "civil",
    categoryName: "Civil Templates",
    categoryIcon: Building2,
    categoryColor: "text-blue-600",
    href: "/templates/civil-templates",
    author: "Civil Engineering",
    updatedAt: "1 day ago",
    usageCount: 156,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Civil+1",
    agentId: "civil"
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

export default function SurveyTemplates() {
  const { templates, filters, updateFilter, categories, subcategories, filteredCount } = useSurveyTemplates();
  const [previewTemplate, setPreviewTemplate] = useState<SurveyTemplate | null>(null);

  const handlePreview = (template: SurveyTemplate) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template: SurveyTemplate) => {
    // TODO: Implement template usage logic
    console.log("Using template:", template.id);
  };

  return (
    <>
      <Head>
        <title>Survey Templates | nbcon.ai</title>
        <meta
          name="description"
          content="Pre-configured blueprints for GNSS, LiDAR, photogrammetry, and field survey workflows powered by Survey AI agent"
        />
      </Head>

      {/* Hero Section */}
      <SimpleHeroSection
        headline="Survey Templates"
        description="Pre-configured blueprints for GNSS, LiDAR, photogrammetry, and field survey workflows powered by Survey AI agent"
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
        <SurveyTemplateFilter
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
        <SurveyTemplateGrid templates={templates} onPreview={handlePreview} />

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
                    <p className="font-medium">{previewTemplate.surveyCategory}</p>
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
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {previewTemplate.technicalSpecs.coordinateSystem && (
                        <div>
                          <span className="text-muted-foreground">Coordinate System: </span>
                          <span className="font-medium">{previewTemplate.technicalSpecs.coordinateSystem}</span>
                        </div>
                      )}
                      {previewTemplate.technicalSpecs.datum && (
                        <div>
                          <span className="text-muted-foreground">Datum: </span>
                          <span className="font-medium">{previewTemplate.technicalSpecs.datum}</span>
                        </div>
                      )}
                      {previewTemplate.technicalSpecs.units && (
                        <div>
                          <span className="text-muted-foreground">Units: </span>
                          <span className="font-medium">{previewTemplate.technicalSpecs.units}</span>
                        </div>
                      )}
                      {previewTemplate.technicalSpecs.precision && (
                        <div>
                          <span className="text-muted-foreground">Precision: </span>
                          <span className="font-medium">{previewTemplate.technicalSpecs.precision}</span>
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
