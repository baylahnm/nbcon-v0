"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Mail, Loader2 } from "lucide-react";

interface EmailSubscriptionFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function EmailSubscriptionForm({ onSuccess, className }: EmailSubscriptionFormProps) {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly" | "immediate">("weekly");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/changelog/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, frequency }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSuccess(true);
      setEmail("");
      if (onSuccess) {
        onSuccess();
      }

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="subsection-heading flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Subscribe to Updates
        </CardTitle>
        <CardDescription>
          Get notified when new versions are released
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || success}
              className="w-full"
            />
          </div>

          <Select
            value={frequency}
            onValueChange={(value) => setFrequency(value as typeof frequency)}
            disabled={loading || success}
          >
            <SelectTrigger>
              <SelectValue placeholder="Update frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate (every release)</SelectItem>
              <SelectItem value="weekly">Weekly digest</SelectItem>
              <SelectItem value="monthly">Monthly digest</SelectItem>
            </SelectContent>
          </Select>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {success && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span>Successfully subscribed! Check your email to verify.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || success || !email}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : success ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

