"use client";

import { NavbarDocs } from "./NavbarDocs";
import { SidebarDocs, SidebarNode } from "./SidebarDocs";
import { useI18n } from "@/hooks/useI18n";

export default function DocsLayout({
  index,
  sidebar,
  children,
}: {
  index: { title: string; slug: string; excerpt?: string }[];
  sidebar: SidebarNode[];
  children: React.ReactNode;
}) {
  const { isRTL } = useI18n();

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <NavbarDocs index={index} sidebar={sidebar} />
      <div className="flex">
        <SidebarDocs items={sidebar} />
        <main className="flex-1 px-4 md:px-8 lg:px-16 py-8">{children}</main>
      </div>
    </div>
  );
}


