"use client";

import { useRouter } from "next/router";
import { useRef } from "react";
import { NavbarDocs } from "./NavbarDocs";
import { SidebarDocs, SidebarNode } from "./SidebarDocs";
import { FeedbackWidget } from "./FeedbackWidget";
import { Breadcrumbs } from "./Breadcrumbs";
import { TableOfContents } from "./TableOfContents";
import { RelatedArticles } from "./RelatedArticles";
import { ReadingProgress } from "./ReadingProgress";
import { useI18n } from "@/hooks/useI18n";

export default function DocsLayout({
  index,
  sidebar,
  children,
  pageSlug,
}: {
  index: { title: string; slug: string; excerpt?: string }[];
  sidebar: SidebarNode[];
  children: React.ReactNode;
  pageSlug?: string;
}) {
  const { isRTL } = useI18n();
  const router = useRouter();
  const contentRef = useRef<HTMLElement>(null);
  
  // Get page slug from prop or router
  const currentSlug = pageSlug || (router.query.slug as string[] | undefined)?.join("/") || "";

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <ReadingProgress />
      <NavbarDocs index={index} sidebar={sidebar} />
      <div className="flex">
        <SidebarDocs items={sidebar} />
        <main className="flex-1 px-4 md:px-8 lg:px-16 py-8">
          {currentSlug && <Breadcrumbs pageSlug={currentSlug} />}
          <div ref={contentRef}>
            {children}
          </div>
          {currentSlug && (
            <>
              <RelatedArticles pageSlug={currentSlug} />
              <FeedbackWidget pageSlug={currentSlug} />
            </>
          )}
        </main>
        <TableOfContents contentRef={contentRef} />
      </div>
    </div>
  );
}


