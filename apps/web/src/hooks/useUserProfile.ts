import { useEffect, useState } from 'react';
import { supabase } from '@nbcon/config';

export interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  email: string;
  avatar_url: string | null;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Use getSession() instead of getUser() for better caching
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setIsLoading(false);
          return;
        }

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('id, full_name, username, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // Fallback to auth user data
          setProfile({
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || null,
            username: session.user.user_metadata?.username || null,
            email: session.user.email || '',
            avatar_url: session.user.user_metadata?.avatar_url || null,
          });
          setIsLoading(false);
          return;
        }

        setProfile({
          id: session.user.id,
          full_name: profileData?.full_name || null,
          username: profileData?.username || null,
          email: session.user.email || '',
          avatar_url: profileData?.avatar_url || null,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error in useUserProfile:', error);
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, isLoading };
}

