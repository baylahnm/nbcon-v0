"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NbconLogo } from "@/components/ui/nbcon-logo";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NbconLogo
          showMobileMenu={isMobileMenuOpen}
          onMobileMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#templates"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
          >
            Templates
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Link>
          <Link
            href="#resources"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
          >
            Resources
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Link>
          <Link
            href="#enterprise"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Enterprise
          </Link>
          <Link
            href="/billing"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#ios"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            iOS
          </Link>
          <Link
            href="#students"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Students
          </Link>
          <Link
            href="/help"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </div>

        {/* Right Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

