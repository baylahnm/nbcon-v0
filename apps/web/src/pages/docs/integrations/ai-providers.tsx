"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function AIProvidersPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/ai-providers", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "AI Providers"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "AI Providers Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Gemini and OpenAI integration for AI-powered features"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Google Gemini and OpenAI to provide AI-powered code analysis, documentation generation, and intelligent assistance features.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Obtain API keys from Gemini and/or OpenAI</li>
            <li>Configure model selection and parameters</li>
            <li>Set up rate limiting and usage quotas</li>
            <li>Configure fallback strategies for API failures</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: OpenAI integration
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Analyze this code...' }],
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for AI provider integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Implement retry logic with exponential backoff</li>
            <li>Cache responses when appropriate to reduce costs</li>
            <li>Monitor token usage and costs</li>
            <li>Handle rate limits gracefully</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

