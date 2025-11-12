"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { BlogTag } from "@/types/blog";

interface TagCloudProps {
  tags: BlogTag[];
  maxTags?: number;
}

export function TagCloud({ tags, maxTags = 20 }: TagCloudProps) {
  const sortedTags = [...tags]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, maxTags);

  // Calculate font sizes based on usage count
  const maxUsage = Math.max(...sortedTags.map((t) => t.usageCount), 1);
  const minUsage = Math.min(...sortedTags.map((t) => t.usageCount), 0);

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map((tag) => {
        const usageRatio = (tag.usageCount - minUsage) / (maxUsage - minUsage || 1);
        const fontSize = 0.75 + usageRatio * 0.5; // Between 0.75rem and 1.25rem

        return (
          <Link key={tag.id} href={`/blog/tag/${tag.slug}`}>
            <Badge
              variant="secondary"
              className="hover:bg-primary/10 transition-colors cursor-pointer"
              style={{ fontSize: `${fontSize}rem` }}
            >
              {tag.name}
              {tag.usageCount > 0 && (
                <span className="ml-1 text-xs opacity-70">
                  ({tag.usageCount})
                </span>
              )}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}

