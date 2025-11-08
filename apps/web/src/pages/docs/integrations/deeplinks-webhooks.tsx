"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function DeeplinksWebhooksPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/deeplinks-webhooks", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Deeplinks & Webhooks"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Deeplinks & Webhooks"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Deep linking and webhook integration for external systems"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO supports deep linking for direct navigation to specific resources and webhooks for real-time event notifications to external systems.</p>

          <h2>Deeplinks</h2>
          <h3>{t("docs.setup") || "Setup"}</h3>
          <ul className="list-disc ps-5 space-y-1">
            <li>Configure URL schemes for deep linking</li>
            <li>Set up route handlers for deep link paths</li>
            <li>Implement authentication checks for protected resources</li>
            <li>Handle deep link parameters and query strings</li>
          </ul>

          <h2>Webhooks</h2>
          <h3>{t("docs.setup") || "Setup"}</h3>
          <ul className="list-disc ps-5 space-y-1">
            <li>Configure webhook endpoints</li>
            <li>Set up webhook signing for security</li>
            <li>Define event types and payloads</li>
            <li>Implement retry logic for failed deliveries</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Webhook handler
import crypto from 'crypto'

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  )
}`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for deeplinks and webhooks."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Always verify webhook signatures</li>
            <li>Use HTTPS for all webhook endpoints</li>
            <li>Implement idempotency for webhook handlers</li>
            <li>Log webhook events for debugging</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

