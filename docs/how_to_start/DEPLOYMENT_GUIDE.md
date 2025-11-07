# NBCON PRO Deployment Guide

**Last Updated:** 2025-01-06  
**Status:** Production Ready

---

## Prerequisites

- Node.js 20+
- pnpm 9+
- Supabase CLI
- Cloudflare account (for CDN)
- Stripe account
- PostHog account (optional)
- Sentry account (optional, for error tracking)

## Environment Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd nbcon
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Telemetry
POSTHOG_KEY=your_posthog_key
SENTRY_DSN=your_sentry_dsn

# Integrations
MAPBOX_TOKEN=your_mapbox_token
JWT_SECRET=your_jwt_secret
```

### 3. Supabase Setup

```bash
# Link to your Supabase project
supabase link --project-ref your-project-ref

# Run migrations
pnpm migrate

# Deploy Edge Functions
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
supabase functions deploy lifecycle-cron
```

### 4. Database Setup

Ensure all migrations are applied:

```bash
# Check migration status
supabase db diff

# Apply pending migrations
supabase db push
```

### 5. Build Application

**Important:** The `@nbcon/config` package must be built before the web app.

```bash
# Build config package first (required)
pnpm --filter @nbcon/config build

# Build web app (automatically builds config via prebuild hook)
pnpm --filter @nbcon/web build

# Or use the root script (recommended)
pnpm deploy:web

# Verify build locally
pnpm --filter @nbcon/web start
```

**Note:** The web app's `prebuild` hook automatically builds the config package, but it's good practice to build it explicitly in CI/CD pipelines.

## Deployment Steps

### Supabase

1. **Migrations**: All SQL migrations applied
2. **Edge Functions**: Deployed and tested
   - `stripe-checkout` - Creates checkout sessions
   - `stripe-webhook` - Processes Stripe webhooks
   - `stripe-portal` - Opens Stripe Customer Portal
   - `lifecycle-cron` - Scheduled lifecycle tasks
3. **RLS Policies**: Verified via SQL tests
4. **Secrets**: Environment variables configured in Supabase Secrets
5. **Email Templates**: ✅ Upload templates to Supabase Dashboard
   - Navigate to: Authentication > Email Templates
   - Upload all 6 templates from `supabase/email-templates/`
   - Verify subject lines and branding ("nbcon")

### Cloudflare Pages

1. **Connect Repository**: Link GitHub repo to Cloudflare
2. **Build Settings**:
   - Build command: `pnpm install --frozen-lockfile && pnpm build:config && pnpm --filter @nbcon/web build`
   - Output directory: `apps/web/.next`
   - Node version: `20`
   - Install command: `pnpm install --frozen-lockfile`
3. **Environment Variables**: Add all production env vars
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `POSTHOG_KEY` (optional)
   - `SENTRY_DSN` (optional)
   - All `NEXT_PUBLIC_*` variables
4. **Deploy**: Trigger deployment on push to `main`
5. **Source Maps**: Configure Sentry source maps upload (if using Sentry)

### Stripe Webhook Configuration

1. **Webhook URL**: `https://your-project.supabase.co/functions/v1/stripe-webhook`
2. **Events**: Subscribe to:
   - `checkout.session.completed` - New subscription
   - `customer.subscription.updated` - Subscription changes/renewals
   - `customer.subscription.deleted` - Cancellations
3. **Secret**: Store `STRIPE_WEBHOOK_SECRET` in Supabase Secrets
4. **Testing**: Use Stripe CLI for local testing:
   ```bash
   stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
   ```

## Post-Deployment Verification

### 1. Health Checks

```bash
# Test API endpoints
curl https://your-domain.com/api/health

# Verify Supabase connection
curl https://your-project.supabase.co/rest/v1/
```

### 2. Telemetry Verification

- PostHog: Confirm events visible in dashboard
- Sentry: Verify error tracking active
- Supabase Logs: Check Edge Function execution logs

### 3. PDPL Compliance

- Audit logs table populated
- RLS policies active
- Data retention jobs scheduled

### 4. Feature Testing

- [ ] User authentication flow (signup, login, OTP)
- [ ] Subscription checkout (Free → Basic → Pro)
- [ ] Tier-based feature gating (FeatureGate component)
- [ ] AI agent invocation (useAIAgent hook)
- [ ] Dashboard rendering (UnifiedDashboard with charts)
- [ ] CoPilot Toolbar functionality
- [ ] Icon system (all icons render correctly in light/dark themes)
- [ ] Email templates (test all 6 templates)
- [ ] Stripe Customer Portal access
- [ ] Realtime tier updates (subscription changes reflect immediately)

## Rollback Procedure

1. **Revert Database**:
   ```bash
   supabase db reset --version previous_migration
   ```

2. **Revert Application**:
   - Rollback Cloudflare deployment to previous version
   - Update Edge Functions if needed

3. **Verify**: Test critical paths after rollback

## Monitoring

- **PostHog**: Product analytics and user behavior
- **Sentry**: Error tracking and performance monitoring
- **Supabase Logs**: Database and Edge Function logs
- **Cloudflare Analytics**: CDN and performance metrics

## Troubleshooting

### Build Failures

- **Config Package Not Built**: Ensure `@nbcon/config` is built before web app
  ```bash
  pnpm build:config
  ```
- **TypeScript Errors**: Check `tsconfig.json` paths and project references
- **Node.js Version**: Verify Node.js 20+ is being used
- **Dependencies**: Run `pnpm install --frozen-lockfile` to ensure consistent installs
- **Review CI/CD Logs**: Check GitHub Actions or Cloudflare build logs for specific errors

### Database Issues

- **RLS Policies**: Verify RLS policies not blocking operations
  ```sql
  SELECT * FROM pg_policies WHERE tablename = '<table>';
  ```
- **Migration Order**: Check migration order and dependencies
- **Supabase Logs**: Review Supabase logs for errors
- **Connection Issues**: Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct

### Edge Function Errors

- **Environment Variables**: Check environment variables in Supabase dashboard (Secrets)
- **Function Logs**: Verify function logs in Supabase dashboard
- **Local Testing**: Test functions locally with `supabase functions serve`
- **Webhook Signatures**: Verify Stripe webhook signature validation is working

### Icon System Issues

- **Missing Icons**: Ensure all icon libraries are installed:
  - `lucide-react` (primary)
  - `react-icons` (brands)
  - `@radix-ui/react-icons` (UI)
  - `@lobehub/icons` (AI logos)
- **Theme Issues**: Verify icons use theme-aware Tailwind classes
- **Bundle Size**: Check bundle size hasn't increased (should be ~700KB smaller after icon unification)

### Email Template Issues

- **Templates Not Uploaded**: Verify all 6 templates uploaded to Supabase Dashboard
- **Branding Inconsistency**: Check templates use "nbcon" (not "NBCON PRO")
- **Subject Lines**: Verify subject lines match expected format
- **Rendering**: Test email rendering in different email clients

---

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (`pnpm test`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Linting passes (`pnpm lint`)
- [ ] No ESLint warnings
- [ ] Code coverage ≥ 90%

### Security
- [ ] No secrets in code (verify `.env.example` only)
- [ ] RLS policies verified on all tables
- [ ] Webhook signatures verified
- [ ] SSL/TLS certificates valid
- [ ] Dependencies scanned for vulnerabilities (Dependabot)

### Configuration
- [ ] Environment variables configured in all environments
- [ ] Supabase secrets configured
- [ ] Stripe webhook configured
- [ ] Email templates uploaded
- [ ] Build commands verified

### Testing
- [ ] Unit tests passing
- [ ] E2E tests passing
- [ ] Manual testing completed
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsiveness verified

---

## Recent Improvements (2025-01-06)

### Icon System Unification ✅
- Removed legacy libraries (`bootstrap-icons`, `@fortawesome/fontawesome-free`)
- Bundle size reduced by ~700KB
- Standardized on: `lucide-react`, `react-icons`, `@radix-ui/react-icons`, `@lobehub/icons`
- All icons use theme-aware Tailwind classes

### Build Process ✅
- Config package build automation (`prebuild` hook)
- Root-level `deploy:web` script for convenience
- TypeScript compilation for config package

### Security ✅
- Comprehensive security audit documentation
- Webhook signature verification
- Email security best practices
- Dependency security scanning

---

## Additional Resources

- [Security Audit](../security/Security_Audit.md) - Comprehensive security documentation
- [Production Validation Guide](../production-validation-roadmap/PRODUCTION_VALIDATION_COMPREHENSIVE.md) - Complete validation checklist
- [Icon System Guide](../components/ICON_SYSTEM.md) - Icon usage and best practices
- [Compliance Checklist](../compliance/Compliance_Checklist.md) - PDPL compliance verification

