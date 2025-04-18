
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UserProfile from "@/components/UserProfile";
import PostCard from "@/components/PostCard";
import { useProfile } from '@/hooks/use-profile';
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { id } = useParams();
  const { data: profile, isLoading } = useProfile(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex">
          <div className="w-16 lg:w-64 hidden sm:block">
            <Sidebar />
          </div>
          <main className="flex-1 border-x border-border/80">
            <div className="h-48 md:h-64 w-full bg-muted animate-pulse" />
            <div className="p-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-8 w-48 mt-4" />
              <Skeleton className="h-4 w-full mt-4" />
            </div>
          </main>
          <div className="w-80 hidden lg:block" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-16 lg:w-64 hidden sm:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <Sidebar />
          </div>
        </div>

        <main className="flex-1 border-x border-border/80">
          {profile && <UserProfile profile={profile} />}
        </main>

        <div className="w-80 hidden lg:block" />
      </div>
    </div>
  );
};

export default Profile;
