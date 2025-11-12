"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function BillingPage() {
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("account/billing", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;
  return (
    <>
      <Head>
        <title>Billing | nbcon.ai Docs</title>
        <meta name="description" content="Managing your subscription and billing" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Billing"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Manage your subscription and billing information"}</p>

          <h2>Subscription Tiers</h2>
          <ul>
            <li><strong>Free</strong>: Basic features</li>
            <li><strong>Pro</strong>: Full feature access</li>
            <li><strong>Enterprise</strong>: Custom solutions</li>
          </ul>

          <h2>Billing Cycle</h2>
          <ul>
            <li>Monthly billing</li>
            <li>Annual billing (save 20%)</li>
            <li>Enterprise: Custom billing</li>
          </ul>

          <h2>Payment Methods</h2>
          <ul>
            <li>Credit card</li>
            <li>PayPal</li>
            <li>Bank transfer (Enterprise)</li>
          </ul>

          <h2>Upgrading</h2>
          <ol>
            <li>Go to Settings &gt; Billing</li>
            <li>Select your plan</li>
            <li>Complete payment</li>
          </ol>

          <h2>Cancellation</h2>
          <p>Cancel anytime from the billing page. No cancellation fees.</p>
        </article>
      </DocsLayout>
    </>
  );
}

