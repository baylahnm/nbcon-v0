"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
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
import { ArrowUpDown } from "lucide-react";
import { useForum } from "@/hooks/useForum";
import { ThreadCard } from "@/components/forum/ThreadCard";
import { ForumSidebar } from "@/components/forum/ForumSidebar";
import { ForumSearch } from "@/components/forum/ForumSearch";
import type { ForumThread } from "@/types/forum";

export default function ForumPage() {
  const router = useRouter();
  const { sort } = router.query;
  const {
    categories,
    filteredThreads,
    filters,
    updateFilters,
    loading,
    error,
  } = useForum({
    initialFilters: {
      sortBy: (sort as "recent" | "popular" | "unanswered" | "trending") || "recent",
    },
  });

  useEffect(() => {
    if (sort && typeof sort === "string") {
      updateFilters({ sortBy: sort as typeof filters.sortBy });
    }
  }, [sort, updateFilters]);

  const scrollToContent = () => {
    document.getElementById("forum-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Forum | nbcon.ai</title>
        <meta
          name="description"
          content="Join the nbcon.ai community forum to discuss, ask questions, and share knowledge"
        />
        <meta property="og:title" content="Forum | nbcon.ai" />
        <meta
          property="og:description"
          content="Connect with developers, share knowledge, and get help from the community"
        />
      </Head>

      <SimpleHeroSection
        headline="Join the nbcon.ai Community"
        description="Connect with developers, share knowledge, and get help from the community"
        cta={{
          primary: {
            text: "Join Discussion",
            href: "/auth/signup",
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
              selectedCategoryId={filters.categoryId}
              onCategorySelect={(categoryId) =>
                updateFilters({ categoryId })
              }
            />
          </aside>

          {/* Main Content - Threads */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-heading">
                {filters.categoryId
                  ? categories.find((c) => c.id === filters.categoryId)?.name || "Threads"
                  : "Recent Threads"}
              </h2>
            </div>

            <div className="space-y-4">
              {loading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="body-large">Loading threads...</p>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="body-large text-destructive">Error: {error}</p>
                    <p className="body-small text-muted-foreground mt-2">
                      Please try refreshing the page.
                    </p>
                  </CardContent>
                </Card>
              ) : filteredThreads.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="body-large">No threads found.</p>
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
                      <ThreadCard key={thread.id} thread={thread} />
                    ))}
                  {/* Regular threads */}
                  {filteredThreads
                    .filter((thread) => !thread.isPinned)
                    .map((thread) => (
                      <ThreadCard key={thread.id} thread={thread} />
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

