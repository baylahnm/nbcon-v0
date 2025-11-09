import { useEffect, useState } from 'react';
import { supabase } from '@nbcon/config';

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConversations() {
      try {
        setIsLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setConversations([]);
          setIsLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('conversations')
          .select('id, title, created_at, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setConversations(data || []);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch conversations'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchConversations();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createConversation = async (title: string): Promise<Conversation | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error: createError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: title.trim(),
        })
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      // Refresh conversations list
      const { data: updatedConversations } = await supabase
        .from('conversations')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (updatedConversations) {
        setConversations(updatedConversations);
      }

      return data;
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError(err instanceof Error ? err : new Error('Failed to create conversation'));
      return null;
    }
  };

  const deleteConversation = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Refresh conversations list
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: updatedConversations } = await supabase
          .from('conversations')
          .select('id, title, created_at, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (updatedConversations) {
          setConversations(updatedConversations);
        }
      }

      return true;
    } catch (err) {
      console.error('Error deleting conversation:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete conversation'));
      return false;
    }
  };

  return {
    conversations,
    isLoading,
    error,
    createConversation,
    deleteConversation,
  };
}

