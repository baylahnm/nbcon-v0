"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowRight, 
  Square, 
  FileText, 
  Eye, 
  Gauge,
  BookOpen,
  MessageSquare,
  Users,
  Briefcase,
  Menu
} from "lucide-react";
import { NbconLogo } from "@/components/ui/nbcon-logo";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border dark:border-[#2d2d2d] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="home" className="flex items-center">
          <NbconLogo asLink={false} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Templates */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-foreground bg-transparent hover:bg-transparent data-[state=open]:bg-transparent h-auto px-3 py-1">
                  Templates
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[600px] lg:w-[700px] lg:grid-cols-[1fr_200px] dark:bg-popover dark:border dark:border-border/80">
                    {/* Featured Templates Section */}
                    <div className="row-span-3">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-sm font-semibold leading-none dark:text-foreground">Featured Templates</h3>
                          <p className="text-xs text-muted-foreground mt-1.5 dark:text-muted-foreground">Remix from top creators</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-24 rounded-md bg-muted/50 border border-border flex items-center justify-center dark:bg-muted/20 dark:border dark:border-border/60 dark:hover:bg-muted/30 dark:hover:border-border/80 transition-colors">
                          <div className="text-xs text-muted-foreground dark:text-muted-foreground">Dashboard</div>
                        </div>
                        <div className="h-24 rounded-md bg-muted/50 border border-border flex items-center justify-center dark:bg-muted/20 dark:border dark:border-border/60 dark:hover:bg-muted/30 dark:hover:border-border/80 transition-colors">
                          <div className="text-xs text-muted-foreground dark:text-muted-foreground">Map UI</div>
                        </div>
                        <div className="h-24 rounded-md bg-muted/50 border border-border flex items-center justify-center dark:bg-muted/20 dark:border dark:border-border/60 dark:hover:bg-muted/30 dark:hover:border-border/80 transition-colors">
                          <div className="text-xs text-muted-foreground dark:text-muted-foreground">Control Panel</div>
                        </div>
                        <div className="h-24 rounded-md bg-muted/50 border border-border flex items-center justify-center dark:bg-muted/20 dark:border dark:border-border/60 dark:hover:bg-muted/30 dark:hover:border-border/80 transition-colors">
                          <div className="text-xs text-muted-foreground dark:text-muted-foreground">Landing</div>
                        </div>
                      </div>
                    </div>
                    {/* Categories Section */}
                    <div className="space-y-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/survey-templates"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Survey Templates</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/gis-layouts"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">GIS Layouts</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/site-control"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Gauge className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Site Control</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/landing-pages"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Landing Pages</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Features */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/features" className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    "text-foreground/80 hover:text-foreground hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}>
                    Features
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Enterprise */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/enterprise" className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    "text-foreground/80 hover:text-foreground hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}>
                    Enterprise
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Pricing */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/pricing" className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    "text-foreground/80 hover:text-foreground hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}>
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Resources Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground data-[state=open]:text-foreground bg-transparent hover:bg-transparent data-[state=open]:bg-transparent h-auto px-3 py-1">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 md:w-[400px]">
                    <div className="space-y-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/resources/changelog"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Changelog</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/docs"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Docs</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/resources/forum"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Forum</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/resources/blog"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Blog</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/resources/community"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Community</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/resources/careers"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Careers</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* iOS */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/ios" className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    "text-foreground/80 hover:text-foreground hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}>
                    iOS
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Students */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/students" className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    "text-foreground/80 hover:text-foreground hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}>
                    Students
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* FAQ */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/faq" className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    "text-foreground/80 hover:text-foreground hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  )}>
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/templates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="/enterprise"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Enterprise
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pl-4 border-l">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Resources
                </div>
                <Link
                  href="/resources/changelog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Changelog
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Docs
                </Link>
                <Link
                  href="/resources/forum"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Forum
                </Link>
                <Link
                  href="/resources/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/resources/community"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Community
                </Link>
                <Link
                  href="/resources/careers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </div>
              <Link
                href="/ios"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                iOS
              </Link>
              <Link
                href="/students"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Students
              </Link>
              <Link
                href="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Right Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="h-8 text-sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="h-8 text-sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
