"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export interface SidebarNode {
  title: string;
  slug: string; // e.g., get-started/welcome
  section: string; // folder name
}

export function SidebarDocs({ items, onNavigate }: { items: SidebarNode[]; onNavigate?: () => void }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const bySection = items.reduce<Record<string, SidebarNode[]>>((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const toggleSection = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Debug: log items count
  if (typeof window !== "undefined") {
    console.log("[SidebarDocs] Items count:", items.length);
  }

  // If no items, show placeholder
  if (items.length === 0) {
    return (
      <aside className="w-64 border-r border-border min-h-screen hidden lg:block">
        <nav className="p-4 space-y-6">
          <div className="text-sm text-muted-foreground">No documentation found. Please check server logs.</div>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r border-border min-h-screen hidden lg:block">
      <nav className="p-4 space-y-6">
        {/* Documentation Sections */}
        {Object.keys(bySection).sort().map((section) => {
          const isExpanded = expanded[section] !== false; // Default to expanded
          const sectionItems = bySection[section].sort((a, b) => a.title.localeCompare(b.title));
          
          return (
            <div key={section}>
              <button
                onClick={() => toggleSection(section)}
                className="flex items-center justify-between w-full mb-2 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{section.replace(/-/g, " ")}</span>
                <ChevronRight
                  className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
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
