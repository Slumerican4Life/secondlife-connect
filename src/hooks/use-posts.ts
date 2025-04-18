
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
      console.log('Starting posts query...');
      
      // Explicitly structure the query to match the database column names
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
        console.error('Supabase query error:', error);
        toast.error(`Failed to fetch posts: ${error.message}`);
        throw error;
      }

      console.log('Raw Supabase data:', data);

      if (!data || data.length === 0) {
        console.warn('No posts available');
        return [];
      }

      try {
        const formattedPosts: Post[] = data.map(post => {
          console.log('Processing post:', post);
          
          // Extract profile data regardless of structure (array or object)
          let authorData;
          
          if (post.profiles) {
            authorData = Array.isArray(post.profiles) && post.profiles.length > 0
              ? post.profiles[0]
              : post.profiles;
          }
          
          // Use default values if profile data is missing
          const author = {
            username: authorData?.username || 'unknown',
            avatar_url: authorData?.avatar_url || '',
            full_name: authorData?.full_name || 'Unknown User'
          };

          return {
            id: post.id,
            userId: post.user_id,
            content: post.content,
            createdAt: post.created_at,
            likes: post.likes_count || 0,
            comments: post.comments_count || 0,
            author
          };
        });

        console.log('Final formatted posts:', formattedPosts);
        return formattedPosts;
      } catch (formatError) {
        console.error('Error formatting posts:', formatError);
        toast.error('Error processing post data');
        return [];
      }
    },
  });
};
