// Client-safe exports (always available)
export { supabase } from './supabaseClient';
// Server-only exports (only available server-side)
// Use dynamic import in server components: const { stripe } = await import('@nbcon/config/server')
// This prevents client-side bundling issues
//# sourceMappingURL=index.js.map