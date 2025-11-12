import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { SupportTicketMessage } from "@/types/support";

const createMessageSchema = z.object({
  message: z.string().min(1).max(5000),
  email: z.string().email().optional(), // Required for non-authenticated users
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
  isInternal: z.boolean().optional().default(false),
});

/**
 * Support Ticket Messages API endpoint
 * POST: Add a message to a ticket
 * GET: Get all messages for a ticket
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
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Ticket ID is required" });
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
        if (
          user?.user_metadata?.role === "admin" ||
          user?.user_metadata?.role === "support_staff" ||
          user?.user_metadata?.is_staff === true
        ) {
          isStaff = true;
        }
      }

      // Get ticket to verify ownership
      const { data: ticket, error: ticketError } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("id", id)
        .single();

      if (ticketError || !ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      const body = createMessageSchema.parse(req.body);
      const { message, email, attachments, isInternal } = body;

      // Check permissions
      if (!isStaff) {
        // User must own the ticket or provide matching email
        if (ticket.user_id !== userId) {
          if (!email || ticket.email !== email) {
            return res.status(403).json({ error: "Access denied" });
          }
        }
        // Non-staff cannot create internal messages
        if (isInternal) {
          return res.status(403).json({ error: "Cannot create internal messages" });
        }
      }

      // Create message
      const { data: newMessage, error: messageError } = await supabase
        .from("support_ticket_messages")
        .insert({
          ticket_id: id,
          user_id: userId || null,
          email: email || ticket.email,
          message,
          is_internal: isInternal || false,
          attachments: attachments || [],
        })
        .select()
        .single();

      if (messageError) {
        console.error("Error creating message:", messageError);
        return res.status(500).json({ error: "Failed to create message" });
      }

      // Update ticket updated_at timestamp (trigger handles this, but ensure it's updated)
      await supabase
        .from("support_tickets")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", id);

      // Transform to response format
      const transformedMessage: SupportTicketMessage = {
        id: newMessage.id,
        ticketId: newMessage.ticket_id,
        userId: newMessage.user_id,
        email: newMessage.email,
        message: newMessage.message,
        isInternal: newMessage.is_internal,
        attachments: newMessage.attachments || [],
        createdAt: newMessage.created_at,
      };

      // TODO: Send email notification

      return res.status(201).json({ message: transformedMessage });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/support/tickets/[id]/messages:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const { email } = req.query; // Optional email for non-authenticated lookup

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Ticket ID is required" });
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
        if (
          user?.user_metadata?.role === "admin" ||
          user?.user_metadata?.role === "support_staff" ||
          user?.user_metadata?.is_staff === true
        ) {
          isStaff = true;
        }
      }

      // Get ticket to verify ownership
      const { data: ticket, error: ticketError } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("id", id)
        .single();

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

      // Get messages
      let query = supabase
        .from("support_ticket_messages")
        .select("*")
        .eq("ticket_id", id)
        .order("created_at", { ascending: true });

      const { data: messages, error: messagesError } = await query;

      if (messagesError) {
        console.error("Error fetching messages:", messagesError);
        return res.status(500).json({ error: "Failed to fetch messages" });
      }

      // Filter internal messages for non-staff
      const visibleMessages = isStaff
        ? messages || []
        : (messages || []).filter((msg) => !msg.is_internal);

      // Transform to response format
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

      return res.status(200).json({ messages: transformedMessages });
    } catch (error) {
      console.error("Error in GET /api/support/tickets/[id]/messages:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

