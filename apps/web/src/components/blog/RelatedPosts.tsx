"use client";

import { PostCard } from "./PostCard";
import type { BlogPost } from "@/types/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h2 className="subsection-heading">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

