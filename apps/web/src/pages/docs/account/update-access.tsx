"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function UpdateAccessPage() {
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("account/update-access", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Update Access"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Update Access"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Manage access permissions for your projects and resources"}</p>

          <h2>Updating Project Access</h2>
          <ol>
            <li>Go to Settings &gt; Access</li>
            <li>Select the project or resource</li>
            <li>Update permissions for users or teams</li>
            <li>Save changes</li>
          </ol>

          <h2>Permission Levels</h2>
          <ul>
            <li><strong>Owner</strong>: Full control</li>
            <li><strong>Editor</strong>: Can edit and manage</li>
            <li><strong>Viewer</strong>: Read-only access</li>
          </ul>

          <h2>Team Access</h2>
          <p>You can grant access to entire teams, which automatically applies to all team members.</p>
        </article>
      </DocsLayout>
    </>
  );
}

