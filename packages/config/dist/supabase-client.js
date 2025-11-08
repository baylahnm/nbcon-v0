import { createClient } from '@supabase/supabase-js';
const supabaseUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
    (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_URL) ||
    '';
const supabaseAnonKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
    (typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_ANON_KEY) ||
    '';
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Auth features will not work.');
    // Debug logging (only in development)
    if (process.env.NODE_ENV === 'development') {
        console.debug('Debug: process.env keys:', Object.keys(process.env || {}).filter(k => k.includes('SUPABASE')));
        console.debug('Debug: NEXT_PUBLIC_SUPABASE_URL value:', process.env?.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
        console.debug('Debug: VITE_SUPABASE_URL value:', process.env?.VITE_SUPABASE_URL ? 'SET' : 'NOT SET');
    }
}
// Always return a client instance, even if credentials are missing
// This prevents null checks throughout the codebase
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key');
//# sourceMappingURL=supabase-client.js.map