"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function TrimbleConnectPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/trimble-connect", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Trimble Connect"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Trimble Connect Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Trimble Connect integration for construction collaboration"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>nbcon.ai integrates with Trimble Connect for construction project collaboration, model sharing, and field data synchronization.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create Trimble Connect account</li>
            <li>Obtain API credentials</li>
            <li>Configure OAuth authentication</li>
            <li>Set up project and folder access</li>
            <li>Configure sync settings</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Trimble Connect API
const trimbleUrl = 'https://connect.trimble.com/api'
const projects = await fetch(\`\${trimbleUrl}/projects\`, {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
  },
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Trimble Connect integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Handle field data synchronization carefully</li>
            <li>Implement conflict resolution for model updates</li>
            <li>Cache project metadata to reduce API calls</li>
            <li>Monitor API rate limits</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

