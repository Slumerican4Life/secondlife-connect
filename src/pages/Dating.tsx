
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart, Filter, Search, UserPlus, X, ThumbsUp, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Dating = () => {
  const isMobile = useIsMobile();

  const potentialMatches = [
    {
      id: 1,
      name: "Isabella Vamp",
      age: "202",
      location: "Bloodhaven",
      interests: ["Vampires", "Night Adventures", "Blood Dolls"],
      bio: "Eternal night wanderer seeking kindred spirits for moonlit escapades.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      online: true,
      premium: true
    },
    {
      id: 2,
      name: "Alexander Lycan",
      age: "185",
      location: "Moonlight Forest",
      interests: ["Shapeshifting", "Hunting", "Adventure"],
      bio: "Wild at heart, seeking someone who appreciates the call of the wild.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      online: false
    },
    {
      id: 3,
      name: "Elara Fae",
      age: "300+",
      location: "Enchanted Glade",
      interests: ["Magic", "Nature", "Ancient Lore"],
      bio: "Ancient fae looking for magical connections and shared wisdom.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      online: true
    },
    {
      id: 4,
      name: "Viktor Helsing",
      age: "45",
      location: "Shadow City",
      interests: ["Hunting", "Vampire Lore", "Weaponry"],
      bio: "Hunter seeking vampires for... conversation. Nothing suspicious.",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
      online: true
    }
  ];

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
          <div className="py-6 px-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="text-red-500 h-6 w-6 fill-red-500" />
                Dating & Connections
              </h1>
              <Button size="sm" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by interest, location, or type..." className="pl-10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              {potentialMatches.map(profile => (
                <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={profile.avatar} alt={profile.name} />
                            <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {profile.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{profile.name}</CardTitle>
                            {profile.premium && (
                              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-300 text-xs">
                                <Crown className="h-3 w-3 mr-1" /> Royal
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {profile.age} • {profile.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-3">{profile.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-xs">{interest}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-1" />
                      Pass
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button variant="default" size="sm" className="bg-red-500 hover:bg-red-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline">Load More Matches</Button>
            </div>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px] space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Start connecting with others to see your matches here.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">View All</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Dating Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm">I'm interested in</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Vampires</option>
                        <option>Werewolves</option>
                        <option>Fae</option>
                        <option>Humans</option>
                        <option>All Beings</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm">Looking for</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Blood Dolls</option>
                        <option>Blood Masters</option>
                        <option>Romantic Partners</option>
                        <option>Friends</option>
                        <option>Clan Members</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Update Preferences</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dating;
