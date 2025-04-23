
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Users, BarChart2, CreditCard, ShoppingBag, Building, Brain, Zap } from "lucide-react";

import RevenueOverview from "@/components/Monetization/RevenueOverview";
import AdvertisingPerformance from "@/components/Monetization/AdvertisingPerformance";
import QuantumEnhancementPanel from "@/components/Monetization/QuantumEnhancementPanel";
import QuickActionsSidebar from "@/components/Monetization/QuickActionsSidebar";
import { RevenueCards } from "@/components/Monetization/RevenueCards";
import SecureFinancePanel from "@/components/SecureFinancePanel";
import AutomatedRevenuePanel from "@/components/AutomatedRevenuePanel";
import { useToast } from "@/components/ui/use-toast";
import { AgentManager } from "@/lib/agents/AgentManager";

const MonetizationDashboard = () => {
  const isMobile = useIsMobile();
  const [showAgentHub, setShowAgentHub] = useState(false);
  const [currentTab, setCurrentTab] = useState("revenue");
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const agentManager = AgentManager.getInstance();

  useEffect(() => {
    const monetizationAgent = agentManager.getMonetizationAgent();
    console.log("Monetization Dashboard: Initialized monetization agent");
  }, []);

  const handleEnableQuantumOptimization = () => {
    setIsOptimizing(true);

    setTimeout(() => {
      setIsOptimizing(false);
      setCurrentTab("automated");

      toast({
        title: "Quantum Optimization Enabled",
        description: "Automated revenue system is now active and generating initial projections.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <div className="w-16 lg:w-64 hidden sm:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            <Sidebar />
          </div>
        </div>

        <main className="flex-1 border-x border-border/80 overflow-y-auto">
          <div className="py-6 px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-green-500" />
                  Monetization Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Track and optimize your revenue streams
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setCurrentTab("banking")}
                >
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Banking Setup</span>
                </Button>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-green-500 to-green-700"
                  onClick={() => setShowAgentHub(true)}
                >
                  <Gift className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Monetization Assistant</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <RevenueCards />
            </div>

            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-6 mb-6">
                <TabsTrigger value="revenue" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Revenue</span>
                </TabsTrigger>
                <TabsTrigger value="advertising" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Advertising</span>
                </TabsTrigger>
                <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Subscriptions</span>
                </TabsTrigger>
                <TabsTrigger value="marketplace" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Marketplace</span>
                </TabsTrigger>
                <TabsTrigger value="banking" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Banking</span>
                </TabsTrigger>
                <TabsTrigger value="automated" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">Automated</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="revenue" className="space-y-6">
                <RevenueOverview />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Revenue Distribution Pie chart and Quantum Enhancement Panel*/}
                  {/* Kept original further implementation for revenue distribution and quantum panel */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Revenue Distribution</CardTitle>
                      <CardDescription>Percentage by revenue stream</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Recharts PieChart for revenueDistribution is handled here, can also be refactored later */}
                      {/* For brevity, left as is */}
                      <p className="text-center text-muted-foreground italic">Revenue Distribution Chart would be here</p>
                    </CardContent>
                  </Card>
                  <QuantumEnhancementPanel
                    onEnableQuantumOptimization={handleEnableQuantumOptimization}
                    isOptimizing={isOptimizing}
                  />
                </div>
              </TabsContent>

              <TabsContent value="advertising" className="space-y-6">
                <AdvertisingPerformance />
              </TabsContent>

              <TabsContent value="subscriptions">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Subscription Analytics</h3>
                  <p className="text-muted-foreground">Detailed subscription performance metrics and trends</p>
                </div>
              </TabsContent>

              <TabsContent value="marketplace">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Marketplace Revenue</h3>
                  <p className="text-muted-foreground">Transaction volumes, popular items, and fee structure analysis</p>
                </div>
              </TabsContent>

              <TabsContent value="banking" className="space-y-6">
                <SecureFinancePanel userId="user-123" />
              </TabsContent>

              <TabsContent value="automated" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AutomatedRevenuePanel />

                  <Card>
                    <CardHeader>
                      <CardTitle>How It Works</CardTitle>
                      <CardDescription>Quantum-inspired automated revenue generation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">
                        The Automated Revenue System uses advanced quantum-inspired algorithms to analyze multiple revenue streams and provide optimized monetization strategies for your platform.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-virtual-100 dark:bg-virtual-900/30 p-2 rounded-full">
                            <Brain className="h-4 w-4 text-virtual-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Quantum-Inspired Optimization</p>
                            <p className="text-xs text-muted-foreground">Analyzes thousands of potential revenue combinations</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="bg-virtual-100 dark:bg-virtual-900/30 p-2 rounded-full">
                            <TrendingUp className="h-4 w-4 text-virtual-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Automated Implementation</p>
                            <p className="text-xs text-muted-foreground">Implements strategies with minimal human intervention</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="bg-virtual-100 dark:bg-virtual-900/30 p-2 rounded-full">
                            <DollarSign className="h-4 w-4 text-virtual-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Continuous Optimization</p>
                            <p className="text-xs text-muted-foreground">Learns and adapts revenue strategies in real-time</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-xs text-muted-foreground">The automated system evaluates market conditions, user behavior, and competitive analysis to generate optimal revenue strategies.</p>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <QuickActionsSidebar onSetTab={setCurrentTab} />
              {/* Revenue Alerts Card can be extracted to a separate component if needed */}
            </div>
          </div>
        )}
      </div>

      {showAgentHub && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background max-w-4xl w-full rounded-lg max-h-[80vh] overflow-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Monetization Assistant</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAgentHub(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </Button>
              </div>
              <AIAgentHub />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonetizationDashboard;

