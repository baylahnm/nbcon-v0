import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function ModelsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Models | NBCON PRO Docs</title>
        <meta name="description" content="Available AI models and their capabilities" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>AI Models</h1>
          <p>NBCON PRO supports multiple AI models for different use cases.</p>

          <h2>Default Models</h2>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-border border border-border rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Model</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Context Window</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Max Tokens</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 text-sm text-foreground">GPT-4</td>
                  <td className="px-4 py-3 text-sm text-foreground">8K</td>
                  <td className="px-4 py-3 text-sm text-foreground">8K</td>
                  <td className="px-4 py-3 text-sm text-foreground">General purpose</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 text-sm text-foreground">Claude 3 Opus</td>
                  <td className="px-4 py-3 text-sm text-foreground">200K</td>
                  <td className="px-4 py-3 text-sm text-foreground">200K</td>
                  <td className="px-4 py-3 text-sm text-foreground">Large codebases</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 text-sm text-foreground">GPT-4 Turbo</td>
                  <td className="px-4 py-3 text-sm text-foreground">128K</td>
                  <td className="px-4 py-3 text-sm text-foreground">128K</td>
                  <td className="px-4 py-3 text-sm text-foreground">Fast responses</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Selecting a Model</h2>
          <p>Choose the appropriate model based on your needs:</p>
          <ul>
            <li><strong>Speed</strong>: GPT-4 Turbo</li>
            <li><strong>Context</strong>: Claude 3 Opus</li>
            <li><strong>Accuracy</strong>: GPT-4</li>
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

