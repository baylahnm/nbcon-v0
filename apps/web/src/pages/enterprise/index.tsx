"use client";

import { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RouteWrapper } from "@/components/portal/shared/RouteWrapper";
import { CheckCircle2, Loader2, Mail, Building2, Phone, MessageSquare } from "lucide-react";
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

  return (
    <RouteWrapper featureTier="free">
      <Head>
        <title>Enterprise Solutions | NBCON PRO</title>
        <meta
          name="description"
          content="Contact our sales team for custom enterprise solutions"
        />
      </Head>
      <div className="container max-w-4xl py-12 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">NBCON PRO for Enterprise</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock secure integrations, compliance, and large-scale data automation for engineering teams.
            Get custom pricing and dedicated support tailored to your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Enterprise Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Unlimited Projects:</strong> Scale without limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Unlimited AI Tokens:</strong> 999,999+ daily tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Custom Integrations:</strong> Build tailored solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Dedicated Support:</strong> 24/7 priority assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>SLA Guarantees:</strong> Service level agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>SSO & Security:</strong> Enterprise-grade authentication</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Why Enterprise?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• On-premise deployment options</li>
                <li>• Custom AI model training</li>
                <li>• Advanced security and compliance</li>
                <li>• White-label solutions</li>
                <li>• Training and onboarding</li>
                <li>• Custom pricing based on your needs</li>
              </ul>
            </CardContent>
          </Card>
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
                <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
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
    </RouteWrapper>
  );
}
