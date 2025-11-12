"use client";

import { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { useCommunity } from "@/hooks/useCommunity";
import { ProjectCard } from "@/components/community/ProjectCard";
import { ProjectFilter } from "@/components/community/ProjectFilter";

const categories = [
  "Web Apps",
  "Mobile Apps",
  "CLI Tools",
  "Integrations",
  "Libraries",
  "Templates",
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "featured" | "trending">("recent");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { projects, loading, error } = useCommunity({
    filters: {
      searchQuery,
      category,
      sortBy,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    },
  });

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  ).sort();

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <Head>
        <title>Projects | Community | nbcon.ai</title>
        <meta name="description" content="Browse community projects built with nbcon.ai" />
      </Head>

      <SimpleHeroSection
        headline="Community Projects"
        description="Discover amazing projects built by the nbcon.ai community"
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Filters */}
        <div className="mb-8">
          <ProjectFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            category={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={(value) => setSortBy(value as any)}
            categories={categories}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            availableTags={allTags}
          />
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="body-large">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="body-large text-destructive">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="body-large">No projects found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

