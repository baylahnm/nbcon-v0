import Stripe from 'npm:stripe@^14.0.0';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@^2.39.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const tierMap: Record<string, string> = {
  price_free: 'free',
  price_basic: 'basic',
  price_pro: 'pro',
  price_enterprise: 'enterprise',
};

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const data = event.data.object as any;
    const eventType = event.type;

    console.log(`Processing webhook event: ${eventType}`);

    // Handle checkout completion and subscription updates
    if (
      eventType === 'checkout.session.completed' ||
      eventType === 'customer.subscription.updated'
    ) {
      const userId =
        data.metadata?.userId ||
        data.client_reference_id ||
        data.customer_metadata?.userId;

      let priceId: string | undefined;

      if (data.line_items?.data?.[0]?.price?.id) {
        priceId = data.line_items.data[0].price.id;
      } else if (data.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          data.subscription
        );
        priceId = subscription.items.data[0]?.price?.id;
      } else if (data.items?.data?.[0]?.price?.id) {
        priceId = data.items.data[0].price.id;
      }

      const tier = priceId ? tierMap[priceId] || 'free' : 'free';

      if (userId) {
        // Update profile subscription tier
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ subscription_tier: tier })
          .eq('id', userId);

        if (profileError) {
          console.error('Error updating profile:', profileError);
        }

        // Initialize or update user credits with new tier limits
        const { error: creditsError } = await supabase.rpc('initialize_user_credits', {
          p_user_id: userId,
          p_tier: tier,
        });

        if (creditsError) {
          console.error('Error initializing credits:', creditsError);
        }

        // Log billing event
        const { error: eventError } = await supabase
          .from('billing_events')
          .insert({
            user_id: userId,
            stripe_event: eventType,
            tier,
            status: 'active',
          });

        if (eventError) {
          console.error('Error logging billing event:', eventError);
        }

        console.log(`Updated user ${userId} to tier ${tier} and initialized credits`);
      }
    }

    // Handle subscription cancellation
    if (eventType === 'customer.subscription.deleted') {
      const userId =
        data.metadata?.userId || data.customer_metadata?.userId;

      if (userId) {
        // Reset to free tier
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ subscription_tier: 'free' })
          .eq('id', userId);

        if (profileError) {
          console.error('Error updating profile:', profileError);
        }

        // Update user credits to free tier limits
        const { error: creditsError } = await supabase.rpc('initialize_user_credits', {
          p_user_id: userId,
          p_tier: 'free',
        });

        if (creditsError) {
          console.error('Error updating credits:', creditsError);
        }

        // Log cancellation event
        const { error: eventError } = await supabase
          .from('billing_events')
          .insert({
            user_id: userId,
            stripe_event: eventType,
            tier: 'free',
            status: 'cancelled',
          });

        if (eventError) {
          console.error('Error logging billing event:', eventError);
        }

        console.log(`Reset user ${userId} to free tier and updated credits`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});

