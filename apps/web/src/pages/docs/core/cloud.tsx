import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function CloudPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Cloud | NBCON PRO Docs</title>
        <meta name="description" content="Cloud features and synchronization" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Cloud Features</h1>
          <p>NBCON PRO Cloud provides seamless synchronization and collaboration.</p>

          <h2>Synchronization</h2>
          <p>Your projects automatically sync across all devices:</p>
          <ul>
            <li>Desktop applications</li>
            <li>Web interface</li>
            <li>Mobile apps</li>
          </ul>

          <h2>Collaboration</h2>
          <ul>
            <li>Real-time editing</li>
            <li>Shared project spaces</li>
            <li>Team permissions</li>
          </ul>

          <h2>Backup</h2>
          <p>All data is automatically backed up and encrypted in the cloud.</p>
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

