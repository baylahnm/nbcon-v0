# Billing Implementation Testing Guide

**Created:** 2025-01-28  
**Status:** Ready for Testing  
**Purpose:** Step-by-step testing checklist for billing system implementation

---

## 🎯 Pre-Testing Checklist

### Environment Setup
- [ ] Stripe dashboard configured with SAR products
- [ ] Stripe price IDs created: `price_basic_sar`, `price_pro_sar`
- [ ] Stripe webhook endpoint configured: `https://your-project.supabase.co/functions/v1/stripe-webhook`
- [ ] Webhook events selected: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] Webhook secret added to Supabase Edge Function environment variables
- [ ] Supabase migrations applied (subscription_tier, user_credits, billing_events)
- [ ] Edge functions deployed: `stripe-checkout`, `stripe-webhook`, `stripe-portal`

---

## 🧪 Testing Scenarios

### Test 1: Billing Page Display

**Steps:**
1. Navigate to `/billing`
2. Verify all 4 plans display correctly

**Expected Results:**
- [ ] Free plan shows: `0 SAR/month`
- [ ] Basic plan shows: `49 SAR/month`
- [ ] Pro plan shows: `149 SAR/month`
- [ ] Enterprise plan shows: `Custom`
- [ ] Current plan badge displays on active plan
- [ ] Enterprise plan shows "Contact Sales" button (not checkout)
- [ ] Basic/Pro plans show checkout buttons
- [ ] No USD symbols anywhere

**Browser Test:**
```bash
# Use browser tools to navigate and verify
1. Navigate to http://localhost:3000/billing
2. Take snapshot of page
3. Verify pricing displays match expected SAR values
4. Verify Enterprise button text is "Contact Sales"
```

---

### Test 2: Enterprise Contact Form

**Steps:**
1. Navigate to `/billing`
2. Click "Contact Sales" on Enterprise plan
3. Should redirect to `/enterprise`
4. Fill out contact form:
   - Company: "Test Company"
   - Email: "test@example.com"
   - Phone: "+966 50 123 4567" (optional)
   - Message: "Test enterprise inquiry"
5. Submit form

**Expected Results:**
- [ ] Redirects to `/enterprise` page
- [ ] Form displays all required fields
- [ ] Form validation works (required fields)
- [ ] Email format validation works
- [ ] Submission shows success message: "Thank you! Our team will contact you within 24 hours."
- [ ] Form resets after successful submission
- [ ] Console logs show submission data (until email service integrated)

**Browser Test:**
```bash
# Use browser tools
1. Navigate to http://localhost:3000/billing
2. Click Enterprise "Contact Sales" button
3. Verify redirect to /enterprise
4. Fill form fields
5. Submit and verify success state
6. Check browser console for API call logs
```

---

### Test 3: Basic Plan Checkout Flow

**Steps:**
1. Navigate to `/billing`
2. Click "Upgrade" on Basic plan
3. Complete Stripe checkout (use test card: `4242 4242 4242 4242`)
4. Verify redirect to `/billing/success`
5. Check database for tier update

**Expected Results:**
- [ ] Stripe checkout opens with correct price (49 SAR)
- [ ] Checkout uses `price_basic_sar` price ID
- [ ] After payment, redirects to success page
- [ ] `profiles.subscription_tier` = `"basic"`
- [ ] `user_credits.daily_tokens_limit` = `500`
- [ ] `user_credits.daily_tokens_used` = `0`
- [ ] `billing_events` table has new entry
- [ ] UI updates immediately (Realtime)

**Browser Test:**
```bash
# Use browser tools
1. Navigate to /billing
2. Click Basic plan upgrade button
3. Verify Stripe checkout opens
4. Complete test payment
5. Verify redirect to success page
6. Navigate back to /billing
7. Verify "Current Plan: Basic" badge appears
8. Check UserMenu credits display (should show 500 limit)
```

---

### Test 4: Pro Plan Checkout Flow

**Steps:**
1. Navigate to `/billing`
2. Click "Upgrade" on Pro plan
3. Complete Stripe checkout
4. Verify tier and credits update

**Expected Results:**
- [ ] Stripe checkout uses `price_pro_sar` price ID
- [ ] Checkout shows 149 SAR
- [ ] `profiles.subscription_tier` = `"pro"`
- [ ] `user_credits.daily_tokens_limit` = `2000`
- [ ] Credits display updates to show 2000 limit

**Browser Test:**
```bash
# Similar to Test 3, but for Pro plan
1. Complete Pro checkout
2. Verify 2000 token limit in UserMenu
```

---

### Test 5: Credit Display & Enforcement

**Steps:**
1. Check UserMenu credits display
2. Use AI agent until credits exhausted
3. Verify credit enforcement

**Expected Results:**
- [ ] UserMenu shows "X left" format
- [ ] Progress bar reflects usage percentage
- [ ] Progress bar is empty when credits = 0
- [ ] Clicking credits navigates to `/billing`
- [ ] AI agent blocks when credits exhausted (non-Enterprise)
- [ ] Error message includes upgrade CTA

**Browser Test:**
```bash
# Use browser tools
1. Navigate to dashboard
2. Check UserMenu credits display
3. Click credits section
4. Verify navigation to /billing
5. Use AI agent multiple times
6. Verify blocking when credits exhausted
```

---

### Test 6: Tier Upgrade/Downgrade

**Steps:**
1. Start with Free tier
2. Upgrade to Basic
3. Upgrade to Pro
4. Cancel subscription (via Stripe portal)
5. Verify downgrade to Free

**Expected Results:**
- [ ] Each upgrade resets credits to 0
- [ ] Limits update immediately: 50 → 500 → 2000
- [ ] Cancellation resets to Free tier (50 tokens)
- [ ] UI updates in real-time (no page refresh needed)

**Browser Test:**
```bash
# Use browser tools + Stripe dashboard
1. Complete upgrade flow
2. Verify credits reset at each tier change
3. Cancel subscription in Stripe portal
4. Verify webhook processes cancellation
5. Verify tier reverts to Free
```

---

### Test 7: Documentation Pages

**Steps:**
1. Navigate to `/docs/account/basic`
2. Navigate to `/docs/account/pro`
3. Check pricing displays

**Expected Results:**
- [ ] Basic page shows: `49 SAR/month`
- [ ] Pro page shows: `149 SAR/month`
- [ ] No USD symbols
- [ ] No old pricing ($29, $99)

**Browser Test:**
```bash
# Use browser tools
1. Navigate to /docs/account/basic
2. Verify pricing display
3. Navigate to /docs/account/pro
4. Verify pricing display
```

---

### Test 8: Webhook Verification

**Steps:**
1. Complete a test checkout
2. Check Stripe webhook logs
3. Verify webhook processes event
4. Check database updates

**Expected Results:**
- [ ] Webhook receives `checkout.session.completed` event
- [ ] Webhook maps `price_basic_sar` → `basic` correctly
- [ ] Webhook maps `price_pro_sar` → `pro` correctly
- [ ] Database updates occur within 1-2 seconds
- [ ] `billing_events` table logs the event

**Manual Verification:**
```bash
# Check Supabase logs
1. Go to Supabase Dashboard → Edge Functions → stripe-webhook → Logs
2. Verify webhook receives events
3. Check for any errors in logs
4. Verify tier mapping works correctly
```

---

## 🔍 Code Verification Checklist

### Config Files
- [x] `apps/web/src/config/plans.ts` exists and exports `PLANS` and `TIER_LIMITS`
- [x] All plans have correct SAR pricing
- [x] Price IDs match spec (`price_basic_sar`, `price_pro_sar`)

### Frontend Components
- [x] `apps/web/src/pages/billing/index.tsx` imports `PLANS`
- [x] `apps/web/src/hooks/useCredits.ts` imports `TIER_LIMITS`
- [x] Enterprise button routes to `/enterprise`
- [x] No hardcoded pricing values

### Backend Functions
- [x] `supabase/functions/stripe-webhook/index.ts` uses SAR price IDs
- [x] Webhook updates `profiles.subscription_tier`
- [x] Webhook calls `initialize_user_credits` RPC
- [x] Webhook logs to `billing_events`

### Documentation
- [x] Docs pages show SAR pricing
- [x] Deployment docs show correct price IDs
- [x] No USD remnants

---

## 🐛 Common Issues & Solutions

### Issue: Checkout fails with "Invalid price ID"
**Solution:** Verify Stripe dashboard has `price_basic_sar` and `price_pro_sar` products created

### Issue: Webhook doesn't update tier
**Solution:** 
- Check webhook secret is correct
- Verify webhook endpoint URL is correct
- Check Supabase Edge Function logs for errors
- Verify `userId` is passed in checkout metadata

### Issue: Credits don't reset on upgrade
**Solution:**
- Verify `initialize_user_credits` RPC function exists
- Check RPC function updates `daily_tokens_limit` correctly
- Verify webhook calls RPC with correct tier

### Issue: Enterprise button doesn't work
**Solution:**
- Verify `/enterprise` route exists
- Check button href is `/enterprise`
- Verify `plan.isEnterprise` flag is set correctly

---

## 📊 Test Results Template

```
Test Date: __________
Tester: __________
Environment: [ ] Local [ ] Staging [ ] Production

Test 1: Billing Page Display
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Test 2: Enterprise Contact Form
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Test 3: Basic Plan Checkout
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Test 4: Pro Plan Checkout
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Test 5: Credit Display & Enforcement
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Test 6: Tier Upgrade/Downgrade
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Test 7: Documentation Pages
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Test 8: Webhook Verification
- Result: [ ] PASS [ ] FAIL
- Notes: __________

Overall Status: [ ] READY FOR PRODUCTION [ ] NEEDS FIXES
```

---

## 🚀 Production Readiness Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] Stripe production price IDs configured
- [ ] Webhook endpoint uses production URL
- [ ] Environment variables set in production
- [ ] Email service integrated for Enterprise contact (optional)
- [ ] Daily credit reset cron job scheduled
- [ ] Monitoring/alerts configured for webhook failures
- [ ] Error tracking configured (Sentry)
- [ ] Analytics tracking configured (PostHog)

---

**Testing Guide End**

