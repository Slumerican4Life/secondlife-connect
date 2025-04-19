
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import SuggestedUsers from "@/components/SuggestedUsers";
import WorldsWidget from "@/components/WorldsWidget";
import BloodMarketPreview from "@/components/BloodMarketPreview";
import AIAgentHub from "@/components/AIAgentHub";
import UAPWatchMap from "@/components/UAPWatchMap";
import ContentExplorer from "@/components/ContentExplorer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Store, Building, Shield, ArrowRight, Bot, Newspaper, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import GitTerminal from "@/components/GitTerminal";

const Index = () => {
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
          <div className="py-6 space-y-8 px-4">
            {/* UAP Watch Map - New featured component */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">UAP Watch Network</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/uap-watch" className="flex items-center gap-1">
                    Full Map <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <UAPWatchMap />
            </div>
            
            {/* Linden Exchange - New section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                  Linden Dollar Exchange
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/linden-exchange" className="flex items-center gap-1">
                    Go to Exchange <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Current Exchange Rate</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">L$250 = $1 USD</p>
                      <p className="text-xs text-muted-foreground">Updated April 19, 2025</p>
                    </div>
                    <Link to="/linden-exchange">
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        Buy Linden Dollars
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Content Explorer - New section */}
            <ContentExplorer featured={true} limit={6} />
            
            {/* AI Agent Hub section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Bot className="h-5 w-5 text-virtual-400" />
                  AI Assistance
                </h2>
              </div>
              <AIAgentHub />
            </div>
            
            {/* News section - New */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-blue-500" />
                  Latest News
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/news">All News</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">New AI Research Breakthrough Announced</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Quantum computing researchers achieve significant milestone in AI processing capabilities.
                    </p>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    April 19, 2025 • AI & Quantum
                  </CardFooter>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Multiple UAP Sightings Reported in Southwest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Cluster of unidentified aerial phenomena reported across multiple states last weekend.
                    </p>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    April 18, 2025 • UAP Watch
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {/* Feature highlights section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Explore SecondLife Connect</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link to="/marketplace">
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="p-3 pb-0">
                      <Store className="h-5 w-5 text-virtual-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <h3 className="font-medium text-sm">Marketplace</h3>
                      <p className="text-xs text-muted-foreground">Buy and sell virtual items</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/real-estate">
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="p-3 pb-0">
                      <Building className="h-5 w-5 text-virtual-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <h3 className="font-medium text-sm">Real Estate</h3>
                      <p className="text-xs text-muted-foreground">Find homes and land</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/dating">
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="p-3 pb-0">
                      <Heart className="h-5 w-5 text-red-500" />
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <h3 className="font-medium text-sm">Dating</h3>
                      <p className="text-xs text-muted-foreground">Connect with others</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/clan-portal">
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="p-3 pb-0">
                      <Shield className="h-5 w-5 text-virtual-400" />
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <h3 className="font-medium text-sm">Clan Portal</h3>
                      <p className="text-xs text-muted-foreground">Join vampire clans</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
            
            <WorldsWidget />
            <BloodMarketPreview />
            <Feed />
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <SuggestedUsers />
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Featured Properties</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2 text-sm">
                    <div className="rounded overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80" alt="Featured property" className="w-full h-20 object-cover" />
                    </div>
                    <p className="font-medium">Lakeside Villa</p>
                    <p className="text-muted-foreground text-xs">Luxury waterfront property with private dock</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/real-estate" className="flex items-center justify-center">
                      View All <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
      <GitTerminal />
    </div>
  );
};

export default Index;
