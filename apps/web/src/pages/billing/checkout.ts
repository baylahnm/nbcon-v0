import { supabase } from '@nbcon/config';

export async function createCheckoutSession(priceId: string): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: {
      priceId,
      userId: user.id,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.url) {
    throw new Error('No checkout URL returned');
  }

  return data.url;
}

