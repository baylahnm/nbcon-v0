import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function AgentPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Agent | NBCON PRO Docs</title>
        <meta name="description" content="Using AI agents in NBCON PRO" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>AI Agents</h1>
          <p>NBCON PRO's AI agents help you automate complex engineering tasks.</p>

          <h2>Available Agents</h2>
          <ul>
            <li><strong>Civil Agent</strong>: Structural analysis and design</li>
            <li><strong>Electrical Agent</strong>: Circuit design and analysis</li>
            <li><strong>Mechanical Agent</strong>: System design and optimization</li>
            <li><strong>Survey Agent</strong>: Geospatial data processing</li>
            <li><strong>GIS Agent</strong>: Map creation and analysis</li>
          </ul>

          <h2>Using Agents</h2>
          <CodeBlock language="typescript">
{`const agent = await client.agent.get('civil');
const result = await agent.analyze({
  structure: structureData,
  load: loadData,
});`}
          </CodeBlock>

          <h2>Agent Configuration</h2>
          <p>Configure agents through the settings panel or API.</p>
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

