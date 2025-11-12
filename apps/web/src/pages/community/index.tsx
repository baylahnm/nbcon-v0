"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCommunity } from "@/hooks/useCommunity";
import { ProjectCard } from "@/components/community/ProjectCard";
import { EventCard } from "@/components/community/EventCard";
import { ContributorCard } from "@/components/community/ContributorCard";
import { ResourceCard } from "@/components/community/ResourceCard";
import { StatsDisplay } from "@/components/community/StatsDisplay";
import { SocialLinks } from "@/components/community/SocialLinks";

export default function CommunityPage() {
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "featured" | "trending">("recent");

  const { projects, events, contributors, resources, stats, loading, error } = useCommunity({
    filters: {
      sortBy,
    },
  });

  // Get featured projects
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const regularProjects = projects.filter((p) => !p.featured).slice(0, 6);

  // Get upcoming events
  const upcomingEvents = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  // Get top contributors
  const topContributors = contributors.slice(0, 3);

  // Get featured resources
  const featuredResources = resources.slice(0, 3);

  const scrollToContent = () => {
    document.getElementById("community-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Community | nbcon.ai</title>
        <meta
          name="description"
          content="Join the nbcon.ai community - connect with developers, share projects, and contribute"
        />
        <meta property="og:title" content="Community | nbcon.ai" />
        <meta
          property="og:description"
          content="Connect with developers, share your projects, and contribute to the future of AI-powered engineering"
        />
      </Head>

      <SimpleHeroSection
        headline="Join the nbcon.ai Community"
        description="Connect with developers, share your projects, and contribute to the future of AI-powered engineering"
        cta={{
          primary: {
            text: "Get Started",
            href: "/auth/signup",
          },
          secondary: {
            text: "Join Discord",
            href: "#",
            onClick: scrollToContent,
          },
        }}
        backgroundVariant="gradient"
      />

      <main id="community-content" className="container mx-auto px-4 py-12 md:py-20">
        {/* Community Stats */}
        {stats && (
          <section className="mb-16">
            <StatsDisplay stats={stats} />
          </section>
        )}

        {/* Social Links */}
        <section className="mb-16">
          <h2 className="section-heading text-center mb-8">Connect With Us</h2>
          <SocialLinks />
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-heading">Featured Projects</h2>
              <Button variant="outline" asChild>
                <Link href="/community/projects">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <p className="body-large">Loading projects...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="body-large text-destructive">{error}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} featured />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-heading">Recent Projects</h2>
              <Button variant="outline" asChild>
                <Link href="/community/projects">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-heading">Upcoming Events</h2>
              <Button variant="outline" asChild>
                <Link href="/community/events">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Top Contributors */}
        {topContributors.length > 0 && (
          <section className="mb-16">
            <h2 className="section-heading text-center mb-8">Top Contributors</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {topContributors.map((contributor, index) => (
                <ContributorCard key={contributor.id} contributor={contributor} rank={index + 1} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/community/contributors">
                  View All Contributors
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-heading">Featured Resources</h2>
              <Button variant="outline" asChild>
                <Link href="/community/resources">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}

        {/* Empty States */}
        {!loading && !error && projects.length === 0 && events.length === 0 && (
          <div className="text-center py-12">
            <p className="body-large text-muted-foreground">
              No community content yet. Be the first to share a project or host an event!
            </p>
          </div>
        )}
      </main>
    </>
  );
}
