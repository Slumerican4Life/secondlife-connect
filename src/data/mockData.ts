
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export const currentUser: User = {
  id: "1",
  name: "Alex Johnson",
  username: "alexj",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
  bio: "Virtual world explorer and digital artist",
  followers: 1250,
  following: 365,
};

export const users: User[] = [
  currentUser,
  {
    id: "2",
    name: "Sofia Rivera",
    username: "sofia_digital",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    bio: "Digital landscape creator",
    followers: 2340,
    following: 512,
  },
  {
    id: "3",
    name: "Marcus Chen",
    username: "marcusdesigns",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    bio: "Virtual architect and 3D modeler",
    followers: 5100,
    following: 650,
  },
  {
    id: "4",
    name: "Aisha Patel",
    username: "aishacreates",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
    bio: "Building virtual experiences",
    followers: 3200,
    following: 420,
  },
];

export const posts: Post[] = [
  {
    id: "1",
    userId: "2",
    content: "Just finished my latest digital landscape! What do you all think?",
    image: "https://images.unsplash.com/photo-1582079768266-e41bd8815ce6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 324,
    comments: 42,
    createdAt: "2023-09-15T14:32:00Z",
  },
  {
    id: "2",
    userId: "3",
    content: "My new virtual building design. Inspired by neo-futuristic architecture.",
    image: "https://images.unsplash.com/photo-1614128022929-a3f91472fff4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 512,
    comments: 78,
    createdAt: "2023-09-14T09:45:00Z",
  },
  {
    id: "3",
    userId: "4",
    content: "Working on a new immersive experience. Can't wait to share it with everyone!",
    likes: 287,
    comments: 34,
    createdAt: "2023-09-13T18:22:00Z",
  },
  {
    id: "4",
    userId: "1",
    content: "Exploring new creative tools for my next digital art project. Any recommendations?",
    image: "https://images.unsplash.com/photo-1573551461515-4c44d9e1af3c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 156,
    comments: 45,
    createdAt: "2023-09-12T11:15:00Z",
  },
];

export const getUser = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

export const getUserPosts = (userId: string): Post[] => {
  return posts.filter(post => post.userId === userId);
};
