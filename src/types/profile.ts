export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  website: string;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  following?: number;
  followers?: number;
  joinedDate?: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}
