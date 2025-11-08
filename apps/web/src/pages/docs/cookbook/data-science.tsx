import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function DataSciencePage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Data Science | NBCON PRO Docs</title>
        <meta name="description" content="Data science workflows" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Data Science</h1>
          <p>Use NBCON PRO for data science projects.</p>

          <h2>Setup</h2>
          <CodeBlock language="bash">
{`nbcon create data-science my-project
cd my-project`}
          </CodeBlock>

          <h2>Features</h2>
          <ul>
            <li><strong>Data Analysis</strong>: AI-powered data analysis</li>
            <li><strong>Visualization</strong>: Generate charts and graphs</li>
            <li><strong>ML Models</strong>: Build and train models</li>
          </ul>

          <h2>Example Workflow</h2>
          <CodeBlock language="python">
{`import nbcon

# Load data
data = nbcon.load_data('data.csv')

# Analyze with AI
analysis = nbcon.ai.analyze(data)

# Generate visualizations
nbcon.visualize(analysis)`}
          </CodeBlock>

          <h2>Integration</h2>
          <p>Integrate with Jupyter notebooks and other data science tools.</p>
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

