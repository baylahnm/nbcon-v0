import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function ConceptsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Concepts | nbcon.ai Docs</title>
        <meta name="description" content="Core concepts and architecture of nbcon.ai" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Core Concepts</h1>
          <p>Understanding the fundamental concepts behind nbcon.ai.</p>

          <h2>AI Agents</h2>
          <p>nbcon.ai uses specialized AI agents for different engineering domains:</p>
          <ul>
            <li><strong>Civil Engineering Agent</strong>: Handles structural analysis and design</li>
            <li><strong>Electrical Agent</strong>: Manages power systems and circuits</li>
            <li><strong>Mechanical Agent</strong>: Deals with mechanical systems</li>
            <li><strong>Survey Agent</strong>: Processes geospatial data</li>
            <li><strong>GIS Agent</strong>: Manages geographic information systems</li>
          </ul>

          <h2>Projects</h2>
          <p>Projects are containers for your engineering work, including models, data, and documentation.</p>

          <h2>Collaboration</h2>
          <p>Real-time collaboration allows multiple engineers to work together seamlessly.</p>
        </article>
      </DocsLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = getAllDocs();
  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return {
    props: { index, sidebar },
    revalidate: 3600,
  };
};

