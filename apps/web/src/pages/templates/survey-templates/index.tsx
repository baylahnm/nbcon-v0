import React from "react";
import Head from "next/head";

export default function SurveyTemplates() {
  return (
    <>
      <Head>
        <title>Survey Templates | NBCON PRO</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Survey Templates</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Pre-configured blueprints for GNSS, LiDAR, photogrammetry, and field survey workflows.
        </p>
      </main>
    </>
  );
}

