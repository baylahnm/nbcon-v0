"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { useBlog } from "@/hooks/useBlog";
import { PostCard } from "@/components/blog/PostCard";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";

export default function BlogAuthorPage() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  const { posts, loading } = useBlog({ filters: { published: true } });

  // Find author and their posts
  const authorPosts = posts.filter((post) => post.authorId === id);
  const author = authorPosts.length > 0 ? authorPosts[0].author : null;

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

  if (!author) {
    return (
      <>
        <Head>
          <title>Author Not Found | Blog | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="section-heading">Author Not Found</h1>
            <p className="body-large text-muted-foreground mt-4">
              The author you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{author.name} | Blog | nbcon.ai</title>
        <meta name="description" content={`Articles by ${author.name}`} />
      </Head>

      <SimpleHeroSection
        headline={author.name}
        description={author.bio || `Articles by ${author.name}`}
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Author Card */}
          <AuthorCard author={author} />

          {/* Author's Posts */}
          {authorPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="body-large">No articles found by this author.</p>
            </div>
          ) : (
            <>
              <h2 className="subsection-heading">Articles by {author.name}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {authorPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

