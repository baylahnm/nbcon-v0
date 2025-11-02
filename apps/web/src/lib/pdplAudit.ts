import { supabase } from "@nbcon/config";

export interface AuditEvent {
  user_id: string;
  action: string;
  metadata?: Record<string, any>;
}

export async function logAuditEvent(
  userId: string,
  action: string,
  metadata?: Record<string, any>
): Promise<void> {
  if (process.env.PDPL_AUDIT_MODE !== "on") {
    console.log(`[PDPL Audit] ${action} by ${userId}`);
    return;
  }

  try {
    const { error } = await supabase.from("audit_logs").insert({
      user_id: userId,
      action,
      metadata: metadata || {},
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to log audit event:", error);
      // Don't throw - audit logging should not break user flows
    }
  } catch (err) {
    console.error("Error in audit logging:", err);
  }
}

