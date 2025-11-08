"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function FreePage() {
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("account/free", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Free"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Free Plan"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Free plan features and limitations"}</p>

          <h2>Features</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Basic AI agent access</li>
            <li>Limited project storage</li>
            <li>Community support</li>
            <li>Basic integrations</li>
          </ul>

          <h2>Limitations</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>5 projects maximum</li>
            <li>10 AI requests per day</li>
            <li>1GB storage</li>
            <li>No priority support</li>
          </ul>

          <h2>Upgrade</h2>
          <p>Upgrade to Basic or Pro for more features and higher limits.</p>
        </article>
      </DocsLayout>
    </>
  );
}

