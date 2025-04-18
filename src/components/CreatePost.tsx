import { useState } from "react";
import { Image, Smile, MapPin, Calendar, Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/data/mockData";
import { toast } from "sonner";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate post creation
    setTimeout(() => {
      toast.success("Post created successfully!");
      setContent("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="mb-6 border shadow-sm card-hover">
      <CardContent className="pt-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-virtual-200">
              {currentUser.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share what's on your mind..."
              className="min-h-20 border-none focus-visible:ring-0 p-0 shadow-none text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 pb-3">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
            <MapPin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={!content.trim() || isSubmitting} 
          className="rounded-full"
        >
          <Send className="h-4 w-4 mr-1" />
          Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
