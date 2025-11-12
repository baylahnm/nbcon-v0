"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupportTicket } from "@/hooks/useSupportTicket";
import { usePortalAccess } from "@/hooks/usePortalAccess";
import { supabase } from "@nbcon/config";
import { toast } from "@/hooks/use-toast";
import { Loader2, Send, Paperclip } from "lucide-react";
import type { SupportTicketCategory, SupportTicketPriority } from "@/types/support";

export function SupportTicketForm() {
  const { tier } = usePortalAccess();
  const { submitTicket, loading } = useSupportTicket();
  const [userEmail, setUserEmail] = useState<string>("");
  const [formData, setFormData] = useState({
    subject: "",
    category: "" as SupportTicketCategory | "",
    priority: "medium" as SupportTicketPriority,
    description: "",
    email: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);

  // Get user email on mount
  useEffect(() => {
    const getUserEmail = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
        setFormData((prev) => ({ ...prev, email: session.user.email || "" }));
      }
    };
    getUserEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject || !formData.category || !formData.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email && !userEmail) {
      toast({
        title: "Email required",
        description: "Please provide your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Upload attachments to Supabase Storage and get URLs
      const attachmentUrls: any[] = [];

      const ticket = await submitTicket({
        ...formData,
        category: formData.category as SupportTicketCategory,
        email: formData.email || userEmail,
        attachments: attachmentUrls,
      });

      toast({
        title: "Ticket submitted!",
        description: `Your ticket #${ticket.ticketNumber} has been created. We'll respond within 24 hours.`,
      });

      // Reset form
      setFormData({
        subject: "",
        category: "" as SupportTicketCategory | "",
        priority: "medium",
        description: "",
        email: userEmail,
      });
      setAttachments([]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-[0.5px] border-border/50 bg-surface" id="submit-ticket">
      <CardHeader>
        <CardTitle>Submit a Support Ticket</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject *</label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category *</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as SupportTicketCategory })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account & Billing</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="enterprise">Enterprise Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Priority *</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as SupportTicketPriority })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  {tier === "enterprise" && <SelectItem value="urgent">Urgent</SelectItem>}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!userEmail && (
            <div>
              <label className="text-sm font-medium mb-2 block">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide detailed information about your issue..."
              rows={6}
              maxLength={2000}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.description.length}/2000 characters
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Attachments (optional)</label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                multiple
                accept="image/*,.pdf,.txt,.log"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  // Check file sizes (10MB max)
                  const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);
                  if (validFiles.length !== files.length) {
                    toast({
                      title: "File size limit",
                      description: "Some files exceed 10MB limit and were not added",
                      variant: "destructive",
                    });
                  }
                  setAttachments(validFiles);
                }}
                className="cursor-pointer"
              />
              <span className="text-xs text-muted-foreground">Max 10MB per file</span>
            </div>
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachments.map((file, idx) => (
                  <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <Paperclip className="h-3 w-3" />
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

