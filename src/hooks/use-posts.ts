
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  author: {
    username: string;
    avatar_url: string;
    full_name: string;
  };
  likes_count: number;
  comments_count: number;
  has_liked?: boolean;
}

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(username, avatar_url, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch posts');
        throw error;
      }

      return data || [];
    },
  });
};
