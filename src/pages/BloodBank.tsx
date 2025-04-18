
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BloodDollCard from "@/components/BloodDollCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, UserPlus, ShieldCheck, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BloodDoll } from "@/types/blood-bank";

const BloodBank = () => {
  const isMobile = useIsMobile();

  // Mock data for blood dolls with correct status type
  const bloodDolls: BloodDoll[] = [
    {
      id: 1,
      name: "Lillith",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      bloodType: "O Negative",
      rarity: "Rare",
      status: "available",
      price: 1500,
      age: 25,
      lastFed: "2 days ago"
    },
    {
      id: 2,
      name: "Viktor",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      bloodType: "AB Positive",
      rarity: "Uncommon",
      status: "available",
      price: 1200,
      age: 32,
      lastFed: "1 week ago"
    },
    {
      id: 3,
      name: "Elena",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      bloodType: "A Negative",
      rarity: "Common",
      status: "resting",
      price: 900,
      age: 28,
      lastFed: "3 days ago"
    }
  ];

  // Mock data for blood masters
  const bloodMasters = [
    {
      id: 1,
      name: "Count Dracul",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      clan: "Nosferatu",
      rank: "Elder",
      feedingPreference: "O Negative",
      dolls: 12
    },
    {
      id: 2,
      name: "Lady Carmilla",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      clan: "Ventrue",
      rank: "Noble",
      feedingPreference: "AB Positive",
      dolls: 7
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      name: "Blood Moon Gathering",
      location: "Dark Moon Estate",
      date: "April 21, 2025",
      time: "10:00 PM",
      attendees: 42
    },
    {
      id: 2,
      name: "Feeding Ceremony",
      location: "Crimson Hall",
      date: "April 25, 2025",
      time: "Midnight",
      attendees: 18
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
            <h1 className="text-2xl font-bold mb-2">Blood Bank</h1>
            <p className="text-muted-foreground mb-6">Find blood dolls for your feeding needs or register as one</p>
            
            <Tabs defaultValue="dolls" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="dolls" className="flex items-center gap-2">
                  <Droplet className="h-4 w-4" />
                  <span className="hidden sm:inline">Blood Dolls</span>
                </TabsTrigger>
                <TabsTrigger value="masters" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Masters</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Events</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dolls" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bloodDolls.map(doll => (
                    <BloodDollCard 
                      key={doll.id}
                      name={doll.name}
                      image={doll.image}
                      bloodType={doll.bloodType}
                      rarity={doll.rarity}
                      status={doll.status}
                      price={doll.price}
                      age={doll.age}
                      lastFed={doll.lastFed}
                    />
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">View More Blood Dolls</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="masters" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bloodMasters.map(master => (
                    <Card key={master.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3">
                          <img src={master.image} alt={master.name} className="w-full h-40 md:h-full object-cover" />
                        </div>
                        <div className="flex-1 p-4">
                          <h3 className="text-lg font-semibold">{master.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline">{master.clan}</Badge>
                            <Badge variant="outline">{master.rank}</Badge>
                          </div>
                          <div className="mt-4 space-y-1 text-sm">
                            <p>Prefers: {master.feedingPreference}</p>
                            <p>Blood Dolls: {master.dolls}</p>
                          </div>
                          <div className="mt-4">
                            <Button size="sm">Contact</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="space-y-6">
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Location:</span>
                            <span className="font-medium">{event.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date & Time:</span>
                            <span className="font-medium">{event.date} at {event.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Attendees:</span>
                            <span className="font-medium">{event.attendees}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button size="sm">RSVP</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Register as a Blood Doll</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Earn L$ by offering your services as a blood doll to vampires.</p>
                  <Button className="w-full" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-base">Current Rates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>O Negative (Rare)</span>
                    <span className="font-semibold">L$ 1200-1800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AB Positive (Uncommon)</span>
                    <span className="font-semibold">L$ 900-1400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>A/B Type (Common)</span>
                    <span className="font-semibold">L$ 700-1000</span>
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

export default BloodBank;
