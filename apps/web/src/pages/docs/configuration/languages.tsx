import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function LanguagesPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Languages | nbcon.ai Docs</title>
        <meta name="description" content="Supported programming languages" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Supported Languages</h1>
          <p>nbcon.ai supports a wide range of programming languages.</p>

          <h2>Fully Supported</h2>
          <ul>
            <li>TypeScript / JavaScript</li>
            <li>Python</li>
            <li>Java</li>
            <li>C# / .NET</li>
            <li>Go</li>
            <li>Rust</li>
          </ul>

          <h2>Experimental Support</h2>
          <ul>
            <li>Kotlin</li>
            <li>Swift</li>
            <li>PHP</li>
            <li>Ruby</li>
          </ul>

          <h2>Language Features</h2>
          <ul>
            <li>Syntax highlighting</li>
            <li>Auto-completion</li>
            <li>Error detection</li>
            <li>Code formatting</li>
          </ul>

          <h2>Adding Language Support</h2>
          <p>Request new language support or contribute via extensions.</p>
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

