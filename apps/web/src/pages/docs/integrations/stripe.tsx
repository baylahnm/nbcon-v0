"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function StripePage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/stripe", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Stripe"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Stripe & Local Payment Gateways"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Payment processing integration with Stripe and local payment gateways"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Stripe for subscription management and payment processing. Support for local payment gateways in Saudi Arabia (Mada, STC Pay) is also available.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Configure Stripe API keys (test and production)</li>
            <li>Set up webhook endpoints for payment events</li>
            <li>Configure subscription plans and pricing tiers</li>
            <li>Enable local payment gateways if needed</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Stripe checkout session
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price: 'price_xxx',
    quantity: 1,
  }],
  mode: 'subscription',
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for secure payment processing."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Never expose secret keys in client-side code</li>
            <li>Verify webhook signatures to ensure authenticity</li>
            <li>Handle payment failures gracefully with retry logic</li>
            <li>Comply with PCI DSS requirements for payment data</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

