
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post, User } from "@/data/mockData";

interface PostCardProps {
  post: Post;
  user: User;
}

const PostCard = ({ post, user }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card className="mb-4 border-none shadow-sm overflow-hidden animate-fade-in">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-virtual-200">{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/profile/${user.id}`} className="font-medium hover:underline">{user.name}</Link>
              <p className="text-sm text-muted-foreground">@{user.username} · {formatDate(post.createdAt)}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Hide</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="mb-3">{post.content}</p>
        {post.image && (
          <div className="rounded-md overflow-hidden mt-2">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 py-2 flex justify-between border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
          <span>{likesCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
