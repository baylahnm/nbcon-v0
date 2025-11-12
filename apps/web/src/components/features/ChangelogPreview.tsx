"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

const recentVersions = [
  {
    version: "1.0.0",
    date: "2025-11-02",
    highlights: [
      "AI Agent Ecosystem with 7 specialized agents",
      "Multi-domain agent framework (Civil, Electrical, Mechanical, Survey, GIS)",
      "Stripe integration for subscription management",
      "Real-time tier updates and billing dashboard",
    ],
  },
  {
    version: "0.1.0",
    date: "2025-11-02",
    highlights: [
      "Initial project setup",
      "Core monorepo structure",
      "TypeScript foundation",
    ],
  },
];

export function ChangelogPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Calendar className="mr-2 h-3 w-3" />
            Changelog
          </Badge>
          <h2 className="subsection-heading mb-6">
            What's new in nbcon.ai
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Stay up to date with the latest features, improvements, and fixes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {recentVersions.map((version, index) => (
            <motion.div
              key={version.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="card-title text-2xl">v{version.version}</h3>
                  <span className="text-sm text-muted-foreground">{version.date}</span>
                </div>
                <ul className="space-y-2">
                  {version.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/docs/core/phase-summaries"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View full changelog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

