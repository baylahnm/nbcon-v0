"use client";

import React, { useState } from "react";
import Head from "next/head";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ElectricalTemplateFilter } from "@/components/templates/ElectricalTemplateFilter";
import { ElectricalTemplateGrid } from "@/components/templates/ElectricalTemplateGrid";
import { CrossCategorySuggestions } from "@/components/templates/CrossCategorySuggestions";
import { useElectricalTemplates } from "./hooks/useElectricalTemplates";
import { ElectricalTemplate } from "./types/electrical-templates";
import { Template } from "@/pages/templates/types/templates";
import { Navigation, Map, Building2, Cog, Layers, Leaf, DollarSign } from "lucide-react";

// Mock cross-category templates
const crossCategoryTemplates: Template[] = [
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
    featured: true,
    previewImage: "https://via.placeholder.com/300x250/0000FF/FFFFFF?text=Civil+1",
    agentId: "civil"
  },
  {
    id: "mechanical-1",
    name: "HVAC Load Calculation Template",
    description: "Complete HVAC system design with energy analysis",
    category: "mechanical",
    categoryName: "Mechanical Templates",
    categoryIcon: Cog,
    categoryColor: "text-purple-600",
    href: "/templates/mechanical-templates",
    author: "Mechanical Team",
    updatedAt: "2 days ago",
    usageCount: 67,
    previewImage: "https://via.placeholder.com/300x250/800080/FFFFFF?text=Mechanical+1",
    agentId: "mechanical"
  },
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
  }
];

export default function ElectricalTemplates() {
  const { templates, filters, updateFilter, categories, subcategories, filteredCount } = useElectricalTemplates();
  const [previewTemplate, setPreviewTemplate] = useState<ElectricalTemplate | null>(null);

  const handlePreview = (template: ElectricalTemplate) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template: ElectricalTemplate) => {
    // TODO: Implement template usage logic
    console.log("Using template:", template.id);
  };

  return (
    <>
      <Head>
        <title>Electrical Templates | nbcon.ai</title>
        <meta
          name="description"
          content="Load schedules, panel design, and wiring plans powered by Electrical AI agent"
        />
      </Head>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Electrical Templates</h1>
          <p className="text-muted-foreground mb-4 max-w-3xl text-lg">
            Load schedules, panel design, and wiring plans powered by Electrical AI agent.
          </p>
        </div>
        {/* Filters */}
        <ElectricalTemplateFilter
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
        <ElectricalTemplateGrid templates={templates} onPreview={handlePreview} />

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
                    <p className="font-medium">{previewTemplate.electricalCategory}</p>
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
                      {previewTemplate.technicalSpecs.voltage && (
                        <div>
                          <span className="text-muted-foreground">Voltage: </span>
                          <span className="font-medium">{previewTemplate.technicalSpecs.voltage}</span>
                        </div>
                      )}
                      {previewTemplate.technicalSpecs.phase && (
                        <div>
                          <span className="text-muted-foreground">Phase: </span>
                          <span className="font-medium">{previewTemplate.technicalSpecs.phase}</span>
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
                      {previewTemplate.technicalSpecs.calculationTypes && (
                        <div>
                          <span className="text-muted-foreground">Calculation Types: </span>
                          <span className="font-medium">
                            {previewTemplate.technicalSpecs.calculationTypes.join(", ")}
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
