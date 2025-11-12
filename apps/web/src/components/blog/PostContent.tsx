"use client";

import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import type { BlogPost } from "@/types/blog";

interface PostContentProps {
  post: BlogPost;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <MarkdownRenderer content={post.content} />
    </article>
  );
}

