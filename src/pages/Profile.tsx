
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UserProfile from "@/components/UserProfile";
import { currentUser, getUserPosts, getUser } from "@/data/mockData";
import PostCard from "@/components/PostCard";

const Profile = () => {
  // Get user's posts
  const userPosts = getUserPosts(currentUser.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {/* Sidebar - Hidden on mobile */}
        <div className="w-16 lg:w-64 hidden sm:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 border-x border-border/80">
          <UserProfile />
          <div className="px-4 mt-6">
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  user={currentUser} 
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No posts yet
              </div>
            )}
          </div>
        </main>

        {/* Right sidebar space */}
        <div className="w-80 hidden lg:block"></div>
      </div>
    </div>
  );
};

export default Profile;
