import React from "react";
import Head from "next/head";

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ | NBCON PRO</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Get quick answers to the most common questions about NBCON PRO.
        </p>
        <ul className="space-y-4">
          <li>
            <h3 className="font-semibold">How do I create my first Survey project?</h3>
            <p className="text-sm text-muted-foreground">Go to Templates → Survey Templates to start from a blueprint.</p>
          </li>
          <li>
            <h3 className="font-semibold">Can I sync my GIS data from the field app?</h3>
            <p className="text-sm text-muted-foreground">Yes, via Supabase Realtime integration in your account settings.</p>
          </li>
        </ul>
      </main>
    </>
  );
}

