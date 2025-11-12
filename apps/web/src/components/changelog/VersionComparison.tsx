"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, Rocket, Bug, Shield, AlertTriangle, BookOpen } from "lucide-react";
import type { ChangelogEntry } from "@/types/changelog";

interface VersionComparisonProps {
  changelog: ChangelogEntry[];
  className?: string;
}

const categoryIcons = {
  features: Sparkles,
  improvements: Rocket,
  bugFixes: Bug,
  security: Shield,
  breakingChanges: AlertTriangle,
  documentation: BookOpen,
};

export function VersionComparison({ changelog, className }: VersionComparisonProps) {
  const [version1, setVersion1] = useState<string>("");
  const [version2, setVersion2] = useState<string>("");

  const entry1 = changelog.find((e) => e.version === version1);
  const entry2 = changelog.find((e) => e.version === version2);

  const getDiff = () => {
    if (!entry1 || !entry2) return null;

    const diff: {
      category: string;
      added: string[];
      removed: string[];
    }[] = [];

    // Compare categories
    const allCategories = new Set([
      ...Object.keys(entry1.categories),
      ...Object.keys(entry2.categories),
    ]);

    allCategories.forEach((category) => {
      const items1 = entry1.categories[category as keyof typeof entry1.categories] || [];
      const items2 = entry2.categories[category as keyof typeof entry2.categories] || [];

      const arr1 = Array.isArray(items1) ? items1 : [];
      const arr2 = Array.isArray(items2) ? items2 : [];

      // Helper to extract string from item (handles both strings and objects)
      const getItemString = (item: any): string => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "description" in item) {
          return item.description || "";
        }
        return String(item);
      };

      const added = arr2.filter((item) => {
        const str = getItemString(item);
        return !arr1.some((i) => getItemString(i) === str);
      });

      const removed = arr1.filter((item) => {
        const str = getItemString(item);
        return !arr2.some((i) => getItemString(i) === str);
      });

      if (added.length > 0 || removed.length > 0) {
        diff.push({
          category: category.replace(/([A-Z])/g, " $1").trim(),
          added: added.map((item) => {
            if (typeof item === "string") return item;
            if (item && typeof item === "object" && "description" in item) {
              return item.description || "";
            }
            return String(item);
          }),
          removed: removed.map((item) => {
            if (typeof item === "string") return item;
            if (item && typeof item === "object" && "description" in item) {
              return item.description || "";
            }
            return String(item);
          }),
        });
      }
    });

    return diff;
  };

  const diff = getDiff();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="subsection-heading">Version Comparison</CardTitle>
        <CardDescription>
          Compare changes between two versions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="label-text">From Version</label>
            <Select value={version1} onValueChange={setVersion1}>
              <SelectTrigger>
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {changelog.map((entry) => (
                  <SelectItem key={entry.version} value={entry.version}>
                    v{entry.version} - {entry.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="label-text">To Version</label>
            <Select value={version2} onValueChange={setVersion2}>
              <SelectTrigger>
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {changelog.map((entry) => (
                  <SelectItem key={entry.version} value={entry.version}>
                    v{entry.version} - {entry.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {version1 && version2 && version1 === version2 && (
          <p className="text-sm text-muted-foreground text-center">
            Please select two different versions to compare.
          </p>
        )}

        {entry1 && entry2 && version1 !== version2 && diff && (
          <div className="space-y-6 mt-6 pt-6 border-t-[0.5px] border-border/50">
            {diff.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center">
                No differences found between these versions.
              </p>
            ) : (
              diff.map((categoryDiff) => {
                const CategoryIcon =
                  categoryIcons[
                    Object.keys(categoryIcons).find(
                      (key) => key.replace(/([A-Z])/g, " $1").trim().toLowerCase() === categoryDiff.category.toLowerCase()
                    ) as keyof typeof categoryIcons
                  ] || Sparkles;

                return (
                  <div key={categoryDiff.category} className="space-y-3">
                    <h4 className="card-title flex items-center gap-2">
                      <CategoryIcon className="h-5 w-5" />
                      {categoryDiff.category}
                    </h4>

                    {categoryDiff.added.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                          Added ({categoryDiff.added.length})
                        </p>
                        <ul className="space-y-1">
                          {categoryDiff.added.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-green-600 dark:text-green-400 mt-1">+</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {categoryDiff.removed.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                          Removed ({categoryDiff.removed.length})
                        </p>
                        <ul className="space-y-1">
                          {categoryDiff.removed.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm line-through opacity-60">
                              <span className="text-red-600 dark:text-red-400 mt-1">-</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

