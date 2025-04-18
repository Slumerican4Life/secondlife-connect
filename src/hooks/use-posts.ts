
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
          user_id,
          content,
          created_at,
          likes_count,
          comments_count,
          profiles(username, avatar_url, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch posts');
        throw error;
      }

      if (!data?.length) {
        toast.info('No posts available');
      }

      // Transform the data to match our Post interface
      const formattedPosts: Post[] = data?.map(post => ({
        id: post.id,
        userId: post.user_id,
        content: post.content,
        createdAt: post.created_at,
        likes: post.likes_count,
        comments: post.comments_count,
        author: post.profiles || {
          username: 'unknown',
          avatar_url: '',
          full_name: 'Unknown User'
        }
      })) || [];

      return formattedPosts;
    },
  });
};
