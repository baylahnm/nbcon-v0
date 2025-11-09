import { supabase } from "../api";

export const logToSupabase = async (table: string, payload: any) => {
  const { data, error } = await supabase.from(table).insert(payload);
  if (error) {
    throw new Error(`Failed to log to Supabase: ${error.message}`);
  }
  return data;
};

export const querySupabase = async <T = any>(
  table: string,
  filters?: Record<string, any>
) => {
  let query = supabase.from(table).select("*");

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to query Supabase: ${error.message}`);
  }
  return data as T[];
};

