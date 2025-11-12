import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { CreateTicketRequest, CreateTicketResponse, SupportTicket } from "@/types/support";

const createTicketSchema = z.object({
  subject: z.string().min(5).max(200),
  category: z.enum(["account", "technical", "feature", "bug", "general", "enterprise"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  description: z.string().min(20).max(2000),
  email: z.string().email(),
  attachments: z
    .array(
      z.object({
        url: z.string(),
        filename: z.string(),
        size: z.number(),
        type: z.string(),
      })
    )
    .optional(),
});

/**
 * Support Tickets API endpoint
 * POST: Create a new support ticket
 * GET: Get user's tickets (if authenticated)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: "Database not configured" });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  if (req.method === "POST") {
    try {
      // Get authenticated user (optional)
      const authHeader = req.headers.authorization;
      let userId: string | undefined;

      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        userId = user?.id;
      }

      const body = createTicketSchema.parse(req.body);
      const { subject, category, priority, description, email, attachments } = body;

      // Generate ticket number
      const year = new Date().getFullYear();
      const { count } = await supabase
        .from("support_tickets")
        .select("id", { count: "exact", head: true })
        .gte("created_at", `${year}-01-01`);

      const ticketNumber = `TKT-${year}-${String((count || 0) + 1).padStart(6, "0")}`;

      // Create ticket
      const { data: ticket, error: ticketError } = await supabase
        .from("support_tickets")
        .insert({
          ticket_number: ticketNumber,
          user_id: userId || null,
          email,
          subject,
          category,
          priority,
          description,
          attachments: attachments || [],
          status: "open",
        })
        .select()
        .single();

      if (ticketError) {
        console.error("Error creating ticket:", ticketError);
        return res.status(500).json({ error: "Failed to create ticket" });
      }

      // Transform to response format
      const response: CreateTicketResponse = {
        id: ticket.id,
        ticketNumber: ticket.ticket_number,
        message: "Ticket created successfully",
      };

      // TODO: Send confirmation email

      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/support/tickets:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    try {
      // Get authenticated user
      const authHeader = req.headers.authorization;
      let userId: string | undefined;

      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        userId = user?.id;
      }

      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      // Get query parameters
      const { status, category, priority, limit = "50", offset = "0" } = req.query;

      let query = supabase.from("support_tickets").select("*").eq("user_id", userId);

      if (status && typeof status === "string") {
        query = query.eq("status", status);
      }
      if (category && typeof category === "string") {
        query = query.eq("category", category);
      }
      if (priority && typeof priority === "string") {
        query = query.eq("priority", priority);
      }

      query = query
        .order("created_at", { ascending: false })
        .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1);

      const { data: tickets, error } = await query;

      if (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ error: "Failed to fetch tickets" });
      }

      // Transform to response format
      const transformedTickets: SupportTicket[] = (tickets || []).map((ticket) => ({
        id: ticket.id,
        ticketNumber: ticket.ticket_number,
        userId: ticket.user_id,
        email: ticket.email,
        subject: ticket.subject,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        description: ticket.description,
        attachments: ticket.attachments || [],
        assignedTo: ticket.assigned_to,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        resolvedAt: ticket.resolved_at,
        closedAt: ticket.closed_at,
      }));

      return res.status(200).json({ tickets: transformedTickets });
    } catch (error) {
      console.error("Error in GET /api/support/tickets:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

