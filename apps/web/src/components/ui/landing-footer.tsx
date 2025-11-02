"use client";

import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/billing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#enterprise"
              className="hover:text-foreground transition-colors"
            >
              Enterprise
            </Link>
            <Link
              href="/help"
              className="hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#legal"
              className="hover:text-foreground transition-colors"
            >
              Legal
            </Link>
            <Link
              href="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="#community"
              className="hover:text-foreground transition-colors"
            >
              NBCON Community
            </Link>
            <Link
              href="/"
              className="hover:text-foreground transition-colors font-medium"
            >
              NBCON
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

