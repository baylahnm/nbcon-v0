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

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("weekly");
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
      const res = await fetch("/api/blog/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, frequency }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
      });

      setEmail("");
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
        <CardTitle className="subsection-heading">Stay Updated</CardTitle>
        <CardDescription className="body-large">
          Get the latest articles and updates delivered to your inbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={loading}
              required
            />
            <Select
              value={frequency}
              onValueChange={(value) => setFrequency(value as "weekly" | "monthly")}
              disabled={loading}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

