import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function IgnoreFilesPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Ignore Files | nbcon.ai Docs</title>
        <meta name="description" content="Configuring files to ignore" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Ignore Files</h1>
          <p>Control which files are indexed and processed by nbcon.ai.</p>

          <h2>.nbconignore</h2>
          <p>Create a <code>.nbconignore</code> file in your project root:</p>
          <CodeBlock>
{`# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/

# Environment files
.env
.env.local`}
          </CodeBlock>

          <h2>Patterns</h2>
          <p>Supports glob patterns:</p>
          <CodeBlock>
{`*.log
**/temp/
!important.log`}
          </CodeBlock>

          <h2>File Types</h2>
          <p>By default, nbcon.ai ignores:</p>
          <ul>
            <li>Binary files</li>
            <li>Large files (&gt;10MB)</li>
            <li>Generated files</li>
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

