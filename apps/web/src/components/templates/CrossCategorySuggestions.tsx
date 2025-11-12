"use client";

import React from "react";
import Link from "next/link";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { HorizontalScrollContainer } from "@/components/templates/HorizontalScrollContainer";
import { Template } from "@/pages/templates/types/templates";
import { ArrowRight } from "lucide-react";

interface CrossCategorySuggestionsProps {
  templates: Template[];
}

export function CrossCategorySuggestions({ templates }: CrossCategorySuggestionsProps) {
  if (templates.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">You might also like</h2>
          <p className="text-sm text-muted-foreground">
            Discover templates from other categories that might interest you
          </p>
        </div>
        <Link
          href="/templates"
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
        >
          Browse all templates
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <HorizontalScrollContainer>
        {templates.map((template) => (
          <div key={template.id} className="min-w-[240px] sm:min-w-[280px] md:min-w-[300px]">
            <TemplateCard template={template} />
          </div>
        ))}
      </HorizontalScrollContainer>
    </section>
  );
}

