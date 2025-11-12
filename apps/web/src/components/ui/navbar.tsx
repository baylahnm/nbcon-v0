"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowRight, 
  Navigation, 
  Map, 
  Building2, 
  Zap, 
  Cog, 
  Layers, 
  Leaf, 
  DollarSign,
  FileText,
  BookOpen,
  MessageSquare,
  Users,
  Briefcase,
  HelpCircle,
  LifeBuoy,
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
import { ToggleTheme } from "@/components/ui/toggle-theme";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border dark:border-border-elevated bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                  <div className="w-full p-6 md:w-[750px] lg:w-[900px] bg-popover">
                    {/* Header Section */}
                    <div className="mb-6 pb-4 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-foreground">Templates</h3>
                        <Link 
                          href="/templates" 
                          className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                        >
                          Browse all
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                      <p className="text-xs text-muted-foreground">Browse templates from all categories</p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/survey-templates"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-blue-500/50 hover:bg-blue-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                              <Navigation className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-blue-600 transition-colors flex-1">
                              Survey
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            GNSS, LiDAR, Photogrammetry
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/gis-layouts"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-green-500/50 hover:bg-green-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-green-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                              <Map className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-green-600 transition-colors flex-1">
                              GIS Layouts
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            Maps, Dashboards, Analysis
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/civil-templates"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-blue-500/50 hover:bg-blue-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                              <Building2 className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-blue-600 transition-colors flex-1">
                              Civil
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            Site Design, Infrastructure
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/electrical-templates"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                              <Zap className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-yellow-600 transition-colors flex-1">
                              Electrical
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            Load Schedules, Panels
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/mechanical-templates"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-purple-500/50 hover:bg-purple-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                              <Cog className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-purple-600 transition-colors flex-1">
                              Mechanical
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            HVAC, Piping Systems
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/geotechnical-templates"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-amber-500/50 hover:bg-amber-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                              <Layers className="h-4 w-4 text-amber-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-amber-600 transition-colors flex-1">
                              Geotechnical
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            Soil Analysis, Foundations
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/environmental-templates"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                              <Leaf className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-emerald-600 transition-colors flex-1">
                              Environmental
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            Impact Assessments, Compliance
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/templates/finance-templates"
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-lg border border-border/50 p-3",
                            "hover:border-green-500/50 hover:bg-green-500/5 transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-green-500/20"
                          )}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div className="p-1.5 rounded-md bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                              <DollarSign className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="text-xs font-medium text-foreground group-hover:text-green-600 transition-colors flex-1">
                              Finance
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            Cost Estimation, Budgets
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
                      <NavigationMenuLink asChild>
                        <Link
                          href="/faq"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">FAQ</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/support"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <LifeBuoy className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">Support</div>
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
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mb-6"
            >
              <h1 
                className="text-lg font-bold text-foreground leading-none tracking-tight mt-0"
                style={{ fontFamily: '"Carter One", cursive' }}
              >
                nbcon.ai
              </h1>
            </Link>
            <nav className="flex flex-col gap-4">
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
                <Link
                  href="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  Support
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
              <div className="flex flex-col gap-2 pt-4 border-t">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-foreground">Theme</span>
                  <ToggleTheme />
                </div>
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
          <ToggleTheme />
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
