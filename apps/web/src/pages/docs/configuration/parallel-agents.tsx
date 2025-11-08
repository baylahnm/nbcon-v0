import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function ParallelAgentsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Parallel Agents | NBCON PRO Docs</title>
        <meta name="description" content="Running multiple AI agents in parallel" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Parallel Agents</h1>
          <p>Run multiple AI agents simultaneously for faster processing.</p>

          <h2>Configuration</h2>
          <CodeBlock language="typescript">
{`const config = {
  parallel: true,
  maxAgents: 4,
  agents: ['civil', 'electrical', 'mechanical'],
};`}
          </CodeBlock>

          <h2>Usage</h2>
          <CodeBlock language="typescript">
{`const results = await client.agents.runParallel([
  { agent: 'civil', task: 'analyze structure' },
  { agent: 'electrical', task: 'design circuit' },
]);`}
          </CodeBlock>

          <h2>Best Practices</h2>
          <ul>
            <li>Use parallel agents for independent tasks</li>
            <li>Limit concurrent agents for resource management</li>
            <li>Monitor performance and adjust as needed</li>
          </ul>

          <h2>Resource Limits</h2>
          <ul>
            <li>Free tier: 2 parallel agents</li>
            <li>Pro tier: Unlimited parallel agents</li>
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

