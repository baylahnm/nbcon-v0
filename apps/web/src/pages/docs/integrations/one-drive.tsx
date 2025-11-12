"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function OneDrivePage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/one-drive", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Microsoft OneDrive"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Microsoft OneDrive Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "OneDrive integration for Microsoft 365 file storage"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>nbcon.ai integrates with Microsoft OneDrive for enterprise file storage and collaboration through Microsoft 365.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Register app in Azure AD</li>
            <li>Configure Microsoft Graph API permissions</li>
            <li>Set up OAuth 2.0 authentication</li>
            <li>Configure SharePoint integration if needed</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Microsoft Graph API
import { Client } from '@microsoft/microsoft-graph-client'

const client = Client.init({
  authProvider: async (done) => {
    done(null, process.env.MICROSOFT_ACCESS_TOKEN!)
  },
})

const drive = await client.api('/me/drive/root/children').get()`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for OneDrive integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use Microsoft Graph API for unified access</li>
            <li>Implement proper token refresh logic</li>
            <li>Handle enterprise security policies</li>
            <li>Respect file sharing permissions</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

