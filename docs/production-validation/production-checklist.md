# Production Validation Checklist

**Last Updated:** 2025-01-06  
**Purpose:** Comprehensive validation checklist for production deployment  
**Status:** Ready for execution when production environment is available

---

## Phase 6: Data Retention + Encryption Compliance

### 6.1 Data Retention Validation

- [ ] **Verify audit_logs retention policy**
  - Check Supabase database: `SELECT * FROM audit_logs WHERE created_at < NOW() - INTERVAL '90 days';`
  - Confirm records older than 90 days are automatically deleted
  - Verify retention policy is active: `SELECT * FROM pg_policies WHERE tablename = 'audit_logs';`

- [ ] **Verify ai_logs retention policy**
  - Check: `SELECT * FROM ai_logs WHERE created_at < NOW() - INTERVAL '90 days';`
  - Confirm old AI logs are purged automatically
  - Verify cron job or scheduled function is running

- [ ] **Verify billing_events retention**
  - Check: `SELECT * FROM billing_events WHERE created_at < NOW() - INTERVAL '7 years';`
  - Confirm billing events are retained for 7 years (compliance requirement)
  - Verify no automatic deletion for billing_events

- [ ] **Test retention job execution**
  - Run lifecycle-cron function manually
  - Verify logs show successful retention cleanup
  - Check audit_logs for retention events

### 6.2 Encryption Compliance

- [ ] **Database encryption at rest**
  - Verify Supabase project uses encryption at rest (default for all Supabase projects)
  - Check Supabase dashboard: Settings → Database → Encryption
  - Document encryption status

- [ ] **Data in transit (TLS)**
  - Verify all API endpoints use HTTPS
  - Test: `curl -I https://your-domain.com/api/health`
  - Check Supabase connection uses SSL: `SELECT * FROM pg_stat_ssl;`

- [ ] **Sensitive data encryption**
  - Verify passwords are hashed (Supabase Auth handles this)
  - Check `profiles` table: `stripe_customer_id`, `email` should be stored securely
  - Verify API keys are not exposed in client-side code

- [ ] **Environment variables security**
  - Verify all secrets are in Supabase secrets (not in code)
  - Check Cloudflare Pages environment variables are encrypted
  - Verify `.env` files are in `.gitignore`

### 6.3 PDPL Compliance Checklist

- [ ] **Data minimization**
  - Verify only necessary data is collected
  - Check user profile fields match signup form

- [ ] **User consent**
  - Verify privacy policy link in signup form
  - Check terms of service acceptance

- [ ] **Right to access**
  - Test user data export functionality (if implemented)
  - Verify users can view their data in dashboard

- [ ] **Right to deletion**
  - Test account deletion flow
  - Verify cascading deletion of user data
  - Check audit_logs for deletion events

- [ ] **Data breach notification**
  - Document process for breach notification
  - Verify audit logging captures security events

---

## Phase 9: Stripe Webhook Testing

### 9.1 Checkout Flow Testing

- [ ] **Test Free → Basic upgrade**
  - Create test user with free tier
  - Navigate to billing page
  - Click "Upgrade" to Basic
  - Complete Stripe Checkout
  - Verify webhook received: `checkout.session.completed`
  - Check `profiles.subscription_tier` updated to `basic`
  - Verify `billing_events` table has new record
  - Check Realtime subscription updates UI immediately

- [ ] **Test Basic → Pro upgrade**
  - Start with Basic tier user
  - Upgrade to Pro
  - Verify webhook processing
  - Check tier updated correctly
  - Verify billing event logged

- [ ] **Test checkout failure**
  - Use Stripe test card: `4000 0000 0000 0002` (declined)
  - Verify error handling
  - Check user tier unchanged
  - Verify error logged in audit_logs

### 9.2 Downgrade Flow Testing

- [ ] **Test Pro → Basic downgrade**
  - Use Stripe Customer Portal
  - Navigate to "Manage Subscription"
  - Change subscription to Basic
  - Verify webhook: `customer.subscription.updated`
  - Check tier downgraded to `basic`
  - Verify billing event logged
  - Check UI updates via Realtime

- [ ] **Test cancellation flow**
  - Cancel subscription via Customer Portal
  - Verify webhook: `customer.subscription.deleted`
  - Check tier set to `free`
  - Verify cancellation logged in billing_events
  - Check access to premium features is revoked

- [ ] **Test subscription renewal**
  - Wait for subscription renewal (or use Stripe test mode to trigger)
  - Verify webhook: `customer.subscription.updated`
  - Check billing event for renewal
  - Verify tier remains unchanged

### 9.3 Webhook Reliability

- [ ] **Test webhook retry**
  - Temporarily break webhook endpoint
  - Trigger Stripe event
  - Verify Stripe retries (check Stripe Dashboard → Webhooks → Logs)
  - Fix endpoint
  - Verify eventual success

- [ ] **Test webhook signature verification**
  - Verify webhook endpoint validates Stripe signatures
  - Test with invalid signature (should reject)
  - Test with valid signature (should process)

- [ ] **Test idempotency**
  - Trigger same webhook event twice
  - Verify no duplicate records created
  - Check billing_events for duplicates

### 9.4 Edge Cases

- [ ] **Test webhook before user profile exists**
  - Create Stripe customer without profile
  - Trigger webhook
  - Verify error handling (should log error, not crash)

- [ ] **Test concurrent webhooks**
  - Trigger multiple webhooks simultaneously
  - Verify all processed correctly
  - Check for race conditions

---

## Phase 9: Supabase Edge Functions Audit

### 9.1 Edge Function Logs Review

- [ ] **stripe-checkout function**
  - Check logs for successful checkout sessions
  - Verify customer creation/retrieval logic
  - Check error logs for failures
  - Verify `stripe_customer_id` stored correctly

- [ ] **stripe-webhook function**
  - Check logs for webhook processing
  - Verify all webhook events processed
  - Check for failed webhook deliveries
  - Verify profile updates logged

- [ ] **stripe-portal function**
  - Check logs for portal session creation
  - Verify customer lookup works
  - Check error handling for missing customers

- [ ] **lifecycle-cron function**
  - Check scheduled execution logs
  - Verify churn reports generated monthly
  - Check retention cleanup logs
  - Verify audit_logs entries created

### 9.2 Error Rate Analysis

- [ ] **Calculate error rates**
  - Query Supabase logs: Errors in last 24 hours
  - Calculate error rate: `errors / total_requests`
  - Target: < 1% error rate

- [ ] **Identify common errors**
  - Review error logs for patterns
  - Document recurring issues
  - Create fixes for common errors

- [ ] **Check timeout issues**
  - Review logs for timeout errors
  - Verify function execution time < 10 seconds
  - Optimize if needed

### 9.3 Performance Metrics

- [ ] **Function execution time**
  - Check average execution time
  - Target: < 2 seconds for most functions
  - Document slow functions

- [ ] **Database query performance**
  - Check query execution times in logs
  - Verify indexes are used
  - Optimize slow queries

---

## Phase 9: Cloudflare Deployment Verification

### 9.1 Build Verification

- [ ] **Production build succeeds**
  - Run: `pnpm --filter @nbcon/web build`
  - Verify no build errors
  - Check bundle size is acceptable
  - Verify TypeScript compilation passes

- [ ] **Environment variables**
  - Verify all required env vars in Cloudflare Pages
  - Check `NEXT_PUBLIC_*` variables are set
  - Verify secrets are not exposed in build logs

- [ ] **Build output**
  - Verify `.next` directory structure
  - Check static files are generated
  - Verify API routes are included

### 9.2 Deployment Verification

- [ ] **Cloudflare Pages deployment**
  - Check deployment succeeded
  - Verify custom domain is active
  - Check SSL certificate is valid
  - Test HTTPS redirect

- [ ] **Edge Functions**
  - Deploy Supabase Edge Functions
  - Verify all functions deployed
  - Check function URLs are accessible
  - Test function endpoints

### 9.3 Sentry Integration

- [ ] **Sentry source maps**
  - Verify source maps uploaded to Sentry
  - Check Sentry dashboard shows source maps
  - Test error reporting with source maps

- [ ] **Error tracking**
  - Trigger a test error
  - Verify error appears in Sentry
  - Check source maps work correctly
  - Verify stack traces are readable

### 9.4 Performance Monitoring

- [ ] **Core Web Vitals**
  - Run Lighthouse audit
  - Verify Performance score ≥ 90
  - Check LCP, FID, CLS metrics
  - Document results

- [ ] **CDN performance**
  - Check Cloudflare Analytics
  - Verify cache hit rate
  - Check response times
  - Verify global distribution

---

## Phase 9: Email Templates Verification

### 9.1 Email Template Testing

- [ ] **Verify all email templates in Supabase Dashboard**
  - Navigate to Supabase Dashboard > Authentication > Email Templates
  - Verify all 6 templates are uploaded and active
  - Check template names match: Confirm signup, Invite user, Magic link, Change email, Reset password, Reauthentication

- [ ] **Test email template rendering**
  - Send test email for each template type
  - Verify subject lines are correct:
    - "Your verification code for nbcon" (confirm signup, magic link, reauthentication)
    - "You've been invited to nbcon" (invite user)
    - "Your magic link for nbcon" (change email)
    - "Reset your password for nbcon" (reset password)
  - Verify branding consistency: "nbcon" (not "NBCON PRO")
  - Check tagline: "Saudi Arabia's Professional Engineering Marketplace"
  - Verify logo displays correctly (nb glyph with gradient)
  - Check footer: nbcon.app · info@nbcon.app · +966 56 622 2179

- [ ] **Template content verification**
  - Verify all templates use consistent color scheme (#2D5346, #50635C, #EDEAE7)
  - Check responsive design (max-width:600px)
  - Verify dark mode support
  - Check Outlook VML fallback for buttons
  - Verify preheader text is hidden

- [ ] **Template functionality testing**
  - Test signup flow → verify confirmation email received
  - Test password reset → verify reset email received
  - Test magic link login → verify magic link email received
  - Test email change → verify change email template sent
  - Test user invitation → verify invite email received
  - Test reauthentication → verify reauth code email received

---

## Phase 9: End-to-End QA Testing

### 9.1 Authentication Flow

- [ ] **Signup flow**
  - Create new account
  - Verify email confirmation (if enabled)
  - Check profile created in database
  - Verify redirect to dashboard

- [ ] **Login flow**
  - Login with existing account
  - Verify session persists
  - Check redirect works correctly

- [ ] **Password reset**
  - Request password reset
  - Verify email sent
  - Complete reset flow
  - Verify new password works

### 9.2 Dashboard Flow

- [ ] **Dashboard loads**
  - Verify UnifiedDashboard renders
  - Check charts display correctly
  - Verify subscription tier shown
  - Check real-time updates work

- [ ] **Navigation**
  - Test all navigation links
  - Verify breadcrumbs work
  - Check mobile menu functions
  - Test language toggle

### 9.3 AI Co-Pilot Flow

- [ ] **AI agent interaction**
  - Navigate to AI page
  - Select an agent
  - Send a prompt
  - Verify response received
  - Check tokens logged in ai_logs

- [ ] **ChatProjectHub**
  - Open chat on Projects page
  - Send message
  - Verify response
  - Check message history loads

### 9.4 Billing Flow

- [ ] **Full checkout flow**
  - Navigate to billing page
  - Select plan
  - Complete Stripe checkout
  - Verify tier updated
  - Check billing event logged

- [ ] **Customer Portal**
  - Click "Manage Subscription"
  - Verify portal opens
  - Test subscription management
  - Verify changes reflected in app

### 9.5 Multi-language Testing

- [ ] **English interface**
  - Switch to English
  - Verify all text in English
  - Check layout (LTR)

- [ ] **Arabic interface**
  - Switch to Arabic
  - Verify all text in Arabic
  - Check layout (RTL)
  - Verify direction switching works

### 9.6 Mobile Responsiveness

- [ ] **Mobile viewport testing**
  - Test on 320px, 375px, 414px widths
  - Verify no horizontal scroll
  - Check mobile menu works
  - Test touch interactions

- [ ] **Tablet viewport testing**
  - Test on 768px, 1024px widths
  - Verify responsive layouts
  - Check navigation works

---

## Validation Scripts

### Script 1: Data Retention Check

```sql
-- Check audit_logs retention
SELECT 
  COUNT(*) as total_old_logs,
  MIN(created_at) as oldest_log
FROM audit_logs 
WHERE created_at < NOW() - INTERVAL '90 days';

-- Should return 0 or very few records
```

### Script 2: Webhook Event Log

```bash
# Check recent webhook events in Supabase logs
# Navigate to: Supabase Dashboard → Edge Functions → stripe-webhook → Logs

# Look for:
# - checkout.session.completed events
# - customer.subscription.updated events
# - customer.subscription.deleted events
```

### Script 3: Edge Function Health Check

```typescript
// Test all Edge Functions are accessible
const functions = [
  'stripe-checkout',
  'stripe-webhook', 
  'stripe-portal',
  'lifecycle-cron'
];

for (const func of functions) {
  const response = await fetch(
    `https://${SUPABASE_REF}.supabase.co/functions/v1/${func}`,
    { method: 'OPTIONS' }
  );
  console.log(`${func}: ${response.status}`);
}
```

---

## Success Criteria

### Phase 6: Compliance
- ✅ All retention policies active and working
- ✅ Encryption verified (at rest and in transit)
- ✅ PDPL checklist items verified
- ✅ No sensitive data exposed

### Phase 9: Stripe
- ✅ All webhook events processed successfully
- ✅ Checkout flows work correctly
- ✅ Downgrade flows work correctly
- ✅ Error rate < 1%

### Phase 9: Supabase
- ✅ All Edge Functions operational
- ✅ Error rate < 1%
- ✅ Average execution time < 2 seconds
- ✅ Logs show successful operations

### Phase 9: Cloudflare
- ✅ Build succeeds without errors
- ✅ Deployment successful
- ✅ Sentry source maps working
- ✅ Core Web Vitals passing

### Phase 9: QA
- ✅ All user flows work end-to-end
- ✅ Multi-language support verified
- ✅ Mobile responsive
- ✅ No critical bugs found

---

## Post-Validation Actions

1. **Document Results**
   - Create validation report
   - Document any issues found
   - Create tickets for fixes

2. **Performance Optimization**
   - Address any performance issues
   - Optimize slow queries
   - Improve bundle size if needed

3. **Monitoring Setup**
   - Configure alerts for errors
   - Set up uptime monitoring
   - Create dashboards

4. **Go-Live Checklist**
   - Final security review
   - Load testing
   - Backup verification
   - Rollback plan prepared

---

**Next Steps:** Execute this checklist once production environment is available.

