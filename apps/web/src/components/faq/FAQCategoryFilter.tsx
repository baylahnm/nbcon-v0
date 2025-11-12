"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FAQCategory } from "@/types/faq";
import * as LucideIcons from "lucide-react";
import { X } from "lucide-react";

interface FAQCategoryFilterProps {
  categories: FAQCategory[];
  selectedCategoryId?: string;
  onCategoryChange: (categoryId?: string) => void;
}

export function FAQCategoryFilter({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: FAQCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategoryId === undefined ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(undefined)}
      >
        All Categories
      </Button>
      {categories.map((category) => {
        const Icon = category.icon
          ? (LucideIcons as any)[category.icon] || LucideIcons.Folder
          : LucideIcons.Folder;

        return (
          <Button
            key={category.id}
            variant={selectedCategoryId === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2"
          >
            {Icon && <Icon className="h-4 w-4" />}
            {category.name}
            {category.faqCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {category.faqCount}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}

