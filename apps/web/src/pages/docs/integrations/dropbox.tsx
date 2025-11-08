"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function DropboxPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/dropbox", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Dropbox"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Dropbox Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Dropbox integration for file storage and sync"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Dropbox for cloud file storage and synchronization. Access project files and collaborate seamlessly.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create Dropbox app and obtain API credentials</li>
            <li>Configure OAuth flow for user authentication</li>
            <li>Set up file sync and webhook endpoints</li>
            <li>Configure folder permissions and access levels</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Dropbox API
import { Dropbox } from 'dropbox'

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN!,
})

const files = await dbx.filesListFolder({ path: '' })`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Dropbox integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use refresh tokens for long-lived access</li>
            <li>Implement webhook verification</li>
            <li>Handle file conflicts gracefully</li>
            <li>Monitor storage quotas</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

