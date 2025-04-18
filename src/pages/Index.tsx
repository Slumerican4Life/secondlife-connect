import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import { Users, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const { session } = useAuth();

  if (!session) {
    return (
      <div className="min-h-screen bg-slum-dark flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-rust-texture opacity-10 z-0"></div>
        <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((_, index) => (
                <div 
                  key={index} 
                  className="bg-slum-metal/30 rounded-lg p-2 transform hover:scale-105 transition-transform duration-300"
                >
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={`/placeholder-avatar-${index + 1}.png`} 
                      alt={`SecondLife Avatar ${index + 1}`} 
                      className="object-cover rounded-lg"
                    />
                    <AvatarFallback>
                      <User className="w-8 h-8 text-white/50" />
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
