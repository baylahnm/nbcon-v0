"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCareers } from "@/hooks/useCareers";
import { JobCard } from "@/components/careers/JobCard";
import { BenefitCard } from "@/components/careers/BenefitCard";
import { ProcessTimeline } from "@/components/careers/ProcessTimeline";
import { JobAlertForm } from "@/components/careers/JobAlertForm";

export default function CareersPage() {
  const { jobs, benefits, loading, error } = useCareers({
    filters: {
      sortBy: "recent",
    },
  });

  // Get featured jobs
  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 3);
  const recentJobs = jobs.filter((j) => !j.featured).slice(0, 6);

  // Get unique departments
  const departments = Array.from(new Set(jobs.map((job) => job.department))).sort();

  // Get benefits by category
  const benefitsByCategory = benefits.reduce(
    (acc, benefit) => {
      if (!acc[benefit.category]) {
        acc[benefit.category] = [];
      }
      acc[benefit.category].push(benefit);
      return acc;
    },
    {} as Record<string, typeof benefits>
  );

  const scrollToJobs = () => {
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCulture = () => {
    document.getElementById("why-join-us")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Careers | nbcon.ai</title>
        <meta
          name="description"
          content="Join nbcon.ai and help build the future of AI-powered engineering"
        />
        <meta property="og:title" content="Careers | nbcon.ai" />
        <meta
          property="og:description"
          content="Join us in revolutionizing how engineering teams build software"
        />
      </Head>

      <SimpleHeroSection
        headline="Build the Future of AI-Powered Engineering"
        description="Join us in revolutionizing how engineering teams build software"
        cta={{
          primary: {
            text: "View Open Positions",
            onClick: scrollToJobs,
          },
          secondary: {
            text: "Learn More",
            onClick: scrollToCulture,
          },
        }}
        backgroundVariant="gradient"
      />

      {/* Open Positions */}
      <section id="open-positions" className="container mx-auto px-4 py-12 md:py-20">
        <div className="mb-8">
          <h2 className="section-heading mb-4">Open Positions</h2>
          <p className="body-large max-w-2xl">
            We're looking for talented individuals to join our team and help shape the future of
            AI-powered engineering.
          </p>
        </div>

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
            <p className="body-large">No open positions at the moment.</p>
            <p className="body-small text-muted-foreground mt-2">
              Check back later or subscribe to job alerts to be notified when new positions open.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Jobs */}
            {featuredJobs.length > 0 && (
              <div className="mb-12">
                <h3 className="subsection-heading mb-6">Featured Positions</h3>
                <div className="space-y-4">
                  {featuredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Jobs */}
            {recentJobs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="subsection-heading">All Positions</h3>
                  <Button variant="outline" asChild>
                    <Link href="/careers/positions">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Why Join Us */}
      <section id="why-join-us" className="container mx-auto px-4 py-12 md:py-20 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Why Join Us</h2>
          <p className="body-large max-w-2xl mx-auto">
            We're building the future of AI-powered engineering tools. Join us and make an impact.
          </p>
        </div>

        {/* Benefits Grid */}
        {benefits.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.slice(0, 8).map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="body-large text-muted-foreground">Benefits information coming soon.</p>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/careers/benefits">
              View All Benefits
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Application Process */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Application Process</h2>
          <p className="body-large max-w-2xl mx-auto">
            Our streamlined process ensures you have a great experience from start to finish.
          </p>
        </div>

        <ProcessTimeline />
      </section>

      {/* Job Alerts */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <JobAlertForm departments={departments} />
        </div>
      </section>
    </>
  );
}
