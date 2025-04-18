
import { useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import { posts, users, getUser } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState(posts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshFeed = () => {
    setIsRefreshing(true);
    // Simulate fetch delay
    setTimeout(() => {
      // Just reordering posts to simulate refresh
      setFeedPosts([...feedPosts].reverse());
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Feed</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={refreshFeed} 
          disabled={isRefreshing}
          className={isRefreshing ? 'animate-spin' : ''}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>
      <CreatePost />
      {feedPosts.map(post => {
        const user = getUser(post.userId);
        if (!user) return null;
        return <PostCard key={post.id} post={post} user={user} />;
      })}
    </div>
  );
};

export default Feed;
