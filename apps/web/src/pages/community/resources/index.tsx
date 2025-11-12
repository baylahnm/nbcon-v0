"use client";

import { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCommunity } from "@/hooks/useCommunity";
import { ResourceCard } from "@/components/community/ResourceCard";

export default function ResourcesPage() {
  const [resourceType, setResourceType] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "rating">("recent");

  const { resources, loading, error } = useCommunity({
    filters: {
      type: resourceType,
      sortBy: sortBy === "rating" ? "popular" : sortBy,
    },
  });

  // Sort resources client-side if needed
  let sortedResources = [...resources];
  if (sortBy === "rating") {
    sortedResources.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.ratingCount - a.ratingCount;
    });
  }

  return (
    <>
      <Head>
        <title>Resources | Community | nbcon.ai</title>
        <meta name="description" content="Download community resources, templates, and guides" />
      </Head>

      <SimpleHeroSection
        headline="Community Resources"
        description="Templates, guides, tools, and starter kits from the community"
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Select value={resourceType || "all"} onValueChange={(value) => setResourceType(value === "all" ? undefined : value)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="template">Templates</SelectItem>
              <SelectItem value="guide">Guides</SelectItem>
              <SelectItem value="tool">Tools</SelectItem>
              <SelectItem value="starter-kit">Starter Kits</SelectItem>
              <SelectItem value="docs">Documentation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="body-large">Loading resources...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="body-large text-destructive">{error}</p>
          </div>
        ) : sortedResources.length === 0 ? (
          <div className="text-center py-12">
            <p className="body-large">No resources found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

