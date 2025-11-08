import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function KeyboardShortcutsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Keyboard Shortcuts | NBCON PRO Docs</title>
        <meta name="description" content="Keyboard shortcuts for faster navigation" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Keyboard Shortcuts</h1>

          <h2>Navigation</h2>
          <ul>
            <li><code>Cmd/Ctrl + K</code>: Command palette</li>
            <li><code>Cmd/Ctrl + P</code>: Quick file open</li>
            <li><code>Cmd/Ctrl + B</code>: Toggle sidebar</li>
          </ul>

          <h2>Editing</h2>
          <ul>
            <li><code>Cmd/Ctrl + D</code>: Select next occurrence</li>
            <li><code>Cmd/Ctrl + Shift + L</code>: Select all occurrences</li>
            <li><code>Alt + Click</code>: Multi-cursor</li>
          </ul>

          <h2>AI Features</h2>
          <ul>
            <li><code>Cmd/Ctrl + I</code>: Inline edit</li>
            <li><code>Cmd/Ctrl + L</code>: Chat with AI</li>
            <li><code>Cmd/Ctrl + Enter</code>: Accept suggestion</li>
          </ul>

          <h2>Custom Shortcuts</h2>
          <p>Configure custom shortcuts in Settings &gt; Keyboard Shortcuts.</p>
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

