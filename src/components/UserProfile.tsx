
import { User as UserIcon, MapPin, Link as LinkIcon, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@/data/mockData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserProfile = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-virtual-200 to-virtual-400 rounded-b-lg"></div>
        
        {/* Profile Info */}
        <div className="px-4">
          <div className="relative flex flex-col md:flex-row md:items-end">
            {/* Avatar */}
            <div className="absolute -top-16 md:-top-20 avatar-border rounded-full p-1 bg-background">
              <Avatar className="h-32 w-32 md:h-40 md:w-40">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-4xl bg-virtual-200">
                  {currentUser.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Profile Details */}
            <div className="mt-20 md:ml-44 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                  <p className="text-muted-foreground">@{currentUser.username}</p>
                </div>
                <Button className="mt-2 md:mt-0" size="sm" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              <p className="my-3">{currentUser.bio}</p>
              
              {/* User Stats */}
              <div className="flex gap-x-6 text-sm">
                <div className="flex items-center">
                  <UserIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{currentUser.following}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{currentUser.followers}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="mt-6 border-b">
            <Tabs defaultValue="posts">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="posts" className="flex-1 sm:flex-none">Posts</TabsTrigger>
                <TabsTrigger value="media" className="flex-1 sm:flex-none">Media</TabsTrigger>
                <TabsTrigger value="likes" className="flex-1 sm:flex-none">Likes</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                {/* Posts will be loaded here */}
              </TabsContent>
              <TabsContent value="media">
                <div className="p-4 text-center text-muted-foreground">Media gallery coming soon</div>
              </TabsContent>
              <TabsContent value="likes">
                <div className="p-4 text-center text-muted-foreground">Liked posts coming soon</div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
