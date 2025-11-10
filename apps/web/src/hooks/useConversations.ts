import { useEffect, useState } from 'react';
import { supabase } from '@nbcon/config';

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  pinned?: boolean;
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
          .select('id, user_id, title, created_at, updated_at, pinned')
          .eq('user_id', user.id)
          .order('pinned', { ascending: false })
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
        .select('id, user_id, title, created_at, updated_at, pinned')
        .eq('user_id', user.id)
        .order('pinned', { ascending: false })
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
          .select('id, user_id, title, created_at, updated_at, pinned')
          .eq('user_id', user.id)
          .order('pinned', { ascending: false })
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

  const renameConversation = async (id: string, title: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`/api/conversations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to rename conversation');
      }

      // Refresh conversations list
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: updatedConversations } = await supabase
          .from('conversations')
          .select('id, user_id, title, created_at, updated_at, pinned')
          .eq('user_id', user.id)
          .order('pinned', { ascending: false })
          .order('updated_at', { ascending: false });

        if (updatedConversations) {
          setConversations(updatedConversations);
        }
      }

      return true;
    } catch (err) {
      console.error('Error renaming conversation:', err);
      setError(err instanceof Error ? err : new Error('Failed to rename conversation'));
      return false;
    }
  };

  const pinConversation = async (id: string, pinned: boolean): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`/api/conversations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ pinned }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMessage = errorData?.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error('API error response:', errorMessage);
        throw new Error(`Failed to pin conversation: ${errorMessage}`);
      }

      // Refresh conversations list
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: updatedConversations } = await supabase
          .from('conversations')
          .select('id, user_id, title, created_at, updated_at, pinned')
          .eq('user_id', user.id)
          .order('pinned', { ascending: false })
          .order('updated_at', { ascending: false });

        if (updatedConversations) {
          setConversations(updatedConversations);
        }
      }

      return true;
    } catch (err) {
      console.error('Error pinning conversation:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to pin conversation';
      setError(new Error(errorMessage));
      return false;
    }
  };

  return {
    conversations,
    isLoading,
    error,
    createConversation,
    deleteConversation,
    renameConversation,
    pinConversation,
  };
}

