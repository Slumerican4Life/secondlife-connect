
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AgentManager } from "@/lib/agents/AgentManager";
import { Bot, HelpCircle, FileText, BarChart3, Heart, Home, ShoppingBag, Brain } from "lucide-react";
import { toast } from "sonner";

const AIAgentHub = () => {
  const [activeAgentTab, setActiveAgentTab] = useState("help");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentManager, setAgentManager] = useState<AgentManager | null>(null);

  useEffect(() => {
    // Initialize agent manager
    const manager = AgentManager.getInstance();
    setAgentManager(manager);
  }, []);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || !agentManager) return;
    
    setIsProcessing(true);
    
    try {
      let agentResponse;
      
      switch (activeAgentTab) {
        case "help":
          agentResponse = await agentManager.getHelpAgent().processQuery(query);
          break;
        case "posting":
          agentResponse = await agentManager.getPostingAgent().processQuery(query);
          break;
        case "advertising":
          agentResponse = await agentManager.getAdvertisingAgent().processQuery(query);
          break;
        case "dating":
          agentResponse = await agentManager.getDatingAgent().processQuery(query);
          break;
        case "realestate":
          agentResponse = await agentManager.getRealEstateAgent().processQuery(query);
          break;
        case "marketplace":
          agentResponse = await agentManager.getMarketplaceAgent().processQuery(query);
          break;
        case "intelligence":
          agentResponse = await agentManager.getIntelligenceAgent().processQuery(query);
          break;
        default:
          agentResponse = '{"message": "Select an agent first", "success": false}';
      }
      
      const parsedResponse = JSON.parse(agentResponse);
      setResponse(parsedResponse);
      
      if (parsedResponse.success) {
        toast.success("AI Agent responded successfully");
      } else {
        toast.error("AI Agent encountered an issue");
      }
    } catch (error) {
      console.error("Error processing query:", error);
      toast.error("Failed to process your request");
      setResponse({
        message: "There was an error processing your request. Please try again.",
        success: false
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto glass-morphism">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-virtual-400" />
          AI Agent Hub
        </CardTitle>
        <CardDescription>
          Interact with specialized AI agents to get help across different aspects of SecondLife
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeAgentTab} onValueChange={setActiveAgentTab} className="w-full">
          <TabsList className="grid grid-cols-7">
            <TabsTrigger value="help" className="flex flex-col items-center text-xs p-2">
              <HelpCircle className="h-4 w-4 mb-1" />
              Help
            </TabsTrigger>
            <TabsTrigger value="posting" className="flex flex-col items-center text-xs p-2">
              <FileText className="h-4 w-4 mb-1" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="advertising" className="flex flex-col items-center text-xs p-2">
              <BarChart3 className="h-4 w-4 mb-1" />
              Ads
            </TabsTrigger>
            <TabsTrigger value="dating" className="flex flex-col items-center text-xs p-2">
              <Heart className="h-4 w-4 mb-1" />
              Dating
            </TabsTrigger>
            <TabsTrigger value="realestate" className="flex flex-col items-center text-xs p-2">
              <Home className="h-4 w-4 mb-1" />
              Homes
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex flex-col items-center text-xs p-2">
              <ShoppingBag className="h-4 w-4 mb-1" />
              Market
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="flex flex-col items-center text-xs p-2">
              <Brain className="h-4 w-4 mb-1" />
              Intel
            </TabsTrigger>
          </TabsList>
          
          {["help", "posting", "advertising", "dating", "realestate", "marketplace", "intelligence"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <Card className="border-none shadow-none">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">
                    {tab === "help" && "Support Assistant"}
                    {tab === "posting" && "Posting Assistant"}
                    {tab === "advertising" && "Advertising Assistant"}
                    {tab === "dating" && "Dating Assistant"}
                    {tab === "realestate" && "Real Estate Assistant"}
                    {tab === "marketplace" && "Marketplace Assistant"}
                    {tab === "intelligence" && "Intelligence Network"}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {tab === "help" && "Get help with platform features and issues"}
                    {tab === "posting" && "Create engaging posts and optimize content"}
                    {tab === "advertising" && "Organize and optimize your advertisements"}
                    {tab === "dating" && "Find compatible matches and improve your dating profile"}
                    {tab === "realestate" && "Discover and evaluate virtual properties"}
                    {tab === "marketplace" && "Buy and sell items with AI assistance"}
                    {tab === "intelligence" && "Access platform trends and insights"}
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <form onSubmit={handleQuerySubmit} className="space-y-4 mt-2">
                <div className="flex gap-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Ask the ${tab} assistant...`}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Send"}
                  </Button>
                </div>
              </form>
              
              {response && (
                <Card className="mt-4 bg-muted/50">
                  <CardContent className="p-4">
                    <p>{response.message}</p>
                    
                    {response.data && (
                      <div className="mt-2 text-sm">
                        <pre className="bg-black/20 p-2 rounded overflow-auto">
                          {JSON.stringify(response.data, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {response.suggestions && response.suggestions.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {response.suggestions.map((suggestion: string, index: number) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>AI Agent system is in beta</p>
        <Button variant="link" size="sm" className="p-0 h-auto text-xs">
          Learn more about our AI agents
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIAgentHub;
