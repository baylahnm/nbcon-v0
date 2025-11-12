"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function TeamsPage() {
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("account/teams", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Teams"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Teams"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Collaborate with your team in nbcon.ai."}</p>

          <h2>Creating Teams</h2>
          <ol>
            <li>Go to Settings &gt; Teams</li>
            <li>Click "Create Team"</li>
            <li>Add team members</li>
          </ol>

          <h2>Team Features</h2>
          <ul>
            <li>Shared projects</li>
            <li>Team chat</li>
            <li>Collaborative editing</li>
            <li>Team analytics</li>
          </ul>

          <h2>Team Roles</h2>
          <ul>
            <li><strong>Team Owner</strong>: Full control</li>
            <li><strong>Team Admin</strong>: Manage members</li>
            <li><strong>Team Member</strong>: Standard access</li>
          </ul>

          <h2>Billing</h2>
          <p>Team billing is consolidated for easier management.</p>
        </article>
      </DocsLayout>
    </>
  );
}

