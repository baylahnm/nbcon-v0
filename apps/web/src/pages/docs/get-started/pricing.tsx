import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function PricingPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Pricing | nbcon.ai Docs</title>
        <meta name="description" content="Subscription plans and pricing tiers" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Pricing Plans</h1>
          <p>nbcon.ai offers flexible pricing to suit your needs.</p>

          <h2>Free Tier</h2>
          <ul>
            <li>1 project</li>
            <li>Basic AI agents</li>
            <li>Community support</li>
          </ul>

          <h2>Pro Tier</h2>
          <ul>
            <li>Unlimited projects</li>
            <li>All AI agents</li>
            <li>Priority support</li>
            <li>Advanced features</li>
          </ul>

          <h2>Enterprise</h2>
          <ul>
            <li>Custom pricing</li>
            <li>Dedicated support</li>
            <li>Custom integrations</li>
            <li>SLA guarantees</li>
          </ul>

          <p>
            <Link href="/auth/signup">Get Started</Link>
          </p>
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

