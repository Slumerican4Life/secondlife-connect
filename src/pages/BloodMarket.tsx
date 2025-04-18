import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import BloodDollCard from '@/components/BloodDollCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BloodDollStatus } from '@/types/blood-bank';

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
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Blood Market</h1>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="all">All Dolls</TabsTrigger>
                <TabsTrigger value="donors">Donors</TabsTrigger>
                <TabsTrigger value="masters">Masters</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Update the BloodDollCard props to match the expected interface */}
                  <BloodDollCard
                    name="Selene"
                    image="/placeholder.svg"
                    bloodType="O-"
                    rarity="Rare"
                    status="available"
                    price={1500}
                    age={127}
                    lastFed="2 hours ago"
                  />
                  
                  <BloodDollCard
                    name="Viktor"
                    image="/placeholder.svg"
                    bloodType="AB+"
                    rarity="Uncommon"
                    status="meeting"
                    price={850}
                    age={243}
                    lastFed="1 day ago"
                  />
                  
                  <BloodDollCard
                    name="Lilith"
                    image="/placeholder.svg"
                    bloodType="A+"
                    rarity="Common"
                    status="available"
                    price={500}
                    age={53}
                    lastFed="3 hours ago"
                  />
                  
                  <BloodDollCard
                    name="Damon"
                    image="/placeholder.svg"
                    bloodType="B-"
                    rarity="Rare"
                    status="resting"
                    price={1200}
                    age={176}
                    lastFed="4 days ago"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="donors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Donor blood dolls */}
                  <BloodDollCard
                    name="Elara"
                    image="/placeholder.svg"
                    bloodType="A-"
                    rarity="Common"
                    status="available"
                    price={450}
                    age={28}
                    lastFed="5 hours ago"
                  />
                  
                  <BloodDollCard
                    name="Marcus"
                    image="/placeholder.svg"
                    bloodType="O+"
                    rarity="Uncommon"
                    status="resting"
                    price={700}
                    age={42}
                    lastFed="2 days ago"
                  />
                  
                  <BloodDollCard
                    name="Seraphina"
                    image="/placeholder.svg"
                    bloodType="B+"
                    rarity="Rare"
                    status="available"
                    price={950}
                    age={35}
                    lastFed="6 hours ago"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="masters" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Master blood dolls */}
                  <BloodDollCard
                    name="Count Dracula"
                    image="/placeholder.svg"
                    bloodType="O+"
                    rarity="Legendary"
                    status="hunting"
                    price={5000}
                    age={752}
                    lastFed="12 hours ago"
                  />
                  
                  <BloodDollCard
                    name="Elizabeth Báthory"
                    image="/placeholder.svg"
                    bloodType="AB-"
                    rarity="Mythic"
                    status="available"
                    price={4500}
                    age={560}
                    lastFed="1 hour ago"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Market Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Welcome to the Blood Market. Here you can find blood dolls for your vampire needs.
                    Rates vary based on rarity and blood type.
                  </p>
                  <Button className="w-full">Post a Listing</Button>
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
