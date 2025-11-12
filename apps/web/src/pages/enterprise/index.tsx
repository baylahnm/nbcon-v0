"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { TrustedBySection } from "@/components/ui/trusted-by-section";
import { RouteWrapper } from "@/components/portal/shared/RouteWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Building2,
  Phone,
  MessageSquare,
  ArrowRight,
  Shield,
  Lock,
  Users,
  Settings,
  Globe,
  Award,
  Database,
  ExternalLink,
  Zap,
  BarChart3,
  Bot,
  TrendingUp,
  Activity,
  BookOpen,
  FileText,
  Code,
  Search,
  Star,
  ThumbsUp,
} from "lucide-react";
import { showToast } from "@/hooks/use-toast";

interface EnterpriseContactForm {
  company: string;
  email: string;
  phone?: string;
  message: string;
}

export default function EnterprisePage() {
  const [formData, setFormData] = useState<EnterpriseContactForm>({
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/enterprise/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        const errorMessage = errorData.error || "Failed to submit form";
        setError(errorMessage);
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }

      setIsSuccess(true);
      setFormData({ company: "", email: "", phone: "", message: "" });
      showToast("Inquiry sent successfully! Our team will contact you within 24 hours.", "success");
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      if (!errorMessage.includes("Failed to submit form")) {
        showToast(errorMessage, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-sales");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <RouteWrapper featureTier="free">
      <Head>
        <title>Enterprise Solutions | nbcon.ai</title>
        <meta
          name="description"
          content="Develop enduring software at scale with nbcon.ai Enterprise solutions"
        />
      </Head>

      {/* Hero Section */}
      <SimpleHeroSection
        headline="Develop enduring software at scale"
        description="Empower your engineering teams with enterprise-grade AI tools, security, and support built for scale."
        cta={{
          primary: {
            text: "Contact sales",
            onClick: scrollToContact,
          },
          secondary: {
            text: "Learn more",
            onClick: scrollToContact,
          },
        }}
        backgroundVariant="gradient"
      />

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Ship better software, faster */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="subsection-heading">
                Ship better software, faster
              </h3>
              <p className="body-large">
                nbcon.ai helps your entire team deliver ambitious products.
              </p>
            </div>
            <Card className="w-full border-border overflow-hidden">
              {/* Browser Header */}
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">nbcon.ai/dashboard</span>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="card-title">Your Dashboard Overview</CardTitle>
                  <CardDescription className="card-description">
                    Track your usage and productivity metrics
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* AI Credits */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="stat-label">AI Credits</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                          Active
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="stat-medium">158</span>
                          <span className="text-sm text-muted-foreground">/ 500</span>
                        </div>
                        <Progress value={31.6} className="h-2" />
                        <p className="label-text">342 used today</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Projects */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-primary" />
                          <span className="stat-label">Projects</span>
                        </div>
                        <Badge variant="outline" className="text-xs text-green-600 dark:text-green-400">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +23%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="stat-medium">12</p>
                        <p className="label-text">Active projects</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Conversations */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="stat-label">Conversations</span>
                      </div>
                      <div className="space-y-2">
                        <p className="stat-medium">28</p>
                        <p className="label-text">Total chats</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Requests */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-primary" />
                          <span className="stat-label">AI Requests</span>
                        </div>
                        <Activity className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="space-y-2">
                        <p className="stat-medium">1,247</p>
                        <p className="label-text">This month</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your engineering knowledge base */}
      <section className="py-24 md:py-32 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="w-full border-border overflow-hidden order-2 md:order-1">
              {/* Browser Header */}
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">nbcon.ai/knowledge-base</span>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="card-title">Engineering Knowledge Base</CardTitle>
                  <CardDescription className="card-description">
                    Indexed codebase insights and documentation
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Indexed Files */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Indexed Files</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">12,847</p>
                        <p className="label-text">Total files</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Code Repositories */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Repositories</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-xs text-muted-foreground">Monorepos indexed</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documentation */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Documentation</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">1,234</p>
                        <p className="text-xs text-muted-foreground">Docs pages</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Search Queries */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Queries</span>
                        </div>
                        <Activity className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">8,432</p>
                        <p className="label-text">This month</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-6 order-1 md:order-2">
              <h3 className="subsection-heading">
                Your engineering knowledge base
              </h3>
              <p className="body-large">
                Architected for complex codebases built by thousands of developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loved by developers */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="subsection-heading">
                Loved by developers
              </h3>
              <p className="body-large">
                In head-to-head evaluations, 93% of engineers select nbcon.ai as their preferred AI coding tool.
              </p>
            </div>
            <Card className="w-full border-border overflow-hidden">
              {/* Browser Header */}
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">nbcon.ai/satisfaction</span>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="card-title">Developer Satisfaction</CardTitle>
                  <CardDescription className="card-description">
                    Real feedback from engineering teams
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Satisfaction Score */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Satisfaction</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">93%</span>
                        </div>
                        <Progress value={93} className="h-2" />
                        <p className="text-xs text-muted-foreground">Preferred AI tool</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Users */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Active Users</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">50K+</p>
                        <p className="text-xs text-muted-foreground">Engineers</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Positive Reviews */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-muted-foreground">Reviews</span>
                        </div>
                        <Badge variant="outline" className="text-xs text-green-600 dark:text-green-400">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +15%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">4.9/5</p>
                        <p className="text-xs text-muted-foreground">Average rating</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Adoption Rate */}
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Adoption</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">87%</p>
                        <p className="text-xs text-muted-foreground">Team adoption</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Powerful, yet customizable */}
      <section className="py-24 md:py-32 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 mb-16">
            <h2 className="section-heading">
              Powerful, yet customizable
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              Standardize your engineering team on the same tools and best practices.
            </p>
            <Button onClick={scrollToContact} size="lg" variant="outline">
              Contact sales
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Total control */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="card-title text-2xl">Total control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Globally configure model access, MCP controls, and system-level agent rules.
                </p>
                <Link
                  href="/docs/enterprise/controls"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View enterprise controls
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Access the best models */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="card-title text-2xl">Access the best models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Choose between frontier models from OpenAI, Anthropic, Gemini, and xAI.
                </p>
                <Link
                  href="/docs/models"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View available models
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Ship with confidence */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="card-title text-2xl">Ship with confidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Use nbcon.ai to catch real bugs and security issues before they make it into production.
                </p>
                <Link
                  href="/docs/bugbot"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more about Bugbot
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-heading text-center mb-16">
            AI is changing how software is built.
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="stat-large text-primary">64%</div>
              <p className="body-large">
                Fortune 500 companies using nbcon.ai.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="stat-large text-primary">50,000+</div>
              <p className="body-large">
                Enterprises choose to build with nbcon.ai.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="stat-large text-primary">100M+</div>
              <p className="body-large">
                Lines of enterprise code written per day with nbcon.ai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-24 md:py-32 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="section-heading">
              Trusted by companies worldwide
            </h2>
            <p className="body-large max-w-3xl mx-auto">
              Built with security and compliance at the core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Dedicated guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deploy AI at scale with professional expertise.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Premium support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tailored support for teams with specialized needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Zero data retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No training on your data by nbcon.ai or LLM providers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Identity management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  SAML-based SSO integration for secure user access.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>SCIM user provisioning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily create, update, and remove users and groups.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Centralized security controls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure model access, MCPs, and agent rules.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Global compliance standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Compliant with the requirements of GDPR and CCPA.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Third-party security certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  SOC 2 Type 2 certified and annual penetration testing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Robust data protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AES-256 encryption at rest and TLS 1.2+ in transit.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/trust-center"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Visit our Trust Center
              <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Read about our security
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-heading text-center mb-16">
            Modern engineering teams are powered by nbcon.ai.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <p className="text-lg italic">
                  &quot;nbcon.ai quickly grew from hundreds to thousands of extremely enthusiastic employees. We spend more on R&D and software creation than any other undertaking, and there&apos;s significant economic outcome.&quot;
                </p>
                <div>
                  <p className="font-semibold">Stripe</p>
                  <p className="text-sm text-muted-foreground">Enterprise Customer</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <p className="text-lg italic">
                  &quot;My favorite enterprise AI service is nbcon.ai. Every one of our engineers, some 40,000, are now assisted by AI and our productivity has gone up incredibly.&quot;
                </p>
                <div>
                  <p className="font-semibold">Jensen Huang</p>
                  <p className="text-sm text-muted-foreground">President & CEO, NVIDIA</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <p className="text-lg italic">
                  &quot;By February 2025, every engineer had utilized nbcon.ai, which has become the preferred IDE for most of our developers. Single engineers are now refactoring, upgrading, or building new codebases.&quot;
                </p>
                <div>
                  <p className="font-semibold">Coinbase</p>
                  <p className="text-sm text-muted-foreground">Enterprise Customer</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="space-y-4">
                <p className="text-lg italic">
                  &quot;nbcon.ai has transformed the way our engineering teams write and ship code, with adoption growing from 150 to over 500 engineers (~60% of our org!) in just a few weeks.&quot;
                </p>
                <div>
                  <p className="font-semibold">Albert Strasheim</p>
                  <p className="text-sm text-muted-foreground">CTO, Rippling</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button onClick={scrollToContact} size="lg">
              Bring nbcon.ai to your team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-heading text-center mb-16">
            Questions & Answers
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="usage-limits" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                How do usage limits work for enterprises?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Enterprise plans include custom usage limits tailored to your organization&apos;s needs. We work with you to set appropriate limits based on your team size, usage patterns, and requirements. Limits can be adjusted as your needs grow.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="large-codebases" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                How does nbcon.ai handle large-scale codebases and monorepos?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  nbcon.ai is architected to handle complex codebases built by thousands of developers. Our knowledge base system can index and understand large monorepos, providing context-aware assistance across your entire codebase.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-usage" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                How does nbcon.ai use my data?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We have zero data retention policies. Your code and data are never used to train models by nbcon.ai or our LLM providers. All data is encrypted at rest and in transit, and you maintain full control over your information.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security-certifications" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                What security certifications does nbcon.ai have?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  nbcon.ai is SOC 2 Type 2 certified and undergoes annual penetration testing. We comply with GDPR and CCPA requirements and maintain robust data protection with AES-256 encryption at rest and TLS 1.2+ in transit.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sso-scim" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                Does nbcon.ai support SSO and SCIM?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, nbcon.ai Enterprise includes SAML-based SSO integration for secure user access and SCIM user provisioning to easily create, update, and remove users and groups from your identity provider.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="on-premises" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                Does nbcon.ai support on-premises or VPC deployment?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, nbcon.ai Enterprise offers on-premises and VPC deployment options for organizations with strict data residency requirements. Contact our sales team to discuss deployment options.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="admin-controls" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                What admin controls are available?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Enterprise admins have centralized control over model access, MCP controls, and system-level agent rules. You can configure policies globally, manage user permissions, and track usage across your organization.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai-adoption" className="bg-surface rounded-lg px-6 border border-border/50 hover:border-border transition-colors">
              <AccordionTrigger className="text-left">
                How can I track AI adoption across my organization?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Our enterprise dashboard provides comprehensive analytics on AI adoption, usage patterns, and productivity metrics. You can track usage by team, project, and individual, helping you understand ROI and optimize your AI strategy.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact-sales" className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8 mb-12">
            <h2 className="section-heading">
              Get started with nbcon.ai Enterprise.
            </h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Sales</CardTitle>
              <CardDescription>
                Fill out the form below and our team will contact you within 24 hours to discuss your enterprise needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="card-title mb-2">Thank you!</h3>
                  <p className="text-muted-foreground">
                    We&apos;ve received your inquiry. Our team will contact you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="mt-6"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Company Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@company.com"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+966 XX XXX XXXX"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your enterprise needs, team size, and specific requirements..."
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Inquiry
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to be contacted by our sales team.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </RouteWrapper>
  );
}
