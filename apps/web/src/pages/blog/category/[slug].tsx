"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { useBlog } from "@/hooks/useBlog";
import { PostCard } from "@/components/blog/PostCard";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";

export default function BlogCategoryPage() {
  const router = useRouter();
  const slug = router.query.slug as string | undefined;

  // Find category by slug
  const { posts, categories, loading } = useBlog({ filters: { published: true } });
  const category = categories.find((cat) => cat.slug === slug);

  // Filter posts by category
  const categoryPosts = category
    ? posts.filter((post) => post.categoryId === category.id)
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

  if (!category) {
    return (
      <>
        <Head>
          <title>Category Not Found | Blog | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="section-heading">Category Not Found</h1>
            <p className="body-large text-muted-foreground mt-4">
              The category you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{category.name} | Blog | nbcon.ai</title>
        <meta name="description" content={category.description || `Articles in ${category.name}`} />
      </Head>

      <SimpleHeroSection
        headline={category.name}
        description={category.description || `Articles in ${category.name}`}
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {categoryPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="body-large">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

