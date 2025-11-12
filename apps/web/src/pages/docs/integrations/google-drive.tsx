"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function GoogleDrivePage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/google-drive", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Google Drive"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Google Drive Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Google Drive integration for file storage and collaboration"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>nbcon.ai integrates with Google Drive for file storage, sharing, and collaboration. Access and sync project files directly from Google Drive.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create Google Cloud project and enable Drive API</li>
            <li>Configure OAuth 2.0 credentials</li>
            <li>Set up file permissions and sharing settings</li>
            <li>Configure sync frequency and file filters</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Google Drive API
import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
})

const drive = google.drive({ version: 'v3', auth })
const files = await drive.files.list()`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Google Drive integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use service accounts for server-to-server access</li>
            <li>Implement proper file permission management</li>
            <li>Cache file metadata to reduce API calls</li>
            <li>Handle quota limits and rate limiting</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

