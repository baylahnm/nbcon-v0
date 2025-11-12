import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function TabPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Tab | nbcon.ai Docs</title>
        <meta name="description" content="Working with tabs in nbcon.ai" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Tab Management</h1>
          <p>Tabs help you organize your work across multiple files and projects.</p>

          <h2>Opening Tabs</h2>
          <ul>
            <li>Click on any file in the sidebar</li>
            <li>Use <code>Cmd/Ctrl + P</code> to open files quickly</li>
            <li>Drag and drop files to rearrange tabs</li>
          </ul>

          <h2>Tab Shortcuts</h2>
          <ul>
            <li><code>Cmd/Ctrl + W</code>: Close current tab</li>
            <li><code>Cmd/Ctrl + Shift + T</code>: Reopen closed tab</li>
            <li><code>Cmd/Ctrl + K</code>: Go to file</li>
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

