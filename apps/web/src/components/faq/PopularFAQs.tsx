"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { FAQ } from "@/types/faq";

interface PopularFAQsProps {
  faqs: FAQ[];
  limit?: number;
}

export function PopularFAQs({ faqs, limit = 6 }: PopularFAQsProps) {
  const popularFaqs = faqs.slice(0, limit);

  if (popularFaqs.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="subsection-heading">Popular Questions</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularFaqs.map((faq) => (
          <Card key={faq.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <CardTitle className="card-title line-clamp-2">{faq.question}</CardTitle>
                {faq.isNew && (
                  <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400 flex-shrink-0">
                    New
                  </Badge>
                )}
              </div>
              {faq.category && (
                <Badge variant="secondary" className="text-xs">
                  {faq.category.name}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="body-small text-muted-foreground line-clamp-3 mb-4">
                {faq.answer}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{faq.views} views</span>
                  {faq.helpfulCount > 0 && (
                    <>
                      <span>•</span>
                      <span>{faq.helpfulCount} helpful</span>
                    </>
                  )}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/faq#${faq.id}`}>
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

