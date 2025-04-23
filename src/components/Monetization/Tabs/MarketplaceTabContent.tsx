
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ShoppingBag, TrendingUp, DollarSign, Users, ArrowRight, Clock, BarChart2 } from "lucide-react";

// Sample marketplace transaction data
const transactionData = [
  { month: 'Jan', value: 4000, transactions: 32 },
  { month: 'Feb', value: 3500, transactions: 28 },
  { month: 'Mar', value: 6800, transactions: 42 },
  { month: 'Apr', value: 8900, transactions: 54 },
  { month: 'May', value: 9000, transactions: 58 },
  { month: 'Jun', value: 15000, transactions: 75 },
  { month: 'Jul', value: 19000, transactions: 85 },
  { month: 'Aug', value: 22000, transactions: 94 },
  { month: 'Sep', value: 26000, transactions: 112 },
  { month: 'Oct', value: 29000, transactions: 128 },
];

// Sample category data
const categoryData = [
  { name: 'Virtual Fashion', value: 35 },
  { name: 'Real Estate', value: 30 },
  { name: 'Experiences', value: 20 },
  { name: 'Art & NFTs', value: 15 }
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Top selling items
const topItems = [
  { name: "Virtual Designer Jacket", sales: 148, revenue: "$14,800" },
  { name: "Luxury Virtual Apartment", sales: 12, revenue: "$24,000" },
  { name: "Digital Art Collection", sales: 42, revenue: "$8,400" },
  { name: "VIP Experience Package", sales: 28, revenue: "$5,600" },
  { name: "Custom Avatar Accessories", sales: 94, revenue: "$3,760" }
];

const MarketplaceTabContent = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const handleOptimizeFees = () => {
    toast({
      title: "Fee Structure Optimized",
      description: "AI has analyzed transaction patterns and optimized fee structure for maximum revenue.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128,200</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑28%</span> vs last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">708</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑12%</span> vs last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Transaction Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$181</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑16%</span> vs last quarter
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Categories</span>
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Optimization</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Monthly marketplace transaction volume and count</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => [
                    name === 'value' ? `$${value}` : value,
                    name === 'value' ? 'Revenue' : 'Transactions'
                  ]} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="value" name="Revenue ($)" fill="#0088FE" />
                  <Bar yAxisId="right" dataKey="transactions" name="Transactions" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Data from the last 10 months</p>
              <Button variant="outline" size="sm">
                Export Report <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>Best performing items in your marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted w-10 h-10 rounded-md flex items-center justify-center">
                          <span>{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.sales} sales</p>
                        </div>
                      </div>
                      <div className="font-semibold text-green-600">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Distribution across product categories</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Growth and revenue metrics by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[0] }}></div>
                        <span>Virtual Fashion</span>
                      </div>
                      <span className="text-green-500">+24% growth</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[1] }}></div>
                        <span>Real Estate</span>
                      </div>
                      <span className="text-green-500">+18% growth</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[2] }}></div>
                        <span>Experiences</span>
                      </div>
                      <span className="text-green-500">+32% growth</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[3] }}></div>
                        <span>Art & NFTs</span>
                      </div>
                      <span className="text-amber-500">+8% growth</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 mt-0.5 text-green-500" />
                        <span>Increase inventory in the fast-growing Experiences category</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-4 w-4 mt-0.5 text-blue-500" />
                        <span>Target creators for Art & NFTs to boost slow growth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 mt-0.5 text-amber-500" />
                        <span>Adjust pricing strategy for Virtual Fashion to maximize revenue</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Optimization</CardTitle>
              <CardDescription>AI-powered fee structure and marketplace improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    Current Fee Structure
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Transaction fee</span>
                      <span>5.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Listing fee</span>
                      <span>$0.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Premium category fee</span>
                      <span>+2.0%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-900">
                  <h3 className="font-medium mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    AI-Recommended Optimized Structure
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Transaction fee (tiered)</span>
                      <span className="text-green-600 dark:text-green-400">3.5% - 6.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Listing fee (category-based)</span>
                      <span className="text-green-600 dark:text-green-400">$0.25 - $2.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Premium category fee</span>
                      <span className="text-green-600 dark:text-green-400">+1.5% - 3.0%</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-green-100 dark:bg-green-800/30 rounded">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Estimated revenue increase: +18.5%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Implementation Recommendations</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="min-w-4 mt-1">1.</div>
                      <span>Implement tiered transaction fees based on item price and category</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="min-w-4 mt-1">2.</div>
                      <span>Adjust listing fees by category popularity and conversion rates</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="min-w-4 mt-1">3.</div>
                      <span>Introduce promotional fee discounts for new sellers and high-volume creators</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleOptimizeFees} className="w-full">
                Implement Optimized Fee Structure
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceTabContent;
