import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs } from "@/lib/docs";

interface DocsPageProps { index: { title: string; slug: string; excerpt?: string }[]; sidebar: { title: string; slug: string; section: string }[] }

export default function DocsIndexAR({ index, sidebar }: DocsPageProps) {
  return (
    <>
      <Head>
        <title>المستندات | NBCON PRO</title>
        <meta name="description" content="دليل استخدام NBCON PRO" />
      </Head>
      <DocsLayout index={index} sidebar={sidebar} lang="ar">
        <h1 className="text-3xl font-bold mb-6">المستندات</h1>
        <p className="text-muted-foreground mb-8">ابدأ من هنا.</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sidebar.slice(0, 6).map((item) => (
            <li key={item.slug} className="rounded-lg border p-4 hover:bg-accent transition">
              <Link href={`/ar/docs/${item.slug}`} className="font-semibold">
                {item.title}
              </Link>
              <div className="text-xs text-muted-foreground mt-1">{item.section}</div>
            </li>
          ))}
        </ul>
      </DocsLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = await getAllDocs("ar");
  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs.length ? docs : await getAllDocs("en");
  return { props: { index, sidebar }, revalidate: 3600 };
};


