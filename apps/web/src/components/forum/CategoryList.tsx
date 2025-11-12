"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Plug,
  Bug,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ForumCategory } from "@/types/forum";

interface CategoryListProps {
  categories: ForumCategory[];
  selectedCategoryId?: string;
  onCategorySelect?: (categoryId: string | undefined) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Plug,
  Bug,
};

export function CategoryList({
  categories,
  selectedCategoryId,
  onCategorySelect,
}: CategoryListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="subsection-heading">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant={selectedCategoryId === undefined ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onCategorySelect?.(undefined)}
          asChild={!onCategorySelect}
        >
          {onCategorySelect ? (
            <span>All Categories</span>
          ) : (
            <Link href="/forum">All Categories</Link>
          )}
        </Button>
        {categories.map((category) => {
          const Icon = category.icon ? iconMap[category.icon] : MessageSquare;
          const isSelected = selectedCategoryId === category.id;

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onCategorySelect?.(category.id)}
              asChild={!onCategorySelect}
            >
              {onCategorySelect ? (
                <>
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  <span className="flex-1 text-left">{category.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {category.threadCount}
                  </Badge>
                </>
              ) : (
                <Link href={`/forum/category/${category.slug}`} className="flex items-center w-full">
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  <span className="flex-1 text-left">{category.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {category.threadCount}
                  </Badge>
                </Link>
              )}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}

