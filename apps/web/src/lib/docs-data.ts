/**
 * Documentation structure - replaces MDX file system reading
 * All docs are now defined as TSX pages in /pages/docs/
 * Titles and descriptions are translated via i18n in components
 */

import type { Locale } from "./i18n";
import { getTranslation } from "./i18n";

export interface DocMeta {
  title: string;
  description?: string;
  slug: string; // e.g., "get-started/welcome"
  section: string; // e.g., "get-started"
}

// Base doc structure (slugs only - translations applied at runtime)
const DOC_SLUGS = [
  // Get Started
  { slug: "get-started/welcome", section: "get-started" },
  { slug: "get-started/quickstart", section: "get-started" },
  { slug: "get-started/concepts", section: "get-started" },
  { slug: "get-started/models", section: "get-started" },
  { slug: "get-started/pricing", section: "get-started" },
  
  // Core (reordered)
  { slug: "core/tab", section: "core" },
  { slug: "core/agent", section: "core" },
  { slug: "core/cloud", section: "core" },
  { slug: "core/cli", section: "core" },
  { slug: "core/inline-edit", section: "core" },
  { slug: "core/rules", section: "core" },
  { slug: "core/bugbot", section: "core" },
  
  // Configuration (reordered)
  { slug: "configuration/extensions", section: "configuration" },
  { slug: "configuration/keyboard-shortcuts", section: "configuration" },
  { slug: "configuration/themes", section: "configuration" },
  { slug: "configuration/shell-commands", section: "configuration" },
  { slug: "configuration/parallel-agents", section: "configuration" },
  { slug: "configuration/languages", section: "configuration" },
  { slug: "configuration/migrations", section: "configuration" },
  
  // Context (reordered)
  { slug: "context/codebase-indexing", section: "context" },
  { slug: "context/ignore-files", section: "context" },
  { slug: "context/model-context-protocol-mcp", section: "context" },
  { slug: "context/at-symbols", section: "context" },
  
  // Integrations (System + Ecosystem)
  // System Integrations
  { slug: "integrations/supabase", section: "integrations" },
  { slug: "integrations/stripe", section: "integrations" },
  { slug: "integrations/cloudflare", section: "integrations" },
  { slug: "integrations/maps", section: "integrations" },
  { slug: "integrations/ai-providers", section: "integrations" },
  // DevOps & Team Integrations
  { slug: "integrations/github", section: "integrations" },
  { slug: "integrations/slack-linear", section: "integrations" },
  { slug: "integrations/deeplinks-webhooks", section: "integrations" },
  // Cloud Storage
  { slug: "integrations/google-drive", section: "integrations" },
  { slug: "integrations/dropbox", section: "integrations" },
  { slug: "integrations/one-drive", section: "integrations" },
  // BIM & Engineering Tools
  { slug: "integrations/autodesk", section: "integrations" },
  { slug: "integrations/arcgis", section: "integrations" },
  { slug: "integrations/revit", section: "integrations" },
  { slug: "integrations/bim-360", section: "integrations" },
  { slug: "integrations/sharepoint", section: "integrations" },
  { slug: "integrations/trimble-connect", section: "integrations" },
  { slug: "integrations/bluebeam-studio", section: "integrations" },
  { slug: "integrations/esri-hub", section: "integrations" },
  
  // Account
  { slug: "account/billing", section: "account" },
  { slug: "account/update-access", section: "account" },
  { slug: "account/teams", section: "account" },
  { slug: "account/free", section: "account" },
  { slug: "account/basic", section: "account" },
  { slug: "account/pro", section: "account" },
  { slug: "account/enterprise", section: "account" },
  
  // Cookbook
  { slug: "cookbook/building-an-mcp-server", section: "cookbook" },
  { slug: "cookbook/data-science", section: "cookbook" },
  { slug: "cookbook/large-codebases", section: "cookbook" },
  { slug: "cookbook/mermaid-diagrams", section: "cookbook" },
  { slug: "cookbook/web-development", section: "cookbook" },
  
  // Troubleshooting
  { slug: "troubleshooting/common-issues", section: "troubleshooting" },
  { slug: "troubleshooting/getting-a-request-id", section: "troubleshooting" },
  { slug: "troubleshooting/troubleshooting-guide", section: "troubleshooting" },
  { slug: "troubleshooting/downloads", section: "troubleshooting" },
];

function getDocTitle(slug: string, locale: Locale = "en"): string {
  const translations = getTranslation(locale);
  const pages = translations.docs?.pages as Record<string, { title: string; description?: string }> | undefined;
  const pageData = pages?.[slug];
  return pageData?.title || slug;
}

function getDocDescription(slug: string, locale: Locale = "en"): string | undefined {
  const translations = getTranslation(locale);
  const pages = translations.docs?.pages as Record<string, { title: string; description?: string }> | undefined;
  const pageData = pages?.[slug];
  return pageData?.description;
}

export function getAllDocs(locale: Locale = "en"): DocMeta[] {
  return DOC_SLUGS.map((doc) => ({
    slug: doc.slug,
    section: doc.section,
    title: getDocTitle(doc.slug, locale),
    description: getDocDescription(doc.slug, locale),
  }));
}

export function getDocBySlug(slug: string, locale: Locale = "en"): DocMeta | null {
  const doc = DOC_SLUGS.find((d) => d.slug === slug);
  if (!doc) return null;
  
  return {
    slug: doc.slug,
    section: doc.section,
    title: getDocTitle(doc.slug, locale),
    description: getDocDescription(doc.slug, locale),
  };
}

// Get all slugs (for static paths generation - no translations needed)
export function getAllDocSlugs(): { slug: string; section: string }[] {
  return DOC_SLUGS;
}

