import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";
import Link from "next/link";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function WelcomePage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Welcome to nbcon.ai Docs | nbcon.ai Docs</title>
        <meta name="description" content="Start here to learn how nbcon.ai is structured and how to build." />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Welcome</h1>
          <p>
            nbcon.ai documentation is organized into sections. Use the left sidebar to navigate and the search bar to jump directly to a topic.
          </p>

          <h2>Quick Start</h2>

          <h3>1. Clone and Install</h3>
          <CodeBlock language="bash">
{`git clone <repository-url>
cd nbcon_v0
pnpm install`}
          </CodeBlock>

          <h3>2. Configure Environment</h3>
          <CodeBlock language="bash">
{`cp .env.example apps/web/.env.local
# Fill in your Supabase and Stripe keys`}
          </CodeBlock>

          <h3>3. Build Config Package</h3>
          <CodeBlock language="bash">
{`pnpm build:config`}
          </CodeBlock>

          <h3>4. Run Development Server</h3>
          <CodeBlock language="bash">
{`pnpm --filter @nbcon/web dev`}
          </CodeBlock>

          <h2>Recent Updates (2025-01-06)</h2>
          <ul>
            <li>✅ <strong>Icon System Unified</strong> - Modern icon libraries, ~700KB bundle reduction</li>
            <li>✅ <strong>Security Audit</strong> - Comprehensive security documentation</li>
            <li>✅ <strong>Email Templates</strong> - Updated with "nbcon" branding</li>
            <li>✅ <strong>Build Process</strong> - Config package build automation</li>
            <li>✅ <strong>Documentation</strong> - Consolidated and updated guides</li>
          </ul>

          <h2>Quick Links</h2>
          <ul>
            <li><Link href="/docs/configuration/deployment">Deployment Guide</Link> - Production deployment steps</li>
            <li><Link href="/docs/configuration/api-usage">API Usage</Link> - API integration guide</li>
            <li><Link href="/docs/core/phase-summaries">Phase Summaries</Link> - Implementation progress</li>
            <li><Link href="/docs/components/ICON_SYSTEM.md">Icon System</Link> - Icon usage guide</li>
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

