"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function ArcGISPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/arcgis", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "ArcGIS"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "ArcGIS Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "ArcGIS integration for geospatial data and mapping"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>nbcon.ai integrates with ArcGIS for geospatial data access, map services, and location-based analysis in engineering projects.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create ArcGIS Developer account</li>
            <li>Obtain API key or OAuth credentials</li>
            <li>Configure map services and layers</li>
            <li>Set up feature services for data access</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: ArcGIS REST API
const arcgisUrl = 'https://services.arcgis.com/...'
const response = await fetch(\`\${arcgisUrl}/query?where=1=1&outFields=*&f=json\`)
const data = await response.json()`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for ArcGIS integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use appropriate coordinate reference systems</li>
            <li>Cache map tiles for performance</li>
            <li>Handle large datasets with pagination</li>
            <li>Respect usage quotas and rate limits</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

