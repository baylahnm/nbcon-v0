"use client";

import React from "react";
import { SurveyTemplate } from "@/pages/templates/survey-templates/types/survey-templates";
import { SurveyTemplateCard } from "./SurveyTemplateCard";

interface SurveyTemplateGridProps {
  templates: SurveyTemplate[];
  onPreview?: (template: SurveyTemplate) => void;
}

export function SurveyTemplateGrid({ templates, onPreview }: SurveyTemplateGridProps) {
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
        <SurveyTemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

