"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Network, ShieldCheck, Layers, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Co-Pilot",
    description:
      "Civil, Electrical, Mechanical, Survey, and GIS agents designed to assist engineers intelligently in real time.",
  },
  {
    icon: Network,
    title: "Real-time Collaboration",
    description:
      "Collaborate with teams, share data layers, and review results simultaneously using Supabase Realtime.",
  },
  {
    icon: Layers,
    title: "Enterprise SDK & API",
    description:
      "Integrate NBCON PRO capabilities directly into enterprise systems through the official SDK and REST APIs.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    description:
      "Fully aligned with PDPL and ISO 27001 compliance standards. Every action is logged with RLS and audit trails.",
  },
  {
    icon: Zap,
    title: "Stripe Billing & Entitlements",
    description:
      "Automated subscription management with tier sync via Stripe Webhooks and Supabase Realtime updates.",
  },
  {
    icon: Users,
    title: "Multi-tier Subscriptions",
    description:
      "Flexible plans for freelancers, teams, and enterprises. Upgrade instantly as your needs evolve.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative z-10 bg-background py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Powering the Future of Engineering Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore NBCON PRO's key innovations designed to connect AI,
            geospatial data, and engineering precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-border/60 bg-card/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

