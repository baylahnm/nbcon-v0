import { createClient } from '@supabase/supabase-js';

function getEnvVar(key: string): string | undefined {
  if (typeof window !== 'undefined') {
    return (window as any).__ENV__?.[key];
  }
  if (typeof process !== 'undefined') {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined') {
    return (import.meta as any).env?.[key];
  }
  return undefined;
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

