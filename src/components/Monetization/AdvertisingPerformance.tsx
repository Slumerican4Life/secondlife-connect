
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, Zap, DollarSign, Award, Target, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Sample data for the advertising performance chart
const adRevenueData = [
  { month: 'Jan', revenue: 2100, impressions: 42500, clicks: 3240 },
  { month: 'Feb', revenue: 2400, impressions: 45800, clicks: 3580 },
  { month: 'Mar', revenue: 3200, impressions: 62000, clicks: 4800 },
  { month: 'Apr', revenue: 4100, impressions: 78000, clicks: 6200 },
  { month: 'May', revenue: 4800, impressions: 86000, clicks: 7100 },
  { month: 'Jun', revenue: 5200, impressions: 92000, clicks: 7800 },
  { month: 'Jul', revenue: 6100, impressions: 105000, clicks: 9200 },
  { month: 'Aug', revenue: 5800, impressions: 98000, clicks: 8700 },
  { month: 'Sep', revenue: 6500, impressions: 110000, clicks: 9800 },
  { month: 'Oct', revenue: 7200, impressions: 124000, clicks: 10700 },
  { month: 'Nov', revenue: 8100, impressions: 135000, clicks: 12200 },
  { month: 'Dec', revenue: 9200, impressions: 148000, clicks: 14500 }
];

// Sample placement data
const placementData = [
  { name: 'Homepage Banner', revenue: 12400, ctr: 3.8, impressions: 320000 },
  { name: 'Marketplace Sidebar', revenue: 9800, ctr: 2.9, impressions: 410000 },
  { name: 'User Profile', revenue: 6200, ctr: 2.1, impressions: 285000 },
  { name: 'Content Feed', revenue: 14800, ctr: 3.2, impressions: 560000 },
  { name: 'Event Pages', revenue: 4900, ctr: 1.9, impressions: 210000 },
];

// Sample advertiser data
const topAdvertisers = [
  { name: 'VirtualFashion Co.', spend: 12800, impressions: 320000, conversions: 1840 },
  { name: 'Digital Realty', spend: 9600, impressions: 280000, conversions: 920 },
  { name: 'Meta Experiences', spend: 8400, impressions: 210000, conversions: 760 },
  { name: 'Crypto Collectibles', spend: 7200, impressions: 180000, conversions: 540 },
];

const AdvertisingPerformance = () => {
  const [activeTab, setActiveTab] = useState("revenue");
  const [optimizing, setOptimizing] = useState(false);
  const { toast } = useToast();

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      toast({
        title: "Ad Placement Optimized",
        description: "AI has analyzed performance metrics and optimized ad placements for maximum revenue.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Advertising Revenue</CardTitle>
            <CardDescription>
              Monthly advertising income and performance metrics
            </CardDescription>
          </div>
          <Badge className="bg-green-500">+14.2% MoM</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="placements" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Placements</span>
            </TabsTrigger>
            <TabsTrigger value="advertisers" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Advertisers</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={adRevenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'impressions' ? 'Impressions' : 'Clicks'
                ]} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Ad Revenue ($)" fill="#8884d8" stroke="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="clicks" name="Clicks" stroke="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="placements" className="h-[350px]">
            <div className="mb-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Top Performing Ad Placements</span>
              </div>
              <Button onClick={handleOptimize} disabled={optimizing} size="sm" className="h-8">
                {optimizing ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-pulse" /> Optimizing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" /> Optimize Placements
                  </>
                )}
              </Button>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={placementData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value}` : name === 'ctr' ? `${value}%` : value,
                  name === 'revenue' ? 'Revenue' : name === 'ctr' ? 'CTR' : 'Impressions'
                ]} />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="ctr" name="CTR (%)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="advertisers">
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2">Top Advertisers by Spend</h3>
              {topAdvertisers.map((advertiser, i) => (
                <div key={i} className="grid grid-cols-4 items-center gap-4 py-2 border-b last:border-0">
                  <div className="font-medium">{advertiser.name}</div>
                  <div className="text-green-600">${advertiser.spend}</div>
                  <div className="text-muted-foreground">{advertiser.impressions.toLocaleString()} impressions</div>
                  <div className="text-right">{advertiser.conversions} conversions</div>
                </div>
              ))}
              
              <div className="bg-muted/50 rounded-lg p-4 mt-4">
                <h3 className="text-sm font-medium mb-2">AI-Generated Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 text-green-500" />
                    <span>VirtualFashion Co. shows 28% higher conversion rates than average</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-4 w-4 mt-0.5 text-blue-500" />
                    <span>Digital Realty responds best to marketplace sidebar placements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 mt-0.5 text-amber-500" />
                    <span>Recommend 15% rate increase for homepage banner slots</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Total Annual Revenue: <span className="font-bold">$64,700</span>
        </p>
        <Button variant="outline" size="sm" className="h-7 px-3">
          Download Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdvertisingPerformance;
