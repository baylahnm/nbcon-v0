"use client";

import { useState } from "react";
import { supabase } from "@nbcon/config";
import type { CreateTicketRequest, CreateTicketResponse, SupportTicket } from "@/types/support";
import { toast } from "@/hooks/use-toast";

interface UseSupportTicketReturn {
  submitTicket: (data: CreateTicketRequest) => Promise<CreateTicketResponse>;
  loading: boolean;
  error: string | null;
}

export function useSupportTicket(): UseSupportTicketReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTicket = async (data: CreateTicketRequest): Promise<CreateTicketResponse> => {
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

      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit ticket");
      }

      const result: CreateTicketResponse = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit ticket";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitTicket,
    loading,
    error,
  };
}

