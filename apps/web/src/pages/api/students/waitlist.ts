import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service role key for server-side operations
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

interface WaitlistRequest {
  school: string;
  email: string;
  city?: string;
  role?: string;
  graduationYear?: string;
  notes?: string;
}

// Helper to get client IP address
function getClientIP(req: NextApiRequest): string | null {
  const forwarded = req.headers["x-forwarded-for"];
  const realIP = req.headers["x-real-ip"];
  
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  if (typeof realIP === "string") {
    return realIP;
  }
  if (req.socket?.remoteAddress) {
    return req.socket.remoteAddress;
  }
  return null;
}

// Rate limiting: Check if email or IP has submitted recently (within last hour)
async function checkRateLimit(
  supabase: ReturnType<typeof getSupabaseClient>,
  email: string,
  ipAddress: string | null
): Promise<{ allowed: boolean; reason?: string }> {
  if (!supabase) return { allowed: true };

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // Check by email
  const { data: emailCheck } = await supabase
    .from("student_waitlist")
    .select("id")
    .eq("email", email.toLowerCase())
    .gte("created_at", oneHourAgo)
    .limit(1);

  if (emailCheck && emailCheck.length > 0) {
    return {
      allowed: false,
      reason: "You've already submitted a waitlist request recently. Please wait before submitting again.",
    };
  }

  // Check by IP address (if available)
  if (ipAddress) {
    const { data: ipCheck } = await supabase
      .from("student_waitlist")
      .select("id")
      .eq("ip_address", ipAddress)
      .gte("created_at", oneHourAgo)
      .limit(1);

    if (ipCheck && ipCheck.length > 0) {
      return {
        allowed: false,
        reason: "Too many requests from this IP. Please wait before submitting again.",
      };
    }
  }

  return { allowed: true };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(500).json({ error: "Database not configured" });
  }

  try {
    const { school, email, city, role, graduationYear, notes }: WaitlistRequest = req.body;

    // Validation
    if (!school || !email) {
      return res.status(400).json({ error: "School and email are required" });
    }

    // Validate .edu.sa email format
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail.endsWith(".edu.sa")) {
      return res.status(400).json({ error: "Email must be a .edu.sa address" });
    }

    // Get IP address for rate limiting
    const ipAddress = getClientIP(req);

    // Rate limiting check
    const rateLimitCheck = await checkRateLimit(supabase, normalizedEmail, ipAddress);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({
        error: rateLimitCheck.reason || "Too many requests. Please try again later.",
      });
    }

    // Check for duplicate (email + school combination)
    const { data: existing } = await supabase
      .from("student_waitlist")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("school", school.trim())
      .limit(1);

    if (existing && existing.length > 0) {
      return res.status(409).json({
        error: "You've already joined the waitlist for this school.",
      });
    }

    // Insert into database
    const { data, error } = await supabase
      .from("student_waitlist")
      .insert({
        school: school.trim(),
        email: normalizedEmail,
        city: city?.trim() || null,
        role: role || "Student",
        graduation_year: graduationYear ? parseInt(graduationYear, 10) : null,
        notes: notes?.trim() || null,
        ip_address: ipAddress,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      // Handle unique constraint violation
      if (error.code === "23505") {
        return res.status(409).json({
          error: "You've already joined the waitlist for this school.",
        });
      }
      return res.status(500).json({ error: "Failed to save waitlist entry" });
    }

    // TODO: Send confirmation email to student
    // TODO: Notify admin team of new waitlist entry

    return res.status(200).json({
      success: true,
      message: "Successfully joined waitlist",
      data: {
        id: data.id,
        email: data.email,
        school: data.school,
      },
    });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

