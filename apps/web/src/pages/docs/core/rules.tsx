import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function RulesPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Rules | NBCON PRO Docs</title>
        <meta name="description" content="Configuring rules and guidelines" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Rules Configuration</h1>
          <p>Define rules to guide AI behavior in your projects.</p>

          <h2>Rule Types</h2>
          <ul>
            <li><strong>Code Style</strong>: Enforce coding standards</li>
            <li><strong>Naming Conventions</strong>: Consistent naming</li>
            <li><strong>Architecture</strong>: Structural guidelines</li>
          </ul>

          <h2>Creating Rules</h2>
          <CodeBlock language="yaml">
{`# .nbcon/rules.yml
rules:
  - name: Use TypeScript
    pattern: "*.ts"
    enforce: true
  - name: No console.log
    pattern: "console.log"
    error: true`}
          </CodeBlock>

          <h2>Rule Validation</h2>
          <p>Rules are automatically validated during code generation and edits.</p>
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

