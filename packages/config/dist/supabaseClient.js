import { createClient } from '@supabase/supabase-js';
function getEnvVar(key) {
    // Next.js: NEXT_PUBLIC_* vars are embedded at build time and available via process.env
    // Check process.env first (works in both server and client in Next.js)
    if (typeof process !== 'undefined' && process.env) {
        const value = process.env[key];
        if (value)
            return value;
    }
    // Fallback: Check window.__ENV__ (for Vite/other setups)
    if (typeof window !== 'undefined') {
        const value = window.__ENV__?.[key];
        if (value)
            return value;
    }
    return undefined;
}
// Support both VITE_ (Vite) and NEXT_PUBLIC_ (Next.js) prefixes
// Next.js replaces process.env.NEXT_PUBLIC_* at build time, so we need to access them directly
const supabaseUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
    getEnvVar('NEXT_PUBLIC_SUPABASE_URL') ||
    getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
    getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
    getEnvVar('VITE_SUPABASE_ANON_KEY');
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in apps/web/.env.local');
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
//# sourceMappingURL=supabaseClient.js.map