import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function AtSymbolsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>@ Symbols | NBCON PRO Docs</title>
        <meta name="description" content="Using @ symbols for references" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>@ Symbols</h1>
          <p>Use @ symbols to reference files, functions, and other code elements.</p>

          <h2>File References</h2>
          <CodeBlock>
{`@src/components/Button.tsx`}
          </CodeBlock>

          <h2>Function References</h2>
          <CodeBlock>
{`@utils/formatDate`}
          </CodeBlock>

          <h2>Code Snippets</h2>
          <CodeBlock>
{`@examples/authentication`}
          </CodeBlock>

          <h2>Usage in Prompts</h2>
          <p>When chatting with AI, use @ symbols to include specific code:</p>
          <CodeBlock>
{`@Button.tsx How can I improve this component?`}
          </CodeBlock>
          <p>The AI will automatically load the referenced file into context.</p>
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

