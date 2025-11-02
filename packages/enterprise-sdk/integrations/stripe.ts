import Stripe from "stripe";

function getStripeSecret(): string {
  const secret =
    (typeof process !== "undefined" && process.env?.STRIPE_SECRET_KEY) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.STRIPE_SECRET_KEY);

  if (!secret) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }

  return secret;
}

export const stripe = new Stripe(getStripeSecret(), {
  apiVersion: "2024-09-30",
});

export async function createSubscription(customerId: string, priceId: string) {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
  });
}

export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId);
}

