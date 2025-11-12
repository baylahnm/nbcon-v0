"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { useBlog } from "@/hooks/useBlog";
import { PostCard } from "@/components/blog/PostCard";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";

export default function BlogTagPage() {
  const router = useRouter();
  const slug = router.query.slug as string | undefined;

  // Find tag by slug
  const { posts, tags, loading } = useBlog({ filters: { published: true } });
  const tag = tags.find((t) => t.slug === slug);

  // Filter posts by tag
  const tagPosts = tag
    ? posts.filter((post) => post.tags?.some((t) => t.id === tag.id))
    : [];

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... | Blog | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="body-large">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!tag) {
    return (
      <>
        <Head>
          <title>Tag Not Found | Blog | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="section-heading">Tag Not Found</h1>
            <p className="body-large text-muted-foreground mt-4">
              The tag you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{tag.name} | Blog | nbcon.ai</title>
        <meta name="description" content={`Articles tagged with ${tag.name}`} />
      </Head>

      <SimpleHeroSection
        headline={`Tag: ${tag.name}`}
        description={`Articles tagged with ${tag.name}`}
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {tagPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="body-large">No articles found with this tag.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tagPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

