"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { JobPosting } from "@/types/careers";

interface ApplicationFormProps {
  job: JobPosting;
  onSuccess?: () => void;
}

export function ApplicationForm({ job, onSuccess }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/careers/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobPostingId: job.id,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      toast({
        title: "Application submitted!",
        description: "We've received your application and will review it shortly.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
        portfolioUrl: "",
        githubUrl: "",
        linkedinUrl: "",
      });

      onSuccess?.();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="subsection-heading">Apply for {job.title}</CardTitle>
        <CardDescription className="body-large">
          Please fill out the form below to submit your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumeUrl">Resume/CV URL *</Label>
            <Input
              id="resumeUrl"
              name="resumeUrl"
              type="url"
              placeholder="https://example.com/resume.pdf"
              value={formData.resumeUrl}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <p className="body-small text-muted-foreground">
              Upload your resume to a file hosting service and paste the URL here
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Tell us why you're interested in this position..."
              value={formData.coverLetter}
              onChange={handleChange}
              rows={6}
              disabled={loading}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="portfolioUrl">Portfolio URL</Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                placeholder="https://yourportfolio.com"
                value={formData.portfolioUrl}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/username"
                value={formData.githubUrl}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedinUrl}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="pt-4 border-t-[0.5px] border-border/50">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ExternalLink className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            <p className="body-small text-muted-foreground mt-4 text-center">
              By submitting this application, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

