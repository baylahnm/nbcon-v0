"use client";

import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { useCommunity } from "@/hooks/useCommunity";
import { ContributorCard } from "@/components/community/ContributorCard";

export default function ContributorsPage() {
  const { contributors, loading, error } = useCommunity();

  return (
    <>
      <Head>
        <title>Contributors | Community | nbcon.ai</title>
        <meta name="description" content="Meet our amazing community contributors" />
      </Head>

      <SimpleHeroSection
        headline="Community Contributors"
        description="Recognizing the amazing people who make nbcon.ai better"
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {loading ? (
          <div className="text-center py-12">
            <p className="body-large">Loading contributors...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="body-large text-destructive">{error}</p>
          </div>
        ) : contributors.length === 0 ? (
          <div className="text-center py-12">
            <p className="body-large">No contributors found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributors.map((contributor, index) => (
              <ContributorCard key={contributor.id} contributor={contributor} rank={index + 1} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

