"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NbconLogoProps {
  className?: string;
  showMobileMenu?: boolean;
  onMobileMenuClick?: () => void;
  asLink?: boolean;
}

export const NbconLogo = ({
  className,
  showMobileMenu = false,
  onMobileMenuClick,
  asLink = true,
}: NbconLogoProps) => {
  const logoContent = (
    <div className="flex items-center">
      {/* Full logo - hidden when collapsed */}
      <h1
        className="text-2xl font-bold text-foreground leading-none tracking-tight group-data-[collapsible=icon]:hidden"
        style={{ fontFamily: "Carter One, cursive" }}
      >
        nbcon.
      </h1>
      {/* Collapsed logo - shown only when collapsed */}
      <h1
        className="hidden text-2xl font-bold text-foreground leading-none tracking-tight group-data-[collapsible=icon]:block"
        style={{ fontFamily: "Carter One, cursive" }}
      >
        n.
      </h1>
    </div>
  );

  return (
    <div className={cn("flex w-full justify-between lg:w-auto", className)}>
      {asLink ? (
        <Link href="/" aria-label="home" className="flex items-center space-x-2">
          {logoContent}
        </Link>
      ) : (
        <div className="flex items-center space-x-2">
          {logoContent}
        </div>
      )}
      {showMobileMenu && (
        <button
          className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
          aria-label="Open Menu"
          onClick={onMobileMenuClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="m-auto size-6 duration-200"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

