"use client";

import React from "react";
import { CivilTemplate } from "@/pages/templates/civil-templates/types/civil-templates";
import { CivilTemplateCard } from "./CivilTemplateCard";

interface CivilTemplateGridProps {
  templates: CivilTemplate[];
  onPreview?: (template: CivilTemplate) => void;
}

export function CivilTemplateGrid({ templates, onPreview }: CivilTemplateGridProps) {
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
        <CivilTemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

