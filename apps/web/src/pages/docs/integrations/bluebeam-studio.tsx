"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function BluebeamStudioPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/bluebeam-studio", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Bluebeam Studio"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Bluebeam Studio Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Bluebeam Studio integration for PDF collaboration and markup"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Bluebeam Studio for PDF collaboration, markup management, and document review workflows.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create Bluebeam Studio account</li>
            <li>Obtain API credentials</li>
            <li>Configure project and session access</li>
            <li>Set up markup synchronization</li>
            <li>Configure document permissions</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Bluebeam Studio API
const bluebeamUrl = 'https://studio.bluebeam.com/api'
const sessions = await fetch(\`\${bluebeamUrl}/sessions\`, {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
  },
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Bluebeam Studio integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Handle markup conflicts in collaborative sessions</li>
            <li>Cache session data for performance</li>
            <li>Implement proper error handling</li>
            <li>Respect document access permissions</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

