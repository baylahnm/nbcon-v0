"use client";

import React from "react";
import { EnvironmentalTemplate } from "@/pages/templates/environmental-templates/types/environmental-templates";
import { EnvironmentalTemplateCard } from "./EnvironmentalTemplateCard";

interface EnvironmentalTemplateGridProps {
  templates: EnvironmentalTemplate[];
  onPreview?: (template: EnvironmentalTemplate) => void;
}

export function EnvironmentalTemplateGrid({ templates, onPreview }: EnvironmentalTemplateGridProps) {
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
        <EnvironmentalTemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

