"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, BookOpen, Mail } from "lucide-react";
import { useFAQ } from "@/hooks/useFAQ";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { FAQCategoryFilter } from "@/components/faq/FAQCategoryFilter";
import { PopularFAQs } from "@/components/faq/PopularFAQs";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "helpful" | "views">("recent");

  const { faqs, categories, loading, error } = useFAQ({
    filters: {
      searchQuery: "",
      categoryId: selectedCategoryId,
      sortBy,
    },
  });

  // Filter FAQs by search query (client-side for better UX)
  const filteredFaqs = faqs.filter((faq) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      faq.category?.name.toLowerCase().includes(query)
    );
  });

  // Get popular FAQs
  const popularFaqs = faqs.filter((f) => f.isPopular).slice(0, 6);

  // Group FAQs by category
  const faqsByCategory = categories.map((category) => ({
    category,
    faqs: filteredFaqs.filter((faq) => faq.category?.id === category.id),
  }));

  // FAQs without category
  const uncategorizedFaqs = filteredFaqs.filter((faq) => !faq.category);

  return (
    <>
      <Head>
        <title>FAQ | nbcon.ai</title>
        <meta name="description" content="Frequently asked questions about nbcon.ai" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: filteredFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </Head>

      <SimpleHeroSection
        headline="Frequently Asked Questions"
        description="Find answers to common questions about nbcon.ai"
        cta={{
          primary: {
            text: "Contact Support",
            href: "/support",
          },
          secondary: {
            text: "Browse Docs",
            href: "/docs",
          },
        }}
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Search Bar */}
        <div className="mb-8 sticky top-4 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
          <FAQSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <FAQCategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={setSelectedCategoryId}
          />
        </div>

        {/* Popular FAQs */}
        {popularFaqs.length > 0 && !searchQuery && !selectedCategoryId && (
          <div className="mb-12">
            <PopularFAQs faqs={popularFaqs} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="body-large">Loading FAQs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="body-large text-destructive">{error}</p>
          </div>
        )}

        {/* FAQs by Category */}
        {!loading && !error && (
          <>
            {selectedCategoryId || searchQuery ? (
              // Show filtered results
              <div className="mb-8">
                <h2 className="subsection-heading mb-6">
                  {searchQuery ? `Search Results (${filteredFaqs.length})` : "Results"}
                </h2>
                <FAQAccordion faqs={filteredFaqs} searchQuery={searchQuery} />
              </div>
            ) : (
              // Show FAQs grouped by category
              <div className="space-y-12">
                {faqsByCategory.map(
                  ({ category, faqs: categoryFaqs }) =>
                    categoryFaqs.length > 0 && (
                      <div key={category.id}>
                        <h2 className="subsection-heading mb-6">{category.name}</h2>
                        {category.description && (
                          <p className="body-regular text-muted-foreground mb-6">
                            {category.description}
                          </p>
                        )}
                        <FAQAccordion faqs={categoryFaqs} />
                      </div>
                    )
                )}

                {/* Uncategorized FAQs */}
                {uncategorizedFaqs.length > 0 && (
                  <div>
                    <h2 className="subsection-heading mb-6">General</h2>
                    <FAQAccordion faqs={uncategorizedFaqs} />
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {filteredFaqs.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="body-large mb-4">No FAQs found matching your criteria.</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedCategoryId(undefined)}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Still Have Questions? */}
        <Card className="mt-12 bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="subsection-heading mb-4">Still Have Questions?</h2>
              <p className="body-regular text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? We're here to help!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/support">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resources/forum">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Visit Community Forum
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Documentation
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
