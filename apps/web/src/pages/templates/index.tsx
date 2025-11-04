import React from "react";
import Head from "next/head";

export default function TemplatesPage() {
  return (
    <>
      <Head>
        <title>Templates | NBCON PRO</title>
      </Head>
      <main className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Engineering Templates</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explore ready-to-use project blueprints for Surveying, GIS, and Civil Engineering workflows.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li className="rounded-lg border p-4 hover:bg-accent transition">
            <a href="/templates/survey-templates" className="font-semibold text-lg">Survey Templates</a>
            <p className="text-sm text-muted-foreground">Start a project with GNSS, LiDAR, and mapping-ready forms.</p>
          </li>
          <li className="rounded-lg border p-4 hover:bg-accent transition">
            <a href="/templates/gis-layouts" className="font-semibold text-lg">GIS Layouts</a>
            <p className="text-sm text-muted-foreground">Map layers and visualization dashboards for spatial data.</p>
          </li>
          <li className="rounded-lg border p-4 hover:bg-accent transition">
            <a href="/templates/site-control" className="font-semibold text-lg">Site Control</a>
            <p className="text-sm text-muted-foreground">QC, PDPL checks, and automated field reporting templates.</p>
          </li>
        </ul>
      </main>
    </>
  );
}

