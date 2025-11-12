import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function LargeCodebasesPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Large Codebases | nbcon.ai Docs</title>
        <meta name="description" content="Working with large codebases" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Large Codebases</h1>
          <p>Tips for working with large codebases in nbcon.ai.</p>

          <h2>Optimization</h2>
          <ul>
            <li>Use codebase indexing</li>
            <li>Enable lazy loading</li>
            <li>Configure ignore files</li>
          </ul>

          <h2>Performance</h2>
          <CodeBlock language="typescript">
{`const config = {
  indexing: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    excludePatterns: ['node_modules', 'dist'],
  },
};`}
          </CodeBlock>

          <h2>Best Practices</h2>
          <ul>
            <li>Break large projects into modules</li>
            <li>Use incremental builds</li>
            <li>Leverage caching</li>
          </ul>

          <h2>Memory Management</h2>
          <p>Monitor memory usage and adjust settings as needed.</p>
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

