"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { NbconLogo } from "@/components/ui/nbcon-logo";

const footerLinks = [
  {
    title: "Docs",
    links: [
      { id: 1, title: "Getting Started", url: "/docs" },
      { id: 2, title: "API Reference", url: "/docs/api" },
      { id: 3, title: "Tutorials", url: "/docs/tutorials" },
    ],
  },
  {
    title: "API",
    links: [
      { id: 4, title: "Documentation", url: "/docs/api" },
      { id: 5, title: "Authentication", url: "/docs/api/auth" },
      { id: 6, title: "Webhooks", url: "/docs/api/webhooks" },
    ],
  },
  {
    title: "Learn",
    links: [
      { id: 7, title: "Resources", url: "/resources" },
      { id: 8, title: "Blog", url: "#" },
      { id: 9, title: "Community", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { id: 10, title: "About", url: "#" },
      { id: 11, title: "Contact", url: "#" },
      { id: 12, title: "Careers", url: "#" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <NbconLogo asLink={false} />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Engineering precision meets AI-driven innovation.
            </p>
            {/* Language Toggle */}
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h3 className="text-sm font-semibold mb-4 text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                      <ChevronRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NBCON PRO. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
