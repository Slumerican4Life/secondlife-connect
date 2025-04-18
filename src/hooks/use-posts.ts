
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    username: string;
    avatar_url: string;
    full_name: string;
  };
}

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          user_id as userId,
          content,
          created_at as createdAt,
          likes_count as likes,
          comments_count as comments,
          author:profiles(username, avatar_url, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch posts');
        throw error;
      }

      if (!data?.length) {
        toast.info('No posts available');
      }

      return data || [];
    },
  });
};
