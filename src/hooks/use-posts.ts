
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
        console.error('Supabase query error:', error);
        toast.error('Failed to fetch posts');
        throw error;
      }

      console.log('Raw Supabase data:', data);

      if (!data?.length) {
        console.warn('No posts available');
        toast.info('No posts available');
        return [];
      }

      const formattedPosts: Post[] = data.map(post => {
        console.log('Processing post:', post);

        // Handle profiles data which could be array or object
        const profileData = Array.isArray(post.profiles) 
          ? post.profiles[0] 
          : post.profiles;

        // Fallback to default profile if no data
        const author = profileData || {
          username: 'unknown',
          avatar_url: '',
          full_name: 'Unknown User'
        };

        const formattedPost: Post = {
          id: post.id,
          userId: post.user_id,
          content: post.content,
          createdAt: post.created_at,
          likes: post.likes_count || 0,
          comments: post.comments_count || 0,
          author: {
            username: author.username,
            avatar_url: author.avatar_url,
            full_name: author.full_name
          }
        };

        console.log('Formatted post:', formattedPost);
        return formattedPost;
      });

      console.log('Final formatted posts:', formattedPosts);
      return formattedPosts;
    },
  });
};
