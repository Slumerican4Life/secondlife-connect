
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { users, posts } from "@/data/mockData";
import CreatePost from "./CreatePost";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Feed = () => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4">
        <CreatePost />
      </div>

      <div className="divide-y">
        {posts.map((post) => {
          const author = users.find(u => u.id === post.userId);
          const isLiked = likedPosts.has(post.id);

          return (
            <div key={post.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarImage src={author?.avatar} />
                  <AvatarFallback>{author?.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{author?.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="mt-2 text-gray-700">{post.content}</p>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="mt-3 rounded-lg max-h-96 w-full object-cover"
                    />
                  )}
                  <div className="flex items-center gap-4 mt-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(post.id)}
                      className={isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-5 w-5 mr-1 ${isLiked ? "fill-current" : ""}`} />
                      {post.likes + (isLiked ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-5 w-5 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-5 w-5 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
