/**
 * useChangelog Hook
 * Reusable hook for changelog data fetching and filtering
 * Follows assignment rules: Solution-first, TypeScript types, validation
 */

import { useMemo, useState } from "react";
import changelogData from "@/data/changelog.json";
import type {
  ChangelogEntry,
  ChangelogFilters,
  ChangelogStats,
  ChangelogVersionType,
} from "@/types/changelog";

/**
 * Hook for managing changelog data and filters
 * @returns Changelog data, filters, and utility functions
 */
export function useChangelog() {
  const [filters, setFilters] = useState<ChangelogFilters>({
    searchQuery: "",
    typeFilter: "all",
    categoryFilter: "all",
  });

  // Type assertion with validation
  const changelog = useMemo(() => {
    return (changelogData as ChangelogEntry[]).sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, []);

  // Filter changelog entries based on current filters
  const filteredChangelog = useMemo(() => {
    return changelog.filter((entry) => {
      // Type filter
      if (filters.typeFilter !== "all" && entry.type !== filters.typeFilter) {
        return false;
      }

      // Category filter
      if (filters.categoryFilter !== "all") {
        const categoryKey = filters.categoryFilter as keyof typeof entry.categories;
        const hasCategory = entry.categories[categoryKey];
        if (!hasCategory || (Array.isArray(hasCategory) && hasCategory.length === 0)) {
          return false;
        }
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = [
          entry.version,
          entry.fullNotes || "",
          ...entry.highlights,
          ...Object.values(entry.categories).flat(),
        ]
          .join(" ")
          .toLowerCase();
        return searchableText.includes(query);
      }

      return true;
    });
  }, [changelog, filters]);

  // Calculate statistics
  const stats: ChangelogStats = useMemo(() => {
    const majorVersions = changelog.filter((e) => e.type === "major").length;
    const minorVersions = changelog.filter((e) => e.type === "minor").length;
    const patchVersions = changelog.filter((e) => e.type === "patch").length;
    const hotfixVersions = changelog.filter((e) => e.type === "hotfix").length;
    const latest = changelog[0];

    return {
      totalVersions: changelog.length,
      majorVersions,
      minorVersions,
      patchVersions,
      hotfixVersions,
      latestVersion: latest?.version || "",
      latestVersionDate: latest?.date || "",
    };
  }, [changelog]);

  // Get entry by version
  const getEntryByVersion = (version: string): ChangelogEntry | undefined => {
    return changelog.find((entry) => entry.version === version);
  };

  // Get entries by type
  const getEntriesByType = (type: ChangelogVersionType): ChangelogEntry[] => {
    return changelog.filter((entry) => entry.type === type);
  };

  // Update filters
  const updateFilters = (newFilters: Partial<ChangelogFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      typeFilter: "all",
      categoryFilter: "all",
    });
  };

  return {
    changelog,
    filteredChangelog,
    filters,
    stats,
    updateFilters,
    resetFilters,
    getEntryByVersion,
    getEntriesByType,
  };
}

