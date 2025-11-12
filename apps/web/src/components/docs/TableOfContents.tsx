"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTOC, type TOCItem } from "@/hooks/useTOC";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement>;
  className?: string;
}

export function TableOfContents({ contentRef, className }: TableOfContentsProps) {
  const { headings, activeId } = useTOC(contentRef);

  // Don't show TOC if no headings or no content ref
  if (headings.length === 0 || !contentRef.current) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderTOCItem = (item: TOCItem, index: number) => {
    const isActive = item.id === activeId;
    const indentClass = {
      1: "pl-0",
      2: "pl-4",
      3: "pl-8",
      4: "pl-12",
      5: "pl-16",
      6: "pl-20",
    }[item.level] || "pl-0";

    return (
      <li key={`${item.id}-${index}`} className={cn("mb-1", indentClass)}>
        <button
          onClick={() => scrollToHeading(item.id)}
          className={cn(
            "text-left text-sm w-full transition-colors hover:text-foreground",
            isActive
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-2">
            {item.level > 2 && (
              <ChevronRight className="h-3 w-3 opacity-50" />
            )}
            <span className="truncate">{item.title}</span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <aside
      className={cn(
        "hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto",
        "w-64 pl-8 border-l-[0.5px] border-border/50",
        className
      )}
    >
      <div className="py-4">
        <h2 className="text-sm font-semibold text-foreground mb-4">On this page</h2>
        <nav aria-label="Table of contents">
          <ul className="space-y-1">
            {headings.map((item, index) => renderTOCItem(item, index))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

