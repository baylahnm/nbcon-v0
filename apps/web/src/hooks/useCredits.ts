import { useEffect, useState } from 'react';
import { supabase } from '@nbcon/config';
import { useSubscriptionTier } from './useSubscriptionTier';

const tierLimits: Record<string, number> = {
  free: 50,
  basic: 500,
  pro: 2000,
  enterprise: 999999, // Unlimited
};

interface Credits {
  used: number;
  limit: number;
  isLoading: boolean;
  canUse: boolean;
}

export function useCredits() {
  const { tier } = useSubscriptionTier();
  const [credits, setCredits] = useState<Credits>({
    used: 0,
    limit: tierLimits[tier] || 50,
    isLoading: true,
    canUse: true,
  });

  useEffect(() => {
    async function fetchCredits() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setCredits((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        // Fetch user credits
        const { data, error } = await supabase
          .from('user_credits')
          .select('daily_tokens_used, daily_tokens_limit')
          .eq('user_id', user.id)
          .single();

        if (error) {
          // If no credits record exists, initialize it
          if (error.code === 'PGRST116') {
            // Initialize credits for user
            const { error: initError } = await supabase.rpc('initialize_user_credits', {
              p_user_id: user.id,
              p_tier: tier,
            });

            if (initError) {
              console.error('Error initializing credits:', initError);
              setCredits((prev) => ({
                ...prev,
                limit: tierLimits[tier] || 50,
                isLoading: false,
              }));
              return;
            }

            // Fetch again after initialization
            const { data: newData } = await supabase
              .from('user_credits')
              .select('daily_tokens_used, daily_tokens_limit')
              .eq('user_id', user.id)
              .single();

            if (newData) {
              const limit = newData.daily_tokens_limit;
              const used = newData.daily_tokens_used || 0;
              setCredits({
                used,
                limit,
                isLoading: false,
                canUse: tier === 'enterprise' || used < limit,
              });
            }
            return;
          }

          console.error('Error fetching credits:', error);
          setCredits((prev) => ({
            ...prev,
            limit: tierLimits[tier] || 50,
            isLoading: false,
          }));
          return;
        }

        if (data) {
          const limit = data.daily_tokens_limit;
          const used = data.daily_tokens_used || 0;
          setCredits({
            used,
            limit,
            isLoading: false,
            canUse: tier === 'enterprise' || used < limit,
          });
        }
      } catch (error) {
        console.error('Error in useCredits:', error);
        setCredits((prev) => ({
          ...prev,
          limit: tierLimits[tier] || 50,
          isLoading: false,
        }));
      }
    }

    fetchCredits();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('user_credits_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_credits',
        },
        (payload) => {
          if (payload.new) {
            const newData = payload.new as { daily_tokens_used?: number; daily_tokens_limit?: number };
            setCredits((prev) => ({
              ...prev,
              used: newData.daily_tokens_used || prev.used,
              limit: newData.daily_tokens_limit || prev.limit,
              canUse: tier === 'enterprise' || (newData.daily_tokens_used || prev.used) < (newData.daily_tokens_limit || prev.limit),
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tier]);

  return credits;
}

