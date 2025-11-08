import { useEffect, useState } from 'react';
import { supabase } from '@nbcon/config';

export interface Job {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setIsLoading(false);
          return;
        }

        // For now, use ai_logs as jobs/conversations
        // In the future, you can create a dedicated jobs table
        const { data: jobsData, error } = await supabase
          .from('ai_logs')
          .select('id, input, created_at, user_id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          console.error('Error fetching jobs:', error);
          setIsLoading(false);
          return;
        }

        // Transform ai_logs to jobs format
        const transformedJobs: Job[] = (jobsData || []).map((log) => ({
          id: log.id,
          title: log.input?.substring(0, 50) || 'Untitled Job',
          created_at: log.created_at,
          updated_at: log.updated_at || log.created_at,
          user_id: log.user_id,
        }));

        setJobs(transformedJobs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error in useJobs:', error);
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return { jobs, isLoading };
}

