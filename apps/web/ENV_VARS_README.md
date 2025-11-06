# Environment Variables Setup

## File Location
**Keep:** `apps/web/.env.local` ✅  
**Delete:** Root `.env.local` (optional, but not needed for Next.js)

## Why `apps/web/.env.local`?

Next.js reads environment variables from `.env.local` files in the **same directory** as `next.config.js`/`next.config.cjs`.

Since `next.config.cjs` is in `apps/web/`, that's where Next.js looks for environment variables.

The root-level `.env.local` won't be read by Next.js.

## Current Configuration

All environment variables are now consolidated in `apps/web/.env.local`:

- ✅ Supabase (URL, Anon Key, Service Role Key)
- ✅ Stripe (Public Key, Secret Key, Webhook Secret)
- ✅ OpenAI API Key
- ✅ PostHog Key
- ✅ Sentry DSN
- ✅ Mapbox Token
- ✅ JWT Secret

## After Updating

**Restart your dev server** for changes to take effect:
```bash
# Stop current server (Ctrl+C)
pnpm dev
```

## Verification

Check browser console (F12) - you should NOT see:
- ❌ "Missing Supabase environment variables"
- ❌ "Missing environment variable: ..."

## Git Status

Both `.env.local` files are gitignored (in `.gitignore`), so they won't be committed to version control.

