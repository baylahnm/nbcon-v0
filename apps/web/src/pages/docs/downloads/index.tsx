import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function DownloadsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Downloads | nbcon.ai Docs</title>
        <meta name="description" content="Download nbcon.ai applications" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Downloads</h1>
          <p>Download nbcon.ai for your platform.</p>

          <h2>Desktop Applications</h2>
          <ul>
            <li><strong>macOS</strong>: <Link href="/downloads/mac">Download for Mac</Link></li>
            <li><strong>Windows</strong>: <Link href="/downloads/windows">Download for Windows</Link></li>
            <li><strong>Linux</strong>: <Link href="/downloads/linux">Download for Linux</Link></li>
          </ul>

          <h2>Mobile Apps</h2>
          <ul>
            <li><strong>iOS</strong>: <Link href="/downloads/ios">Download from App Store</Link></li>
            <li><strong>Android</strong>: <Link href="/downloads/android">Download from Google Play</Link></li>
          </ul>

          <h2>System Requirements</h2>
          <ul>
            <li>macOS 10.15+</li>
            <li>Windows 10+</li>
            <li>Linux (Ubuntu 20.04+)</li>
          </ul>

          <h2>Installation</h2>
          <ol>
            <li>Download the installer</li>
            <li>Run the installer</li>
            <li>Follow on-screen instructions</li>
            <li>Sign in with your account</li>
          </ol>

          <h2>Updates</h2>
          <p>Updates are automatic. You can also check manually from Settings &gt; About.</p>
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

