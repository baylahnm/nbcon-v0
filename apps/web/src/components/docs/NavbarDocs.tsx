"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarDocsMobile } from "./SidebarDocsMobile";
import { SidebarNode } from "./SidebarDocs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Fuse from "fuse.js";
import { useMemo } from "react";
import { NbconLogo } from "@/components/ui/nbcon-logo";
import { VersionSelector } from "./VersionSelector";
import { useI18n } from "@/hooks/useI18n";

interface SearchItem { title: string; slug: string; excerpt?: string }

export function NavbarDocs({ index, sidebar = [] }: { index: SearchItem[]; sidebar?: SidebarNode[] }) {
  const { locale, setLocale } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: ["title", "excerpt"],
        threshold: 0.3,
        includeScore: false,
      }),
    [index]
  );
  const results = query ? fuse.search(query).slice(0, 8) : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) root.classList.remove("dark");
    else root.classList.add("dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-[0.5px] border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {sidebar && sidebar.length > 0 && <SidebarDocsMobile items={sidebar} />}
          <NbconLogo />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm font-medium text-foreground hover:text-foreground transition-colors border-b-[0.5px] border-primary pb-1">
              Docs
            </Link>
            <Link href="/api" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              API
            </Link>
            <Link href="/learn" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Learn
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground border-[0.5px] border-border/50">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search docs...</span>
                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border-[0.5px] border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search docs..."
                    className="w-full rounded-md border-[0.5px] border-border/50 bg-background pl-10 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                </div>
                {results.length > 0 && (
                  <div className="mt-4 max-h-96 overflow-y-auto">
                    {results.map((r) => (
                      <Link
                        key={r.item.slug}
                        href={`/docs/${r.item.slug}`}
                        className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                      >
                        {r.item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <VersionSelector />
          <Button variant="ghost" size="sm" className="gap-2">
            <span className="hidden sm:inline">Ask AI</span>
            <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border-[0.5px] border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">⌘</span>I
            </kbd>
          </Button>
          <Button size="sm" variant="ghost" aria-label="Toggle theme" onClick={toggleTheme}>
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            aria-label="Switch language"
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
          >
            {locale === "ar" ? "EN" : "AR"}
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/auth/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
