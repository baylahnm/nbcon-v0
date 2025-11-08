"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function AutodeskPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/autodesk", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Autodesk"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Autodesk Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Autodesk integration for CAD and BIM workflows"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Autodesk platforms (AutoCAD, Revit, BIM 360) for CAD file access, model viewing, and BIM data extraction.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create Autodesk Forge application</li>
            <li>Obtain client ID and client secret</li>
            <li>Configure OAuth 2.0 for authentication</li>
            <li>Set up Model Derivative API for file conversion</li>
            <li>Configure Data Management API for file access</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Autodesk Forge API
import { ForgeClient } from '@autodesk/forge-api'

const client = new ForgeClient({
  clientId: process.env.AUTODESK_CLIENT_ID!,
  clientSecret: process.env.AUTODESK_CLIENT_SECRET!,
})

const token = await client.authenticate(['data:read'])`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Autodesk integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use Forge API for cloud-based file processing</li>
            <li>Cache converted models to reduce processing time</li>
            <li>Handle large file uploads with chunking</li>
            <li>Monitor API rate limits and quotas</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

