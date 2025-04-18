import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from './ui/sonner';
import { supabase } from '@/lib/supabase';
import { Facebook, Twitter, Instagram, Share2, Music, Youtube, Headphones, Chrome, CarFront } from 'lucide-react';
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
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Remove Chrome Bumper Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          SECONDLIFE CONNECT
        </h1>
        <p className="text-white/80">
          {isSignUp ? "Create your digital legacy" : "Return to your digital realm"}
        </p>
      </div>
      
      {/* Body */}
      <div className="p-6 bg-slum-dark rounded-lg shadow-rustic border-t-0 border-2 border-slum-metal/30">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/50 border-slum-metal/50 text-white hover-effect placeholder:text-white/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/50 border-slum-metal/50 text-white hover-effect placeholder:text-white/30"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            variant="chrome"
          >
            {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-white"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"}
            </Button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-slum-metal/30" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slum-dark px-2 text-white/70 text-sm">
              {isSignUp ? "Sign up with" : "Sign in with"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button 
            type="button" 
            size="icon" 
            variant="rustic"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="h-5 w-5" />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="rustic"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="h-5 w-5" />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="rustic"
          >
            <Instagram className="h-5 w-5" />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="rustic"
          >
            <Chrome className="h-5 w-5" />
          </Button>
        </div>

        {/* Share & Music Section */}
        <div className="flex gap-3 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => addUserPoints(3, 'exploring share options')}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slum-dark border-slum-metal text-white">
              <DialogHeader>
                <DialogTitle className="slum-title text-slum-accent">SHARE & EARN</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p>Share SecondLife Connect with friends and earn reward points!</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Earn <span className="text-slum-accent font-bold">5 points</span> for copying the link</li>
                  <li>Earn <span className="text-slum-accent font-bold">15 points</span> for sharing on social media</li>
                  <li>Earn <span className="text-slum-accent font-bold">50 points</span> when a friend signs up</li>
                </ul>
                <div className="flex flex-col space-y-2 mt-4">
                  <Button onClick={() => handleShare('twitter')} variant="outline">
                    <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
                  </Button>
                  <Button onClick={() => handleShare('facebook')} variant="outline">
                    <Facebook className="mr-2 h-4 w-4" /> Share on Facebook
                  </Button>
                  <Button variant="chrome" onClick={() => handleShare('copy')}>
                    <Share2 className="mr-2 h-4 w-4" /> Copy Link
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1"
              >
                <Music className="h-4 w-4" />
                Music
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slum-dark border-slum-metal text-white">
              <DialogHeader>
                <DialogTitle className="slum-title text-slum-accent">MUSIC CONNECTIONS</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p>Connect with your favorite music services:</p>
                <div className="flex flex-col space-y-2 mt-4">
                  <Button variant="outline" className="justify-start">
                    <Youtube className="mr-2 h-4 w-4" /> YouTube Music
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Headphones className="mr-2 h-4 w-4" /> Streaming Services
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Music className="mr-2 h-4 w-4" /> Local MP3/FLAC
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
