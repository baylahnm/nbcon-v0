import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function CodebaseIndexingPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Codebase Indexing | nbcon.ai Docs</title>
        <meta name="description" content="How nbcon.ai indexes your codebase" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Codebase Indexing</h1>
          <p>nbcon.ai creates a searchable index of your entire codebase.</p>

          <h2>How It Works</h2>
          <ol>
            <li><strong>Scan</strong>: Automatically scans your repository</li>
            <li><strong>Index</strong>: Creates searchable index</li>
            <li><strong>Update</strong>: Updates in real-time as you code</li>
          </ol>

          <h2>Indexed Content</h2>
          <ul>
            <li>Source code files</li>
            <li>Documentation</li>
            <li>Configuration files</li>
            <li>Comments and documentation</li>
          </ul>

          <h2>Search</h2>
          <p>Use the search bar to quickly find:</p>
          <ul>
            <li>Functions and classes</li>
            <li>Variables and constants</li>
            <li>Documentation</li>
            <li>Configuration values</li>
          </ul>
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

