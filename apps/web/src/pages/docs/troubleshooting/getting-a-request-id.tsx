import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function GettingRequestIdPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Getting a Request ID | nbcon.ai Docs</title>
        <meta name="description" content="How to get a request ID for support" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Request ID</h1>
          <p>Request IDs help our support team diagnose issues quickly.</p>

          <h2>Finding Request ID</h2>
          <p>Request IDs are displayed:</p>
          <ul>
            <li>In error messages</li>
            <li>In the browser console</li>
            <li>In API responses</li>
          </ul>

          <h2>Example</h2>
          <CodeBlock>
{`Error: Connection failed
Request ID: abc123xyz789`}
          </CodeBlock>

          <h2>Reporting Issues</h2>
          <p>Include the request ID when reporting issues:</p>
          <ol>
            <li>Copy the request ID</li>
            <li>Go to Support</li>
            <li>Include request ID in your report</li>
          </ol>

          <h2>Request ID Format</h2>
          <p>Request IDs follow the format: <code>[timestamp]-[random]</code></p>
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

