
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';

const Index = () => {
  const { session } = useAuth();

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <h1 className="text-4xl font-bold mb-4">Connect with your virtual world</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Share experiences, join communities, and explore digital realms.
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex container mx-auto">
        <div className="w-64 hidden sm:block">
          <Sidebar />
        </div>
        <main className="flex-1 border-x">
          <Feed />
        </main>
        <div className="w-80 hidden lg:block">
          {/* Space for additional widgets */}
        </div>
      </div>
    </div>
  );
};

export default Index;
