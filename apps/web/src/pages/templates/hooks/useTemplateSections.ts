import { useMemo } from "react";
import { Template } from "../types/templates";

export function useTemplateSections(templates: Template[]) {
  const featured = useMemo(
    () => templates.filter((t) => t.featured).slice(0, 8),
    [templates]
  );

  const recent = useMemo(
    () =>
      [...templates]
        .sort((a, b) => {
          // Sort by updatedAt (most recent first)
          // For now, using mock data, so we'll use the order they appear
          return templates.indexOf(a) - templates.indexOf(b);
        })
        .slice(0, 12),
    [templates]
  );

  const newest = useMemo(
    () =>
      [...templates]
        .sort((a, b) => {
          // Sort by createdAt (most recent first)
          // For now, using mock data order
          return templates.indexOf(a) - templates.indexOf(b);
        })
        .slice(0, 12),
    [templates]
  );

  const popular = useMemo(
    () =>
      [...templates]
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, 12),
    [templates]
  );

  return {
    featured,
    recent,
    newest,
    popular,
  };
}

