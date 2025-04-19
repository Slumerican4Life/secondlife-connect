
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  BarChart2, 
  CreditCard, 
  Percent,
  Gift,
  ShoppingBag,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AIAgentHub from "@/components/AIAgentHub";

// Dummy data for demonstration
const revenueData = [
  { name: 'Jan', premium: 4000, advertising: 2400, marketplace: 1800, virtual: 1200 },
  { name: 'Feb', premium: 4200, advertising: 2100, marketplace: 2000, virtual: 1500 },
  { name: 'Mar', premium: 5000, advertising: 2400, marketplace: 2200, virtual: 1300 },
  { name: 'Apr', premium: 5800, advertising: 2800, marketplace: 2500, virtual: 1700 },
  { name: 'May', premium: 6000, advertising: 3000, marketplace: 2800, virtual: 2000 },
  { name: 'Jun', premium: 6500, advertising: 3200, marketplace: 3000, virtual: 2500 }
];

const revenueDistribution = [
  { name: 'Premium Subscriptions', value: 35 },
  { name: 'Advertising', value: 25 },
  { name: 'Marketplace Fees', value: 20 },
  { name: 'Virtual Currency', value: 15 },
  { name: 'Other', value: 5 }
];

const advertiserPerformance = [
  { name: 'VirtualFashion', impressions: 12000, clicks: 840, conversion: 126 },
  { name: 'CryptoWallet', impressions: 8500, clicks: 680, conversion: 85 },
  { name: 'AvatarCustom', impressions: 6200, clicks: 496, conversion: 74 },
  { name: 'RealEstate', impressions: 9800, clicks: 784, conversion: 118 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const MonetizationDashboard = () => {
  const isMobile = useIsMobile();
  const [showAgentHub, setShowAgentHub] = useState(false);
  
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
              <Button 
                variant="default" 
                className="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => setShowAgentHub(true)}
              >
                <Gift className="mr-2 h-4 w-4" />
                Monetization Assistant
              </Button>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">$24,560</span>
                    <Badge variant="outline" className="text-green-500 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> +15%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">1,248</span>
                    <Badge variant="outline" className="text-green-500 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> +8%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ad Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">$8,245</span>
                    <Badge variant="outline" className="text-green-500 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> +12%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold">5.8%</span>
                    <Badge variant="outline" className="text-green-500 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> +2.1%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
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
              </TabsList>
              
              <TabsContent value="revenue" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue breakdown by category</CardDescription>
                  </CardHeader>
                  <CardContent className="px-1">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="premium" stackId="1" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="advertising" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                          <Area type="monotone" dataKey="marketplace" stackId="1" stroke="#ffc658" fill="#ffc658" />
                          <Area type="monotone" dataKey="virtual" stackId="1" stroke="#ff8042" fill="#ff8042" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Revenue Distribution</CardTitle>
                      <CardDescription>Percentage by revenue stream</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={revenueDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {revenueDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Growth Opportunities</CardTitle>
                      <CardDescription>Recommended actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <Percent className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Increase premium tier pricing by 5%</p>
                            <p className="text-xs text-muted-foreground">Estimated impact: +$2,300/mo</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <Award className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Add exclusive premium content</p>
                            <p className="text-xs text-muted-foreground">Estimated impact: +$1,800/mo</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <CreditCard className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Optimize ad placements</p>
                            <p className="text-xs text-muted-foreground">Estimated impact: +$1,200/mo</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-sm">View All Opportunities</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="advertising" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advertising Performance</CardTitle>
                    <CardDescription>Impressions, clicks, and conversions by advertiser</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={advertiserPerformance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="impressions" fill="#8884d8" />
                          <Bar dataKey="clicks" fill="#82ca9d" />
                          <Bar dataKey="conversion" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
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
            </Tabs>
          </div>
        </main>

        {/* Right sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-80 hidden lg:block">
            <div className="p-4 sticky top-[73px]">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Run Revenue Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    View Payment Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Marketplace Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Revenue Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Advertising revenue increased by 15% this month</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Premium subscription conversion rate dipped to 4.8%</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
