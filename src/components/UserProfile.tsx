
import { User as UserIcon, MapPin, Link as LinkIcon, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Profile } from "@/types/profile";
import { format } from "date-fns";

interface UserProfileProps {
  profile: Profile;
}

const UserProfile = ({ profile }: UserProfileProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="relative">
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-virtual-200 to-virtual-400 rounded-b-lg" />
        
        <div className="px-4">
          <div className="relative flex flex-col md:flex-row md:items-end">
            <div className="absolute -top-16 md:-top-20 avatar-border rounded-full p-1 bg-background">
              <Avatar className="h-32 w-32 md:h-40 md:w-40">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                <AvatarFallback className="text-4xl bg-virtual-200">
                  {profile.full_name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="mt-20 md:ml-44 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>
                <Button className="mt-2 md:mt-0" size="sm" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              <p className="my-3">{profile.bio}</p>
              
              <div className="flex gap-x-6 text-sm">
                <div className="flex items-center">
                  <UserIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{profile.following}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{profile.followers}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
                {profile.website && (
                  <div className="flex items-center">
                    <LinkIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-virtual-400 hover:underline">
                      {new URL(profile.website).hostname}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Joined {format(new Date(profile.created_at), 'MMMM yyyy')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
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
