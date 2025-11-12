import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { SupportTicket, SupportTicketMessage } from "@/types/support";

const updateTicketSchema = z.object({
  status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  assignedTo: z.string().uuid().optional().nullable(),
});

/**
 * Single Support Ticket API endpoint
 * GET: Get ticket details by ID or ticket number
 * PUT: Update ticket (status, priority, assignment)
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

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const { email } = req.query; // Optional email for non-authenticated lookup

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Ticket ID or ticket number is required" });
      }

      // Get authenticated user (optional)
      const authHeader = req.headers.authorization;
      let userId: string | undefined;
      let isStaff = false;

      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        userId = user?.id;

        // Check if user is staff
        if (user?.user_metadata?.role === "admin" || user?.user_metadata?.role === "support_staff" || user?.user_metadata?.is_staff === true) {
          isStaff = true;
        }
      }

      // Try to find ticket by ID or ticket number
      let query = supabase.from("support_tickets").select("*");

      // Check if it's a UUID (ticket ID) or ticket number
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (isUUID) {
        query = query.eq("id", id);
      } else {
        query = query.eq("ticket_number", id);
      }

      const { data: ticket, error: ticketError } = await query.single();

      if (ticketError || !ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      // Check permissions
      if (!isStaff) {
        // User must own the ticket or provide matching email
        if (ticket.user_id !== userId) {
          if (!email || ticket.email !== email) {
            return res.status(403).json({ error: "Access denied" });
          }
        }
      }

      // Get ticket messages
      const { data: messages } = await supabase
        .from("support_ticket_messages")
        .select("*")
        .eq("ticket_id", ticket.id)
        .order("created_at", { ascending: true });

      // Filter internal messages for non-staff
      const visibleMessages = isStaff
        ? messages || []
        : (messages || []).filter((msg) => !msg.is_internal);

      // Transform ticket
      const transformedTicket: SupportTicket = {
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
      };

      // Transform messages
      const transformedMessages: SupportTicketMessage[] = visibleMessages.map((msg) => ({
        id: msg.id,
        ticketId: msg.ticket_id,
        userId: msg.user_id,
        email: msg.email,
        message: msg.message,
        isInternal: msg.is_internal,
        attachments: msg.attachments || [],
        createdAt: msg.created_at,
      }));

      return res.status(200).json({
        ticket: transformedTicket,
        messages: transformedMessages,
      });
    } catch (error) {
      console.error("Error in GET /api/support/tickets/[id]:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Ticket ID is required" });
      }

      // Get authenticated user
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
      } = await supabase.auth.getUser(token);

      if (!user) {
        return res.status(401).json({ error: "Invalid token" });
      }

      // Check if user is staff
      const isStaff =
        user.user_metadata?.role === "admin" ||
        user.user_metadata?.role === "support_staff" ||
        user.user_metadata?.is_staff === true;

      // Get ticket
      const { data: ticket, error: ticketError } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("id", id)
        .single();

      if (ticketError || !ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      // Check permissions
      if (!isStaff && ticket.user_id !== user.id) {
        return res.status(403).json({ error: "Access denied" });
      }

      const body = updateTicketSchema.parse(req.body);
      const updates: any = {};

      if (body.status !== undefined) {
        updates.status = body.status;
        if (body.status === "resolved" && !ticket.resolved_at) {
          updates.resolved_at = new Date().toISOString();
        }
        if (body.status === "closed" && !ticket.closed_at) {
          updates.closed_at = new Date().toISOString();
        }
      }
      if (body.priority !== undefined) {
        updates.priority = body.priority;
      }
      if (body.assignedTo !== undefined) {
        updates.assigned_to = body.assignedTo;
      }

      const { data: updatedTicket, error: updateError } = await supabase
        .from("support_tickets")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating ticket:", updateError);
        return res.status(500).json({ error: "Failed to update ticket" });
      }

      // Transform to response format
      const transformedTicket: SupportTicket = {
        id: updatedTicket.id,
        ticketNumber: updatedTicket.ticket_number,
        userId: updatedTicket.user_id,
        email: updatedTicket.email,
        subject: updatedTicket.subject,
        category: updatedTicket.category,
        priority: updatedTicket.priority,
        status: updatedTicket.status,
        description: updatedTicket.description,
        attachments: updatedTicket.attachments || [],
        assignedTo: updatedTicket.assigned_to,
        createdAt: updatedTicket.created_at,
        updatedAt: updatedTicket.updated_at,
        resolvedAt: updatedTicket.resolved_at,
        closedAt: updatedTicket.closed_at,
      };

      return res.status(200).json({ ticket: transformedTicket });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in PUT /api/support/tickets/[id]:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

