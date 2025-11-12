"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryFilter } from "./CategoryFilter";
import { TagCloud } from "./TagCloud";
import { NewsletterForm } from "./NewsletterForm";
import { PostCard } from "./PostCard";
import type { BlogCategory, BlogTag, BlogPost } from "@/types/blog";

interface BlogSidebarProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  recentPosts: BlogPost[];
  selectedCategoryId?: string;
  onCategoryChange: (categoryId?: string) => void;
}

export function BlogSidebar({
  categories,
  tags,
  recentPosts,
  selectedCategoryId,
  onCategoryChange,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="subsection-heading">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </CardContent>
      </Card>

      {/* Tags */}
      {tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="subsection-heading">Popular Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <TagCloud tags={tags} />
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="subsection-heading">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="border-b-[0.5px] border-border/50 last:border-0 pb-4 last:pb-0">
                <h3 className="body-medium font-medium mb-2">
                  <a
                    href={`/blog/${post.slug}`}
                    className="hover:underline line-clamp-2"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="body-small text-muted-foreground line-clamp-2">
                  {post.excerpt || post.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Newsletter */}
      <NewsletterForm />
    </aside>
  );
}

