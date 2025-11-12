"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function SharePointPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/sharepoint", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "SharePoint"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "SharePoint Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "SharePoint integration for enterprise document management"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>nbcon.ai integrates with Microsoft SharePoint for enterprise document management, collaboration, and content sharing.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Register app in Azure AD</li>
            <li>Configure SharePoint API permissions</li>
            <li>Set up OAuth 2.0 authentication</li>
            <li>Configure site and list access</li>
            <li>Set up change notifications</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: SharePoint REST API
import { Client } from '@microsoft/microsoft-graph-client'

const client = Client.init({
  authProvider: async (done) => {
    done(null, process.env.SHAREPOINT_ACCESS_TOKEN!)
  },
})

const sites = await client.api('/sites').get()`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for SharePoint integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use Microsoft Graph API for unified access</li>
            <li>Handle large file uploads with chunking</li>
            <li>Implement proper permission checks</li>
            <li>Cache site metadata for performance</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

