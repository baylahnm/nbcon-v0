import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function MCPPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Model Context Protocol (MCP) | nbcon.ai Docs</title>
        <meta name="description" content="Using MCP for enhanced AI context" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Model Context Protocol</h1>
          <p>MCP enables advanced context management for AI agents.</p>

          <h2>Overview</h2>
          <p>MCP allows you to provide structured context to AI models, improving accuracy and relevance.</p>

          <h2>Configuration</h2>
          <CodeBlock language="typescript">
{`const mcpConfig = {
  contextWindow: 200000,
  maxTokens: 8000,
  providers: ['openai', 'anthropic'],
};`}
          </CodeBlock>

          <h2>Usage</h2>
          <CodeBlock language="typescript">
{`const agent = await client.agent.create({
  model: 'claude-3-opus',
  mcp: mcpConfig,
});`}
          </CodeBlock>

          <h2>Best Practices</h2>
          <ul>
            <li>Keep context focused and relevant</li>
            <li>Use structured data when possible</li>
            <li>Limit context size for performance</li>
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

