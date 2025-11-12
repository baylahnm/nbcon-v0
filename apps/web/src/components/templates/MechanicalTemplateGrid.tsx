"use client";

import React from "react";
import { MechanicalTemplate } from "@/pages/templates/mechanical-templates/types/mechanical-templates";
import { MechanicalTemplateCard } from "./MechanicalTemplateCard";

interface MechanicalTemplateGridProps {
  templates: MechanicalTemplate[];
  onPreview?: (template: MechanicalTemplate) => void;
}

export function MechanicalTemplateGrid({ templates, onPreview }: MechanicalTemplateGridProps) {
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
        <MechanicalTemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

