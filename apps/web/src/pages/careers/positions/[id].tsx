"use client";

import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle, DollarSign } from "lucide-react";
import { useJobPosting } from "@/hooks/useCareers";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { format } from "date-fns";

export default function JobDetailPage() {
  const router = useRouter();
  const id = router.query.id as string | undefined;
  const { job, loading, error } = useJobPosting(id || "");

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... | Careers | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="body-large">Loading job posting...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Head>
          <title>Job Not Found | Careers | nbcon.ai</title>
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="section-heading">Job Posting Not Found</h1>
            <p className="body-large text-muted-foreground mt-4">
              {error || "The job posting you're looking for doesn't exist or is no longer available."}
            </p>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="/careers/positions">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Positions
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const locationText =
    job.location.type === "remote"
      ? "Remote"
      : job.location.type === "hybrid"
      ? `Hybrid${job.location.city ? ` - ${job.location.city}` : ""}`
      : job.location.city || "On-site";

  const postedDate = format(new Date(job.postedDate), "MMMM d, yyyy");
  const jobUrl = typeof window !== "undefined"
    ? `${window.location.origin}/careers/positions/${job.id}`
    : "";

  return (
    <>
      <Head>
        <title>{job.title} | Careers | nbcon.ai</title>
        <meta name="description" content={job.description} />
        <meta property="og:title" content={`${job.title} | nbcon.ai Careers`} />
        <meta property="og:description" content={job.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: job.title,
              description: job.description,
              datePosted: job.postedDate,
              employmentType: job.type,
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: job.location.city,
                  addressCountry: job.location.country,
                },
              },
              baseSalary: job.salary
                ? {
                    "@type": "MonetaryAmount",
                    currency: job.salary.currency,
                    value: {
                      "@type": "QuantitativeValue",
                      minValue: job.salary.min,
                      maxValue: job.salary.max,
                      unitText: "MONTH",
                    },
                  }
                : undefined,
            }),
          }}
        />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Button variant="outline" asChild>
            <Link href="/careers/positions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Positions
            </Link>
          </Button>

          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="section-heading">{job.title}</h1>
                    <Badge variant="outline">{job.level}</Badge>
                    {job.featured && (
                      <Badge variant="default" className="bg-primary">Featured</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="body-medium">{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="body-medium">{locationText}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="body-medium">{job.type.replace("-", " ")}</span>
                    </div>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="stat-medium">
                        {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}{" "}
                        {job.salary.currency}/month
                      </span>
                    </div>
                  )}
                  <p className="body-small text-muted-foreground mt-2">Posted {postedDate}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle className="subsection-heading">Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-regular whitespace-pre-wrap">{job.description}</p>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          {job.responsibilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="subsection-heading">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-2 body-regular">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="subsection-heading">Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {job.requirements.mustHave.length > 0 && (
                <div>
                  <h3 className="card-title mb-3">Must Have</h3>
                  <ul className="space-y-2">
                    {job.requirements.mustHave.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 body-regular">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {job.requirements.niceToHave.length > 0 && (
                <div>
                  <h3 className="card-title mb-3">Nice to Have</h3>
                  <ul className="space-y-2">
                    {job.requirements.niceToHave.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 body-regular">
                        <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="subsection-heading">Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 body-regular">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Share */}
          <Card>
            <CardHeader>
              <CardTitle className="subsection-heading">Share This Position</CardTitle>
            </CardHeader>
            <CardContent>
              <ShareButtons url={jobUrl} title={job.title} description={job.description} />
            </CardContent>
          </Card>

          {/* Application Form */}
          <ApplicationForm job={job} />
        </div>
      </main>
    </>
  );
}

