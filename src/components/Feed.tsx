
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/hooks/use-posts";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from 'sonner';
import { useEffect } from "react";

const Feed = () => {
  const { data: posts, isLoading, error } = usePosts();

  useEffect(() => {
    if (error) {
      toast.error('Failed to load posts');
    }
  }, [error]);

  return (
    <div className="divide-y divide-border/10">
      {/* Always show create post form at the top */}
      <div className="p-4 bg-card/50">
        <CreatePost />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4 p-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3 bg-card/30 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full bg-muted/20" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-muted/20" />
                  <Skeleton className="h-4 w-[200px] bg-muted/20" />
                </div>
              </div>
              <Skeleton className="h-24 w-full bg-muted/20" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="p-4">
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load posts. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && (!posts || posts.length === 0) && (
        <div className="p-8 text-center text-muted-foreground bg-card/30">
          No posts yet. Be the first to share something!
        </div>
      )}

      {/* Posts list */}
      {!isLoading && !error && posts && posts.length > 0 && (
        <div className="divide-y divide-border/10">
          {posts.map((post) => (
            <div key={post.id} className="bg-card/30 hover:bg-card/50 transition-colors">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
