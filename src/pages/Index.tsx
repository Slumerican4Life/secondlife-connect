
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import { Users, User, Tattoo, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const { session } = useAuth();

  const tattoedAvatars = [
    { 
      src: "/tattoo-avatar-1.png", 
      alt: "Slumerican Tattoo Avatar 1", 
      style: "bg-[#1A1F2C] border-2 border-[#8B5CF6]" 
    },
    { 
      src: "/tattoo-avatar-2.png", 
      alt: "Slumerican Tattoo Avatar 2", 
      style: "bg-[#403E43] border-2 border-[#D946EF]" 
    },
    { 
      src: "/tattoo-avatar-3.png", 
      alt: "Slumerican Tattoo Avatar 3", 
      style: "bg-[#221F26] border-2 border-[#F97316]" 
    },
    { 
      src: "/tattoo-avatar-4.png", 
      alt: "Slumerican Tattoo Avatar 4", 
      style: "bg-[#333333] border-2 border-[#8B5CF6]" 
    },
    { 
      src: "/tattoo-avatar-5.png", 
      alt: "Slumerican Tattoo Avatar 5", 
      style: "bg-[#222222] border-2 border-[#D946EF]" 
    },
    { 
      src: "/tattoo-avatar-6.png", 
      alt: "Slumerican Tattoo Avatar 6", 
      style: "bg-[#403E43] border-2 border-[#F97316]" 
    }
  ];

  if (!session) {
    return (
      <div className="min-h-screen bg-slum-dark flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-rust-texture opacity-10 z-0"></div>
        <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {tattoedAvatars.map((avatar, index) => (
                <div 
                  key={index} 
                  className={`${avatar.style} rounded-lg p-2 transform hover:scale-105 transition-transform duration-300 shadow-rustic`}
                >
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={avatar.src} 
                      alt={avatar.alt} 
                      className="object-cover rounded-lg"
                    />
                    <AvatarFallback>
                      <Tattoo className="w-8 h-8 text-white/50" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="chrome" size="lg" className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Explore Avatars
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Virtual Worlds
              </Button>
            </div>
          </div>
          <AuthForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-16 lg:w-64 hidden sm:block">
          <Sidebar />
        </div>
        <main className="flex-1 border-x border-border/80">
          <Feed />
        </main>
        <div className="w-80 hidden lg:block" />
      </div>
    </div>
  );
};

export default Index;
