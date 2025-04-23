
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { AgentManager } from "@/lib/agents/AgentManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BadgeDollarSign, 
  DollarSign, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  ChevronRight,
  WalletCards,
  Shield,
  Zap
} from "lucide-react";

interface SecureFinancePanelProps {
  userId: string;
  className?: string;
}

const SecureFinancePanel = ({ userId, className = "" }: SecureFinancePanelProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("revenue");
  const [revenueData, setRevenueData] = useState<any>(null);
  const { toast } = useToast();
  const agentManager = AgentManager.getInstance();
  const monetizationAgent = agentManager.getMonetizationAgent();

  useEffect(() => {
    const fetchRevenueData = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would fetch data from an API
        // Here we're simulating it with the monetization agent
        const response = await monetizationAgent.processQuery("get revenue breakdown");
        const responseData = JSON.parse(response);
        
        if (responseData?.data) {
          setRevenueData(responseData.data);
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRevenueData();
  }, [userId]);
  
  const handleConnectPayment = () => {
    toast({
      title: "Payment Connection Initiated",
      description: "You will be redirected to connect your payment account.",
      variant: "default"
    });
    
    // In a real application, this would redirect to a payment provider integration page
  };
  
  const handleSetupAutomation = async () => {
    try {
      const response = await monetizationAgent.processQuery("setup automated revenue collection");
      
      toast({
        title: "Automation Setup",
        description: "Revenue automation has been configured successfully.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error setting up automation:", error);
      toast({
        title: "Setup Error",
        description: "Could not complete automation setup.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeDollarSign className="h-5 w-5 text-green-500" />
            <CardTitle>Secure Finance Hub</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400">
            <Shield className="h-3 w-3 mr-1" />
            Quantum Secured
          </Badge>
        </div>
        <CardDescription>
          Advanced financial tools for monetization and revenue management
        </CardDescription>
      </CardHeader>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="revenue">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Revenue</span>
          </TabsTrigger>
          <TabsTrigger value="connect">
            <WalletCards className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Connections</span>
          </TabsTrigger>
          <TabsTrigger value="automate">
            <Zap className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Automation</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-24 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Total Revenue (30d)</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">$42,850.75</div>
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <ArrowUp className="h-3 w-3 mr-1" /> 12.5% from last month
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Operating Expenses</div>
                    <div className="text-xl font-bold">$12,350.20</div>
                    <div className="flex items-center text-xs text-red-600 dark:text-red-400">
                      <ArrowDown className="h-3 w-3 mr-1" /> 5.2% higher than projected
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">Revenue Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        <span>Subscriptions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>$24,500.55</span>
                        <span className="text-xs text-muted-foreground">(57.2%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Marketplace Fees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>$8,325.10</span>
                        <span className="text-xs text-muted-foreground">(19.4%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                        <span>Advertising</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>$6,875.85</span>
                        <span className="text-xs text-muted-foreground">(16.0%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                        <span>Virtual Currency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>$3,149.25</span>
                        <span className="text-xs text-muted-foreground">(7.4%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3 bg-muted/50">
                  <h4 className="text-sm font-medium mb-2">AI Revenue Insights</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Subscription revenue has increased by 12.5% since implementing tiered pricing</li>
                    <li>Marketplace transaction volume is up 18.3% month-over-month</li>
                    <li>Average revenue per user has grown to $22.75</li>
                    <li>Potential revenue opportunity: Implement premium virtual goods</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="connect">
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Payment Integrations</h4>
              
              <div className="border rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Payment Processor</h4>
                    <p className="text-xs text-muted-foreground">Connect your payment provider</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleConnectPayment}>
                  Connect
                </Button>
              </div>
              
              <div className="border rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <WalletCards className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Banking Connection</h4>
                    <p className="text-xs text-muted-foreground">Link your bank accounts</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              
              <div className="border rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <BadgeDollarSign className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Tax Services</h4>
                    <p className="text-xs text-muted-foreground">Connect tax compliance services</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </div>
            
            <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-950/20 text-sm">
              <h4 className="font-medium mb-1">Connection Benefits</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Automated payment processing</li>
                <li>Seamless fund transfers</li>
                <li>Enhanced security protections</li>
                <li>Simplified tax compliance</li>
              </ul>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="automate">
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Automation Options</h4>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Automated Revenue Collection</h4>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                    Not Setup
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically collect payments from subscribers and marketplace transactions
                </p>
                <Button size="sm" variant="outline" onClick={handleSetupAutomation}>
                  Set Up Automation
                </Button>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    </div>
                    <h4 className="font-medium">Scheduled Transfers</h4>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                    Not Setup
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Automatically transfer funds to your bank account on a schedule
                </p>
                <Button size="sm" variant="outline">
                  Set Up Automation
                </Button>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-purple-600" />
                    </div>
                    <h4 className="font-medium">AI Revenue Optimization</h4>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Use AI to continuously optimize your pricing and revenue streams
                </p>
                <Button size="sm">
                  View Settings
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <h4 className="text-sm font-medium mb-2">Automated Reports</h4>
              <Button variant="outline" className="w-full text-sm justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Schedule a New Report
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>Secure Finance Hub v1.0</span>
        <Button variant="link" className="p-0 h-auto text-muted-foreground" size="sm">
          Advanced Settings
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecureFinancePanel;
