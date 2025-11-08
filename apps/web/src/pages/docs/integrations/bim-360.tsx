"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function BIM360Page() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/bim-360", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "BIM 360"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "BIM 360 Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "BIM 360 integration for construction project management"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Autodesk BIM 360 for construction project management, document control, and collaboration workflows.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create BIM 360 account and project</li>
            <li>Configure Autodesk Construction Cloud API</li>
            <li>Set up OAuth 2.0 authentication</li>
            <li>Configure project and folder permissions</li>
            <li>Set up webhooks for project updates</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: BIM 360 API
const bim360Url = 'https://developer.api.autodesk.com/bim360/docs/v1'
const projects = await fetch(\`\${bim360Url}/projects\`, {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
  },
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for BIM 360 integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use Construction Cloud API for unified access</li>
            <li>Handle project permissions correctly</li>
            <li>Implement proper error handling for API failures</li>
            <li>Cache project metadata for performance</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

