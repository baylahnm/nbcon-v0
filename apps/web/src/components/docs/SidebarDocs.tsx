"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export interface SidebarNode {
  title: string;
  slug: string; // e.g., get-started/welcome
  section: string; // folder name
}

interface SidebarDocsProps {
  items: SidebarNode[];
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}

export function SidebarDocs({ items, onNavigate, variant = "desktop" }: SidebarDocsProps) {
  const router = useRouter();
  const { t, isRTL } = useI18n();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const bySection = items.reduce<Record<string, SidebarNode[]>>((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const toggleSection = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getSectionTitle = (section: string): string => {
    return t(`docs.sections.${section}`) || section.replace(/-/g, " ");
  };

  // Custom section order - "get-started" should appear first
  const sectionOrder = [
    "get-started",
    "core",
    "configuration",
    "context",
    "integrations",
    "account",
    "cookbook",
    "troubleshooting",
  ];

  const sortSections = (sections: string[]): string[] => {
    const ordered: string[] = [];
    const unordered: string[] = [];

    // Add sections in custom order
    sectionOrder.forEach((section) => {
      if (sections.includes(section)) {
        ordered.push(section);
      }
    });

    // Add any remaining sections alphabetically
    sections.forEach((section) => {
      if (!sectionOrder.includes(section)) {
        unordered.push(section);
      }
    });

    return [...ordered, ...unordered.sort()];
  };


  // Determine visibility classes based on variant
  const visibilityClass = variant === "mobile" ? "block" : "hidden lg:block";
  const borderClass = variant === "mobile" ? "" : isRTL ? "border-l" : "border-r";
  const minHeightClass = variant === "mobile" ? "min-h-full" : "min-h-screen";

  // If no items, show placeholder
  if (items.length === 0) {
    return (
      <aside className={`w-64 ${minHeightClass} ${visibilityClass} ${borderClass} border-[0.5px] border-border/50`}>
        <nav className="p-4 space-y-6">
          <div className="text-sm text-muted-foreground">No documentation found. Please check server logs.</div>
        </nav>
      </aside>
    );
  }

  return (
    <aside className={`w-64 ${minHeightClass} ${visibilityClass} ${borderClass} border-[0.5px] border-border/50`}>
      <nav className="p-4 space-y-6">
        {/* Documentation Sections */}
        {sortSections(Object.keys(bySection)).map((section) => {
          const isExpanded = expanded[section] !== false; // Default to expanded
          const sectionItems = bySection[section].sort((a, b) => a.title.localeCompare(b.title));
          
          return (
            <div key={section}>
              <button
                onClick={() => toggleSection(section)}
                className="flex items-center justify-between w-full mb-2 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{getSectionTitle(section)}</span>
                <ChevronRight
                  className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""} ${isRTL ? "scale-x-[-1]" : ""}`}
                />
              </button>
              {isExpanded && (
                <ul className="space-y-1">
                  {sectionItems.map((item) => {
                    const href = `/docs/${item.slug}`;
                    const active = router.asPath === href;
                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          className={
                            "block rounded-md px-2 py-1.5 text-sm transition-colors " +
                            (active
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-muted")
                          }
                          onClick={onNavigate}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
