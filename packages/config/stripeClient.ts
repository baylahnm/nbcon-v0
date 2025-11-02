import Stripe from 'stripe';

// Server-side only - use in Edge Functions or API routes
export function getStripeClient(): Stripe {
  const stripeSecretKey = 
    (typeof process !== 'undefined' && process.env?.STRIPE_SECRET_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.STRIPE_SECRET_KEY);

  if (!stripeSecretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
  });
}

// Only export stripe on server-side
export const stripe = typeof window === 'undefined' ? getStripeClient() : null;

