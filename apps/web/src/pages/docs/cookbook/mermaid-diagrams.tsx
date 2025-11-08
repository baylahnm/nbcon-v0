import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function MermaidDiagramsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Mermaid Diagrams | NBCON PRO Docs</title>
        <meta name="description" content="Creating and using Mermaid diagrams" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Mermaid Diagrams</h1>
          <p>Create diagrams using Mermaid syntax.</p>

          <h2>Supported Diagrams</h2>
          <ul>
            <li>Flowcharts</li>
            <li>Sequence diagrams</li>
            <li>Class diagrams</li>
            <li>State diagrams</li>
          </ul>

          <h2>Example</h2>
          <CodeBlock language="mermaid">
{`graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[End]`}
          </CodeBlock>

          <h2>Usage</h2>
          <p>Use Mermaid in:</p>
          <ul>
            <li>Documentation</li>
            <li>Comments</li>
            <li>Markdown files</li>
          </ul>

          <h2>Rendering</h2>
          <p>Diagrams are automatically rendered in the editor and documentation.</p>
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

