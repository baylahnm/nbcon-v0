"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function GitHubPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/github", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "GitHub"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "GitHub Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "GitHub integration for DevOps workflows"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with GitHub for repository management, pull request analysis, and DevOps workflows.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Install the NBCON PRO GitHub App</li>
            <li>Select repositories to connect</li>
            <li>Configure sync settings</li>
            <li>Set up GitHub Actions workflows</li>
          </ul>

          <h2>Features</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li><strong>Pull Request Analysis</strong>: AI analyzes PRs automatically</li>
            <li><strong>Code Review</strong>: AI-powered code reviews</li>
            <li><strong>Issue Linking</strong>: Link GitHub issues to NBCON PRO projects</li>
          </ul>

          <CodeBlock language="yaml">
{`name: NBCON Analysis
on: [pull_request]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: nbcon/pro-action@v1`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for GitHub integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use GitHub Apps instead of personal access tokens</li>
            <li>Configure webhooks for real-time updates</li>
            <li>Set up proper repository permissions</li>
            <li>Monitor API rate limits</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

