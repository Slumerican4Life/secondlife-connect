
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Map from "@/components/Map";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, CreditCard, TrendingUp, Coins, ShieldCheck, Star, Gem, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const RoyalPortal = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handlePurchase = (tier: string, amount: number) => {
    toast({
      title: "Purchase Initiated",
      description: `Processing ${tier} purchase for L$${amount}...`,
    });
    // In a real app, this would connect to the payment processing system
  };

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
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-amber-500" />
                  Royal Portal
                </h1>
                <p className="text-muted-foreground">
                  Exclusive features for clan royalty and premium users
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-amber-500 to-amber-700 text-white p-2 px-3 rounded-full">
                Royal Access
              </Badge>
            </div>
            
            <Tabs defaultValue="monetization" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="monetization" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  <span className="hidden sm:inline">Monetization</span>
                </TabsTrigger>
                <TabsTrigger value="teleport" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Map & Teleport</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="monetization" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Linden Dollar Exchange</CardTitle>
                    <CardDescription>Convert real money to Linden Dollars (L$) or cash out your earnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Current Exchange Rate</h3>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center">
                            <Coins className="h-5 w-5 mr-2 text-amber-500" />
                            <span>1 USD</span>
                          </div>
                          <span>=</span>
                          <div className="flex items-center">
                            <span>L$ 250</span>
                            <Gem className="h-5 w-5 ml-2 text-virtual-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Starter</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center mb-2">
                              <span className="text-2xl font-bold">L$ 1,000</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                              Perfect for new residents
                            </div>
                            <div className="text-center text-sm font-medium">
                              $4.99 USD
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handlePurchase("Starter", 1000)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Purchase
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card className="border-virtual-400">
                          <CardHeader className="pb-2 bg-virtual-400/10">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">Popular</CardTitle>
                              <Star className="h-4 w-4 text-virtual-400" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center mb-2">
                              <span className="text-2xl font-bold">L$ 5,000</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                              20% bonus L$
                            </div>
                            <div className="text-center text-sm font-medium">
                              $19.99 USD
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full"
                              onClick={() => handlePurchase("Popular", 5000)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Purchase
                            </Button>
                          </CardFooter>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Deluxe</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center mb-2">
                              <span className="text-2xl font-bold">L$ 10,000</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                              30% bonus L$
                            </div>
                            <div className="text-center text-sm font-medium">
                              $34.99 USD
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handlePurchase("Deluxe", 10000)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Purchase
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Subscription Benefits</h3>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-start gap-3">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Clan Protection</h4>
                                  <p className="text-sm text-muted-foreground">Enhanced security for your virtual assets</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                                  <Crown className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Royal Treatment</h4>
                                  <p className="text-sm text-muted-foreground">Premium access to exclusive events</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                                  <Coins className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Revenue Share</h4>
                                  <p className="text-sm text-muted-foreground">Earn commissions on marketplace sales</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                                  <Star className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">VIP Status</h4>
                                  <p className="text-sm text-muted-foreground">Priority access to new features</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="teleport" className="space-y-6">
                <Map />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Teleports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { location: "Crimson Quarter", time: "2 hours ago" },
                        { location: "Dark Moon Estate", time: "Yesterday" },
                        { location: "Azure Bay", time: "3 days ago" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 border-b last:border-0">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{item.location}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    Your Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-3xl font-bold mb-2">L$ 2,540</div>
                    <div className="text-sm text-muted-foreground">≈ $10.16 USD</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button>Deposit</Button>
                    <Button variant="outline">Withdraw</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Marketplace Sale</span>
                    <span className="font-semibold text-green-600">+L$ 450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blood Bank Fee</span>
                    <span className="font-semibold text-red-600">-L$ 120</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Land Purchase</span>
                    <span className="font-semibold text-red-600">-L$ 1,000</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Transactions</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Badge component (since we can't import it yet)
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);

export default RoyalPortal;
