"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function CloudflarePage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/cloudflare", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Cloudflare"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Cloudflare Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Cloudflare integration for security, CDN, and edge computing"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>nbcon.ai leverages Cloudflare for DDoS protection, CDN acceleration, edge computing, and security features. This ensures fast, secure delivery of content globally.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Configure Cloudflare DNS records</li>
            <li>Set up SSL/TLS certificates</li>
            <li>Configure firewall rules and security settings</li>
            <li>Enable Cloudflare Workers for edge computing</li>
          </ul>

          <CodeBlock language="javascript">
{`// Example: Cloudflare Worker
export default {
  async fetch(request) {
    return new Response('Hello from Cloudflare Edge!', {
      headers: { 'content-type': 'text/plain' },
    })
  },
}`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for Cloudflare integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use Cloudflare Workers for edge-side logic</li>
            <li>Configure caching rules for optimal performance</li>
            <li>Set up rate limiting to prevent abuse</li>
            <li>Monitor analytics for traffic patterns and security threats</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

