import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function ExtensionsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Extensions | NBCON PRO Docs</title>
        <meta name="description" content="Extending NBCON PRO with custom extensions" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Extensions</h1>
          <p>Extend NBCON PRO functionality with custom extensions.</p>

          <h2>Creating Extensions</h2>
          <CodeBlock language="typescript">
{`import { Extension } from '@nbcon/pro';

export class MyExtension extends Extension {
  async activate() {
    // Your extension logic
  }
}`}
          </CodeBlock>

          <h2>Extension Types</h2>
          <ul>
            <li><strong>Language Support</strong>: Add support for new languages</li>
            <li><strong>AI Agents</strong>: Custom AI agents</li>
            <li><strong>UI Components</strong>: Custom UI elements</li>
          </ul>

          <h2>Installing Extensions</h2>
          <CodeBlock language="bash">
{`nbcon extension install my-extension`}
          </CodeBlock>

          <h2>Marketplace</h2>
          <p>Browse and install extensions from the marketplace.</p>
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

