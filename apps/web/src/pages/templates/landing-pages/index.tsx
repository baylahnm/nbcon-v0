import React from "react";
import Head from "next/head";

export default function LandingPages() {
  return (
    <>
      <Head>
        <title>Landing Pages | nbcon.ai</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Landing Page Templates</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Ready-made client dashboards and marketing pages for engineering projects.
        </p>
      </main>
    </>
  );
}

