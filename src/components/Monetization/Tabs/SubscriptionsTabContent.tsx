
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { DollarSign, TrendingUp, Users, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AgentManager } from "@/lib/agents/AgentManager";

// Sample subscription data (would come from an API in a real implementation)
const subscriptionData = [
  { month: 'Jan', revenue: 12400, subscribers: 124 },
  { month: 'Feb', revenue: 14100, subscribers: 141 },
  { month: 'Mar', revenue: 15800, subscribers: 158 },
  { month: 'Apr', revenue: 18200, subscribers: 182 },
  { month: 'May', revenue: 21000, subscribers: 210 },
  { month: 'Jun', revenue: 23500, subscribers: 235 },
  { month: 'Jul', revenue: 26700, subscribers: 267 },
  { month: 'Aug', revenue: 29200, subscribers: 292 },
  { month: 'Sep', revenue: 31500, subscribers: 315 },
  { month: 'Oct', revenue: 33800, subscribers: 338 },
  { month: 'Nov', revenue: 36200, subscribers: 362 },
  { month: 'Dec', revenue: 38900, subscribers: 389 }
];

const tierDistribution = [
  { name: 'Basic', value: 58, color: '#38bdf8' },
  { name: 'Premium', value: 32, color: '#4ade80' },
  { name: 'Enterprise', value: 10, color: '#f59e0b' },
];

const SubscriptionsTabContent = () => {
  const [currentView, setCurrentView] = useState("overview");
  const [optimizationLoading, setOptimizationLoading] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [optimizationData, setOptimizationData] = useState(null);
  const { toast } = useToast();
  const agentManager = AgentManager.getInstance();
  const monetizationAgent = agentManager.getMonetizationAgent();

  // Optimization recommendation function
  const runSubscriptionOptimization = async () => {
    setOptimizationLoading(true);
    
    try {
      const response = await monetizationAgent.processQuery("optimize subscription model");
      const responseData = JSON.parse(response);
      
      if (responseData?.data) {
        setOptimizationData(responseData.data);
        setOptimizationComplete(true);
        
        toast({
          title: "Optimization Complete",
          description: "Subscription model optimization recommendations generated.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error running subscription optimization:", error);
      toast({
        title: "Optimization Error",
        description: "Could not complete subscription model optimization.",
        variant: "destructive"
      });
    } finally {
      setOptimizationLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">389</span>
              <Badge variant="outline" className="text-green-500 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1" /> +7.5%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">$38,900</span>
              <Badge variant="outline" className="text-green-500 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1" /> +7.5%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Revenue Per User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">$100</span>
              <Badge variant="outline" className="text-amber-500 border-amber-200">
                <TrendingUp className="h-3 w-3 mr-1" /> +0.3%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">3.2%</span>
              <Badge variant="outline" className="text-green-500 border-green-200">
                <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> -0.5%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" value={currentView} onValueChange={setCurrentView} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tiers">Subscription Tiers</TabsTrigger>
          <TabsTrigger value="users">Subscribers</TabsTrigger>
          <TabsTrigger value="optimize">AI Optimization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly subscription revenue and subscriber count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={subscriptionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="subscribers" stroke="#38bdf8" name="Subscribers" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#4ade80" name="Revenue ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tiers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tier Distribution</CardTitle>
                <CardDescription>Breakdown of subscribers by tier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tierDistribution}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Subscribers %" fill="#38bdf8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Current Pricing Tiers</CardTitle>
                <CardDescription>Active subscription plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Basic</h4>
                      <Badge>$9.99/mo</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Entry-level subscription with basic features
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Ad-free experience</li>
                      <li>Basic customization options</li>
                      <li>Standard support</li>
                    </ul>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <strong>Conversion Rate:</strong> 3.2% • <strong>Retention:</strong> 68%
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Premium</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Popular</Badge>
                      </div>
                      <Badge className="bg-green-500">$19.99/mo</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Enhanced subscription with premium features
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>All Basic features</li>
                      <li>Advanced customization options</li>
                      <li>Priority support</li>
                      <li>Early access to new features</li>
                    </ul>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <strong>Conversion Rate:</strong> 1.8% • <strong>Retention:</strong> 82%
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Enterprise</h4>
                      <Badge>$49.99/mo</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Complete solution for businesses and power users
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>All Premium features</li>
                      <li>Exclusive content and features</li>
                      <li>API access</li>
                      <li>White-glove support</li>
                    </ul>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <strong>Conversion Rate:</strong> 0.5% • <strong>Retention:</strong> 91%
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Subscription Plans
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Subscriber Management</CardTitle>
                <CardDescription>View and manage subscription users</CardDescription>
              </div>
              <Button size="sm" className="w-full sm:w-auto">
                <DollarSign className="h-4 w-4 mr-1" />
                Export Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-5 bg-muted p-3 gap-2 text-sm font-medium">
                  <div>User</div>
                  <div>Tier</div>
                  <div>Start Date</div>
                  <div>Renewal</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {[
                    { name: "Alex Johnson", email: "alex@example.com", tier: "Premium", start: "2025-01-15", renewal: "2025-04-15", status: "active" },
                    { name: "Taylor Smith", email: "taylor@example.com", tier: "Basic", start: "2025-02-03", renewal: "2025-05-03", status: "active" },
                    { name: "Jordan Patel", email: "jordan@example.com", tier: "Enterprise", start: "2024-11-22", renewal: "2025-05-22", status: "active" },
                    { name: "Casey Wilson", email: "casey@example.com", tier: "Basic", start: "2025-01-30", renewal: "2025-04-30", status: "trialing" },
                    { name: "Morgan Lee", email: "morgan@example.com", tier: "Premium", start: "2024-12-12", renewal: "2025-05-12", status: "past_due" }
                  ].map((user, i) => (
                    <div key={i} className="grid grid-cols-5 p-3 text-sm gap-2 items-center hover:bg-muted/50">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <div>
                        <Badge variant={user.tier === "Basic" ? "outline" : user.tier === "Premium" ? "default" : "secondary"}>
                          {user.tier}
                        </Badge>
                      </div>
                      <div>{user.start}</div>
                      <div>{user.renewal}</div>
                      <div>
                        <Badge variant={
                          user.status === "active" ? "outline" : 
                          user.status === "trialing" ? "secondary" :
                          "destructive"
                        }>
                          {user.status === "active" ? "Active" : 
                          user.status === "trialing" ? "Trial" : 
                          "Past Due"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page 1 of 5
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="optimize">
          <Card>
            <CardHeader>
              <CardTitle>AI Subscription Optimization</CardTitle>
              <CardDescription>
                Use quantum-inspired AI to optimize your subscription tiers for maximum revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!optimizationComplete ? (
                <div className="space-y-4">
                  <p className="text-sm">
                    Our AI can analyze your subscription data and user behavior to recommend optimized pricing tiers, feature allocation, and marketing strategies.
                  </p>
                  <div className="border rounded-md p-4 bg-muted/50">
                    <h4 className="font-semibold mb-2">Optimization Benefits</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Identify optimal price points for each tier</li>
                      <li>Recommend feature distribution across tiers</li>
                      <li>Project revenue impact of changes</li>
                      <li>Generate targeted marketing suggestions</li>
                      <li>Predict churn reduction strategies</li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The optimization process uses advanced machine learning algorithms to analyze patterns in subscriber behavior, conversion rates, and market trends.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-md p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Revenue Increase Projection</h3>
                    </div>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">+23% Monthly Recurring Revenue</p>
                    <p className="text-sm text-muted-foreground mt-1">Potential increase with optimized tiers</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Recommended Tier Structure</h4>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-semibold">Basic</h5>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground line-through">$9.99</span>
                          <Badge>$12.99/mo</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Keep existing features, add:</p>
                      <ul className="text-xs list-disc pl-4">
                        <li>Live chat support</li>
                        <li>10 saved designs</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-semibold">Premium</h5>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground line-through">$19.99</span>
                          <Badge>$24.99/mo</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Keep existing features, add:</p>
                      <ul className="text-xs list-disc pl-4">
                        <li>Premium templates</li>
                        <li>Advanced analytics</li>
                        <li>Priority rendering</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-semibold">Enterprise</h5>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground line-through">$49.99</span>
                          <Badge>$59.99/mo</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Keep existing features, add:</p>
                      <ul className="text-xs list-disc pl-4">
                        <li>Dedicated account manager</li>
                        <li>Custom branding</li>
                        <li>Bulk operations</li>
                      </ul>
                    </div>
                    
                    <h4 className="font-medium mt-4">Implementation Strategy</h4>
                    <p className="text-sm">
                      Existing subscribers should be grandfathered at their current rates for 3 months, with an email campaign highlighting new features and the upcoming price change.
                    </p>
                    
                    <div className="border rounded-md p-3 mt-2">
                      <h5 className="font-semibold text-sm mb-2">Projected Impact</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">Churn Impact</div>
                          <div className="font-medium">-1.2% (Projected)</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">New Conversion Rate</div>
                          <div className="font-medium">+5.3% (Projected)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={runSubscriptionOptimization}
                disabled={optimizationLoading || optimizationComplete}
                className="w-full"
              >
                {optimizationLoading ? "Running Optimization..." : 
                 optimizationComplete ? "Optimization Complete" : 
                 "Run AI Optimization"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionsTabContent;
