import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function ShellCommandsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Shell Commands | NBCON PRO Docs</title>
        <meta name="description" content="Configuring shell commands" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Shell Commands</h1>
          <p>Configure custom shell commands for NBCON PRO.</p>

          <h2>Built-in Commands</h2>
          <CodeBlock language="bash">
{`nbcon run test
nbcon run build
nbcon run deploy`}
          </CodeBlock>

          <h2>Custom Commands</h2>
          <p>Add custom commands in <code>.nbcon/commands.yml</code>:</p>
          <CodeBlock language="yaml">
{`commands:
  - name: test
    script: npm test
  - name: deploy
    script: npm run deploy`}
          </CodeBlock>

          <h2>Running Commands</h2>
          <p>Use the command palette (<code>Cmd/Ctrl + K</code>) to run commands.</p>

          <h2>Command Aliases</h2>
          <p>Create aliases for frequently used commands:</p>
          <CodeBlock language="bash">
{`nbcon alias deploy "npm run deploy:production"`}
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

