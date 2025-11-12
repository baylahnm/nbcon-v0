"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function ProPage() {
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("account/pro", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Pro"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Pro Plan"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Pro plan features and pricing"}</p>

          <h2>Features</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Unlimited projects</li>
            <li>Unlimited AI requests</li>
            <li>100GB storage</li>
            <li>Priority support</li>
            <li>All integrations</li>
            <li>Advanced AI models</li>
            <li>Team collaboration</li>
          </ul>

          <h2>Pricing</h2>
          <p>149 SAR/month</p>

          <h2>Upgrade</h2>
          <p>Upgrade to Enterprise for custom solutions and dedicated support.</p>
        </article>
      </DocsLayout>
    </>
  );
}

