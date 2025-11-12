"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface JobAlertFormProps {
  departments?: string[];
}

export function JobAlertForm({ departments = [] }: JobAlertFormProps) {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState<string | undefined>();
  const [locationType, setLocationType] = useState<string | undefined>();
  const [jobType, setJobType] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/careers/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          department: department || undefined,
          locationType: locationType || undefined,
          jobType: jobType || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      toast({
        title: "Subscribed!",
        description: "You'll receive email alerts when new jobs match your criteria.",
      });

      setEmail("");
      setDepartment(undefined);
      setLocationType(undefined);
      setJobType(undefined);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="subsection-heading">Get Job Alerts</CardTitle>
        <CardDescription className="body-large">
          Be the first to know when new positions open that match your interests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          {departments.length > 0 && (
            <Select
              value={department || "all"}
              onValueChange={(value) => setDepartment(value === "all" ? undefined : value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select
            value={locationType || "all"}
            onValueChange={(value) => setLocationType(value === "all" ? undefined : value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Location (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={jobType || "all"}
            onValueChange={(value) => setJobType(value === "all" ? undefined : value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Job Type (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe to Alerts
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

