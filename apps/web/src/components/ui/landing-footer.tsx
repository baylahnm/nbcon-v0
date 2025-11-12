"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { NbconLogo } from "@/components/ui/nbcon-logo";
import { LanguageToggle } from "@/components/ui/language-toggle";

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
    title: "Resources",
    links: [
      { id: 4, title: "Blog", url: "/resources/blog" },
      { id: 5, title: "Community", url: "/resources/community" },
      { id: 6, title: "Forum", url: "/resources/forum" },
      { id: 7, title: "Changelog", url: "/resources/changelog" },
    ],
  },
  {
    title: "Support",
    links: [
      { id: 8, title: "FAQ", url: "/faq" },
      { id: 9, title: "Support", url: "/support" },
      { id: 10, title: "Documentation", url: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { id: 11, title: "Careers", url: "/resources/careers" },
      { id: 12, title: "Enterprise", url: "/enterprise" },
      { id: 13, title: "Pricing", url: "/pricing" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="w-full border-t-[0.5px] border-border/50 dark:border-border-elevated/50 bg-background rounded-t-[30px] shadow-[0_-8px_20px_-4px_rgba(0,0,0,0.06),0_-2px_4px_-1px_rgba(0,0,0,0.03)] dark:shadow-[0_-8px_20px_-4px_rgba(0,0,0,0.15),0_-2px_4px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
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
            <LanguageToggle />
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
        <div className="mt-12 pt-8 border-t-[0.5px] border-border/50 dark:border-border-elevated/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 
              className="text-lg font-bold text-foreground leading-none tracking-tight" 
              style={{ fontFamily: "Carter One, cursive" }}
            >
              n.
            </h1>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} nbcon.ai. All rights reserved.
            </p>
          </div>
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
