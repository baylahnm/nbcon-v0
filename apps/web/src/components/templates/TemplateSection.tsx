import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { HorizontalScrollContainer } from "./HorizontalScrollContainer";
import { TemplateCard } from "./TemplateCard";
import { Template } from "@/pages/templates/types/templates";

interface TemplateSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  templates: Template[];
  viewAllLink: string;
  className?: string;
}

export function TemplateSection({
  title,
  description,
  icon: Icon,
  templates,
  viewAllLink,
  className,
}: TemplateSectionProps) {
  if (templates.length === 0) return null;

  return (
    <section className={className}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <Link
          href={viewAllLink}
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
        >
          View all
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          {description}
        </p>
      )}

      {/* Horizontal Scroll Container */}
      <HorizontalScrollContainer>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            className="min-w-[240px] sm:min-w-[280px] md:min-w-[300px]"
          />
        ))}
      </HorizontalScrollContainer>
    </section>
  );
}

