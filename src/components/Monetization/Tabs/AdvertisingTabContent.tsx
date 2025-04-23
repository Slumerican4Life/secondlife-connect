
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  BarChart2, 
  Zap, 
  Target, 
  Settings, 
  PieChart,
  ExternalLink,
  Plus
} from "lucide-react";
import { AgentManager } from "@/lib/agents/AgentManager";
import AdvertisingPerformance from "@/components/Monetization/AdvertisingPerformance";

// Sample data for charts and analysis
const adPerformanceData = [
  { day: 'Mon', impressions: 12500, clicks: 320, revenue: 125 },
  { day: 'Tue', impressions: 13200, clicks: 340, revenue: 132 },
  { day: 'Wed', impressions: 14800, clicks: 390, revenue: 148 },
  { day: 'Thu', impressions: 13900, clicks: 370, revenue: 139 },
  { day: 'Fri', impressions: 15200, clicks: 410, revenue: 152 },
  { day: 'Sat', impressions: 18500, clicks: 490, revenue: 185 },
  { day: 'Sun', impressions: 17200, clicks: 450, revenue: 172 }
];

const adPlacements = [
  { id: 1, location: "Home Page Banner", status: "active", ctr: "3.2%", rpm: "$4.50", priority: "High" },
  { id: 2, location: "Sidebar Widget", status: "active", ctr: "2.8%", rpm: "$3.75", priority: "Medium" },
  { id: 3, location: "Profile Page", status: "active", ctr: "1.9%", rpm: "$2.90", priority: "Medium" },
  { id: 4, location: "Marketplace Listings", status: "active", ctr: "3.5%", rpm: "$5.20", priority: "High" },
  { id: 5, location: "Footer Banner", status: "inactive", ctr: "1.2%", rpm: "$1.80", priority: "Low" }
];

const adNetworks = [
  { id: 1, name: "DirectAds", status: "connected", revenue: "$3,250", ecpm: "$3.80" },
  { id: 2, name: "AdExchange", status: "connected", revenue: "$1,850", ecpm: "$2.95" },
  { id: 3, name: "PremiumNetwork", status: "pending", revenue: "-", ecpm: "-" }
];

const AdvertisingTabContent = () => {
  const [optimizationLoading, setOptimizationLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("performance");
  const [isAddingPlacement, setIsAddingPlacement] = useState(false);
  const [isAddingNetwork, setIsAddingNetwork] = useState(false);
  const [adSettings, setAdSettings] = useState({
    autoOptimize: true,
    minEcpm: 2.5,
    allowPersonalized: true,
    prioritizeDirectSales: true
  });
  
  const { toast } = useToast();
  const agentManager = AgentManager.getInstance();
  const monetizationAgent = agentManager.getMonetizationAgent();

  // Run AI optimization on ad placements
  const runAdOptimization = async () => {
    setOptimizationLoading(true);
    
    try {
      const response = await monetizationAgent.processQuery("optimize ad placements");
      const responseData = JSON.parse(response);
      
      if (responseData?.success) {
        toast({
          title: "Ad Optimization Complete",
          description: "Advertising placements have been optimized for maximum revenue.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error running ad optimization:", error);
      toast({
        title: "Optimization Error",
        description: "Could not complete ad placement optimization.",
        variant: "destructive"
      });
    } finally {
      setOptimizationLoading(false);
    }
  };

  // Handle settings changes
  const handleSettingChange = (setting: string, value: any) => {
    setAdSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Settings Updated",
      description: `Advertising setting "${setting}" has been updated.`,
      variant: "default"
    });
  };

  // Handle add placement
  const handleAddPlacement = () => {
    // In a real app, this would send data to an API
    toast({
      title: "New Placement Added",
      description: "Your new ad placement has been created successfully.",
      variant: "default"
    });
    setIsAddingPlacement(false);
  };

  // Handle add network
  const handleAddNetwork = () => {
    // In a real app, this would send data to an API
    toast({
      title: "Network Connection Initiated",
      description: "You'll be redirected to complete the ad network connection.",
      variant: "default"
    });
    setIsAddingNetwork(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ad Revenue (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">$1,053.25</span>
              <Badge variant="outline" className="text-green-500 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1" /> +8.3%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Impressions (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">105,300</span>
              <Badge variant="outline" className="text-green-500 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average eCPM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">$3.25</span>
              <Badge variant="outline" className="text-amber-500 border-amber-200">
                <TrendingUp className="h-3 w-3 mr-1" /> +1.2%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fill Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">98.2%</span>
              <Badge variant="outline" className="text-green-500 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1" /> +2.1%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AdvertisingPerformance />
      
      <Tabs defaultValue="performance" value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="placements">Ad Placements</TabsTrigger>
          <TabsTrigger value="networks">Ad Networks</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Performance</CardTitle>
                <CardDescription>
                  Impressions, clicks, and revenue by day
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={adPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue ($)" 
                      stroke="#22c55e" 
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="clicks" 
                      name="Clicks" 
                      stroke="#3b82f6" 
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>
                    AI-powered advertising recommendations
                  </CardDescription>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  disabled={optimizationLoading}
                  onClick={runAdOptimization}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  {optimizationLoading ? "Running..." : "Optimize"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-3 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Revenue Opportunity</h3>
                  </div>
                  <p className="text-sm mb-2">
                    Increasing ad density on the Marketplace Listings page could yield a 15% revenue increase.
                  </p>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                      Implement
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-3 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">Targeting Improvement</h3>
                  </div>
                  <p className="text-sm mb-2">
                    Enhanced demographic targeting could improve CTR by approximately 22%.
                  </p>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold">Network Distribution</h3>
                  </div>
                  <p className="text-sm mb-2">
                    Redistributing your ad inventory across networks could increase your overall eCPM.
                  </p>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                      Analyze
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 h-auto text-muted-foreground">
                  View all insights <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="placements">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Ad Placements</CardTitle>
                <CardDescription>
                  Manage your active ad slots across your platform
                </CardDescription>
              </div>
              <Button size="sm" className="w-full sm:w-auto" onClick={() => setIsAddingPlacement(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Placement
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-6 bg-muted p-2 gap-2 text-sm font-medium">
                  <div>Location</div>
                  <div>Status</div>
                  <div>CTR</div>
                  <div>RPM</div>
                  <div>Priority</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {adPlacements.map((placement) => (
                    <div key={placement.id} className="grid grid-cols-6 p-3 text-sm gap-2 items-center hover:bg-muted/50">
                      <div className="font-medium">
                        {placement.location}
                      </div>
                      <div>
                        <Badge variant={placement.status === "active" ? "default" : "outline"} className={placement.status === "active" ? "bg-green-500" : ""}>
                          {placement.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div>{placement.ctr}</div>
                      <div>{placement.rpm}</div>
                      <div>
                        <Badge variant="outline" className={
                          placement.priority === "High" 
                            ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400" 
                            : placement.priority === "Medium"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                        }>
                          {placement.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className={placement.status === "active" ? "text-red-500" : "text-green-500"}>
                          {placement.status === "active" ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {isAddingPlacement && (
                <div className="mt-4 border rounded-md p-4 bg-muted/50">
                  <h3 className="font-medium mb-3">Add New Placement</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="location">Location Name</Label>
                      <Input id="location" placeholder="e.g. Profile Sidebar" />
                    </div>
                    <div>
                      <Label htmlFor="type">Ad Type</Label>
                      <Select defaultValue="banner">
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select ad type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banner">Banner Ad</SelectItem>
                          <SelectItem value="interstitial">Interstitial</SelectItem>
                          <SelectItem value="native">Native Ad</SelectItem>
                          <SelectItem value="video">Video Ad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="active">Active</Label>
                      <Switch id="active" defaultChecked />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" onClick={() => setIsAddingPlacement(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddPlacement}>
                        Add Placement
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="networks">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Ad Networks</CardTitle>
                <CardDescription>
                  Connect and manage your advertising networks
                </CardDescription>
              </div>
              <Button size="sm" className="w-full sm:w-auto" onClick={() => setIsAddingNetwork(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Network
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-4 bg-muted p-2 gap-2 text-sm font-medium">
                  <div>Network</div>
                  <div>Status</div>
                  <div>Revenue (30d)</div>
                  <div>eCPM</div>
                </div>
                <div className="divide-y">
                  {adNetworks.map((network) => (
                    <div key={network.id} className="grid grid-cols-4 p-3 text-sm gap-2 items-center hover:bg-muted/50">
                      <div className="font-medium">
                        {network.name}
                      </div>
                      <div>
                        <Badge variant={network.status === "connected" ? "default" : "outline"} className={network.status === "connected" ? "bg-green-500" : ""}>
                          {network.status === "connected" ? "Connected" : "Pending"}
                        </Badge>
                      </div>
                      <div>{network.revenue}</div>
                      <div>{network.ecpm}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {isAddingNetwork && (
                <div className="mt-4 border rounded-md p-4 bg-muted/50">
                  <h3 className="font-medium mb-3">Connect Ad Network</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="networkName">Network Name</Label>
                      <Select>
                        <SelectTrigger id="networkName">
                          <SelectValue placeholder="Select ad network" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="googleAdManager">Google Ad Manager</SelectItem>
                          <SelectItem value="amazonPublisher">Amazon Publisher Services</SelectItem>
                          <SelectItem value="adSense">Google AdSense</SelectItem>
                          <SelectItem value="pubmatic">PubMatic</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="accountId">Publisher/Account ID</Label>
                      <Input id="accountId" placeholder="Enter your account ID" />
                    </div>
                    <div className="p-3 border rounded-md bg-amber-50 dark:bg-amber-950/20 text-sm">
                      <p className="font-medium mb-1">Connection Note</p>
                      <p className="text-muted-foreground">
                        You'll be redirected to the ad network to complete the connection process.
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" onClick={() => setIsAddingNetwork(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddNetwork}>
                        Connect Network
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Advertising Settings</CardTitle>
              <CardDescription>
                Configure your advertising preferences and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">AI-Powered Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically optimize ad placements for maximum revenue
                  </p>
                </div>
                <Switch 
                  checked={adSettings.autoOptimize}
                  onCheckedChange={(checked) => handleSettingChange('autoOptimize', checked)}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Minimum eCPM ($)</h3>
                  <span className="text-sm font-medium">${adSettings.minEcpm.toFixed(2)}</span>
                </div>
                <Slider
                  value={[adSettings.minEcpm]}
                  min={0}
                  max={10}
                  step={0.1}
                  onValueChange={(values) => handleSettingChange('minEcpm', values[0])}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ads below this eCPM will not be displayed
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Allow Personalized Ads</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable interest-based advertising for higher eCPMs
                  </p>
                </div>
                <Switch 
                  checked={adSettings.allowPersonalized}
                  onCheckedChange={(checked) => handleSettingChange('allowPersonalized', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Prioritize Direct Sales</h3>
                  <p className="text-sm text-muted-foreground">
                    Prefer direct advertisers over network ads
                  </p>
                </div>
                <Switch 
                  checked={adSettings.prioritizeDirectSales}
                  onCheckedChange={(checked) => handleSettingChange('prioritizeDirectSales', checked)}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Ad Exclusion Categories</h3>
                <div className="space-y-2">
                  {["Gambling", "Alcohol", "Mature Content", "Political"].map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Switch id={`exclude-${category.toLowerCase()}`} defaultChecked={category !== "Political"} />
                      <Label htmlFor={`exclude-${category.toLowerCase()}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                Reset to Defaults
              </Button>
              <Button>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertisingTabContent;
