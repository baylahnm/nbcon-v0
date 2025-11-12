"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SimpleHeroSection } from "@/components/ui/simple-hero-section";
import { CheckCircle, Mail, GraduationCap, Zap, Users, Headphones, FileText, Upload } from "lucide-react";

const SCHOOLS = [
  { name: "King Saud University (KSU)", city: "الرياض" },
  { name: "King Fahd University of Petroleum & Minerals (KFUPM)", city: "الظهران" },
  { name: "King Abdulaziz University (KAU)", city: "جدة" },
  { name: "King Abdullah University of Science & Technology (KAUST)", city: "ثول" },
  { name: "Imam Mohammad Ibn Saud Islamic University (IMSIU)", city: "الرياض" },
  { name: "Princess Nourah bint Abdulrahman University (PNU)", city: "الرياض" },
  { name: "University of Jeddah", city: "جدة" },
  { name: "Umm Al-Qura University (UQU)", city: "مكة" },
  { name: "Taibah University", city: "المدينة" },
  { name: "Prince Mohammad Bin Fahd University (PMU)", city: "الخبر" },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "nbcon.ai Pro for 12 months",
    description: "Value 149 SAR/month — completely free",
  },
  {
    icon: Mail,
    title: "2,000 AI tokens/day",
    description: "Chat, tools, and domain agents included",
  },
  {
    icon: GraduationCap,
    title: "Unlimited projects",
    description: "For class use, research, and competitions",
  },
  {
    icon: Users,
    title: "Team/club invitations",
    description: "Optional collaboration features",
  },
  {
    icon: Headphones,
    title: "Priority support",
    description: "For student projects & competitions",
  },
];

export default function StudentsPage() {
  const [waitlistForm, setWaitlistForm] = useState({
    school: "",
    email: "",
    city: "",
    role: "Student",
    graduationYear: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/students/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(waitlistForm),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setWaitlistForm({
          school: "",
          email: "",
          city: "",
          role: "Student",
          graduationYear: "",
          notes: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Students | nbcon.ai</title>
        <meta name="description" content="Get 1 year of nbcon.ai Pro free when you verify your .edu.sa student status in Saudi Arabia." />
      </Head>
      <SimpleHeroSection
        headline="nbcon.ai for Students (KSA)"
        description="Get 1 year of nbcon.ai Pro free when you verify your .edu.sa student status."
        cta={{
          primary: {
            text: "Join with student email",
            href: "/auth/signup?student=1",
          },
          secondary: {
            text: "Verify another way",
            href: "/students/verify",
          },
        }}
        backgroundVariant="minimal"
      />
      <main className="container mx-auto px-4 py-12 md:py-20">

        {/* Active Schools */}
        <section className="mt-20">
          <div className="container mx-auto space-y-7 px-4 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <h2 className="subsection-heading">Active Universities (KSA)</h2>
              <p className="body-large max-w-2xl">
                Universities currently supported for student verification.
              </p>
            </div>
            <BentoGrid className="w-full md:grid-cols-3">
              {SCHOOLS.map((school, index) => (
                <BentoGridItem
                  key={school.name}
                  title={school.name}
                  description={school.city}
                  header={
                    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                  }
                  icon={<CheckCircle className="h-4 w-4 text-primary" />}
                  className={index === SCHOOLS.length ? "md:col-span-2" : ""}
                />
              ))}
              <BentoGridItem
                title="More coming soon"
                description="Not listed? Join the waitlist below."
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 p-4 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-muted-foreground" />
                  </div>
                }
                icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
                className="md:col-span-1"
              />
            </BentoGrid>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-20">
          <div className="container mx-auto space-y-7 px-4 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <h2 className="subsection-heading">What You Get</h2>
              <p className="body-large max-w-2xl">
                All the benefits included with your free Pro access.
              </p>
            </div>
            <BentoGrid className="w-full md:grid-cols-3">
              {BENEFITS.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <BentoGridItem
                    key={benefit.title}
                    title={benefit.title}
                    description={benefit.description}
                    header={
                      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    }
                    icon={<Icon className="h-4 w-4 text-primary" />}
                    className={index === BENEFITS.length - 1 && BENEFITS.length % 3 !== 0 ? "md:col-span-2" : ""}
                  />
                );
              })}
            </BentoGrid>
          </div>
        </section>

        {/* Eligibility & How Verification Works */}
        <section className="mt-20">
          <div className="container mx-auto space-y-7 px-4 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <h2 className="subsection-heading">Get Started</h2>
              <p className="body-large max-w-2xl">
                Everything you need to know about eligibility and verification.
              </p>
            </div>
            <BentoGrid className="w-full md:grid-cols-2">
              {/* Eligibility */}
              <BentoGridItem
                title="Eligibility"
                description="Requirements to qualify for free Pro access"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">Valid <span className="font-mono">.edu.sa</span> email <strong className="text-foreground">or</strong> student ID/enrollment letter</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">Undergraduate, graduate, or research student in KSA</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">One redemption per person; non-transferable</p>
                      </div>
                    </div>
                  </div>
                }
                icon={<CheckCircle className="h-4 w-4 text-primary" />}
                className="md:col-span-1"
              />

              {/* How Verification Works */}
              <BentoGridItem
                title="How Verification Works"
                description="Two simple ways to verify your student status"
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                    <div className="space-y-4 w-full">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Sign up with <span className="font-mono">.edu.sa</span></p>
                          <p className="text-xs text-muted-foreground mt-1">Click the verification link sent to your email</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Or upload student ID/enrollment letter</p>
                          <p className="text-xs text-muted-foreground mt-1">Manual review typically completes within 24–72 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                icon={<Upload className="h-4 w-4 text-primary" />}
                className="md:col-span-1"
              />
            </BentoGrid>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <div className="container mx-auto space-y-7 px-4 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <h2 className="subsection-heading">Frequently Asked Questions</h2>
              <p className="body-large max-w-2xl">
                Find answers to common questions about nbcon.ai for students. If you don't find what you're looking for, feel free to reach out to our support team.
              </p>
            </div>
            <Accordion type="single" collapsible className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg" defaultValue="q1">
              <AccordionItem value="q1" className="relative border-x border-border dark:border-border/50 first:rounded-t-lg first:border-t first:border-border dark:first:border-border/50 last:rounded-b-lg last:border-b last:border-border dark:last:border-border/50">
                <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                  Is it really free?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 px-4">
                  <div className="space-y-2">
                    <p>Yes—12 months of Pro, no credit card required. Your plan auto-downgrades to Free after 12 months unless you upgrade.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="relative border-x border-border dark:border-border/50 first:rounded-t-lg first:border-t first:border-border dark:first:border-border/50 last:rounded-b-lg last:border-b last:border-border dark:last:border-border/50">
                <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                  What happens after 12 months?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 px-4">
                  <div className="space-y-2">
                    <p>Auto-downgrade to Free unless you upgrade. No surprise charges.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="relative border-x border-border dark:border-border/50 first:rounded-t-lg first:border-t first:border-border dark:first:border-border/50 last:rounded-b-lg last:border-b last:border-border dark:last:border-border/50">
                <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                  Not listed school?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 px-4">
                  <div className="space-y-2">
                    <p>Join the waitlist below; we'll enable your domain once verified.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4" className="relative border-x border-border dark:border-border/50 first:rounded-t-lg first:border-t first:border-border dark:first:border-border/50 last:rounded-b-lg last:border-b last:border-border dark:last:border-border/50">
                <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                  Privacy/PDPL?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 px-4">
                  <div className="space-y-2">
                    <p>
                      We follow KSA PDPL. Student docs are encrypted, retained only as required. See{" "}
                      <Link href="/legal/privacy" className="text-primary hover:underline">
                        /legal/privacy
                      </Link>
                      .
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5" className="relative border-x border-border dark:border-border/50 first:rounded-t-lg first:border-t first:border-border dark:first:border-border/50 last:rounded-b-lg last:border-b last:border-border dark:last:border-border/50">
                <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                  Allowed use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 px-4">
                  <div className="space-y-2">
                    <p>Coursework, research, clubs, competitions. No commercial resale.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <p className="text-muted-foreground">
              Can't find what you're looking for? Contact our{" "}
              <Link href="#" className="text-primary hover:underline">
                customer support team
              </Link>
            </p>
          </div>
        </section>

        {/* Waitlist */}
        <section className="mt-20">
          <div className="container mx-auto space-y-7 px-4 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <h2 className="subsection-heading">Join the Waitlist</h2>
              <p className="body-large max-w-2xl">
                Your school not listed? Join the waitlist and we'll notify you when it's available.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="max-w-2xl border border-border rounded-2xl p-6 md:p-8 bg-card dark:bg-card/50">
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="school">Your School *</Label>
                    <Input
                      id="school"
                      name="school"
                      placeholder="e.g., King Saud University"
                      required
                      value={waitlistForm.school}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, school: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your .edu.sa Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@university.edu.sa"
                      required
                      value={waitlistForm.email}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Riyadh"
                        value={waitlistForm.city}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        name="role"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={waitlistForm.role}
                        onChange={(e) => setWaitlistForm({ ...waitlistForm, role: e.target.value })}
                      >
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Club">Club</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      placeholder="2025"
                      min="2024"
                      max="2030"
                      value={waitlistForm.graduationYear}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, graduationYear: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Input
                      id="notes"
                      name="notes"
                      placeholder="Student club, competition, etc."
                      value={waitlistForm.notes}
                      onChange={(e) => setWaitlistForm({ ...waitlistForm, notes: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Join Waitlist"}
                  </Button>
                  {submitStatus === "success" && (
                    <p className="text-sm text-green-600 dark:text-green-400 text-center">
                      ✓ Successfully joined waitlist! We'll notify you when your school is available.
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-sm text-destructive text-center">
                      There was an error submitting your request. Please try again.
                    </p>
                  )}
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  For verification alternatives, see{" "}
                  <Link href="/students/verify" className="text-primary hover:underline">
                    /students/verify
                  </Link>
                  .
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
