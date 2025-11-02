"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProjectCard {
  id: string;
  title: string;
  thumbnail: string;
  creator: {
    name: string;
    avatar: string;
  };
  views: number;
  likes: number;
}

// Mock project data - replace with real data from your API
const projects: ProjectCard[] = [
  {
    id: "1",
    title: "Brilliance SaaS Landing Page",
    thumbnail: "/placeholder-project-1.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 4900,
    likes: 801,
  },
  {
    id: "2",
    title: "3D Gallery Photography Template",
    thumbnail: "/placeholder-project-2.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 1500,
    likes: 347,
  },
  {
    id: "3",
    title: "AI Gateway Starter",
    thumbnail: "/placeholder-project-3.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 252,
    likes: 53,
  },
  {
    id: "4",
    title: "Pointer AI Landing Page",
    thumbnail: "/placeholder-project-4.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 14000,
    likes: 1000,
  },
  {
    id: "5",
    title: "Dashboard – M.O.N.K.Y",
    thumbnail: "/placeholder-project-5.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 6800,
    likes: 646,
  },
  {
    id: "6",
    title: "Skal Ventures Template",
    thumbnail: "/placeholder-project-6.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 2900,
    likes: 388,
  },
  {
    id: "7",
    title: "Shaders Landing Page",
    thumbnail: "/placeholder-project-7.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 639,
    likes: 147,
  },
  {
    id: "8",
    title: "Storefront w/Nano Banana + AI SDK",
    thumbnail: "/placeholder-project-8.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 1800,
    likes: 250,
  },
  {
    id: "9",
    title: "Shaders Hero Section",
    thumbnail: "/placeholder-project-9.jpg",
    creator: { name: "Community", avatar: "/placeholder-avatar.jpg" },
    views: 8900,
    likes: 1200,
  },
];

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function CommunityShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">From the Community</h2>
            <p className="text-muted-foreground">
              Explore what the community is building with NBCON PRO
            </p>
          </div>
          <Link href="#browse-all">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2">
              Browse All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted to-accent/10 flex items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {project.id}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Metrics */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span>{formatNumber(project.views)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Heart className="h-4 w-4" />
                        <span>{formatNumber(project.likes)}</span>
                      </div>
                    </div>
                    {/* Creator Avatar Placeholder */}
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                      {project.creator.name[0]}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

