
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from './ui/sonner';
import { supabase } from '@/lib/supabase';
import { Facebook, Twitter, Instagram, Share2 } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Separator } from './ui/separator';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        toast.success("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Add points for logging in
        addUserPoints(10, 'login');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add points (in a real app, this would call a database)
  const addUserPoints = (amount: number, reason: string) => {
    // In production, this would be a database call
    toast.success(`+${amount} points for ${reason}!`, {
      icon: '🌟',
    });
    
    // For demo purposes, store points in localStorage 
    const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
    localStorage.setItem('userPoints', (currentPoints + amount).toString());
  };

  // Function to handle sharing
  const handleShare = (platform: string) => {
    const shareUrl = window.location.origin;
    const shareText = "Join me on SecondLife Connect!";
    
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
        toast.success("Link copied to clipboard!");
        addUserPoints(5, 'sharing');
        return;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
      addUserPoints(15, 'sharing to ' + platform);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-card rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold script-title">SecondLife Connect</h1>
        <p className="text-muted-foreground">
          {isSignUp ? "Create an account to get started" : "Sign in to your account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="hover-effect"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="hover-effect"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-2 text-muted-foreground text-sm">
            {isSignUp ? "Sign up with" : "Sign in with"}
          </span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          type="button" 
          size="icon" 
          variant="outline"
          onClick={() => handleShare('facebook')}
        >
          <Facebook className="h-5 w-5" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="outline"
          onClick={() => handleShare('twitter')}
        >
          <Twitter className="h-5 w-5" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="outline"
        >
          <Instagram className="h-5 w-5" />
        </Button>
      </div>

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm"
        >
          {isSignUp 
            ? "Already have an account? Sign in" 
            : "Don't have an account? Sign up"}
        </Button>
      </div>

      <div className="pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              className="w-full" 
              onClick={() => addUserPoints(3, 'exploring share options')}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share and Earn Points
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="script-title">Share and Earn Points</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p>Share SecondLife Connect with friends and earn reward points!</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Earn <span className="text-primary font-bold">5 points</span> for copying the link</li>
                <li>Earn <span className="text-primary font-bold">15 points</span> for sharing on social media</li>
                <li>Earn <span className="text-primary font-bold">50 points</span> when a friend signs up</li>
                <li>Collect points to unlock exclusive virtual items!</li>
              </ul>
              <div className="flex flex-col space-y-2 mt-4">
                <Button onClick={() => handleShare('twitter')}>
                  <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
                </Button>
                <Button onClick={() => handleShare('facebook')}>
                  <Facebook className="mr-2 h-4 w-4" /> Share on Facebook
                </Button>
                <Button variant="outline" onClick={() => handleShare('copy')}>
                  <Share2 className="mr-2 h-4 w-4" /> Copy Link
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AuthForm;
