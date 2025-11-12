import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function WebDevelopmentPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Web Development | nbcon.ai Docs</title>
        <meta name="description" content="Web development workflows with nbcon.ai" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Web Development</h1>
          <p>Best practices for web development with nbcon.ai.</p>

          <h2>Project Setup</h2>
          <CodeBlock language="bash">
{`nbcon create web-app my-app
cd my-app
nbcon install`}
          </CodeBlock>

          <h2>Development Workflow</h2>
          <ol>
            <li>Create components with AI assistance</li>
            <li>Test components automatically</li>
            <li>Deploy with one command</li>
          </ol>

          <h2>Frameworks</h2>
          <p>nbcon.ai supports:</p>
          <ul>
            <li>React</li>
            <li>Vue</li>
            <li>Angular</li>
            <li>Next.js</li>
            <li>Remix</li>
          </ul>

          <h2>Example: Creating a Component</h2>
          <CodeBlock language="typescript">
{`// Ask AI: "Create a button component with variants"
const Button = ({ variant, children }) => {
  // AI generates component code
};`}
          </CodeBlock>
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

