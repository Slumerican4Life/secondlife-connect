
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AgentManager } from '@/lib/agents/AgentManager';
import { 
  TrendingUp, 
  Settings, 
  RefreshCcw, 
  DollarSign, 
  ShieldCheck, 
  Coins, 
  BarChart2, 
  Eye,
  Lock
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AutomatedRevenuePanelProps {
  userId?: string;
  className?: string;
}

const AutomatedRevenuePanel = ({ userId, className }: AutomatedRevenuePanelProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [optimizationData, setOptimizationData] = useState<any>(null);
  const [optimizationAge, setOptimizationAge] = useState<number>(0);
  const { toast } = useToast();
  
  const agentManager = AgentManager.getInstance();
  const monetizationAgent = agentManager.getMonetizationAgent();
  
  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get revenue optimization data from the monetization agent
        const response = await monetizationAgent.processQuery("get automated revenue status");
        const responseData = JSON.parse(response);
        
        if (responseData?.data?.status) {
          setIsEnabled(responseData.data.status === "ENABLED");
          setOptimizationData(responseData.data);
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Update age timer
    const timer = setInterval(() => {
      if (optimizationData?.lastOptimizationDate) {
        const lastDate = new Date(optimizationData.lastOptimizationDate);
        const ageInHours = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60);
        setOptimizationAge(Math.round(ageInHours * 10) / 10);
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Toggle automated revenue optimization
  const toggleAutomation = async () => {
    setIsOptimizing(true);
    
    try {
      const response = await monetizationAgent.processQuery("toggle automated revenue optimization");
      const responseData = JSON.parse(response);
      
      if (responseData?.data) {
        setIsEnabled(responseData.data.status === "ENABLED");
        setOptimizationData(responseData.data);
        
        toast({
          title: isEnabled ? "Automation Disabled" : "Automation Enabled",
          description: isEnabled 
            ? "Automated revenue optimization has been turned off." 
            : "Quantum-enhanced revenue optimization is now active.",
          variant: isEnabled ? "default" : "default"
        });
      }
    } catch (error) {
      console.error("Error toggling automation:", error);
      toast({
        title: "Optimization Error",
        description: "Could not toggle revenue automation system.",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };
  
  // Run a new optimization
  const runOptimization = async () => {
    setIsOptimizing(true);
    
    try {
      const response = await monetizationAgent.processQuery("run revenue optimization");
      const responseData = JSON.parse(response);
      
      if (responseData?.data) {
        setOptimizationData(responseData.data);
        setOptimizationAge(0);
        
        toast({
          title: "Optimization Complete",
          description: `New projected revenue: ${responseData.data.projectedMonthlyRevenue}/month with ${responseData.data.confidenceScore} confidence.`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error running optimization:", error);
      toast({
        title: "Optimization Error",
        description: "Could not complete revenue optimization.",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };
  
  // Calculate the confidence color based on score
  const getConfidenceColor = (score: number): string => {
    const percent = score * 100;
    if (percent >= 80) return "text-green-500";
    if (percent >= 60) return "text-lime-500";
    if (percent >= 40) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Automated Revenue System</CardTitle>
          </div>
          <Badge variant={isEnabled ? "default" : "outline"} className={isEnabled ? "bg-green-500" : ""}>
            {isEnabled ? "ENABLED" : "DISABLED"}
          </Badge>
        </div>
        <CardDescription>
          Quantum-inspired revenue optimization
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Projected Revenue</div>
                <div className="text-xl font-bold text-green-500">
                  {optimizationData?.projectedMonthlyRevenue || "$0.00"}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Confidence</div>
                <div className={`text-xl font-bold ${optimizationData?.confidenceScore ? getConfidenceColor(parseFloat(optimizationData.confidenceScore)) : ""}`}>
                  {optimizationData?.confidenceScore 
                    ? optimizationData.confidenceScore
                    : "N/A"}
                </div>
              </div>
            </div>
            
            {isEnabled && optimizationData?.implementationTimeline && (
              <div className="border rounded-md p-3">
                <div className="text-sm text-muted-foreground mb-1">Implementation Timeline</div>
                <div className="flex justify-between items-center">
                  <div className="text-md">
                    {optimizationData.implementationTimeline}
                  </div>
                  {optimizationData.lastOptimizationDate && (
                    <Badge variant="outline" className="text-xs">
                      Updated {optimizationAge ? `${optimizationAge}h ago` : "just now"}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {isEnabled && optimizationData?.optimizationResult && (
              <div className="border rounded-md p-3 space-y-2">
                <div className="text-sm font-medium">Top Revenue Streams</div>
                <div className="space-y-1">
                  {optimizationData.optimizationResult.opportunities.slice(0, 3).map((opp: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-1">
                        <span className="w-4 h-4 text-xs flex items-center justify-center bg-muted rounded-full">{idx+1}</span>
                        {opp.name}
                      </span>
                      <span className="text-green-500 font-medium">${opp.potentialRevenue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!isEnabled && (
              <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-muted/20">
                <Lock className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-center text-muted-foreground">
                  Automated revenue generation is disabled.
                  <br />
                  Enable it to start generating revenue automatically.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={runOptimization} disabled={isOptimizing || !isEnabled}>
          <RefreshCcw className={`h-4 w-4 mr-1 ${isOptimizing ? "animate-spin" : ""}`} />
          {isOptimizing ? "Optimizing..." : "Run Optimization"}
        </Button>
        
        <Button 
          onClick={toggleAutomation} 
          size="sm"
          variant={isEnabled ? "outline" : "default"}
          className={isEnabled ? "" : "bg-green-500 hover:bg-green-600"}
          disabled={isOptimizing}
        >
          {isEnabled ? (
            <>
              <Eye className="h-4 w-4 mr-1" />
              Disable
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4 mr-1" />
              Enable Automation
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutomatedRevenuePanel;
