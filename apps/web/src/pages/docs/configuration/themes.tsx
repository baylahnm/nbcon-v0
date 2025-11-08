import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function ThemesPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Themes | NBCON PRO Docs</title>
        <meta name="description" content="Customizing the appearance" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Themes</h1>
          <p>Customize NBCON PRO's appearance with themes.</p>

          <h2>Built-in Themes</h2>
          <ul>
            <li><strong>Light</strong>: Clean, bright interface</li>
            <li><strong>Dark</strong>: Easy on the eyes</li>
            <li><strong>High Contrast</strong>: Improved accessibility</li>
          </ul>

          <h2>Custom Themes</h2>
          <p>Create custom themes:</p>
          <CodeBlock language="json">
{`{
  "name": "My Theme",
  "colors": {
    "background": "#ffffff",
    "foreground": "#000000"
  }
}`}
          </CodeBlock>

          <h2>Theme Settings</h2>
          <p>Access theme settings:</p>
          <ol>
            <li>Go to Settings &gt; Appearance</li>
            <li>Select a theme</li>
            <li>Customize colors as needed</li>
          </ol>

          <h2>Sharing Themes</h2>
          <p>Share your custom themes with the community.</p>
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

