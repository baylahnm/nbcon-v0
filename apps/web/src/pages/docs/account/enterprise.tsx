"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function EnterprisePage() {
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("account/enterprise", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Enterprise"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Enterprise Plan"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Enterprise plan features and pricing"}</p>

          <h2>Features</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Everything in Pro</li>
            <li>Unlimited storage</li>
            <li>Dedicated support</li>
            <li>Custom integrations</li>
            <li>SLA guarantees</li>
            <li>On-premise deployment options</li>
            <li>Custom AI model training</li>
            <li>Advanced security and compliance</li>
          </ul>

          <h2>Pricing</h2>
          <p>Custom pricing based on your needs. Contact sales for a quote.</p>

          <h2>Contact</h2>
          <p>Reach out to our enterprise team at enterprise@nbcon.app</p>
        </article>
      </DocsLayout>
    </>
  );
}

