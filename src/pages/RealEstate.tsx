
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Building, Mountain, TreePine } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RealEstate = () => {
  const isMobile = useIsMobile();

  const featuredProperties = [
    {
      id: 1,
      name: "Seaside Villa",
      price: 15000,
      location: "Azure Bay",
      type: "Home",
      size: "512m²",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      featured: true
    },
    {
      id: 2,
      name: "Downtown Apartment",
      price: 8000,
      location: "Neo Tokyo",
      type: "Apartment",
      size: "256m²",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      name: "Woodland Plot",
      price: 5000,
      location: "Emerald Forest",
      type: "Land",
      size: "1024m²",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
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
            <h1 className="text-2xl font-bold mb-6">Real Estate Market</h1>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">All Listings</span>
                </TabsTrigger>
                <TabsTrigger value="houses">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Houses</span>
                </TabsTrigger>
                <TabsTrigger value="land">
                  <Mountain className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Land</span>
                </TabsTrigger>
                <TabsTrigger value="regions">
                  <TreePine className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Regions</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredProperties.map(property => (
                    <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
                        {property.featured && (
                          <Badge className="absolute top-2 right-2 bg-virtual-300">Featured</Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{property.name}</CardTitle>
                        <span className="text-sm text-muted-foreground">{property.location}</span>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">{property.type}</span>
                          <span className="text-sm">{property.size}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-end">
                          <span className="font-semibold text-lg">L${property.price}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">View Property</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="houses">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Houses & Apartments</h3>
                  <p className="text-muted-foreground">Browse ready-to-move-in virtual homes</p>
                </div>
              </TabsContent>
              
              <TabsContent value="land">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Land Parcels</h3>
                  <p className="text-muted-foreground">Find the perfect plot for your virtual home</p>
                </div>
              </TabsContent>
              
              <TabsContent value="regions">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Full Regions</h3>
                  <p className="text-muted-foreground">Explore complete regions for sale or rent</p>
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
                  <CardTitle>Property Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm">Type</label>
                      <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="all">All Types</option>
                        <option value="houses">Houses</option>
                        <option value="apartments">Apartments</option>
                        <option value="land">Land</option>
                        <option value="regions">Regions</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm">Price Range</label>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <span>-</span>
                        <input type="number" placeholder="Max" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Search</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstate;
