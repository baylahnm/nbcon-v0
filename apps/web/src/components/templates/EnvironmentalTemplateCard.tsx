import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Eye, Leaf } from "lucide-react";
import { EnvironmentalTemplate } from "@/pages/templates/environmental-templates/types/environmental-templates";
import { cn } from "@/lib/utils";

interface EnvironmentalTemplateCardProps {
  template: EnvironmentalTemplate;
  onPreview?: (template: EnvironmentalTemplate) => void;
}

const categoryColors: Record<string, string> = {
  "impact-assessment": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  compliance: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "remediation-planning": "bg-green-500/10 text-green-600 border-green-500/20",
};

const categoryLabels: Record<string, string> = {
  "impact-assessment": "Impact Assessment",
  compliance: "Compliance",
  "remediation-planning": "Remediation Planning",
};

export function EnvironmentalTemplateCard({ template, onPreview }: EnvironmentalTemplateCardProps) {
  const categoryColor = categoryColors[template.environmentalCategory] || categoryColors["impact-assessment"];
  const categoryLabel = categoryLabels[template.environmentalCategory] || template.environmentalCategory;

  return (
    <div className="group relative rounded-[18px] overflow-hidden bg-card/60 backdrop-blur-[2px] border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-200 flex flex-col">
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
            <Leaf className={cn("h-12 w-12", template.categoryColor)} />
          </div>
        )}
        {/* Featured Badge */}
        {template.featured && (
          <Badge
            variant="default"
            className="absolute top-2 right-2 text-xs inline-flex items-center justify-center rounded-full border px-1.5 font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 border-transparent bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90"
          >
            Featured
          </Badge>
        )}
        {/* Category Badge */}
        <Badge
          variant="outline"
          className={cn("absolute top-2 left-2 text-xs", categoryColor)}
        >
          {categoryLabel}
        </Badge>
      </div>

      {/* Content Section (Bottom) */}
      <div className="flex-1 flex flex-col p-4 min-w-0 text-card-foreground">
        <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-2">
          {template.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {template.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          {template.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{template.rating.toFixed(1)}</span>
              {template.reviews && <span>({template.reviews})</span>}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{template.usageCount}</span>
          </div>
          {template.views && (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{template.views}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {template.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1"
            asChild
          >
            <Link href={template.href}>Use Template</Link>
          </Button>
          {onPreview && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPreview(template)}
            >
              Preview
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

