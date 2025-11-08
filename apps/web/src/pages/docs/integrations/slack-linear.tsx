"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function SlackLinearPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/slack-linear", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Slack & Linear"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Slack & Linear Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Team collaboration integrations with Slack and Linear"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Slack for team notifications and Linear for project management, enabling seamless collaboration workflows.</p>

          <h2>Slack Integration</h2>
          <h3>{t("docs.setup") || "Setup"}</h3>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create a Slack app and install it to your workspace</li>
            <li>Configure bot token and signing secret</li>
            <li>Set up event subscriptions for notifications</li>
            <li>Configure channel permissions</li>
          </ul>

          <h2>Linear Integration</h2>
          <h3>{t("docs.setup") || "Setup"}</h3>
          <ul className="list-disc ps-5 space-y-1">
            <li>Create Linear API key</li>
            <li>Configure team and project mappings</li>
            <li>Set up webhooks for issue updates</li>
            <li>Map NBCON PRO projects to Linear teams</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Slack notification
import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_BOT_TOKEN!)

await slack.chat.postMessage({
  channel: '#nbcon-updates',
  text: 'Project update: New changes detected',
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for team integrations."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use Slack app tokens instead of user tokens</li>
            <li>Implement proper error handling for API failures</li>
            <li>Rate limit notifications to avoid spam</li>
            <li>Respect user privacy and notification preferences</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

