"use client";

import React, { useState } from "react";
import Head from "next/head";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GISLayoutFilter } from "@/components/templates/GISLayoutFilter";
import { GISLayoutGrid } from "@/components/templates/GISLayoutGrid";
import { CrossCategorySuggestions } from "@/components/templates/CrossCategorySuggestions";
import { useGISLayouts } from "./hooks/useGISLayouts";
import { GISLayout } from "./types/gis-layouts";
import { Template } from "@/pages/templates/types/templates";
import { Navigation, Building2, Zap, Cog, Layers, Leaf, DollarSign } from "lucide-react";

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

export default function GISLayouts() {
  const { layouts, filters, updateFilter, categories, subcategories, filteredCount } = useGISLayouts();
  const [previewLayout, setPreviewLayout] = useState<GISLayout | null>(null);

  const handlePreview = (layout: GISLayout) => {
    setPreviewLayout(layout);
  };

  const handleUseLayout = (layout: GISLayout) => {
    // TODO: Implement layout usage logic
    console.log("Using layout:", layout.id);
  };

  return (
    <>
      <Head>
        <title>GIS Layouts | nbcon.ai</title>
        <meta
          name="description"
          content="Mapping dashboards, base map setups, and spatial analysis layouts ready for use powered by GIS AI agent"
        />
      </Head>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">GIS Layouts</h1>
          <p className="text-muted-foreground mb-4 max-w-3xl text-lg">
            Mapping dashboards, base map setups, and spatial analysis layouts ready for use powered by GIS AI agent.
          </p>
        </div>
        {/* Filters */}
        <GISLayoutFilter
          filters={filters}
          categories={categories}
          subcategories={subcategories}
          onFilterChange={updateFilter}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredCount}</span> layout
            {filteredCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Layout Grid */}
        <GISLayoutGrid layouts={layouts} onPreview={handlePreview} />

        {/* Cross-Category Suggestions */}
        <CrossCategorySuggestions templates={crossCategoryTemplates} />
      </main>

      {/* Preview Modal */}
      <Dialog open={!!previewLayout} onOpenChange={(open) => !open && setPreviewLayout(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {previewLayout && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{previewLayout.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {previewLayout.description}
                    </DialogDescription>
                  </div>
                  {previewLayout.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Preview Image */}
                {previewLayout.previewImage && (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={previewLayout.previewImage}
                      alt={previewLayout.name}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{previewLayout.gisCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="font-medium">{previewLayout.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Usage Count</p>
                    <p className="font-medium">{previewLayout.usageCount}</p>
                  </div>
                  {previewLayout.rating && (
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-medium">{previewLayout.rating.toFixed(1)}</p>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {previewLayout.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {previewLayout.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map Provider */}
                {previewLayout.requirements?.mapProvider && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Map Provider</p>
                    <Badge variant="outline">
                      {previewLayout.requirements.mapProvider.charAt(0).toUpperCase() + 
                       previewLayout.requirements.mapProvider.slice(1)}
                    </Badge>
                  </div>
                )}

                {/* Use Cases */}
                {previewLayout.useCases && previewLayout.useCases.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Use Cases</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {previewLayout.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technical Specs */}
                {previewLayout.technicalSpecs && (
                  <div>
                    <p className="text-sm font-medium mb-2">Technical Specifications</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {previewLayout.technicalSpecs.coordinateSystem && (
                        <div>
                          <span className="text-muted-foreground">Coordinate System: </span>
                          <span className="font-medium">{previewLayout.technicalSpecs.coordinateSystem}</span>
                        </div>
                      )}
                      {previewLayout.technicalSpecs.projection && (
                        <div>
                          <span className="text-muted-foreground">Projection: </span>
                          <span className="font-medium">{previewLayout.technicalSpecs.projection}</span>
                        </div>
                      )}
                      {previewLayout.technicalSpecs.units && (
                        <div>
                          <span className="text-muted-foreground">Units: </span>
                          <span className="font-medium">{previewLayout.technicalSpecs.units}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button onClick={() => handleUseLayout(previewLayout)} className="flex-1">
                    Use Layout
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={previewLayout.href}>View Details</a>
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
