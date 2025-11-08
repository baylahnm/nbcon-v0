import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function BugbotPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Bugbot | NBCON PRO Docs</title>
        <meta name="description" content="Automated bug detection and fixing" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Bugbot</h1>
          <p>Automated bug detection and fixing powered by AI.</p>

          <h2>Features</h2>
          <ul>
            <li><strong>Static Analysis</strong>: Detect potential bugs before runtime</li>
            <li><strong>Runtime Monitoring</strong>: Catch errors in production</li>
            <li><strong>Auto-fix</strong>: Automatically fix common issues</li>
          </ul>

          <h2>Usage</h2>
          <CodeBlock language="typescript">
{`import { Bugbot } from '@nbcon/pro';

const bugbot = new Bugbot({
  projectId: 'your-project-id',
});

// Run analysis
const issues = await bugbot.analyze();

// Auto-fix issues
await bugbot.fix(issues);`}
          </CodeBlock>

          <h2>Configuration</h2>
          <p>Configure Bugbot through the dashboard or API.</p>
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

