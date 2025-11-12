"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function DocPage() {
  const router = useRouter();
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  const slugParam = (router.query.slug as string[]) || [];
  const slug = slugParam.join("/");

  useEffect(() => {
    // Load docs with current locale
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug(slug, locale);
    setDoc(loadedDoc);
  }, [locale, slug]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  // If doc doesn't exist, show 404
  if (!doc) {
    return (
      <>
        <Head>
          <title>Page Not Found | nbcon.ai Docs</title>
        </Head>
        <DocsLayout index={index} sidebar={sidebar}>
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1>Page Not Found</h1>
            <p>The documentation page you're looking for doesn't exist.</p>
            <p>
              <Link href="/docs" className="text-primary hover:underline">
                Return to documentation home
              </Link>
            </p>
          </article>
        </DocsLayout>
      </>
    );
  }

  // Dynamic import of doc content based on slug
  // This will be handled by Next.js routing to individual pages
  // For now, show a placeholder that indicates the page needs to be migrated
  return (
    <>
      <Head>
        <title>{doc.title} | nbcon.ai Docs</title>
        {doc.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc.title}</h1>
          {doc.description && <p className="text-muted-foreground">{doc.description}</p>}
          <div className="mt-8 p-4 border border-border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              This documentation page is being migrated to the new TSX-based system.
              Content will be available shortly.
            </p>
            <p className="text-sm mt-2">
              <Link href="/docs" className="text-primary hover:underline">
                Return to documentation home
              </Link>
            </p>
          </div>
        </article>
      </DocsLayout>
    </>
  );
}
