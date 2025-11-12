"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BlogCategory } from "@/types/blog";

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategoryId?: string;
  onCategoryChange: (categoryId?: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategoryId === undefined ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(undefined)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategoryId === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          style={
            selectedCategoryId === category.id
              ? {
                  backgroundColor: category.color,
                  borderColor: category.color,
                  color: "white",
                }
              : {
                  borderColor: category.color,
                  color: category.color,
                }
          }
        >
          {category.name}
          {category.postCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {category.postCount}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}

