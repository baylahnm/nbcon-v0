"use client";

import React from "react";
import { ElectricalTemplate } from "@/pages/templates/electrical-templates/types/electrical-templates";
import { ElectricalTemplateCard } from "./ElectricalTemplateCard";

interface ElectricalTemplateGridProps {
  templates: ElectricalTemplate[];
  onPreview?: (template: ElectricalTemplate) => void;
}

export function ElectricalTemplateGrid({ templates, onPreview }: ElectricalTemplateGridProps) {
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
        <ElectricalTemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

