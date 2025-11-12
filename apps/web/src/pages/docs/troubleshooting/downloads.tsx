"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";
import Link from "next/link";

export default function DownloadsPage() {
  const { locale } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("troubleshooting/downloads", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Downloads"} | nbcon.ai Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Downloads"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Download links and resources"}</p>

          <h2>Desktop Applications</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li><Link href="#" className="text-primary hover:underline">Windows (64-bit)</Link></li>
            <li><Link href="#" className="text-primary hover:underline">macOS (Intel & Apple Silicon)</Link></li>
            <li><Link href="#" className="text-primary hover:underline">Linux (AppImage)</Link></li>
          </ul>

          <h2>Command Line Tools</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li><Link href="#" className="text-primary hover:underline">NBCON CLI</Link></li>
            <li><Link href="#" className="text-primary hover:underline">Docker Image</Link></li>
          </ul>

          <h2>SDKs & Libraries</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li><Link href="#" className="text-primary hover:underline">JavaScript/TypeScript SDK</Link></li>
            <li><Link href="#" className="text-primary hover:underline">Python SDK</Link></li>
            <li><Link href="#" className="text-primary hover:underline">REST API Documentation</Link></li>
          </ul>

          <h2>System Requirements</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Windows 10 or later</li>
            <li>macOS 11.0 or later</li>
            <li>Linux (Ubuntu 20.04+ or equivalent)</li>
            <li>4GB RAM minimum (8GB recommended)</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

