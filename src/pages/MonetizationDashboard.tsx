
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Users, BarChart2, CreditCard, ShoppingBag, Building, Brain, Zap, Gift } from "lucide-react";

import { RevenueCards } from "@/components/Monetization/RevenueCards";
import QuickActionsSidebar from "@/components/Monetization/QuickActionsSidebar";
import RevenueTabContent from "@/components/Monetization/Tabs/RevenueTabContent";
import AdvertisingTabContent from "@/components/Monetization/Tabs/AdvertisingTabContent";
import SubscriptionsTabContent from "@/components/Monetization/Tabs/SubscriptionsTabContent";
import MarketplaceTabContent from "@/components/Monetization/Tabs/MarketplaceTabContent";
import BankingTabContent from "@/components/Monetization/Tabs/BankingTabContent";
import AutomatedTabContent from "@/components/Monetization/Tabs/AutomatedTabContent";
import MonetizationAIHub from "@/components/Monetization/MonetizationAIHub";
import { useToast } from "@/components/ui/use-toast";
import { AgentManager } from "@/lib/agents/AgentManager";

const AIAgentHub = () => (
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-4">AI Monetization Assistant</h3>
    <div className="space-y-4">
      <p>This intelligent agent uses quantum-inspired algorithms to help optimize your revenue streams.</p>
      <div className="bg-muted p-4 rounded-lg">
        <p className="font-medium">Revenue Optimization Suggestions</p>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
          <li>Diversify ad placement to increase impression value</li>
          <li>Optimize subscription tiers based on user engagement data</li>
          <li>Implement virtual goods sales for premium members</li>
          <li>Create limited-time promotional events</li>
        </ul>
      </div>
      <Button className="w-full">Run Revenue Analysis</Button>
    </div>
  </div>
);

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

            {/* Add MonetizationAIHub component for intelligent monetization */}
            <div className="mb-6">
              <MonetizationAIHub />
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

              <TabsContent value="revenue">
                <RevenueTabContent 
                  isOptimizing={isOptimizing}
                  onEnableQuantumOptimization={handleEnableQuantumOptimization}
                />
              </TabsContent>

              <TabsContent value="advertising">
                <AdvertisingTabContent />
              </TabsContent>

              <TabsContent value="subscriptions">
                <SubscriptionsTabContent />
              </TabsContent>

              <TabsContent value="marketplace">
                <MarketplaceTabContent />
              </TabsContent>

              <TabsContent value="banking">
                <BankingTabContent />
              </TabsContent>

              <TabsContent value="automated">
                <AutomatedTabContent />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <QuickActionsSidebar onSetTab={setCurrentTab} />
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
