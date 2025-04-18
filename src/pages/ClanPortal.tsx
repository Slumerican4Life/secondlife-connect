
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Crown, Shield, Users, Scroll, Award, UserPlus, Droplet, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ClanPortal = () => {
  const isMobile = useIsMobile();
  
  const clanMembers = [
    {
      id: 1,
      name: "Vladislav Tepes",
      role: "King",
      avatar: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      online: true,
      royalty: true
    },
    {
      id: 2,
      name: "Carmilla Karnstein",
      role: "Queen",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      online: true,
      royalty: true
    },
    {
      id: 3,
      name: "Renfield",
      role: "General",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      online: false
    },
    {
      id: 4,
      name: "Lilith",
      role: "Blood Doll",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
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
            {/* Clan Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-r from-red-900 to-purple-900 rounded-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Crimson Court</h1>
                  <p className="text-muted-foreground">Noble Vampire Clan • Est. 1692</p>
                </div>
              </div>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground">
                      Royal Actions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-2 p-4 w-[200px]">
                        <NavigationMenuLink asChild>
                          <Button variant="ghost" className="justify-start w-full">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Members
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Button variant="ghost" className="justify-start w-full">
                            <Shield className="mr-2 h-4 w-4" />
                            Manage Ranks
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Button variant="ghost" className="justify-start w-full">
                            <Scroll className="mr-2 h-4 w-4" />
                            Clan Laws
                          </Button>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Button variant="ghost" className="justify-start w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Droplet className="mr-2 h-4 w-4" />
                            Blood Allocation
                          </Button>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Clan Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> 
                    Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42</div>
                  <p className="text-sm text-muted-foreground">4 Royal, 12 Noble, 26 Common</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-red-500" /> 
                    Blood Reserve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                  <Progress value={78} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-amber-500" /> 
                    Clan Rank
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">#3</div>
                  <p className="text-sm text-muted-foreground">Top 5% of all clans</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Clan Members */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Clan Hierarchy</CardTitle>
                <CardDescription>Members of the Crimson Court</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clanMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {member.online && (
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{member.name}</p>
                            {member.royalty && (
                              <Crown className="h-3 w-3 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        {member.royalty && (
                          <Button variant="outline" size="sm">Royal Portal</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View All Members</Button>
              </CardFooter>
            </Card>
            
            {/* Clan Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Clan Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Blood Moon Hunt</h3>
                      <Badge>Tomorrow</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Annual group hunting ritual under the blood moon.</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Court Assembly</h3>
                      <Badge variant="outline">In 3 days</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Monthly meeting to discuss clan matters.</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Masquerade Ball</h3>
                      <Badge variant="outline">Next week</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Formal gathering with the Midnight Coven clan.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px] space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Clan Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Treasury</span>
                      <span className="font-medium">L$250,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Blood Units</span>
                      <span className="font-medium">128</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Clan Properties</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Influence Points</span>
                      <span className="font-medium">5,420</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage Resources</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Clan Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <span className="text-sm">Blood Moon Dominance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-slate-400" />
                      <span className="text-sm">Territory Expansion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-700" />
                      <span className="text-sm">Ancient Bloodline</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClanPortal;
