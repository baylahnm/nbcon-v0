"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function SupabasePage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/supabase", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Supabase"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Supabase Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Supabase integration for authentication, database, and realtime features"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>nbcon.ai integrates with Supabase for authentication, database operations, and real-time updates. This integration provides secure user management, data persistence, and live collaboration features.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Configure Supabase project URL and anon key</li>
            <li>Set up authentication providers (Email, OAuth)</li>
            <li>Configure database tables and Row Level Security (RLS)</li>
            <li>Enable Realtime subscriptions for live updates</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Supabase client configuration
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for secure integration and optimal performance."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Always use environment variables for sensitive keys</li>
            <li>Implement Row Level Security (RLS) policies</li>
            <li>Use Realtime subscriptions efficiently to avoid performance issues</li>
            <li>Monitor database query performance and optimize as needed</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

