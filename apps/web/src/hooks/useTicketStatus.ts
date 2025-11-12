"use client";

import { useState } from "react";
import { supabase } from "@nbcon/config";
import type { SupportTicket, SupportTicketMessage } from "@/types/support";

interface UseTicketStatusReturn {
  ticket: SupportTicket | null;
  messages: SupportTicketMessage[];
  loading: boolean;
  error: string | null;
  fetchTicket: (ticketIdOrNumber: string, email?: string) => Promise<void>;
  fetchUserTickets: () => Promise<SupportTicket[]>;
}

export function useTicketStatus(): UseTicketStatusReturn {
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<SupportTicketMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTicket = async (ticketIdOrNumber: string, email?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Get auth token if user is authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Build URL with optional email query param
      const url = email
        ? `/api/support/tickets/${ticketIdOrNumber}?email=${encodeURIComponent(email)}`
        : `/api/support/tickets/${ticketIdOrNumber}`;

      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch ticket");
      }

      const data = await response.json();
      setTicket(data.ticket);
      setMessages(data.messages || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch ticket";
      setError(errorMessage);
      setTicket(null);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTickets = async (): Promise<SupportTicket[]> => {
    try {
      setLoading(true);
      setError(null);

      // Get auth token - required for this operation
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Authentication required");
      }

      const response = await fetch("/api/support/tickets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tickets");
      }

      const data = await response.json();
      return data.tickets || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch tickets";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    ticket,
    messages,
    loading,
    error,
    fetchTicket,
    fetchUserTickets,
  };
}

