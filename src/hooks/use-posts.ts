
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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
      // Fetch posts with author details using join
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          user_id,
          content,
          created_at,
          likes_count,
          comments_count,
          profiles (username, avatar_url, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch posts:', error);
        throw new Error(`Failed to load posts: ${error.message}`);
      }

      // Handle empty response gracefully
      if (!data || data.length === 0) {
        return [];
      }

      // Transform data to expected format
      return data.map(post => {
        // Handle profile data (could be array or object based on Supabase join format)
        const profileData = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
        
        return {
          id: post.id,
          userId: post.user_id,
          content: post.content,
          createdAt: post.created_at,
          likes: post.likes_count || 0,
          comments: post.comments_count || 0,
          author: {
            username: profileData?.username || 'unknown',
            avatar_url: profileData?.avatar_url || '',
            full_name: profileData?.full_name || 'Unknown User'
          }
        };
      });
    },
    // Implement standard error handling at the query level
    meta: {
      onError: (error) => {
        console.error('Query error:', error);
      }
    }
  });
};
