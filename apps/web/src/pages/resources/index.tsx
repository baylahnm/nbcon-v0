import React from "react";
import Head from "next/head";

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>Resources | NBCON PRO</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Resources & Documentation</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Learn, build, and master NBCON PRO through guides, documentation, and tutorials.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><a href="/docs" className="text-foreground hover:underline">Documentation</a></li>
          <li><a href="/blog" className="text-foreground hover:underline">Blog & Updates</a></li>
          <li><a href="/tutorials" className="text-foreground hover:underline">Video Tutorials</a></li>
          <li><a href="/api" className="text-foreground hover:underline">API Reference</a></li>
        </ul>
      </main>
    </>
  );
}

