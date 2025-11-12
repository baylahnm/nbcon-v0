"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTicketStatus } from "@/hooks/useTicketStatus";
import { supabase } from "@nbcon/config";
import { Loader2, Search, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SupportTicketStatus } from "@/types/support";

const statusConfig: Record<SupportTicketStatus, { label: string; icon: React.ReactNode; color: string }> = {
  open: { label: "Open", icon: <AlertCircle className="h-4 w-4" />, color: "bg-blue-500" },
  in_progress: { label: "In Progress", icon: <Clock className="h-4 w-4" />, color: "bg-yellow-500" },
  resolved: { label: "Resolved", icon: <CheckCircle2 className="h-4 w-4" />, color: "bg-green-500" },
  closed: { label: "Closed", icon: <XCircle className="h-4 w-4" />, color: "bg-gray-500" },
};

export function TicketStatusCheck() {
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState<string>("");
  const { ticket, messages, loading, error, fetchTicket } = useTicketStatus();

  // Get user email on mount
  useEffect(() => {
    const getUserEmail = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
        setEmail(session.user.email);
      }
    };
    getUserEmail();
  }, []);

  const handleSearch = async () => {
    if (!ticketId) return;
    await fetchTicket(ticketId, email || userEmail || undefined);
  };

  return (
    <Card className="border-[0.5px] border-border/50 bg-surface">
      <CardHeader>
        <CardTitle>Check Ticket Status</CardTitle>
        <CardDescription>
          Enter your ticket number to view status and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="Ticket ID (e.g., TKT-2025-001234)"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch} disabled={loading || !ticketId}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {!userEmail && (
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
              />
            </div>
          )}

          {!ticket && !loading && (
            <div className="text-sm text-muted-foreground">
              <p>Don't have a ticket ID? Check your email for the confirmation message.</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 border-[0.5px] border-destructive/50 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {ticket && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{ticket.ticketNumber}</span>
                  <Badge className={cn(statusConfig[ticket.status].color, "text-white")}>
                    {statusConfig[ticket.status].icon}
                    <span className="ml-1">{statusConfig[ticket.status].label}</span>
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">Subject:</span> {ticket.subject}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span> {ticket.category}
                  </p>
                  <p>
                    <span className="font-medium">Priority:</span> {ticket.priority}
                  </p>
                  <p>
                    <span className="font-medium">Created:</span> {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                  {ticket.updatedAt && (
                    <p>
                      <span className="font-medium">Last updated:</span> {new Date(ticket.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {messages.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Messages</h4>
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div key={message.id} className="p-3 bg-muted/30 rounded-lg border-[0.5px] border-border/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">
                            {message.email || "Support Team"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

