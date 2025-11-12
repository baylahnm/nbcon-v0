/**
 * Careers Hook
 * Reusable hook for fetching and filtering careers data
 */

import { useState, useEffect } from "react";
import type { JobPosting, Benefit, CareersFilters } from "@/types/careers";

interface UseCareersOptions {
  filters?: Partial<CareersFilters>;
  limit?: number;
  offset?: number;
}

interface UseCareersReturn {
  jobs: JobPosting[];
  benefits: Benefit[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCareers(options: UseCareersOptions = {}): UseCareersReturn {
  const { filters = {}, limit = 50, offset = 0 } = options;
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams();
      if (filters.department) params.append("department", filters.department);
      if (filters.locationType) params.append("locationType", filters.locationType);
      if (filters.jobType) params.append("jobType", filters.jobType);
      if (filters.level) params.append("level", filters.level);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      params.append("limit", String(limit));
      params.append("offset", String(offset));

      // Fetch jobs and benefits in parallel
      const [jobsRes, benefitsRes] = await Promise.all([
        fetch(`/api/careers/jobs?${params.toString()}`),
        fetch("/api/careers/benefits"),
      ]);

      if (!jobsRes.ok) throw new Error("Failed to fetch jobs");
      if (!benefitsRes.ok) throw new Error("Failed to fetch benefits");

      const jobsData = await jobsRes.json();
      const benefitsData = await benefitsRes.json();

      // Apply client-side search filter if provided
      let filteredJobs = jobsData.jobs || [];
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredJobs = filteredJobs.filter(
          (job: JobPosting) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.department.toLowerCase().includes(query) ||
            job.responsibilities.some((r) => r.toLowerCase().includes(query))
        );
      }

      setJobs(filteredJobs);
      setBenefits(benefitsData.benefits || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching careers data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filters.department,
    filters.locationType,
    filters.jobType,
    filters.level,
    filters.sortBy,
    limit,
    offset,
  ]);

  return {
    jobs,
    benefits,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook for fetching a single job posting by ID
 */
export function useJobPosting(id: string) {
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/careers/jobs/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Job posting not found");
          } else {
            throw new Error("Failed to fetch job posting");
          }
          return;
        }

        const data = await res.json();
        setJob(data.job);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching job posting:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  return { job, loading, error };
}

