import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function EnterprisePage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Enterprise | nbcon.ai Docs</title>
        <meta name="description" content="Enterprise features and solutions" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Enterprise</h1>
          <p>Advanced features for large organizations.</p>

          <h2>Features</h2>
          <ul>
            <li><strong>Dedicated Support</strong>: 24/7 priority support</li>
            <li><strong>Custom Integrations</strong>: Build custom integrations</li>
            <li><strong>SLA Guarantees</strong>: Service level agreements</li>
            <li><strong>Advanced Security</strong>: Enhanced security features</li>
          </ul>

          <h2>Custom Solutions</h2>
          <ul>
            <li>On-premise deployment</li>
            <li>Custom AI models</li>
            <li>White-label options</li>
            <li>Training and onboarding</li>
          </ul>

          <h2>Contact Sales</h2>
          <p><Link href="/enterprise">Contact our sales team</Link> to discuss enterprise solutions.</p>
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

