"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs, getDocBySlug } from "@/lib/docs-data";
import { useI18n } from "@/hooks/useI18n";

export default function MapsPage() {
  const { locale, t } = useI18n();
  const [docs, setDocs] = useState<ReturnType<typeof getAllDocs>>([]);
  const [doc, setDoc] = useState<ReturnType<typeof getDocBySlug> | null>(null);

  useEffect(() => {
    const loadedDocs = getAllDocs(locale);
    setDocs(loadedDocs);
    const loadedDoc = getDocBySlug("integrations/maps", locale);
    setDoc(loadedDoc);
  }, [locale]);

  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return (
    <>
      <Head>
        <title>{doc?.title || "Maps"} | NBCON PRO Docs</title>
        {doc?.description ? <meta name="description" content={doc.description} /> : null}
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>{doc?.title || "Maps Integration"}</h1>
          <p className="text-muted-foreground">{doc?.description || "Mapbox and Google Maps integration for location services"}</p>

          <h2>{t("docs.integrationOverview") || "Overview"}</h2>
          <p>NBCON PRO integrates with Mapbox and Google Maps for location-based features, geospatial data visualization, and mapping capabilities in engineering projects.</p>

          <h2>{t("docs.setup") || "Setup"}</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>Obtain API keys from Mapbox or Google Maps</li>
            <li>Configure map styles and layers</li>
            <li>Set up geocoding and reverse geocoding</li>
            <li>Enable location services and permissions</li>
          </ul>

          <CodeBlock language="typescript">
{`// Example: Mapbox integration
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [46.6753, 24.7136], // Riyadh coordinates
  zoom: 13
})`}
          </CodeBlock>

          <h2>{t("docs.notes") || "Notes"}</h2>
          <p>{t("docs.bestPractices") || "Best practices for maps integration."}</p>
          <ul className="list-disc ps-5 space-y-1">
            <li>Use API key restrictions to limit usage</li>
            <li>Cache map tiles to reduce API calls</li>
            <li>Implement proper error handling for geocoding failures</li>
            <li>Consider privacy regulations when handling location data</li>
          </ul>
        </article>
      </DocsLayout>
    </>
  );
}

