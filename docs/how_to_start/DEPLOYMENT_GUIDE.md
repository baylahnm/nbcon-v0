# NBCON PRO Deployment Guide

## Prerequisites

- Node.js 20+
- pnpm 9+
- Supabase CLI
- Cloudflare account (for CDN)
- Stripe account
- PostHog account (optional)

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

```bash
# Build web app
pnpm --filter @nbcon/web build

# Verify build
pnpm --filter @nbcon/web start
```

## Deployment Steps

### Supabase

1. **Migrations**: All SQL migrations applied
2. **Edge Functions**: Deployed and tested
3. **RLS Policies**: Verified via SQL tests
4. **Secrets**: Environment variables configured

### Cloudflare Pages

1. **Connect Repository**: Link GitHub repo to Cloudflare
2. **Build Settings**:
   - Build command: `pnpm --filter @nbcon/web build`
   - Output directory: `apps/web/.next`
   - Node version: `20`
3. **Environment Variables**: Add all production env vars
4. **Deploy**: Trigger deployment on push to `main`

### Stripe Webhook Configuration

1. **Webhook URL**: `https://your-project.supabase.co/functions/v1/stripe-webhook`
2. **Events**: Subscribe to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
3. **Secret**: Store in Supabase secrets

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

- [ ] User authentication flow
- [ ] Subscription checkout
- [ ] Tier-based feature gating
- [ ] AI agent invocation
- [ ] Dashboard rendering
- [ ] CoPilot Toolbar functionality

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

- Check Node.js version compatibility
- Verify all dependencies installed
- Review CI/CD logs for specific errors

### Database Issues

- Verify RLS policies not blocking operations
- Check migration order and dependencies
- Review Supabase logs for errors

### Edge Function Errors

- Check environment variables in Supabase dashboard
- Verify function logs in Supabase dashboard
- Test functions locally with `supabase functions serve`

