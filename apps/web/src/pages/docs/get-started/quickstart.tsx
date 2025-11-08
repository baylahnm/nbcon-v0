import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";
import { CheckboxTask } from "@/components/ui/checkbox-task";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function QuickstartPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Quickstart | NBCON PRO Docs</title>
        <meta name="description" content="Get up and running with NBCON PRO in minutes" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Quickstart Guide</h1>
          <p>This guide will help you get started with NBCON PRO quickly.</p>

          <h2>Installation</h2>
          <CodeBlock language="bash">
{`npm install @nbcon/pro`}
          </CodeBlock>

          <h2>Basic Usage</h2>
          <CodeBlock language="typescript">
{`import { NbconClient } from '@nbcon/pro';

const client = new NbconClient({
  apiKey: process.env.NBCON_API_KEY,
});`}
          </CodeBlock>

          <h2>Next Steps</h2>
          <ul className="list-none space-y-2">
            <li>
              <CheckboxTask id="task-profile-setup">Complete your profile setup</CheckboxTask>
            </li>
            <li>
              <CheckboxTask id="task-first-project">Create your first project</CheckboxTask>
            </li>
            <li>
              <CheckboxTask id="task-ai-features">Explore the AI co-pilot features</CheckboxTask>
            </li>
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

