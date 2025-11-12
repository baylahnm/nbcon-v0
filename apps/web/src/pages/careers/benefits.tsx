"use client";

import { useState } from "react";
import Head from "next/head";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { useCareers } from "@/hooks/useCareers";
import { BenefitCard } from "@/components/careers/BenefitCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const benefitCategories = [
  { value: "all", label: "All Benefits" },
  { value: "compensation", label: "Compensation & Equity" },
  { value: "health", label: "Health & Wellness" },
  { value: "work-life", label: "Work-Life Balance" },
  { value: "development", label: "Professional Development" },
  { value: "office", label: "Office & Equipment" },
  { value: "additional", label: "Additional Perks" },
];

export default function BenefitsPage() {
  const { benefits, loading, error } = useCareers();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredBenefits =
    selectedCategory === "all"
      ? benefits
      : benefits.filter((b) => b.category === selectedCategory);

  // Group benefits by category
  const benefitsByCategory = filteredBenefits.reduce(
    (acc, benefit) => {
      if (!acc[benefit.category]) {
        acc[benefit.category] = [];
      }
      acc[benefit.category].push(benefit);
      return acc;
    },
    {} as Record<string, typeof benefits>
  );

  return (
    <>
      <Head>
        <title>Benefits | Careers | nbcon.ai</title>
        <meta name="description" content="Comprehensive benefits and perks at nbcon.ai" />
      </Head>

      <SimpleHeroSection
        headline="Perks & Benefits"
        description="We offer competitive benefits to support your health, growth, and work-life balance"
        backgroundVariant="minimal"
      />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {loading ? (
          <div className="text-center py-12">
            <p className="body-large">Loading benefits...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="body-large text-destructive">{error}</p>
          </div>
        ) : (
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
              {benefitCategories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {selectedCategory === "all" ? (
              <div className="space-y-12">
                {Object.entries(benefitsByCategory).map(([category, categoryBenefits]) => (
                  <div key={category}>
                    <h2 className="subsection-heading mb-6">
                      {benefitCategories.find((c) => c.value === category)?.label || category}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryBenefits.map((benefit) => (
                        <BenefitCard key={benefit.id} benefit={benefit} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TabsContent value={selectedCategory}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBenefits.map((benefit) => (
                    <BenefitCard key={benefit.id} benefit={benefit} />
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        )}
      </main>
    </>
  );
}

