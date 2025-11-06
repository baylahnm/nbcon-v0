import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import DocsLayout from "@/components/docs/DocsLayout";
import { CheckboxTask } from "@/components/ui/checkbox-task";
import { RoadmapTracker } from "@/components/docs/RoadmapTracker";
import { useI18n } from "@/hooks/useI18n";
import { getAllDocs } from "@/lib/docs";

interface DocsPageProps { index: { title: string; slug: string; excerpt?: string }[]; sidebar: { title: string; slug: string; section: string }[] }

// Custom components for MDX
interface MDXComponentProps {
  [key: string]: unknown;
  className?: string;
  type?: string;
  checked?: boolean;
  value?: string;
  children?: React.ReactNode;
}

// MDX components are defined but not currently used (for future MDX rendering)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const components = {
  // Custom checkbox rendering - remark-gfm converts - [ ] to input elements
  input: (props: MDXComponentProps) => {
    if (props.type === "checkbox") {
      // Get text from sibling nodes or use a hash of the position
      const textContent = props.value || props.children || "";
      // Create stable ID from text content (or generate from context)
      const textHash = textContent 
        ? textContent.slice(0, 50).replace(/[^a-z0-9]/gi, "-").toLowerCase()
        : Math.random().toString(36).substr(2, 9);
      const id = `task-${textHash}`;
      
      return (
        <CheckboxTask
          id={id}
          defaultChecked={props.checked || false}
        >
          {textContent}
        </CheckboxTask>
      );
    }
    return <input {...props} />;
  },
  // Table styling
  table: (props: MDXComponentProps) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-border border border-border rounded-md" {...props} />
    </div>
  ),
  thead: (props: MDXComponentProps) => <thead className="bg-muted" {...props} />,
  th: (props: MDXComponentProps) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: MDXComponentProps) => (
    <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap" {...props} />
  ),
  tr: (props: MDXComponentProps) => <tr className="border-t border-border" {...props} />,
  // Code block styling
  code: (props: MDXComponentProps) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-primary"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: MDXComponentProps) => (
    <pre
      className="overflow-x-auto rounded-lg bg-muted p-4 my-4 border border-border"
      {...props}
    />
  ),
  // Headings
  h1: (props: MDXComponentProps) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  h2: (props: MDXComponentProps) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3 text-foreground" {...props} />
  ),
  h3: (props: MDXComponentProps) => (
    <h3 className="text-2xl font-semibold mt-4 mb-2 text-foreground" {...props} />
  ),
  // Lists with checkbox support
  li: (props: MDXComponentProps) => {
    // Check if this list item contains a checkbox
    const hasCheckbox = React.Children.toArray(props.children).some(
      (child) => {
        if (typeof child === "object" && child !== null && "props" in child) {
          const childProps = child.props as { type?: string; children?: unknown };
          return childProps.type === "checkbox" || 
            (Array.isArray(childProps.children) && childProps.children.some((c) => 
              typeof c === "object" && c !== null && "props" in c && 
              (c.props as { type?: string })?.type === "checkbox"
            ));
        }
        return false;
      }
    );
    
    if (hasCheckbox) {
      return <li className="list-none" {...props} />;
    }
    return <li className="ml-4 list-disc" {...props} />;
  },
  ul: (props: MDXComponentProps) => (
    <ul className="space-y-2 my-4 ml-4" {...props} />
  ),
  // Paragraphs
  p: (props: MDXComponentProps) => <p className="mb-4 text-foreground leading-relaxed" {...props} />,
  // Links
  a: (props: MDXComponentProps) => (
    <a
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  // Blockquotes
  blockquote: (props: MDXComponentProps) => (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground" {...props} />
  ),
};

export default function DocsIndex({ index, sidebar }: DocsPageProps) {
  const { t } = useI18n();
  
  const quickLinks = [
    {
      title: t("docs.getStarted"),
      description: t("docs.getStartedDesc"),
      href: "/docs/get-started/quickstart",
      icon: "🚀",
    },
    {
      title: t("docs.concepts"),
      description: t("docs.conceptsDesc"),
      href: "/docs/get-started/concepts",
      icon: "📚",
    },
    {
      title: t("docs.downloads"),
      description: t("docs.downloadsDesc"),
      href: "/docs/downloads",
      icon: "⬇️",
    },
    {
      title: t("docs.support"),
      description: t("docs.supportDesc"),
      href: "/support",
      icon: "💬",
    },
  ];

  return (
    <>
      <Head>
        <title>Docs | NBCON PRO</title>
        <meta name="description" content="NBCON PRO documentation" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <div className="max-w-4xl">
          <div className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Get Started
          </div>
              <h1 className="text-[38px] font-bold mb-6">{t("docs.title")}</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            {t("docs.description")}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-lg border p-6 hover:bg-accent transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{link.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Roadmap Tracker */}
          <div className="mb-12">
            <RoadmapTracker />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sidebar.slice(0, 9).map((item) => (
              <Link
                key={item.slug}
                href={`/docs/${item.slug}`}
                className="rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <div className="font-semibold mb-1">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.section}</div>
              </Link>
            ))}
          </div>
        </div>
      </DocsLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = await getAllDocs("en");
  console.log(`[getStaticProps] Received ${docs.length} docs`);
  
  // Fallback: if no docs found, create placeholder structure
  const index = docs.length > 0 
    ? docs.map((d) => ({ title: d.title, slug: d.slug }))
    : [
        { title: "Welcome", slug: "get-started/welcome" },
        { title: "Quickstart", slug: "get-started/quickstart" },
        { title: "Concepts", slug: "get-started/concepts" },
      ];
  
  const sidebar = docs.length > 0 
    ? docs 
    : [
        { title: "Welcome", slug: "get-started/welcome", section: "get-started" },
        { title: "Quickstart", slug: "get-started/quickstart", section: "get-started" },
        { title: "Concepts", slug: "get-started/concepts", section: "get-started" },
        { title: "Models", slug: "get-started/models", section: "get-started" },
        { title: "Pricing", slug: "get-started/pricing", section: "get-started" },
        { title: "Tab", slug: "core/tab", section: "core" },
        { title: "Agent", slug: "core/agent", section: "core" },
        { title: "Cloud", slug: "core/cloud", section: "core" },
        { title: "CLI", slug: "core/cli", section: "core" },
        { title: "Inline Edit", slug: "core/inline-edit", section: "core" },
        { title: "Rules", slug: "core/rules", section: "core" },
        { title: "Bugbot", slug: "core/bugbot", section: "core" },
        { title: "Codebase Indexing", slug: "context/codebase-indexing", section: "context" },
        { title: "Ignore files", slug: "context/ignore-files", section: "context" },
        { title: "Model Context Protocol (MCP)", slug: "context/model-context-protocol-mcp", section: "context" },
        { title: "@ Symbols", slug: "context/at-symbols", section: "context" },
        { title: "Slack", slug: "integrations/slack", section: "integrations" },
        { title: "Linear", slug: "integrations/linear", section: "integrations" },
        { title: "GitHub", slug: "integrations/github", section: "integrations" },
        { title: "Git", slug: "integrations/git", section: "integrations" },
        { title: "Deeplinks", slug: "integrations/deeplinks", section: "integrations" },
        { title: "Extensions", slug: "configuration/extensions", section: "configuration" },
        { title: "Keyboard Shortcuts", slug: "configuration/keyboard-shortcuts", section: "configuration" },
        { title: "Themes", slug: "configuration/themes", section: "configuration" },
        { title: "Shell Commands", slug: "configuration/shell-commands", section: "configuration" },
        { title: "Parallel Agents", slug: "configuration/parallel-agents", section: "configuration" },
        { title: "Languages", slug: "configuration/languages", section: "configuration" },
        { title: "Migrations", slug: "configuration/migrations", section: "configuration" },
        { title: "Billing", slug: "account/billing", section: "account" },
        { title: "Update Access", slug: "account/update-access", section: "account" },
        { title: "Teams", slug: "account/teams", section: "account" },
        { title: "Enterprise", slug: "enterprise/index", section: "enterprise" },
        { title: "Building an MCP Server", slug: "cookbook/building-an-mcp-server", section: "cookbook" },
        { title: "Web Development", slug: "cookbook/web-development", section: "cookbook" },
        { title: "Data Science", slug: "cookbook/data-science", section: "cookbook" },
        { title: "Large Codebases", slug: "cookbook/large-codebases", section: "cookbook" },
        { title: "Mermaid Diagrams", slug: "cookbook/mermaid-diagrams", section: "cookbook" },
        { title: "Common Issues", slug: "troubleshooting/common-issues", section: "troubleshooting" },
        { title: "Getting a Request ID", slug: "troubleshooting/getting-a-request-id", section: "troubleshooting" },
        { title: "Troubleshooting Guide", slug: "troubleshooting/troubleshooting-guide", section: "troubleshooting" },
        { title: "Downloads", slug: "downloads/index", section: "downloads" },
      ];
  
  return { props: { index, sidebar }, revalidate: 3600 };
};

