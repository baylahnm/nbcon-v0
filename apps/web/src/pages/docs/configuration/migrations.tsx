import { GetStaticProps } from "next";
import Head from "next/head";
import DocsLayout from "@/components/docs/DocsLayout";
import { CheckboxTask } from "@/components/ui/checkbox-task";
import { getAllDocs } from "@/lib/docs-data";

interface DocPageProps {
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function MigrationsPage({ index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>Migrations | NBCON PRO Docs</title>
        <meta name="description" content="Migrating between versions" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar}>
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Migrations</h1>
          <p>Guidelines for migrating between NBCON PRO versions.</p>

          <h2>Automatic Migrations</h2>
          <p>Most migrations happen automatically when you update.</p>

          <h2>Manual Migrations</h2>
          <p>Some versions require manual migration steps:</p>
          <ol>
            <li>Check migration guide for your version</li>
            <li>Backup your projects</li>
            <li>Follow migration steps</li>
            <li>Verify everything works</li>
          </ol>

          <h2>Version Compatibility</h2>
          <ul>
            <li>Projects are backward compatible</li>
            <li>Older projects work with newer versions</li>
            <li>Some features may require project updates</li>
          </ul>

          <h2>Migration Checklist</h2>
          <ul className="list-none space-y-2">
            <li><CheckboxTask id="migration-backup">Backup projects</CheckboxTask></li>
            <li><CheckboxTask id="migration-changelog">Review changelog</CheckboxTask></li>
            <li><CheckboxTask id="migration-test">Test in development</CheckboxTask></li>
            <li><CheckboxTask id="migration-production">Update production</CheckboxTask></li>
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

