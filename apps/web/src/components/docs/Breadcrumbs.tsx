"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getDocBySlug, getAllDocs } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  pageSlug: string;
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href: string;
  isLast?: boolean;
}

export function Breadcrumbs({ pageSlug, className }: BreadcrumbsProps) {
  const { locale } = useI18n();
  
  // Don't show breadcrumbs on index page
  if (!pageSlug || pageSlug === "") {
    return null;
  }

  // Build breadcrumb items from slug
  const items: BreadcrumbItem[] = [];
  
  // Always start with Home
  items.push({
    label: "Home",
    href: "/",
  });

  // Add Docs root
  items.push({
    label: "Docs",
    href: "/docs",
  });

  // Parse slug and build breadcrumbs
  const slugParts = pageSlug.split("/");
  let currentPath = "";

  slugParts.forEach((part, index) => {
    currentPath += (currentPath ? "/" : "") + part;
    const isLast = index === slugParts.length - 1;
    
    // Get doc metadata for this slug
    const doc = getDocBySlug(currentPath, locale);
    
    // Use doc title if available, otherwise format the slug part
    const label = doc?.title || part
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    items.push({
      label,
      href: `/docs/${currentPath}`,
      isLast,
    });
  });

  // Don't show breadcrumb if only Home and Docs
  if (items.length <= 2) {
    return null;
  }

  return (
    <nav
      className={cn("flex items-center gap-2 text-sm text-muted-foreground mb-4", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                  aria-label="Home"
                >
                  <Home className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  {isLast ? (
                    <span className="text-foreground font-medium" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

