
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
        <AuthForm />
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
