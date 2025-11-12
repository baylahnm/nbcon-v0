import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function BuildingMCPServerPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Building an MCP Server | nbcon.ai Docs</title>
        <meta name="description" content="Guide to building Model Context Protocol servers" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Building an MCP Server</h1>
          <p>Create custom MCP servers to extend nbcon.ai's capabilities.</p>

          <h2>Getting Started</h2>
          <CodeBlock language="typescript">
{`import { MCPServer } from '@nbcon/mcp';

const server = new MCPServer({
  name: 'my-server',
  version: '1.0.0',
});`}
          </CodeBlock>

          <h2>Server Structure</h2>
          <CodeBlock language="typescript">
{`server.registerTool({
  name: 'analyze',
  description: 'Analyze code',
  handler: async (input) => {
    // Your logic here
  },
});`}
          </CodeBlock>

          <h2>Deployment</h2>
          <p>Deploy your MCP server:</p>
          <CodeBlock language="bash">
{`nbcon mcp deploy my-server`}
          </CodeBlock>

          <h2>Best Practices</h2>
          <ul>
            <li>Keep handlers focused and fast</li>
            <li>Use proper error handling</li>
            <li>Document your tools</li>
            <li>Test thoroughly</li>
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

