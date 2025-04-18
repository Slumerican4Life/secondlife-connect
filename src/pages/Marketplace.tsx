
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShoppingBag, Home, Crown, Tag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Marketplace = () => {
  const isMobile = useIsMobile();

  const featuredItems = [
    {
      id: 1,
      name: "Vintage Avatar Outfit",
      price: 1500,
      seller: "VirtualVogue",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      discount: true
    },
    {
      id: 2,
      name: "Luxury Virtual Furniture Set",
      price: 3200,
      seller: "DigitalDecor",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1258&q=80"
    },
    {
      id: 3,
      name: "Rare Dragon Pet",
      price: 5000,
      seller: "MythicCreatures",
      image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
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
            <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">All Items</span>
                </TabsTrigger>
                <TabsTrigger value="homes">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Land & Homes</span>
                </TabsTrigger>
                <TabsTrigger value="premium">
                  <Crown className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Premium</span>
                </TabsTrigger>
                <TabsTrigger value="deals">
                  <Tag className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Deals</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredItems.map(item => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        {item.discount && (
                          <Badge className="absolute top-2 right-2 bg-red-500">Sale</Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Seller: {item.seller}</span>
                          <span className="font-semibold">L${item.price}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="homes">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Land & Homes Marketplace</h3>
                  <p className="text-muted-foreground">Browse virtual land, estates, and homes</p>
                </div>
              </TabsContent>
              
              <TabsContent value="premium">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Premium Marketplace</h3>
                  <p className="text-muted-foreground">Exclusive items for premium members and clan royalty</p>
                </div>
              </TabsContent>
              
              <TabsContent value="deals">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Special Deals</h3>
                  <p className="text-muted-foreground">Limited time offers and discounts</p>
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
                  <CardTitle>My Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">You haven't created any listings yet.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Create Listing</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
