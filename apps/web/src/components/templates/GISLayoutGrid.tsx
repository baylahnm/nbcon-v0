"use client";

import React from "react";
import { GISLayout } from "@/pages/templates/gis-layouts/types/gis-layouts";
import { GISLayoutCard } from "./GISLayoutCard";

interface GISLayoutGridProps {
  layouts: GISLayout[];
  onPreview?: (layout: GISLayout) => void;
}

export function GISLayoutGrid({ layouts, onPreview }: GISLayoutGridProps) {
  if (layouts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No layouts found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {layouts.map((layout) => (
        <GISLayoutCard
          key={layout.id}
          layout={layout}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}

