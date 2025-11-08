"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function RevitPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/revit", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Revit"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Revit Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Revit integration for BIM model access and data extraction"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Autodesk Revit for BIM model access, element data extraction, and model synchronization.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Configure Autodesk Forge for Revit cloud models</li>
            <li>Set up Revit API access for desktop models</li>
            <li>Configure model translation and viewing</li>
            <li>Set up element property extraction</li>
          </ul>

          <CodeBlock language="csharp">
{`// Example: Revit API (C#)
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;

public void ExtractElements(Document doc)
{
    FilteredElementCollector collector = new FilteredElementCollector(doc);
    var walls = collector.OfClass(typeof(Wall)).Cast<Wall>();
    // Process elements...
}`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Revit integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use Forge API for cloud-based models</li>
            <li>Cache model data to reduce API calls</li>
            <li>Handle version conflicts in shared models</li>
            <li>Optimize element queries for performance</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

