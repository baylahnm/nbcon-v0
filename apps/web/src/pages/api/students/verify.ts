import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
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

interface VerificationRequest {
  email: string;
  fullName: string;
  studentId: string;
  school: string;
  enrollmentYear?: string;
  studentIdDocUrl?: string;
  enrollmentLetterDocUrl?: string;
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
    const {
      email,
      fullName,
      studentId,
      school,
      enrollmentYear,
      studentIdDocUrl,
      enrollmentLetterDocUrl,
    }: VerificationRequest = req.body;

    // Validation
    if (!email || !fullName || !studentId || !school) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!studentIdDocUrl && !enrollmentLetterDocUrl) {
      return res.status(400).json({
        error: "Please upload at least one document (Student ID or Enrollment Letter)",
      });
    }

    // Get IP address
    const ipAddress = getClientIP(req);

    // Check for duplicate submission
    const normalizedEmail = email.toLowerCase().trim();
    const { data: existing } = await supabase
      .from("student_verifications")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("student_id", studentId)
      .limit(1);

    if (existing && existing.length > 0) {
      return res.status(409).json({
        error: "You've already submitted a verification request with this email and student ID.",
      });
    }

    // Insert into database
    const { data, error } = await supabase
      .from("student_verifications")
      .insert({
        email: normalizedEmail,
        full_name: fullName.trim(),
        student_id: studentId.trim(),
        school: school.trim(),
        enrollment_year: enrollmentYear ? parseInt(enrollmentYear, 10) : null,
        student_id_doc_url: studentIdDocUrl || null,
        enrollment_letter_doc_url: enrollmentLetterDocUrl || null,
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
          error: "You've already submitted a verification request with this email and student ID.",
        });
      }
      return res.status(500).json({ error: "Failed to save verification request" });
    }

    // TODO: Send confirmation email to student
    // TODO: Notify admin team for review

    return res.status(200).json({
      success: true,
      message: "Verification request submitted successfully",
      data: {
        id: data.id,
        email: data.email,
        status: data.status,
      },
    });
  } catch (error: any) {
    console.error("Verification submission error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

