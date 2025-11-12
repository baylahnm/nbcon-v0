"use client";

import React from "react";
import { FinanceTemplate } from "@/pages/templates/finance-templates/types/finance-templates";
import { FinanceTemplateCard } from "./FinanceTemplateCard";

interface FinanceTemplateGridProps {
  templates: FinanceTemplate[];
  onPreview?: (template: FinanceTemplate) => void;
}

export function FinanceTemplateGrid({ templates, onPreview }: FinanceTemplateGridProps) {
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
        <FinanceTemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

