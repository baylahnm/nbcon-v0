import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Eye, Map } from "lucide-react";
import { GISLayout } from "@/pages/templates/gis-layouts/types/gis-layouts";
import { cn } from "@/lib/utils";

interface GISLayoutCardProps {
  layout: GISLayout;
  onPreview?: (layout: GISLayout) => void;
}

const categoryColors: Record<string, string> = {
  dashboards: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "base-maps": "bg-green-500/10 text-green-600 border-green-500/20",
  analysis: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "data-collection": "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

const categoryLabels: Record<string, string> = {
  dashboards: "Dashboards",
  "base-maps": "Base Maps",
  analysis: "Analysis",
  "data-collection": "Data Collection",
};

export function GISLayoutCard({ layout, onPreview }: GISLayoutCardProps) {
  const categoryColor = categoryColors[layout.gisCategory] || categoryColors.dashboards;
  const categoryLabel = categoryLabels[layout.gisCategory] || layout.gisCategory;

  return (
    <div className="group relative rounded-[18px] overflow-hidden bg-card/60 backdrop-blur-[2px] border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-200 flex flex-col">
      {/* Image Section (Top) */}
      <div className="aspect-square w-full overflow-hidden bg-muted/30 relative">
        {layout.previewImage ? (
          <img
            className="aspect-square h-full w-full object-cover"
            alt={layout.name}
            src={layout.previewImage}
          />
        ) : (
          <div className="aspect-square h-full w-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
            <Map className={cn("h-12 w-12", layout.categoryColor)} />
          </div>
        )}
        {/* Featured Badge */}
        {layout.featured && (
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
          {layout.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {layout.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          {layout.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{layout.rating.toFixed(1)}</span>
              {layout.reviews && <span>({layout.reviews})</span>}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{layout.usageCount}</span>
          </div>
          {layout.views && (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{layout.views}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {layout.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {layout.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {layout.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{layout.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Map Provider Badge */}
        {layout.requirements?.mapProvider && (
          <div className="mb-3">
            <Badge variant="outline" className="text-xs">
              {layout.requirements.mapProvider.charAt(0).toUpperCase() + layout.requirements.mapProvider.slice(1)}
            </Badge>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1"
            asChild
          >
            <Link href={layout.href}>Use Layout</Link>
          </Button>
          {onPreview && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPreview(layout)}
            >
              Preview
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

