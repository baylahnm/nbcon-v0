"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Rocket,
  Bug,
  Shield,
  AlertTriangle,
  BookOpen,
  Calendar,
  ExternalLink,
  ChevronLeft,
  Share2,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useChangelog } from "@/hooks/useChangelog";
import type { ChangelogEntry } from "@/types/changelog";

// Date formatting helper
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const categoryIcons = {
  features: Sparkles,
  improvements: Rocket,
  bugFixes: Bug,
  security: Shield,
  breakingChanges: AlertTriangle,
  documentation: BookOpen,
};

const typeColors = {
  major: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  minor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  patch: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  hotfix: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
};

export default function VersionPage() {
  const router = useRouter();
  const { version } = router.query;
  const { getEntryByVersion } = useChangelog();
  const [entry, setEntry] = useState<ChangelogEntry | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (version && typeof version === "string") {
      const foundEntry = getEntryByVersion(version);
      setEntry(foundEntry);
    }
  }, [version, getEntryByVersion]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `nbcon.ai v${entry?.version} Release Notes`,
          text: `Check out what's new in nbcon.ai v${entry?.version}`,
          url,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!entry) {
    return (
      <>
        <Head>
          <title>Version Not Found | Changelog | nbcon.ai</title>
          <meta name="description" content="The requested version was not found in the changelog." />
        </Head>
        <main className="container mx-auto px-4 py-12 md:py-20">
          <Card>
            <CardContent className="py-12 text-center">
              <h1 className="section-heading mb-4">Version Not Found</h1>
              <p className="body-large mb-6">
                The version "{version}" you're looking for doesn't exist in our changelog.
              </p>
              <Button asChild variant="outline">
                <Link href="/changelog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Changelog
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  const pageTitle = `v${entry.version} Release Notes | Changelog | nbcon.ai`;
  const pageDescription = entry.fullNotes || entry.highlights.join(". ") || `Release notes for nbcon.ai version ${entry.version}`;
  const pageUrl = typeof window !== "undefined" ? window.location.href : `https://nbcon.ai/changelog/${entry.version}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "nbcon.ai",
              applicationCategory: "SoftwareApplication",
              version: entry.version,
              datePublished: entry.date,
              releaseNotes: {
                "@type": "Article",
                headline: `Release Notes for v${entry.version}`,
                datePublished: entry.date,
                description: pageDescription,
              },
            }),
          }}
        />
      </Head>

      <SimpleHeroSection
        headline={`What's New in v${entry.version}`}
        description={entry.fullNotes || entry.highlights[0] || "Release notes"}
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Navigation */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/changelog">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Changelog
            </Link>
          </Button>
        </div>

        {/* Version Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h1 className="section-heading">v{entry.version}</h1>
                    <Badge className={typeColors[entry.type]} variant="outline">
                      {entry.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="label-text">{formatDate(entry.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyLink}
                  className={copied ? "bg-green-500/10" : ""}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Highlights */}
        {entry.highlights && entry.highlights.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="subsection-heading">Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {entry.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 body-regular">
                    <span className="text-primary mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Full Notes */}
        {entry.fullNotes && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="subsection-heading">Release Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-regular whitespace-pre-wrap">{entry.fullNotes}</p>
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        <div className="space-y-6">
          {Object.entries(entry.categories).map(([category, items]) => {
            if (!items || (Array.isArray(items) && items.length === 0)) return null;
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="subsection-heading flex items-center gap-2">
                    {CategoryIcon && <CategoryIcon className="h-5 w-5" />}
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category === "breakingChanges" && Array.isArray(items) ? (
                      items.map((item, idx) => {
                        const breakingChange = item as { description: string; migrationGuide?: string };
                        return (
                          <li key={idx} className="body-regular">
                            <div className="flex flex-col gap-2">
                              <span>{breakingChange.description}</span>
                              {breakingChange.migrationGuide && (
                                <Button variant="link" size="sm" asChild className="w-fit p-0 h-auto">
                                  <a
                                    href={breakingChange.migrationGuide}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline flex items-center gap-1"
                                  >
                                    View Migration Guide
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </li>
                        );
                      })
                    ) : Array.isArray(items) ? (
                      items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 body-regular">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="body-regular">{items}</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Related Documentation */}
        {entry.relatedDocs && entry.relatedDocs.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="subsection-heading">Related Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {entry.relatedDocs.map((doc, idx) => (
                  <Button key={idx} variant="outline" size="sm" asChild>
                    <a href={doc} target="_blank" rel="noopener noreferrer">
                      View Docs
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t flex justify-between">
          <Button asChild variant="outline">
            <Link href="/changelog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Changelog
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}

