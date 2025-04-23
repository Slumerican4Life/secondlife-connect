
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, Shield, Brain, Clock, LineChart, AlertCircle } from "lucide-react";
import { QuantumRevenueOptimizer } from "@/lib/agents/QuantumRevenueOptimizer";
import { logShort } from "@/lib/utils/shorthandLogger";
import { useAuth } from "@/contexts/AuthContext";

const RevenueOptimizer = () => {
  const { user } = useAuth();
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [timeHorizon, setTimeHorizon] = useState(90);
  const [initialBudget, setInitialBudget] = useState(5000);
  const [activeTab, setActiveTab] = useState("opportunities");
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [marketConditions, setMarketConditions] = useState({
    "subscription-market-growth": 1.2,
    "virtual-currency-demand": 1.5,
    "advertising-market-saturation": 0.8,
    "content-monetization-trend": 1.3,
    "marketplace-competition": 0.9,
    "data-privacy-concerns": 0.7,
    "virtual-land-bubble": 1.1,
  });
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    quantum: "online",
    neuromorphic: "learning",
  });
  
  // Color schemes for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];
  
  // Initialize on component mount
  useEffect(() => {
    logShort("Quantum Revenue Optimizer page loaded", "info");
    runOptimization();
    
    // Simulate quantum system status updates
    const statusInterval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        quantum: Math.random() > 0.1 ? "online" : "recalibrating",
        neuromorphic: ["learning", "analyzing", "optimizing"][Math.floor(Math.random() * 3)]
      }));
    }, 8000);
    
    return () => clearInterval(statusInterval);
  }, []);
  
  // Run optimization with current parameters
  const runOptimization = () => {
    setLoading(true);
    logShort(`Running revenue optimization with parameters: risk=${riskTolerance}, time=${timeHorizon}, budget=${initialBudget}`, "info");
    
    // Add a slight delay to simulate quantum computing processing
    setTimeout(() => {
      try {
        const optimizer = QuantumRevenueOptimizer.getInstance();
        
        // Update optimizer with current market conditions
        optimizer.updateMarketConditions(marketConditions);
        
        // Set user preferences based on profile
        optimizer.setUserPreferences({
          "subscription": 1.2,
          "virtual-currency": 1.3,
          "advertising": 0.9,
          "content": 1.1,
          "marketplace": 1.0,
          "data": 0.8,
          "real-estate": 1.0
        });
        
        // Run optimization
        const result = optimizer.runOptimization({
          riskTolerance,
          timeHorizon,
          initialBudget
        });
        
        setOptimizationResult(result);
        setLoading(false);
      } catch (error) {
        console.error("Optimization error:", error);
        logShort(`Optimization failed: ${error.message}`, "error");
        setLoading(false);
      }
    }, 1500);
  };
  
  // View detailed analysis for a specific opportunity
  const viewOpportunityDetails = (opportunityId) => {
    if (!opportunityId) return;
    
    const optimizer = QuantumRevenueOptimizer.getInstance();
    const details = optimizer.getOpportunityAnalysis(opportunityId);
    setSelectedOpportunity(details);
  };
  
  // Update a specific market condition
  const updateMarketCondition = (key, value) => {
    setMarketConditions(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Format dollar amounts
  const formatDollars = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Prepare chart data for revenue distribution
  const getRevenueDistributionData = () => {
    if (!optimizationResult?.opportunities) return [];
    
    return optimizationResult.opportunities.map(opp => ({
      name: opp.name,
      value: opp.potentialRevenue
    }));
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Brain className="h-8 w-8 mr-3 text-virtual-400" />
              Quantum Revenue Optimizer
            </h1>
            <p className="text-muted-foreground mt-1">
              Neuromorphic revenue analysis with quantum-inspired algorithms
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={systemStatus.quantum === "online" ? "outline" : "secondary"} 
                  className="bg-background border-green-500 text-green-500">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
              Quantum System: {systemStatus.quantum}
            </Badge>
            <Badge variant="outline" className="bg-background border-purple-500 text-purple-500">
              <span className="h-2 w-2 rounded-full bg-purple-500 mr-1 animate-pulse"></span>
              Neural Network: {systemStatus.neuromorphic}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-3 glass-morphism">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Optimization Parameters</CardTitle>
              <CardDescription>Adjust parameters to refine revenue strategy</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Risk Tolerance: {riskTolerance}/10
                  </label>
                  <Slider 
                    value={[riskTolerance]} 
                    min={1} 
                    max={10} 
                    step={1}
                    onValueChange={value => setRiskTolerance(value[0])}
                    className="mb-4"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Time Horizon: {timeHorizon} days
                  </label>
                  <Slider 
                    value={[timeHorizon]} 
                    min={30} 
                    max={365} 
                    step={30}
                    onValueChange={value => setTimeHorizon(value[0])}
                    className="mb-4"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Initial Budget: {formatDollars(initialBudget)}
                  </label>
                  <Slider 
                    value={[initialBudget]} 
                    min={1000} 
                    max={20000} 
                    step={1000}
                    onValueChange={value => setInitialBudget(value[0])}
                    className="mb-4"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={runOptimization} 
                className="bg-virtual-500 hover:bg-virtual-600"
                disabled={loading}
              >
                {loading ? "Processing..." : "Run Quantum Optimization"} 
                <Brain className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {optimizationResult && (
            <>
              <Card className="lg:col-span-2 glass-morphism">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-virtual-400" />
                      Revenue Strategy Analysis
                    </span>
                    <Badge className="ml-2">
                      {(optimizationResult.confidenceScore * 100).toFixed(0)}% Confidence
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Estimated monthly revenue: {formatDollars(optimizationResult.estimatedTotalRevenue)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                      <TabsTrigger value="timeline">Implementation</TabsTrigger>
                      <TabsTrigger value="distribution">Distribution</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="opportunities" className="min-h-[300px]">
                      <div className="space-y-4">
                        {optimizationResult.opportunities.map((opp) => (
                          <div key={opp.id} className="p-4 rounded-lg border flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{opp.name}</h3>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <Badge variant="outline" className="mr-2">
                                  {opp.category}
                                </Badge>
                                <DollarSign className="h-4 w-4 mr-1" />
                                {formatDollars(opp.potentialRevenue)}/month
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewOpportunityDetails(opp.id)}
                            >
                              Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="timeline" className="min-h-[300px]">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Implementation Timeline</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Estimated completion: {optimizationResult.timelineEstimate} days
                        </p>
                        
                        <div className="space-y-4">
                          {optimizationResult.implementationOrder.map((oppId, index) => {
                            const opp = optimizationResult.opportunities.find(o => o.id === oppId);
                            if (!opp) return null;
                            return (
                              <div key={opp.id} className="p-4 rounded-lg border">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-virtual-100 flex items-center justify-center mr-4 text-virtual-600 font-medium">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{opp.name}</h3>
                                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                      <Clock className="h-4 w-4 mr-1" />
                                      {opp.timeToRevenue} days to revenue
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="distribution" className="min-h-[300px]">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={getRevenueDistributionData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {getRevenueDistributionData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatDollars(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism">
                {selectedOpportunity ? (
                  <>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{selectedOpportunity.name}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedOpportunity(null)}>
                          Back
                        </Button>
                      </div>
                      <CardDescription>{selectedOpportunity.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Revenue Potential</h4>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="text-sm text-muted-foreground">Base</div>
                              <div className="text-lg font-medium">{formatDollars(selectedOpportunity.potentialRevenue)}</div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="text-sm text-muted-foreground">Market Adjusted</div>
                              <div className="text-lg font-medium">{formatDollars(selectedOpportunity.marketAdjustedRevenue)}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium">Implementation</h4>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="text-sm text-muted-foreground">Complexity</div>
                              <div className="text-lg font-medium">{selectedOpportunity.implementationComplexity}/10</div>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                              <div className="text-sm text-muted-foreground">Time to Revenue</div>
                              <div className="text-lg font-medium">{selectedOpportunity.timeToRevenue} days</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium">Implementation Steps</h4>
                          <ul className="mt-2 space-y-2">
                            {selectedOpportunity.recommendedImplementationSteps.map((step, index) => (
                              <li key={index} className="text-sm p-2 bg-muted rounded-lg flex items-start">
                                <div className="h-5 w-5 rounded-full bg-virtual-100 flex items-center justify-center mr-2 text-virtual-600 text-xs flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Market Conditions</CardTitle>
                      <CardDescription>Adjust market parameters to refine analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(marketConditions).map(([key, value]) => (
                          <div key={key} className="grid grid-cols-2 gap-2 items-center">
                            <label className="text-sm capitalize">
                              {key.replace(/-/g, ' ')}:
                            </label>
                            <div className="flex items-center gap-2">
                              <Slider 
                                value={[value]} 
                                min={0.1} 
                                max={2.0} 
                                step={0.1}
                                onValueChange={val => updateMarketCondition(key, val[0])}
                                className="w-full"
                              />
                              <span className="text-sm w-10">{value}x</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button 
                        onClick={runOptimization} 
                        className="w-full mt-4 bg-virtual-500 hover:bg-virtual-600"
                      >
                        Recalculate
                      </Button>
                    </CardContent>
                  </>
                )}
              </Card>
            </>
          )}
          
          <Card className="lg:col-span-3 bg-green-900/20 border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-400" />
                Security & Encryption Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-900/10 rounded-lg border border-green-800/50">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-300">Quantum Encryption</h3>
                      <p className="text-sm text-green-400">Active & Protected</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-900/10 rounded-lg border border-green-800/50">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                      <AlertCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-300">Threat Detection</h3>
                      <p className="text-sm text-green-400">No active threats</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-900/10 rounded-lg border border-green-800/50">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                      <Brain className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-300">Neural Security</h3>
                      <p className="text-sm text-green-400">Learning & Adapting</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-green-400">
                All proprietary data and revenue strategies are secured with quantum-resistant encryption. 
                Owner access restricted to authorized individuals only.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RevenueOptimizer;
