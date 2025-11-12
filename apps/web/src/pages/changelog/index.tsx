"use client";

import { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Sparkles,
  Rocket,
  Bug,
  Shield,
  AlertTriangle,
  BookOpen,
  Search,
  Calendar,
  Filter,
  ExternalLink,
  ChevronRight,
  Share2,
  Copy,
  Check,
  Rss,
  GitCompare,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { useChangelog } from "@/hooks/useChangelog";
import type { ChangelogEntry, ChangelogVersionType } from "@/types/changelog";
import { EmailSubscriptionForm } from "@/components/changelog/EmailSubscriptionForm";
import { VersionComparison } from "@/components/changelog/VersionComparison";
import { ReleaseCalendar } from "@/components/changelog/ReleaseCalendar";

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

export default function ChangelogPage() {
  const [selectedVersion, setSelectedVersion] = useState<ChangelogEntry | null>(null);
  const {
    filteredChangelog,
    changelog,
    filters,
    updateFilters,
    resetFilters,
  } = useChangelog();

  const scrollToContent = () => {
    document.getElementById("changelog-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Changelog | nbcon.ai</title>
        <meta
          name="description"
          content="Stay up to date with the latest features, improvements, and fixes in nbcon.ai"
        />
        <meta property="og:title" content="Changelog | nbcon.ai" />
        <meta
          property="og:description"
          content="Stay up to date with the latest features, improvements, and fixes"
        />
        {/* RSS Feed Auto-discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="nbcon.ai Changelog RSS Feed"
          href="/api/changelog/rss"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="nbcon.ai Changelog Atom Feed"
          href="/api/changelog/atom"
        />
      </Head>

      <SimpleHeroSection
        headline="What's New in nbcon.ai"
        description="Stay up to date with the latest features, improvements, and fixes"
        cta={{
          primary: {
            text: "Subscribe to Updates",
            onClick: () => {
              document.getElementById("email-subscription")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          secondary: {
            text: "View All Versions",
            onClick: scrollToContent,
          },
        }}
        backgroundVariant="minimal"
      />

      <main id="changelog-content" className="container mx-auto px-4 py-12 md:py-20">
        {/* RSS Feed Links */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="label-text">Subscribe to updates:</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/api/changelog/rss" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Rss className="h-4 w-4" />
                RSS Feed
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/api/changelog/atom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Rss className="h-4 w-4" />
                Atom Feed
              </a>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search changelog..."
                value={filters.searchQuery}
                onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select
              value={filters.typeFilter}
              onValueChange={(value) =>
                updateFilters({ typeFilter: value as ChangelogVersionType | "all" })
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Version Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="major">Major</SelectItem>
                <SelectItem value="minor">Minor</SelectItem>
                <SelectItem value="patch">Patch</SelectItem>
                <SelectItem value="hotfix">Hotfix</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={filters.categoryFilter}
              onValueChange={(value) =>
                updateFilters({ categoryFilter: value as keyof ChangelogEntry["categories"] | "all" })
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="features">Features</SelectItem>
                <SelectItem value="improvements">Improvements</SelectItem>
                <SelectItem value="bugFixes">Bug Fixes</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="breakingChanges">Breaking Changes</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="body-small">
            Showing {filteredChangelog.length} of {changelog.length} versions
          </p>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="timeline" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="compare">
              <GitCompare className="h-4 w-4 mr-2" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="subscribe">
              Subscribe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-6">
            {/* Version Timeline */}
            <div className="space-y-6">
          {filteredChangelog.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="body-large">No versions found matching your filters.</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredChangelog.map((entry) => (
              <VersionCard
                key={entry.version}
                entry={entry}
                onViewDetails={() => setSelectedVersion(entry)}
              />
            ))
          )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <ReleaseCalendar changelog={changelog} />
          </TabsContent>

          <TabsContent value="compare" className="mt-6">
            <VersionComparison changelog={changelog} />
          </TabsContent>

          <TabsContent value="subscribe" className="mt-6">
            <div id="email-subscription">
              <EmailSubscriptionForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Version Detail Modal */}
      {selectedVersion && (
        <VersionDetailModal
          entry={selectedVersion}
          open={!!selectedVersion}
          onOpenChange={(open) => !open && setSelectedVersion(null)}
        />
      )}
    </>
  );
}

function VersionCard({
  entry,
  onViewDetails,
}: {
  entry: ChangelogEntry;
  onViewDetails: () => void;
}) {
  const Icon = categoryIcons.features;
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/changelog/${entry.version}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `nbcon.ai v${entry.version} Release Notes`,
          text: `Check out what's new in nbcon.ai v${entry.version}`,
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

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/changelog/${entry.version}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Link href={`/changelog/${entry.version}`} className="hover:underline">
                  <h3 className="subsection-heading">v{entry.version}</h3>
                </Link>
                <Badge className={typeColors[entry.type]} variant="outline">
                  {entry.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="label-text">
                  {formatDate(entry.date)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 w-8 p-0"
              title="Share version"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyLink}
              className={`h-8 w-8 p-0 ${copied ? "bg-green-500/10" : ""}`}
              title="Copy link"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" onClick={onViewDetails}>
              View Details
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Highlights */}
          <div>
            <h4 className="card-title mb-3">Highlights</h4>
            <ul className="space-y-2">
              {entry.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 body-regular">
                  <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Preview */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(entry.categories).map(([category, items]) => {
              if (!items || (Array.isArray(items) && items.length === 0)) return null;
              const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <Badge key={category} variant="outline" className="gap-1">
                  {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </Badge>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function VersionDetailModal({
  entry,
  open,
  onOpenChange,
}: {
  entry: ChangelogEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <DialogTitle className="subsection-heading">v{entry.version}</DialogTitle>
            <Badge className={typeColors[entry.type]} variant="outline">
              {entry.type}
            </Badge>
          </div>
          <DialogDescription className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(entry.date)}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Full Notes */}
          {entry.fullNotes && (
            <div>
              <h4 className="card-title mb-2">Release Notes</h4>
              <p className="body-regular">{entry.fullNotes}</p>
            </div>
          )}

          {/* Categories */}
          {Object.entries(entry.categories).map(([category, items]) => {
            if (!items || (Array.isArray(items) && items.length === 0)) return null;
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <div key={category}>
                <h4 className="card-title mb-3 flex items-center gap-2">
                  {CategoryIcon && <CategoryIcon className="h-5 w-5" />}
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h4>
                <ul className="space-y-2">
                  {Array.isArray(items) ? (
                    items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 body-regular">
                        <ChevronRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="body-regular">{items}</li>
                  )}
                </ul>
              </div>
            );
          })}

          {/* Related Docs */}
          {entry.relatedDocs && entry.relatedDocs.length > 0 && (
            <div>
              <h4 className="card-title mb-3">Related Documentation</h4>
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
            </div>
          )}

          {/* Share Section */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="label-text">Share this version:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  const url = `${window.location.origin}/changelog/${entry.version}`;
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: `nbcon.ai v${entry.version} Release Notes`,
                        text: `Check out what's new in nbcon.ai v${entry.version}`,
                        url,
                      });
                    } catch (err) {
                      // User cancelled
                    }
                  } else {
                    await navigator.clipboard.writeText(url);
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link href={`/changelog/${entry.version}`}>
                  View Full Page
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

