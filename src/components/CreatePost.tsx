
import { useState } from "react";
import { Image, Smile, MapPin, Calendar, Send, Wand2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/data/mockData";
import { toast } from "sonner";
import { enhancePost } from "@/services/postEnhancementService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof enhancePost>>([]);

  const handleEnhance = () => {
    if (!content.trim()) return;
    const newSuggestions = enhancePost(content);
    setSuggestions(newSuggestions);
    if (newSuggestions.length === 0) {
      toast.info("Your post looks great! No enhancements needed.");
    }
  };

  const applySuggestion = (suggestion: string) => {
    setContent(suggestion);
    setSuggestions([]);
    toast.success("Enhancement applied! ✨");
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate post creation
    setTimeout(() => {
      toast.success("Post created successfully! +5 points", {
        icon: '🌟',
      });
      
      // Award points for creating post
      const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
      localStorage.setItem('userPoints', (currentPoints + 5).toString());
      
      setContent("");
      setSuggestions([]);
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
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-muted-foreground"
                disabled={!content.trim()}
              >
                <Wand2 className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Post Enhancement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="text-sm text-muted-foreground">
                  Original post:
                  <div className="mt-1 p-3 rounded-md bg-muted/50">{content}</div>
                </div>
                
                {suggestions.length > 0 ? (
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{suggestion.type} Enhancement</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => applySuggestion(suggestion.suggestion)}
                          >
                            Apply
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                        <div className="p-3 rounded-md bg-muted/50 text-sm">
                          {suggestion.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Button onClick={handleEnhance} className="w-full">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance Post
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={!content.trim() || isSubmitting} 
          className="rounded-full"
        >
          <Send className="h-4 w-4 mr-1" />
          Post {content.trim() ? "(+5 points)" : ""}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
