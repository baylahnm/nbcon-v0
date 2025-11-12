"use client";

import { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { useCareers } from "@/hooks/useCareers";
import { JobCard } from "@/components/careers/JobCard";
import { JobFilter } from "@/components/careers/JobFilter";

export default function PositionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState<string | undefined>();
  const [locationType, setLocationType] = useState<string | undefined>();
  const [jobType, setJobType] = useState<string | undefined>();
  const [level, setLevel] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"recent" | "department" | "relevance">("recent");

  const { jobs, loading, error } = useCareers({
    filters: {
      searchQuery,
      department,
      locationType,
      jobType,
      level,
      sortBy,
    },
  });

  // Get unique departments from jobs
  const departments = Array.from(new Set(jobs.map((job) => job.department))).sort();

  return (
    <>
      <Head>
        <title>Open Positions | Careers | nbcon.ai</title>
        <meta name="description" content="Browse all open positions at nbcon.ai" />
      </Head>

      <SimpleHeroSection
        headline="Open Positions"
        description="We're looking for talented individuals to join our team"
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Filters */}
        <div className="mb-8">
          <JobFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            department={department}
            onDepartmentChange={setDepartment}
            locationType={locationType}
            onLocationTypeChange={setLocationType}
            jobType={jobType}
            onJobTypeChange={setJobType}
            level={level}
            onLevelChange={setLevel}
            sortBy={sortBy}
            onSortChange={(value) => setSortBy(value as any)}
            departments={departments}
          />
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-12">
            <p className="body-large">Loading positions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="body-large text-destructive">{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="body-large">No positions found matching your criteria.</p>
            <p className="body-small text-muted-foreground mt-2">
              Try adjusting your filters or check back later for new openings.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

