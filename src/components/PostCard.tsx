
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { formatDistanceToNow } from "date-fns";
import { Post } from "@/types/profile";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      
      // Award points to the post creator (in a real app, this would be backend logic)
      toast.success(`You liked ${post.user.name}'s post! They earned 2 points.`, {
        duration: 2000,
        icon: '👍',
      });
      
      // For the demo, we'll award points to the current user for engagement
      const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
      localStorage.setItem('userPoints', (currentPoints + 1).toString());
    } else {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    const shareText = `Check out this post on SecondLife Connect!`;
    
    let shareLink = '';
    switch(platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard! +3 points");
        
        // Award points
        const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
        localStorage.setItem('userPoints', (currentPoints + 3).toString());
        return;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
      
      // Award points
      const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
      localStorage.setItem('userPoints', (currentPoints + 5).toString());
      
      toast.success(`Post shared! +5 points`, {
        icon: '🌟',
      });
    }
  };

  return (
    <Card className="mb-4 border-none shadow-sm overflow-hidden animate-fade-in card-hover">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Link to={`/profile/${post.user.id}`}>
              <Avatar className="h-10 w-10 hover-effect">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link 
                to={`/profile/${post.user.id}`}
                className="font-semibold hover-effect"
              >
                {post.user.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Unfollow</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2 text-lg">
        <p>{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full h-auto rounded-md mt-2 object-cover hover-effect"
          />
        )}
      </CardContent>
      <CardFooter className="px-4 py-2 flex justify-between border-t border-border/10">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-1 ${isLiked ? "text-red-500" : ""}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{commentCount}</span>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Post</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 py-4">
                <p>Share this post and earn points!</p>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleShare('twitter')}>
                    Share on Twitter (+5 points)
                  </Button>
                  <Button onClick={() => handleShare('facebook')}>
                    Share on Facebook (+5 points)
                  </Button>
                  <Button variant="outline" onClick={() => handleShare('copy')}>
                    Copy Link (+3 points)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
