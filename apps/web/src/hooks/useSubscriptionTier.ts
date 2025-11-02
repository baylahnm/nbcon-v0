import { useEffect, useState } from 'react';
import { supabase } from '@nbcon/config';
import { SubscriptionTier } from '../config/menuConfig';

export function useSubscriptionTier() {
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTier() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching subscription tier:', error);
          setIsLoading(false);
          return;
        }

        setTier((profile?.subscription_tier as SubscriptionTier) || 'free');

        // Subscribe to real-time updates
        const channel = supabase
          .channel('tier_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${user.id}`,
            },
            (payload) => {
              const newTier = (payload.new as any)?.subscription_tier;
              if (newTier) {
                setTier(newTier as SubscriptionTier);
              }
            }
          )
          .subscribe();

        setIsLoading(false);

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error in useSubscriptionTier:', error);
        setIsLoading(false);
      }
    }

    fetchTier();
  }, []);

  return { tier, isLoading };
}

