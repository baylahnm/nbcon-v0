import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function TroubleshootingGuidePage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Troubleshooting Guide | nbcon.ai Docs</title>
        <meta name="description" content="Comprehensive troubleshooting guide" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Troubleshooting Guide</h1>
          <p>Step-by-step guide to resolve issues.</p>

          <h2>Before You Start</h2>
          <ol>
            <li>Check system requirements</li>
            <li>Update to latest version</li>
            <li>Clear cache and cookies</li>
          </ol>

          <h2>Diagnostic Steps</h2>
          <h3>1. Check Logs</h3>
          <ul>
            <li>Open Developer Tools</li>
            <li>Check Console for errors</li>
            <li>Review Network tab</li>
          </ul>

          <h3>2. Verify Configuration</h3>
          <ul>
            <li>Check API keys</li>
            <li>Verify settings</li>
            <li>Test connection</li>
          </ul>

          <h3>3. Test in Safe Mode</h3>
          <ul>
            <li>Disable extensions</li>
            <li>Clear cache</li>
            <li>Test basic functionality</li>
          </ul>

          <h2>Getting Help</h2>
          <ul>
            <li><Link href="/docs">Documentation</Link></li>
            <li><Link href="/community">Community Forum</Link></li>
            <li><Link href="/support">Support</Link></li>
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

