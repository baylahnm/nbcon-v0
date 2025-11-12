import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Template } from "@/pages/templates/types/templates";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: Template;
  className?: string;
}

export function TemplateCard({ template, className }: TemplateCardProps) {
  const Icon = template.categoryIcon;
  
  return (
    <Link
      href={template.href}
      className={cn(
        "group relative rounded-[18px] overflow-hidden bg-card/60 backdrop-blur-[2px] border border-border/50 shadow-sm w-full aspect-[6/5] flex flex-col",
        "hover:shadow-lg hover:border-primary/50 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
    >
      {/* Image Section (Top) */}
      <div className="aspect-square w-full overflow-hidden bg-muted/30 relative">
        {template.previewImage ? (
          <img
            className="aspect-square h-full w-full object-cover"
            alt={template.name}
            src={template.previewImage}
          />
        ) : (
          <div className="aspect-square h-full w-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
            <Icon className={cn("h-12 w-12", template.categoryColor)} />
          </div>
        )}
        {/* Featured Badge - Top Right */}
        {template.featured && (
          <Badge 
            variant="default" 
            className="absolute top-2 right-2 text-xs inline-flex items-center justify-center rounded-full border px-1.5 font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 border-transparent bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90"
          >
            Featured
          </Badge>
        )}
      </div>

      {/* Content Section (Bottom) */}
      <div className="flex-1 flex flex-col justify-center py-1.5 pr-4 pl-4 min-w-0 text-card-foreground">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <Icon className={cn("h-4 w-4 flex-shrink-0", template.categoryColor)} />
            <Badge variant="outline" className="text-xs truncate">
              {template.categoryName}
            </Badge>
          </div>
        </div>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {template.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {template.description}
        </p>
      </div>
    </Link>
  );
}

