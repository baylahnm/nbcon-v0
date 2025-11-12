import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createEventSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  date: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().min(1),
  locationType: z.enum(["virtual", "onsite", "hybrid"]).default("virtual"),
  type: z.enum(["meetup", "webinar", "conference", "workshop", "hackathon"]),
  registrationUrl: z.string().url().optional(),
  organizerName: z.string().min(1),
  image: z.string().url().optional(),
  maxAttendees: z.number().int().positive().optional(),
});

/**
 * Community events API endpoint
 * GET: List events with filters
 * POST: Create a new event (authenticated users only)
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
      const {
        type,
        status = "upcoming",
        sortBy = "date",
        limit = 50,
        offset = 0,
      } = req.query;

      let query = supabase.from("community_events").select("*", { count: "exact" });

      // Status filter
      if (status && typeof status === "string") {
        query = query.eq("status", status);
      }

      // Type filter
      if (type && typeof type === "string") {
        query = query.eq("type", type);
      }

      // Sort
      switch (sortBy) {
        case "date":
        default:
          query = query.order("date", { ascending: true });
          break;
        case "popular":
          query = query.order("current_attendees", { ascending: false });
          break;
      }

      // Pagination
      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ error: "Failed to fetch events" });
      }

      // Transform data to match TypeScript types
      const events = (data || []).map((event: any) => ({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        endDate: event.end_date,
        location: event.location,
        locationType: event.location_type,
        type: event.type,
        registrationUrl: event.registration_url,
        organizerId: event.organizer_id,
        organizerName: event.organizer_name,
        image: event.image,
        maxAttendees: event.max_attendees,
        currentAttendees: event.current_attendees || 0,
        status: event.status,
        createdAt: event.created_at,
        updatedAt: event.updated_at,
      }));

      return res.status(200).json({
        events,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/community/events:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      // Get authenticated user
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

      if (authError || !user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const body = createEventSchema.parse(req.body);
      const {
        name,
        description,
        date,
        endDate,
        location,
        locationType,
        type,
        registrationUrl,
        organizerName,
        image,
        maxAttendees,
      } = body;

      // Create event
      const { data: event, error: eventError } = await supabase
        .from("community_events")
        .insert({
          name,
          description,
          date,
          end_date: endDate,
          location,
          location_type: locationType,
          type,
          registration_url: registrationUrl,
          organizer_id: user.id,
          organizer_name: organizerName,
          image,
          max_attendees: maxAttendees,
        })
        .select()
        .single();

      if (eventError) {
        console.error("Error creating event:", eventError);
        return res.status(500).json({ error: "Failed to create event" });
      }

      return res.status(201).json({ event });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/community/events:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

