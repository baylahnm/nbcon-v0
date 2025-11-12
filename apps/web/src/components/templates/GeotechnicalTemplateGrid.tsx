"use client";

import React from "react";
import { GeotechnicalTemplate } from "@/pages/templates/geotechnical-templates/types/geotechnical-templates";
import { GeotechnicalTemplateCard } from "./GeotechnicalTemplateCard";

interface GeotechnicalTemplateGridProps {
  templates: GeotechnicalTemplate[];
  onPreview?: (template: GeotechnicalTemplate) => void;
}

export function GeotechnicalTemplateGrid({ templates, onPreview }: GeotechnicalTemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No templates found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <GeotechnicalTemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

