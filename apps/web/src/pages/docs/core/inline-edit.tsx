import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function InlineEditPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Inline Edit | nbcon.ai Docs</title>
        <meta name="description" content="Inline editing capabilities" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Inline Editing</h1>
          <p>Edit code directly in your files with AI assistance.</p>

          <h2>Features</h2>
          <ul>
            <li><strong>Smart Suggestions</strong>: Get contextual code suggestions</li>
            <li><strong>Auto-completion</strong>: Intelligent code completion</li>
            <li><strong>Error Detection</strong>: Real-time error checking</li>
          </ul>

          <h2>Usage</h2>
          <ol>
            <li>Place cursor where you want to edit</li>
            <li>Type your changes</li>
            <li>Accept suggestions with <code>Tab</code></li>
          </ol>

          <h2>Keyboard Shortcuts</h2>
          <ul>
            <li><code>Cmd/Ctrl + .</code>: Trigger inline edit</li>
            <li><code>Tab</code>: Accept suggestion</li>
            <li><code>Esc</code>: Cancel edit</li>
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

