import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import DocsLayout from "@/components/docs/DocsLayout";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

interface DocPageProps {
  source: MDXRemoteSerializeResult;
  title: string;
  description?: string;
  index: { title: string; slug: string }[];
  sidebar: { title: string; slug: string; section: string }[];
}

export default function DocPageAR({ source, title, description, index, sidebar }: DocPageProps) {
  return (
    <>
      <Head>
        <title>{title} | NBCON PRO Docs</title>
        {description ? <meta name="description" content={description} /> : null}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css"
        />
      </Head>
      <DocsLayout index={index} sidebar={sidebar} lang="ar">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote {...source} />
        </article>
      </DocsLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getAllDocs("ar");
  const paths = (docs.length ? docs : await getAllDocs("en")).map((d) => ({ params: { slug: d.slug.split("/") } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slugParam = (ctx.params?.slug as string[]) || [];
  const slug = slugParam.join("/");
  const doc = (await getDocBySlug(slug, "ar")) || (await getDocBySlug(slug, "en"));
  if (!doc) return { notFound: true };

  const mdxSource = await serialize(doc.content, {
    mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] },
  });

  const docs = (await getAllDocs("ar")) || (await getAllDocs("en"));
  const index = docs.map((d) => ({ title: d.title, slug: d.slug }));
  const sidebar = docs;

  return {
    props: {
      source: mdxSource,
      title: doc.meta.title,
      description: doc.meta.description || "",
      index,
      sidebar,
    },
    revalidate: 3600,
  };
};


