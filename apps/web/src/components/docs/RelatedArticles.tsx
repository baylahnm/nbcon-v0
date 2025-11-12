"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useRelatedDocs } from "@/hooks/useRelatedDocs";
import { cn } from "@/lib/utils";

interface RelatedArticlesProps {
  pageSlug: string;
  className?: string;
}

export function RelatedArticles({ pageSlug, className }: RelatedArticlesProps) {
  const relatedDocs = useRelatedDocs(pageSlug, 5);

  if (relatedDocs.length === 0) {
    return null;
  }

  return (
    <div className={cn("mt-12 pt-8 border-t-[0.5px] border-border/50", className)}>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Related Articles</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedDocs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            className="group p-4 rounded-lg border-[0.5px] border-border/50 bg-card hover:bg-accent hover:border-accent-foreground/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                  {doc.title}
                </h3>
                {doc.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded bg-muted">
                    {doc.section}
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

