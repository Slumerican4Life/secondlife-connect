
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, BrainCircuit, Clock, Terminal, AlertCircle, CheckCircle, Loader2, History } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Lyra Interface - Component for interacting with the Lyra AI system
 */
const LyraInterface = ({ isProduction = false }) => {
  const [query, setQuery] = useState('');
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('interact');
  const [history, setHistory] = useState<any[]>([]);
  const [lyraStatus, setLyraStatus] = useState<any>(null);

  // Initialize Lyra system
  let lyra: any;
  
  useEffect(() => {
    const initializeLyra = () => {
      try {
        // Only try to initialize if not in production
        if (!isProduction) {
          const LyraSystem = require('@/lib/agents/LyraSystem').LyraSystem;
          lyra = LyraSystem.getInstance();
        }
      } catch (error) {
        console.error("Could not initialize Lyra system:", error);
        // Production mode fallback
        lyra = {
          processRequest: async (query: string) => {
            return {
              status: 'success',
              result: { content: "Lyra is running in demo mode. Full functionality is available in the development environment." },
              executionTime: 1200,
              steps: [{ agentType: 'Demo', action: 'Process query' }]
            };
          },
          getStatus: () => ({
            status: 'demonstration',
            activeRequests: 0,
            completedTasks: 3,
            nanoAgents: 12
          })
        };
      }
    };
    
    initializeLyra();
  }, [isProduction]);

  // Handle query submission
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || processing) return;
    
    setProcessing(true);
    setResponse(null);
    
    try {
      let result;
      
      if (isProduction) {
        // Simulation mode in production
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
        result = {
          status: 'success',
          result: { 
            content: `Demo response to: "${query}"\n\nLyra is running in showcase mode. Full functionality is available in the development environment.` 
          },
          executionTime: 1500,
          steps: [
            { agentType: 'CoreAgent', action: 'Parse query' },
            { agentType: 'LanguageAgent', action: 'Process semantics' },
            { agentType: 'ResponseAgent', action: 'Generate response' }
          ]
        };
      } else {
        try {
          // Process the query through Lyra if available
          const LyraSystem = require('@/lib/agents/LyraSystem').LyraSystem;
          const lyra = LyraSystem.getInstance();
          result = await lyra.processRequest(query);
        } catch (error) {
          result = {
            status: 'success',
            result: { 
              content: `Demo response to: "${query}"\n\nLyra is running in fallback mode.` 
            },
            executionTime: 1200,
            steps: [{ agentType: 'Demo', action: 'Process query' }]
          };
        }
      }
      
      // Update state with response
      setResponse(result);
      
      // Add to history
      setHistory(prev => [
        {
          query,
          result,
          timestamp: new Date()
        },
        ...prev
      ].slice(0, 10));
      
    } catch (error) {
      console.error('Error processing Lyra query:', error);
      setResponse({
        status: 'error',
        error: String(error)
      });
    } finally {
      setProcessing(false);
    }
  };

  // Check Lyra status
  const checkStatus = () => {
    if (isProduction) {
      // Demo status in production
      setLyraStatus({
        status: 'demonstration',
        activeRequests: 0,
        completedTasks: Math.floor(Math.random() * 10) + 5,
        nanoAgents: 12
      });
      
      toast.info("Lyra is running in showcase mode", {
        description: "Full functionality is available in the development environment."
      });
    } else {
      try {
        const LyraSystem = require('@/lib/agents/LyraSystem').LyraSystem;
        const lyra = LyraSystem.getInstance();
        const status = lyra.getStatus();
        setLyraStatus(status);
      } catch (error) {
        console.error("Error checking Lyra status:", error);
        setLyraStatus({
          status: 'error',
          activeRequests: 0,
          completedTasks: 0,
          nanoAgents: 0
        });
      }
    }
  };

  // Component render
  return (
    <Card className="glass-morphism overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-virtual-900 to-virtual-950">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-virtual-400" />
          <CardTitle className="text-white">Lyra System</CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          {isProduction ? "Showcase demo of advanced AI coordination" : "Advanced AI coordination and task management"}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="interact" className="flex items-center gap-1">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Interact</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-1">
              <Terminal className="h-4 w-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-4">
          <TabsContent value="interact" className="mt-0">
            <form onSubmit={handleQuerySubmit} className="space-y-4">
              <div className="relative">
                <Input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ask Lyra..."
                  className="pr-24"
                  disabled={processing}
                />
                <Button 
                  type="submit"
                  disabled={processing || !query.trim()}
                  size="sm"
                  className="absolute right-1 top-1"
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Working...
                    </>
                  ) : "Submit"}
                </Button>
              </div>
            </form>
            
            {processing && (
              <div className="my-4 p-4 border border-virtual-200/20 rounded-md bg-virtual-100/10">
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-virtual-400" />
                  <p className="text-sm">Lyra is processing your request...</p>
                </div>
              </div>
            )}
            
            {response && (
              <div className="mt-4 border border-virtual-200/20 rounded-md overflow-hidden">
                <div className={`flex items-center gap-2 p-3 ${
                  response.status === 'error' 
                    ? 'bg-red-500/10 text-red-500'
                    : 'bg-green-500/10 text-green-500'
                }`}>
                  {response.status === 'error' ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  <p className="text-sm font-medium">
                    {response.status === 'error' ? 'Error' : 'Success'}
                  </p>
                  <div className="ml-auto flex items-center gap-1">
                    <Clock className="h-4 w-4 opacity-70" />
                    <span className="text-xs opacity-70">
                      {response.executionTime ? `${(response.executionTime / 1000).toFixed(2)}s` : 'N/A'}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50">
                  {response.status === 'error' ? (
                    <p className="text-sm text-red-500">{response.error}</p>
                  ) : (
                    <div>
                      <div className="mb-2">
                        <p className="font-medium text-sm">Response:</p>
                        <p className="text-sm mt-1">
                          {response.result?.content || JSON.stringify(response.result)}
                        </p>
                      </div>
                      
                      {response.steps && response.steps.length > 0 && (
                        <div className="mt-3">
                          <p className="font-medium text-sm text-muted-foreground">Processing steps:</p>
                          <div className="mt-1 space-y-1">
                            {response.steps.map((step: any, index: number) => (
                              <div key={index} className="flex items-center text-xs text-muted-foreground">
                                <Badge variant="outline" className="mr-2">
                                  {step.agentType}
                                </Badge>
                                <span>{step.action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No interaction history yet
                </p>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="border border-virtual-200/20 rounded-md overflow-hidden">
                    <div className="bg-muted/30 p-2">
                      <p className="text-sm font-medium">{item.query}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="p-2">
                      <p className="text-xs">
                        {item.result.status === 'error' 
                          ? `Error: ${item.result.error}`
                          : (item.result.result?.content || JSON.stringify(item.result.result))
                        }
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="mt-0">
            <div className="space-y-3">
              <Button onClick={checkStatus} size="sm" variant="outline" className="w-full">
                Check System Status
              </Button>
              
              {lyraStatus && (
                <div className="border border-virtual-200/20 rounded-md overflow-hidden">
                  <div className="bg-muted/30 p-3">
                    <p className="text-sm font-medium">Lyra System Status</p>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge variant="outline">{lyraStatus.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active requests:</span>
                      <span className="text-sm">{lyraStatus.activeRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Completed tasks:</span>
                      <span className="text-sm">{lyraStatus.completedTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Nano agents:</span>
                      <span className="text-sm">{lyraStatus.nanoAgents}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="bg-muted/30 py-2 px-4 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">Powered by nano agent network</p>
        <Badge variant="outline" className="text-xs">v1.0.0</Badge>
      </CardFooter>
    </Card>
  );
};

export default LyraInterface;
