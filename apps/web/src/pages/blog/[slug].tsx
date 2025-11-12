"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { useBlogPost } from "@/hooks/useBlog";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostContent } from "@/components/blog/PostContent";
import { PostFooter } from "@/components/blog/PostFooter";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { useBlog } from "@/hooks/useBlog";

export default function BlogPostPage() {
  const router = useRouter();
  const slug = router.query.slug as string | undefined;
  const { post, loading, error } = useBlogPost(slug || "");
  const { posts } = useBlog({ filters: { published: true } });

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... | Blog | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="body-large">Loading article...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Head>
          <title>Post Not Found | Blog | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="section-heading">Post Not Found</h1>
            <p className="body-large text-muted-foreground mt-4">
              {error || "The article you're looking for doesn't exist."}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Blog | nbcon.ai</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        {post.featuredImage && (
          <meta property="og:image" content={post.featuredImage} />
        )}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt || post.createdAt} />
        {post.tags && (
          <>
            {post.tags.map((tag) => (
              <meta key={tag.id} property="article:tag" content={tag.name} />
            ))}
          </>
        )}
      </Head>

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <PostHeader post={post} />

          {/* Post Content */}
          <div className="mt-8">
            <PostContent post={post} />
          </div>

          {/* Post Footer */}
          <PostFooter post={post} />

          {/* Author Card */}
          {post.author && (
            <div className="mt-12">
              <AuthorCard author={post.author} />
            </div>
          )}

          {/* Related Posts */}
          <div className="mt-12">
            <RelatedPosts posts={posts} currentPostId={post.id} />
          </div>
        </div>
      </article>
    </>
  );
}

