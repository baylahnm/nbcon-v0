import { createClient } from '@supabase/supabase-js';

// Next.js: NEXT_PUBLIC_* variables are replaced at build time and available in process.env
// Direct access is the most reliable way in Next.js
const supabaseUrl = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  (typeof window !== 'undefined' && (window as any).__ENV__?.VITE_SUPABASE_URL) ||
  undefined;

const supabaseAnonKey = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof window !== 'undefined' && (window as any).__ENV__?.VITE_SUPABASE_ANON_KEY) ||
  undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Auth features will not work.');
  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.debug('Debug: process.env keys:', Object.keys(process.env || {}).filter(k => k.includes('SUPABASE')));
    console.debug('Debug: NEXT_PUBLIC_SUPABASE_URL value:', process.env?.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
    console.debug('Debug: VITE_SUPABASE_URL value:', process.env?.VITE_SUPABASE_URL ? 'SET' : 'NOT SET');
  }
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

