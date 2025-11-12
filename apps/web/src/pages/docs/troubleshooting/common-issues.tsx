import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function CommonIssuesPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Common Issues | nbcon.ai Docs</title>
        <meta name="description" content="Troubleshooting common problems" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Common Issues</h1>
          <p>Solutions to frequently encountered problems.</p>

          <h2>Connection Issues</h2>
          <p><strong>Problem</strong>: Cannot connect to nbcon.ai</p>
          <p><strong>Solution</strong>:</p>
          <ol>
            <li>Check your internet connection</li>
            <li>Verify API key is correct</li>
            <li>Check firewall settings</li>
          </ol>

          <h2>Performance Issues</h2>
          <p><strong>Problem</strong>: Slow performance</p>
          <p><strong>Solution</strong>:</p>
          <ol>
            <li>Clear cache</li>
            <li>Disable unnecessary extensions</li>
            <li>Check system resources</li>
          </ol>

          <h2>Sync Issues</h2>
          <p><strong>Problem</strong>: Projects not syncing</p>
          <p><strong>Solution</strong>:</p>
          <ol>
            <li>Check sync status</li>
            <li>Manually trigger sync</li>
            <li>Contact support if issue persists</li>
          </ol>

          <h2>More Help</h2>
          <p>If you're still experiencing issues, <Link href="/support">contact support</Link>.</p>
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

