/**
 * Community Hook
 * Reusable hook for fetching and filtering community data
 */

import { useState, useEffect } from "react";
import type {
  CommunityProject,
  CommunityEvent,
  CommunityContributor,
  CommunityResource,
  CommunityStats,
  CommunityFilters,
} from "@/types/community";

interface UseCommunityOptions {
  filters?: Partial<CommunityFilters>;
  limit?: number;
  offset?: number;
}

interface UseCommunityReturn {
  projects: CommunityProject[];
  events: CommunityEvent[];
  contributors: CommunityContributor[];
  resources: CommunityResource[];
  stats: CommunityStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCommunity(options: UseCommunityOptions = {}): UseCommunityReturn {
  const { filters = {}, limit = 50, offset = 0 } = options;
  const [projects, setProjects] = useState<CommunityProject[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [contributors, setContributors] = useState<CommunityContributor[]>([]);
  const [resources, setResources] = useState<CommunityResource[]>([]);
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params for each endpoint
      const projectsParams = new URLSearchParams();
      if (filters.category) projectsParams.append("category", filters.category);
      if (filters.sortBy) projectsParams.append("sortBy", filters.sortBy);
      projectsParams.append("limit", String(limit));
      projectsParams.append("offset", String(offset));

      const eventsParams = new URLSearchParams();
      if (filters.type) eventsParams.append("type", filters.type);
      if (filters.sortBy) eventsParams.append("sortBy", filters.sortBy);
      eventsParams.append("limit", String(limit));
      eventsParams.append("offset", String(offset));

      const resourcesParams = new URLSearchParams();
      if (filters.type) resourcesParams.append("type", filters.type);
      if (filters.sortBy) resourcesParams.append("sortBy", filters.sortBy);
      resourcesParams.append("limit", String(limit));
      resourcesParams.append("offset", String(offset));

      // Fetch all data in parallel
      const [projectsRes, eventsRes, contributorsRes, resourcesRes, statsRes] = await Promise.all([
        fetch(`/api/community/projects?${projectsParams.toString()}`),
        fetch(`/api/community/events?${eventsParams.toString()}`),
        fetch("/api/community/contributors"),
        fetch(`/api/community/resources?${resourcesParams.toString()}`),
        fetch("/api/community/stats"),
      ]);

      if (!projectsRes.ok) throw new Error("Failed to fetch projects");
      if (!eventsRes.ok) throw new Error("Failed to fetch events");
      if (!contributorsRes.ok) throw new Error("Failed to fetch contributors");
      if (!resourcesRes.ok) throw new Error("Failed to fetch resources");
      if (!statsRes.ok) throw new Error("Failed to fetch stats");

      const projectsData = await projectsRes.json();
      const eventsData = await eventsRes.json();
      const contributorsData = await contributorsRes.json();
      const resourcesData = await resourcesRes.json();
      const statsData = await statsRes.json();

      // Apply client-side search filter if provided
      let filteredProjects = projectsData.projects || [];
      let filteredEvents = eventsData.events || [];
      let filteredResources = resourcesData.resources || [];

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredProjects = filteredProjects.filter(
          (project: CommunityProject) =>
            project.name.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.technologies.some((tech) => tech.toLowerCase().includes(query))
        );
        filteredEvents = filteredEvents.filter(
          (event: CommunityEvent) =>
            event.name.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query)
        );
        filteredResources = filteredResources.filter(
          (resource: CommunityResource) =>
            resource.name.toLowerCase().includes(query) ||
            resource.description.toLowerCase().includes(query)
        );
      }

      setProjects(filteredProjects);
      setEvents(filteredEvents);
      setContributors(contributorsData.contributors || []);
      setResources(filteredResources);
      setStats(statsData.stats || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching community data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filters.category,
    filters.type,
    filters.tags?.join(","),
    filters.sortBy,
    limit,
    offset,
  ]);

  return {
    projects,
    events,
    contributors,
    resources,
    stats,
    loading,
    error,
    refetch: fetchData,
  };
}

