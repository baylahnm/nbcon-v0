import { NavbarDocs } from "./NavbarDocs";
import { SidebarDocs, SidebarNode } from "./SidebarDocs";

export default function DocsLayout({
  index,
  sidebar,
  children,
  lang = "en",
}: {
  index: { title: string; slug: string; excerpt?: string }[];
  sidebar: SidebarNode[];
  children: React.ReactNode;
  lang?: "en" | "ar";
}) {
  return (
    <div className={"min-h-screen bg-background " + (lang === "ar" ? "rtl" : "") }>
      <NavbarDocs index={index} lang={lang} sidebar={sidebar} />
      <div className="flex">
        <SidebarDocs items={sidebar} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}


