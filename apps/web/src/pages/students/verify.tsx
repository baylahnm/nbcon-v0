"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, AlertCircle, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@nbcon/config";

export default function StudentVerifyPage() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    studentId: "",
    school: "",
    enrollmentYear: "",
  });
  const [documents, setDocuments] = useState<{
    studentId?: File;
    enrollmentLetter?: File;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (type: "studentId" | "enrollmentLetter", file: File | null) => {
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Please upload a PDF, JPEG, or PNG file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB");
        return;
      }
      setDocuments((prev) => ({ ...prev, [type]: file }));
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validation
    if (!documents.studentId && !documents.enrollmentLetter) {
      setErrorMessage("Please upload at least one document (Student ID or Enrollment Letter)");
      setIsSubmitting(false);
      return;
    }

    try {
      const uploadedUrls: { studentIdDocUrl?: string; enrollmentLetterDocUrl?: string } = {};

      // Upload files to Supabase Storage
      if (documents.studentId) {
        const fileName = `student-verification/${Date.now()}-${documents.studentId.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("student-documents")
          .upload(fileName, documents.studentId, {
            contentType: documents.studentId.type,
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Failed to upload student ID: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("student-documents")
          .getPublicUrl(fileName);
        uploadedUrls.studentIdDocUrl = urlData.publicUrl;
      }

      if (documents.enrollmentLetter) {
        const fileName = `student-verification/${Date.now()}-${documents.enrollmentLetter.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("student-documents")
          .upload(fileName, documents.enrollmentLetter, {
            contentType: documents.enrollmentLetter.type,
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Failed to upload enrollment letter: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("student-documents")
          .getPublicUrl(fileName);
        uploadedUrls.enrollmentLetterDocUrl = urlData.publicUrl;
      }

      // Submit verification request with file URLs
      const response = await fetch("/api/students/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          studentId: formData.studentId,
          school: formData.school,
          enrollmentYear: formData.enrollmentYear || undefined,
          ...uploadedUrls,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          email: "",
          fullName: "",
          studentId: "",
          school: "",
          enrollmentYear: "",
        });
        setDocuments({});
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to submit verification request");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Student Verification | nbcon.ai</title>
        <meta name="description" content="Verify your student status to get free access to nbcon.ai Pro" />
      </Head>
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-2xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Verify Your Student Status
            </h1>
            <p className="text-muted-foreground">
              Don't have a <span className="font-mono">.edu.sa</span> email? Upload your student ID or enrollment letter for manual verification.
            </p>
            <p className="text-sm text-muted-foreground">
              Already have a <span className="font-mono">.edu.sa</span> email?{" "}
              <Link href="/auth/signup?student=1" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Verification Form */}
          <div className="border border-border rounded-2xl p-6 md:p-8 bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  We'll send verification updates to this email
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ahmed Al-Saud"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              {/* Student ID */}
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID Number *</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="e.g., 2023123456"
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                />
              </div>

              {/* School */}
              <div className="space-y-2">
                <Label htmlFor="school">University/School *</Label>
                <Input
                  id="school"
                  type="text"
                  placeholder="e.g., King Saud University"
                  required
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                />
              </div>

              {/* Enrollment Year */}
              <div className="space-y-2">
                <Label htmlFor="enrollmentYear">Enrollment Year</Label>
                <Input
                  id="enrollmentYear"
                  type="number"
                  placeholder="2024"
                  min="2020"
                  max="2030"
                  value={formData.enrollmentYear}
                  onChange={(e) => setFormData({ ...formData, enrollmentYear: e.target.value })}
                />
              </div>

              {/* Document Uploads */}
              <div className="space-y-4">
                <Label>Documents *</Label>
                <p className="text-xs text-muted-foreground mb-4">
                  Upload at least one document. Accepted formats: PDF, JPEG, PNG (max 5MB each)
                </p>

                {/* Student ID Upload */}
                <div className="space-y-2">
                  <Label htmlFor="studentIdDoc" className="text-sm font-medium">
                    Student ID Card/Photo
                  </Label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="studentIdDoc"
                      className={cn(
                        "flex-1 border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors",
                        documents.studentId
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        {documents.studentId ? (
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-medium">{documents.studentId.name}</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </span>
                        )}
                      </div>
                      <input
                        id="studentIdDoc"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange("studentId", e.target.files?.[0] || null)
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* Enrollment Letter Upload */}
                <div className="space-y-2">
                  <Label htmlFor="enrollmentLetterDoc" className="text-sm font-medium">
                    Enrollment Letter (Alternative)
                  </Label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="enrollmentLetterDoc"
                      className={cn(
                        "flex-1 border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors",
                        documents.enrollmentLetter
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        {documents.enrollmentLetter ? (
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-medium">{documents.enrollmentLetter.name}</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </span>
                        )}
                      </div>
                      <input
                        id="enrollmentLetterDoc"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange("enrollmentLetter", e.target.files?.[0] || null)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>
                    Verification request submitted! We'll review your documents within 24–72 hours and email you with the result.
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Verification Request"}
              </Button>
            </form>
          </div>

          {/* Info Section */}
          <div className="border border-border rounded-xl p-6 bg-muted/30 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1">1.</span>
                <span>We'll review your documents within 24–72 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">2.</span>
                <span>You'll receive an email notification with the verification result</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">3.</span>
                <span>Once approved, your Pro account will be activated automatically</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Your documents are encrypted and stored securely per KSA PDPL requirements. See our{" "}
              <Link href="/legal/privacy" className="text-primary hover:underline">
                privacy policy
              </Link>{" "}
              for details.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

