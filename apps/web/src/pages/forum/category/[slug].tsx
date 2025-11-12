"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { useForum } from "@/hooks/useForum";
import { ThreadCard } from "@/components/forum/ThreadCard";
import { ForumSidebar } from "@/components/forum/ForumSidebar";
import { ForumSearch } from "@/components/forum/ForumSearch";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { categories, filteredThreads, filters, updateFilters, getCategoryBySlug } =
    useForum();

  const category = slug ? getCategoryBySlug(slug as string) : undefined;

  useEffect(() => {
    if (category) {
      updateFilters({ categoryId: category.id });
    }
  }, [category, updateFilters]);

  if (!category && slug) {
    return (
      <>
        <Head>
          <title>Category Not Found | Forum | nbcon.ai</title>
        </Head>
        <main className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <h1 className="section-heading mb-4">Category Not Found</h1>
              <p className="body-large mb-6">
                The category "{slug}" doesn't exist.
              </p>
              <Button asChild variant="outline">
                <Link href="/forum">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Forum
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  const scrollToContent = () => {
    document.getElementById("forum-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>{category?.name || "Category"} | Forum | nbcon.ai</title>
        <meta
          name="description"
          content={category?.description || `Browse ${category?.name} discussions`}
        />
      </Head>

      <SimpleHeroSection
        headline={category?.name || "Category"}
        description={category?.description || ""}
        cta={{
          primary: {
            text: "New Thread",
            href: "/forum/create",
          },
          secondary: {
            text: "Browse Topics",
            onClick: scrollToContent,
          },
        }}
        backgroundVariant="gradient"
      />

      <main id="forum-content" className="container mx-auto px-4 py-12 md:py-20">
        {/* Search and Sort */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 max-w-2xl">
              <ForumSearch
                value={filters.searchQuery}
                onChange={(value) => updateFilters({ searchQuery: value })}
              />
            </div>
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                updateFilters({ sortBy: value as typeof filters.sortBy })
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <ForumSidebar
              categories={categories}
              selectedCategoryId={category?.id}
              onCategorySelect={(categoryId) =>
                updateFilters({ categoryId })
              }
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-heading">{category?.name || "Threads"}</h2>
            </div>

            <div className="space-y-4">
              {filteredThreads.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="body-large">No threads found in this category.</p>
                    <p className="body-small text-muted-foreground mt-2">
                      Be the first to start a discussion!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Pinned threads first */}
                  {filteredThreads
                    .filter((thread) => thread.isPinned)
                    .map((thread) => (
                      <ThreadCard key={thread.id} thread={thread} showCategory={false} />
                    ))}
                  {/* Regular threads */}
                  {filteredThreads
                    .filter((thread) => !thread.isPinned)
                    .map((thread) => (
                      <ThreadCard key={thread.id} thread={thread} showCategory={false} />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

