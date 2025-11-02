import { createClient, SupabaseClient } from "@supabase/supabase-js";

function getEnvVar(key: string): string {
  const value =
    (typeof process !== "undefined" && process.env?.[key]) ||
    (typeof window !== "undefined" && (window as any).__ENV__?.[key]) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.[key]);

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const supabase: SupabaseClient = createClient(
  getEnvVar("SUPABASE_URL"),
  getEnvVar("SUPABASE_SERVICE_ROLE_KEY")
);

export async function fetchData<T = any>(table: string): Promise<T[]> {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function insertData<T = any>(
  table: string,
  payload: Partial<T>
): Promise<T> {
  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateData<T = any>(
  table: string,
  id: string,
  payload: Partial<T>
): Promise<T> {
  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

