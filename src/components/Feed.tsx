
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/hooks/use-posts";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from 'sonner';

const Feed = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (error) {
    toast.error('Error loading feed');
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load posts. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      <div className="p-4">
        <CreatePost />
      </div>

      {isLoading ? (
        <div className="space-y-4 p-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      ) : posts?.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No posts yet. Be the first to share something!
        </div>
      ) : (
        <div>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
