
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Droplet, User, Users, Calendar, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import BloodDollCard from "@/components/BloodDollCard";

const BloodMarket = () => {
  const isMobile = useIsMobile();

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
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-red-600 mb-2 flex items-center">
                <Droplet className="mr-2 h-7 w-7 fill-red-600 text-white" />
                Blood Market
              </h1>
              <p className="text-muted-foreground">Find willing blood dolls or vampire masters near you</p>
            </div>
            
            <Tabs defaultValue="dolls" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="dolls">Blood Dolls</TabsTrigger>
                <TabsTrigger value="masters">Vampire Masters</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dolls" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BloodDollCard 
                    name="Lillith" 
                    type="O Negative"
                    location="Virtual Berlin"
                    image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                    status="available"
                    level="Experienced"
                  />
                  <BloodDollCard 
                    name="Viktor" 
                    type="AB Positive"
                    location="Tokyo Nights"
                    image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                    status="meeting"
                    level="Novice"
                  />
                  <BloodDollCard 
                    name="Elena" 
                    type="A Negative"
                    location="Fantasy Realm"
                    image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
                    status="available"
                    level="Intermediate"
                  />
                  <BloodDollCard 
                    name="Damon" 
                    type="B Positive"
                    location="Virtual Berlin"
                    image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                    status="resting"
                    level="Master"
                  />
                </div>
                
                <div className="mt-6">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Blood Meet
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="masters" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BloodDollCard 
                    name="Count Orlock" 
                    type="Ancient"
                    location="Fantasy Realm"
                    image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80"
                    status="hunting"
                    level="Elder"
                    isMaster={true}
                  />
                  <BloodDollCard 
                    name="Lady Carmilla" 
                    type="Pure Blood"
                    location="Virtual Berlin"
                    image="https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80"
                    status="available"
                    level="Noble"
                    isMaster={true}
                  />
                </div>
                
                <div className="mt-6">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Users className="mr-2 h-4 w-4" /> Join Vampire Coven
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Upcoming Blood Meets</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Midnight Masquerade</CardTitle>
                  <CardDescription>A gathering of dolls and masters under the virtual moonlight</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Tomorrow at Midnight SLT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Crimson Manor, Fantasy Realm</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-2">More Info</Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">RSVP</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Droplet className="mr-2 h-4 w-4 fill-red-600 text-white" />
                    Blood Market AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our AI matches you with compatible blood dolls and masters based on your preferences.
                  </p>
                  <Button className="mt-3 w-full" variant="outline">Configure Preferences</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Blood Type Market</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>O Negative</span>
                    <span className="text-green-500">↑ 12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AB Positive</span>
                    <span className="text-red-500">↓ 3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>A Positive</span>
                    <span className="text-green-500">↑ 5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodMarket;
