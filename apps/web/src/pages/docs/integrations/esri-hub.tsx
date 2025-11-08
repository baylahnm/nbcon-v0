"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function EsriHubPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/esri-hub", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Esri Hub"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Esri Hub Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Esri Hub integration for geospatial data portals and collaboration"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Esri Hub for geospatial data portals, content sharing, and collaborative mapping workflows.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create Esri Developer account</li>
            <li>Obtain ArcGIS Online credentials</li>
            <li>Configure Hub site and content access</li>
            <li>Set up OAuth 2.0 authentication</li>
            <li>Configure sharing and collaboration settings</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Esri Hub API
const hubUrl = 'https://hub.arcgis.com/api'
const items = await fetch(\`\${hubUrl}/content/users/username/items\`, {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
  },
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Esri Hub integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use appropriate coordinate reference systems</li>
            <li>Cache portal content for performance</li>
            <li>Handle large geospatial datasets efficiently</li>
            <li>Respect content sharing permissions</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

