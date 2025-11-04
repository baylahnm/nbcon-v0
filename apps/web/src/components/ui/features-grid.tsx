"use client";

import { ProjectCard } from "@/components/ui/project-card";
import { motion } from "framer-motion";

const features = [
  {
    imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    title: "Project as Chat",
    description: "Transform your project workflow into natural conversations. Build, iterate, and collaborate through intuitive chat interfaces.",
    link: "#",
    linkText: "Learn more"
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    title: "AI Co-Pilot",
    description: "Your intelligent assistant that understands engineering workflows. Get real-time suggestions and automate repetitive tasks.",
    link: "#",
    linkText: "Explore AI"
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop",
    title: "Field-to-Report",
    description: "Seamless workflow from field data collection to final report generation. Connect your entire project lifecycle.",
    link: "#",
    linkText: "See workflow"
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    title: "Multi-Agent Team",
    description: "Orchestrate multiple AI agents working together on complex projects. Each agent specializes in different aspects of your work.",
    link: "#",
    linkText: "Meet the team"
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Powerful Features for Modern Engineering
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline your workflow and boost productivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
