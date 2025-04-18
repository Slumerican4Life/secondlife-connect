
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
      const formattedPosts: Post[] = data?.map(post => {
        // Extract the profile data - the profiles field might be an object or an array
        let profileData;

        // Check if post.profiles exists and how it's structured
        if (post.profiles) {
          if (Array.isArray(post.profiles)) {
            // If it's an array, get the first item
            profileData = post.profiles.length > 0 ? post.profiles[0] : null;
          } else {
            // If it's an object, use it directly
            profileData = post.profiles;
          }
        }

        // Default values if profile data is missing
        const defaultProfile = {
          username: 'unknown',
          avatar_url: '',
          full_name: 'Unknown User'
        };

        // Use profile data if available, otherwise use defaults
        const author = profileData || defaultProfile;
            
        return {
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
      }) || [];

      // Add console logs to help debug the structure
      console.log('Raw Supabase data:', data);
      console.log('Formatted posts:', formattedPosts);

      return formattedPosts;
    },
  });
};
