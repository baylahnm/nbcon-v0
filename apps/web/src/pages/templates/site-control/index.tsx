import React from "react";
import Head from "next/head";

export default function SiteControl() {
  return (
    <>
      <Head>
        <title>Site Control | NBCON PRO</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Site Control Templates</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Manage site calibration, QA/QC reports, and automated compliance workflows.
        </p>
      </main>
    </>
  );
}

