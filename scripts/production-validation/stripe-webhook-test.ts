/**
 * Stripe Webhook Testing Script
 * 
 * This script helps validate Stripe webhook processing in production.
 * Run this after deploying to production to verify webhook flows.
 * 
 * Usage:
 *   pnpm tsx scripts/production-validation/stripe-webhook-test.ts
 */

import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const SUPABASE_REF = process.env.SUPABASE_REF || '';
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || 'test@example.com';

if (!STRIPE_SECRET_KEY || !SUPABASE_REF) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const WEBHOOK_URL = `https://${SUPABASE_REF}.supabase.co/functions/v1/stripe-webhook`;

interface TestResult {
  test: string;
  passed: boolean;
  message: string;
  details?: any;
}

const results: TestResult[] = [];

async function testWebhookEvent(eventType: string, payload: any) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = stripe.webhooks.generateTestHeaderString({
    payload: JSON.stringify(payload),
    secret: STRIPE_WEBHOOK_SECRET,
    timestamp,
    scheme: Stripe.Webhooks.DEFAULT_TOLERANCE,
  });

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': signature,
      },
      body: JSON.stringify(payload),
    });

    return {
      status: response.status,
      ok: response.ok,
      body: await response.text(),
    };
  } catch (error: any) {
    return {
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

async function runTests() {
  console.log('🧪 Starting Stripe Webhook Validation Tests\n');

  // Test 1: checkout.session.completed
  console.log('Test 1: checkout.session.completed webhook');
  const checkoutPayload = {
    id: 'evt_test_webhook',
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_123',
        customer: 'cus_test_123',
        subscription: 'sub_test_123',
        metadata: {
          userId: 'test-user-id',
        },
      },
    },
  };

  const checkoutResult = await testWebhookEvent('checkout.session.completed', checkoutPayload);
  results.push({
    test: 'checkout.session.completed',
    passed: checkoutResult.status === 200,
    message: checkoutResult.status === 200 
      ? '✅ Webhook processed successfully'
      : `❌ Failed with status ${checkoutResult.status}`,
    details: checkoutResult,
  });

  // Test 2: customer.subscription.updated
  console.log('Test 2: customer.subscription.updated webhook');
  const subscriptionPayload = {
    id: 'evt_test_webhook_2',
    object: 'event',
    type: 'customer.subscription.updated',
    data: {
      object: {
        id: 'sub_test_123',
        customer: 'cus_test_123',
        status: 'active',
        items: {
          data: [{
            price: {
              id: 'price_basic',
              metadata: {
                tier: 'basic',
              },
            },
          }],
        },
      },
    },
  };

  const subscriptionResult = await testWebhookEvent('customer.subscription.updated', subscriptionPayload);
  results.push({
    test: 'customer.subscription.updated',
    passed: subscriptionResult.status === 200,
    message: subscriptionResult.status === 200
      ? '✅ Webhook processed successfully'
      : `❌ Failed with status ${subscriptionResult.status}`,
    details: subscriptionResult,
  });

  // Test 3: customer.subscription.deleted
  console.log('Test 3: customer.subscription.deleted webhook');
  const deletedPayload = {
    id: 'evt_test_webhook_3',
    object: 'event',
    type: 'customer.subscription.deleted',
    data: {
      object: {
        id: 'sub_test_123',
        customer: 'cus_test_123',
        status: 'canceled',
      },
    },
  };

  const deletedResult = await testWebhookEvent('customer.subscription.deleted', deletedPayload);
  results.push({
    test: 'customer.subscription.deleted',
    passed: deletedResult.status === 200,
    message: deletedResult.status === 200
      ? '✅ Webhook processed successfully'
      : `❌ Failed with status ${deletedResult.status}`,
    details: deletedResult,
  });

  // Print results
  console.log('\n📊 Test Results Summary:');
  console.log('='.repeat(50));
  
  results.forEach((result) => {
    console.log(`${result.passed ? '✅' : '❌'} ${result.test}`);
    console.log(`   ${result.message}`);
    if (result.details && !result.passed) {
      console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
    }
  });

  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total: ${passedCount}/${totalCount} tests passed`);
  
  if (passedCount === totalCount) {
    console.log('🎉 All webhook tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Review webhook logs in Supabase.');
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});

