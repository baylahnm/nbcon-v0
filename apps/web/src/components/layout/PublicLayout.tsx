import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { LandingFooter } from "@/components/ui/landing-footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}

