"use client";

import { useMemo } from "react";
import { getAllDocs, getDocBySlug, type DocMeta } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export function useRelatedDocs(currentSlug: string, limit: number = 5): DocMeta[] {
  const { locale } = useI18n();

  return useMemo(() => {
    if (!currentSlug) return [];

    const currentDoc = getDocBySlug(currentSlug, locale);
    if (!currentDoc) return [];

    const allDocs = getAllDocs(locale);
    
    // Filter docs by same section, exclude current doc
    const relatedDocs = allDocs
      .filter((doc) => {
        return (
          doc.slug !== currentSlug &&
          doc.section === currentDoc.section
        );
      })
      .slice(0, limit);

    // If not enough docs in same section, add docs from other sections
    if (relatedDocs.length < limit) {
      const otherDocs = allDocs
        .filter((doc) => {
          return (
            doc.slug !== currentSlug &&
            doc.section !== currentDoc.section &&
            !relatedDocs.some((rd) => rd.slug === doc.slug)
          );
        })
        .slice(0, limit - relatedDocs.length);

      return [...relatedDocs, ...otherDocs];
    }

    return relatedDocs;
  }, [currentSlug, locale, limit]);
}

