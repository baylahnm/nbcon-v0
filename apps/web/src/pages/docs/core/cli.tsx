import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function CLIPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>CLI | nbcon.ai Docs</title>
        <meta name="description" content="Command-line interface for nbcon.ai" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>CLI Tool</h1>
          <p>The nbcon.ai CLI provides powerful command-line tools.</p>

          <h2>Installation</h2>
          <CodeBlock language="bash">
{`npm install -g @nbcon/cli`}
          </CodeBlock>

          <h2>Basic Commands</h2>
          <CodeBlock language="bash">
{`# Authenticate
nbcon auth login

# Create a project
nbcon project create my-project

# Deploy to cloud
nbcon deploy`}
          </CodeBlock>

          <h2>Configuration</h2>
          <CodeBlock language="bash">
{`# Set API key
nbcon config set apiKey YOUR_KEY

# View configuration
nbcon config get`}
          </CodeBlock>
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

