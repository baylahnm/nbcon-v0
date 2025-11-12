"use client";

import { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useBlog } from "@/hooks/useBlog";
import { PostCard } from "@/components/blog/PostCard";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { NewsletterForm } from "@/components/blog/NewsletterForm";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "featured" | "trending">("recent");

  const { posts, categories, tags, featuredPost, loading, error, refetch } = useBlog({
    filters: {
      searchQuery,
      categoryId: selectedCategoryId,
      sortBy,
      published: true,
    },
  });

  // Filter out featured post from regular posts
  const regularPosts = posts.filter((post) => !post.featured || post.id !== featuredPost?.id);
  const recentPosts = [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt || b.createdAt).getTime() -
      new Date(a.publishedAt || a.createdAt).getTime()
  );

  const scrollToContent = () => {
    document.getElementById("blog-content")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNewsletter = () => {
    document.getElementById("newsletter-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Blog | nbcon.ai</title>
        <meta
          name="description"
          content="Insights, tutorials, and updates from the nbcon.ai team"
        />
        <meta property="og:title" content="Blog | nbcon.ai" />
        <meta
          property="og:description"
          content="Insights, tutorials, and updates from the team"
        />
      </Head>

      <SimpleHeroSection
        headline="Latest from nbcon.ai"
        description="Insights, tutorials, and updates from the team"
        cta={{
          primary: {
            text: "Subscribe to Newsletter",
            onClick: scrollToNewsletter,
          },
          secondary: {
            text: "Browse Articles",
            onClick: scrollToContent,
          },
        }}
        backgroundVariant="minimal"
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-12">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      <main id="blog-content" className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Filters */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "recent" | "popular" | "featured" | "trending")
                  }
                  className="px-4 py-2 border rounded-md bg-background"
                >
                  <option value="recent">Recent</option>
                  <option value="popular">Popular</option>
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>

            {/* Blog Posts Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="body-large">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="body-large text-destructive">{error}</p>
                <button
                  onClick={() => refetch()}
                  className="mt-4 text-primary hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : regularPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="body-large">No articles found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <BlogSidebar
              categories={categories}
              tags={tags}
              recentPosts={recentPosts.slice(0, 5)}
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
            />
          </aside>
        </div>
      </main>

      {/* Newsletter Signup */}
      <section id="newsletter-section" className="container mx-auto px-4 py-12">
        <NewsletterForm />
      </section>
    </>
  );
}
